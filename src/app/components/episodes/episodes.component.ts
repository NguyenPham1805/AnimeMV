import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Episode } from "src/types";

@Component({
  selector: "app-episodes",
  templateUrl: "./episodes.component.html",
  styleUrls: ["./episodes.component.css"],
})
export class EpisodesComponent implements OnInit {
  @Input() episodeChunk!: Episode[];
  @Input() firstEP!: number;
  @Input() lastEP!: number;
  @Input() slug!: string;
  @Input() activeIndex!: number;

  @Output() onChageEpisode = new EventEmitter<number>();

  isDropdown: boolean = false;
  rightArrow: IconDefinition = faChevronRight;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleToggleDropdown() {
    this.isDropdown = !this.isDropdown;
  }

  handleNavigateWatch(slug: string, index: number) {
    this.onChageEpisode.emit(index);
    this.router.navigate([`/watch/${slug}`], {
      queryParams: {
        episode_index: index,
      },
    });
  }
}
