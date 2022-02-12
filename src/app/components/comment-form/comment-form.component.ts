import { Component, Input, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "app-comment-form",
  templateUrl: "./comment-form.component.html",
  styleUrls: ["./comment-form.component.css"],
})
export class CommentFormComponent implements OnInit {
  submitIcon: IconDefinition = faPaperPlane;
  @Input() placeholder!: string;

  constructor() {}

  ngOnInit(): void {}
}
