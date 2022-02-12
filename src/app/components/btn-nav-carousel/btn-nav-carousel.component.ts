import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "app-btn-nav-carousel",
  templateUrl: "./btn-nav-carousel.component.html",
  styleUrls: ["./btn-nav-carousel.component.css"],
})
export class BtnNavCarouselComponent implements OnInit {
  @Input() btnIcon!: IconDefinition;
  @Input() className!: string;

  @Output() handleSetIndex = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setIndex() {
    this.handleSetIndex.emit();
  }
}
