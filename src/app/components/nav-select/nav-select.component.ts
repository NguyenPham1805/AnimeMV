import { Component, OnInit, Input } from "@angular/core";
import { ListSelectItem } from "src/types";

@Component({
  selector: "app-nav-select",
  templateUrl: "./nav-select.component.html",
  styleUrls: ["./nav-select.component.css"],
})
export class NavSelectComponent implements OnInit {
  @Input() listSelectIcon!: ListSelectItem[];

  constructor() {}

  ngOnInit(): void {}
}
