import { Component, Input, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-comment-list",
  templateUrl: "./comment-list.component.html",
  styleUrls: ["./comment-list.component.css"],
})
export class CommentListComponent implements OnInit {
  rightIcon: IconDefinition = faChevronRight;
  commentIcon: IconDefinition = faCommentAlt;

  @Input() isLoading!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
