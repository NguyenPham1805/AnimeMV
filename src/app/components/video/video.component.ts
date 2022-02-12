import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  HostListener,
  Input,
} from "@angular/core";
import { fromEvent, Subscription, timer } from "rxjs";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faCompress,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

import videojs, { VideoJsPlayer } from "video.js";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";
import "videojs-contrib-quality-levels";

import Storage from "src/app/utils/Storage";
import { AnimeInfo, StorageInfo } from "src/types";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.css"],
})
export class VideoComponent implements OnInit, OnDestroy {
  fullscreenIcon: IconDefinition = faExpand;
  exitFullscreenIcon: IconDefinition = faCompress;
  leftArrowIcon: IconDefinition = faAngleLeft;
  RightArrowIcon: IconDefinition = faAngleRight;

  @Input() info!: AnimeInfo;
  @Input() source!: string;
  @Input() title!: string;
  @Input() poster!: string;
  @Input() index!: number;

  @ViewChild("mainVideo", { static: true }) mainVideo!: ElementRef;
  @ViewChild("seekRef") seekRef!: ElementRef;
  @ViewChild("videoContainer", { static: true }) videoContainer!: ElementRef;
  @ViewChild("timeTooltips") timeTooltips!: ElementRef;

  quality!: any;
  levels!: any[];

  overlay$!: Subscription;
  keyupSubscription$!: Subscription;

  hoverTimer$ = timer(3000);

  player!: VideoJsPlayer;

  isHoverEnable = false;
  isPause = true;
  isFullscreen = false;
  isSeeking = false;
  isSettingActive = false;
  isSpeedActive = false;
  isQualityActive = false;
  isEnded = false;

  volume!: number;
  storageInfo: StorageInfo | undefined;
  storagePlayer: any;
  currentSpeed = 1;
  currentQuality!: number;
  currentTimeHover!: number;

  Storage = Storage;

  constructor() {}

  ngOnInit() {
    this.keyupSubscription$ = fromEvent(window, "keyup").subscribe((e: any) => {
      if (this.videoContainer.nativeElement.contains(document.activeElement))
        (document.activeElement as any)?.blur();
      // Pause
      if (e.keyCode === 32 || e.keyCode === 75) this.handleTogglePlay();
      // Mute
      if (e.keyCode === 77) {
        this.player.volume()
          ? this.handleVolumeChange(0)
          : this.handleVolumeChange(100);
      }
      // Rewind
      if (e.keyCode === 37) this.handleSeekTime(-10);
      // Forward
      if (e.keyCode === 39) this.handleSeekTime(10);
      // Full screen
      if (e.keyCode === 70) this.handleToggleFullScreen();
    });
    this.keyupSubscription$.add(
      fromEvent(window, "keydown").subscribe((e: any) => {
        if (e.keyCode === 32) e.preventDefault();
      })
    );
  }

  ngOnDestroy() {
    if (this.player) {
      this.Storage.updateItem(
        "AnimeMV-player",
        {},
        {
          volume: this.volume / 100,
          quality: this.quality.selectedIndex_,
        }
      );

      this.Storage.updateStore(
        "AnimeMV-recent",
        { id: this.info.id, index: this.index },
        {
          id: this.info.id,
          index: this.index,
          slug: this.info.slug,
          title: this.title,
          thumbnail: this.info.episodes[this.index].thumbnail_medium,
          views: this.info.episodes[this.index].views,
          currentTime: this.player.currentTime(),
          duration: this.player.duration(),
          date: new Date().getTime(),
        }
      );

      this.player.dispose();
    }
    this.overlay$ && this.overlay$.unsubscribe();
    this.keyupSubscription$ && this.keyupSubscription$.unsubscribe();
  }

  @HostListener("document: fullscreenchange")
  handleFullScreenChage() {
    this.isFullscreen = !this.isFullscreen;
  }

