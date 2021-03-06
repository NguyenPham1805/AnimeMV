import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { fromEvent, map, Subscription } from "rxjs";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  @ViewChild("container") container!: ElementRef;
  private mousemoveEvents$!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.mousemoveEvents$ = fromEvent(document, "mousemove")
      .pipe(map((e) => e as MouseEvent))
      .subscribe((e) => {
        let x = e.clientX / 5;
        let y = e.clientY / 5;
        this.container.nativeElement.style.backgroundPositionX = x + "px";
        this.container.nativeElement.style.backgroundPositionY = y + "px";
      });
  }

  ngOnDestroy(): void {
    this.mousemoveEvents$.unsubscribe();
  }
}