  createPlayer() {
    this.player = videojs(this.mainVideo.nativeElement, {
      controls: false,
      bigPlayButton: false,
      sources: [
        {
          src: this.source,
          type: "application/x-mpegURL",
        },
      ],
    });

    this.isPause = false;
    this.player.play();
    this.storagePlayer = this.Storage.findOne("AnimeMV-player");
    this.storageInfo = this.Storage.findOne<StorageInfo>("AnimeMV-recent", {
      id: this.info.id,
      index: this.index,
    });

    this.quality = this.player.qualityLevels();
    this.handleVolumeChange(
      this.storagePlayer ? this.storagePlayer.volume * 100 : 100
    );
    this.player.currentTime(this.storageInfo?.currentTime || 0);

    this.player.on("canplay", () => {
      if (!this.levels) {
        this.levels = this.getQuality();
        this.changeQuality(this.storagePlayer?.quality || 0);
      }
    });

    this.player.on("ended", () => {
      this.isFullscreen && document.exitFullscreen();
      this.player.pause();
      this.isEnded = true;
      this.isPause = true;
    });
  }

  handleEnable() {
    this.isHoverEnable = true;
    if (this.overlay$) this.overlay$.unsubscribe();
    this.overlay$ = this.hoverTimer$.subscribe(
      () => (this.isHoverEnable = false)
    );
  }

  handleDisable() {
    this.isHoverEnable = false;
    this.overlay$?.unsubscribe();
  }

  handleSeekTime(amount: number) {
    this.player && (this.mainVideo.nativeElement.currentTime += amount);
  }

  handleTogglePlay() {
    if (this.isSettingActive || this.isSpeedActive || this.isQualityActive) {
      this.isSettingActive = false;
      this.closeSetting();
    } else {
      this.player && (this.isPause = !this.isPause);
      this.isPause ? this.player.pause() : this.player.play();
    }
  }

  handleToggleFullScreen() {
    if (!this.isFullscreen)
      this.videoContainer.nativeElement.requestFullscreen();
    else document.exitFullscreen();
  }

  handleVolumeChange(volume: number) {
    this.player.volume(volume / 100);
    this.volume = volume;
  }

  handleSeeking(e: any) {
    this.isSeeking = true;
    if (!this.player || !this.seekRef.nativeElement) return;

    const offset =
      (e.clientX - (e.target as any).getBoundingClientRect().left) /
      this.seekRef.nativeElement.offsetWidth;

    const newTime =
      (Math.abs(offset) === Infinity || isNaN(offset) ? 0 : offset) *
      this.player.duration();

    this.player.currentTime(newTime);
  }

  handleHover(e: any) {
    this.timeTooltips.nativeElement.style.display = "block";
    if (!this.player || !this.seekRef.nativeElement) return;

    const offset =
      (e.clientX - (e.target as any).getBoundingClientRect().left) /
      this.seekRef.nativeElement.offsetWidth;

    const newTime =
      (Math.abs(offset) === Infinity || isNaN(offset) ? 0 : offset) *
      this.player.duration();
    this.currentTimeHover = Math.floor(newTime) < 0 ? 0 : Math.floor(newTime);

    this.timeTooltips.nativeElement.style.left = e.offsetX + "px";
  }

  handleMouseLeave() {
    this.isSeeking = false;
    this.timeTooltips.nativeElement.style.display = "none";
  }

  toggleSetting() {
    this.isSettingActive = !this.isSettingActive;
    if (this.isSettingActive || this.isSpeedActive || this.isQualityActive) {
      this.closeSetting();
    }
  }

  closeSetting() {
    this.isSpeedActive = false;
    this.isQualityActive = false;
  }

  getQuality() {
    const levels = [];
    for (let i = 0; i < this.quality.length; i++) {
      levels.push(this.quality[i].height);
    }
    return levels;
  }

  changeQuality(level: number) {
    this.closeSetting();
    for (let i = 0; i < this.quality.length; i++) {
      let qualityLevel = this.quality[i];
      if (i === level) {
        this.currentQuality = this.quality[i].height;
        qualityLevel.enabled = true;
        this.quality.selectedIndex_ = level;
        this.quality.trigger({ type: "change", selectedIndex: level });
      } else qualityLevel.enabled = false;
    }
  }

  handleChageSpeed(speed: number) {
    this.closeSetting();
    this.currentSpeed = (speed + 1) / 4;
    this.player.playbackRate(this.currentSpeed);
  }
}
