import { Component, OnInit } from "@angular/core";
import { Anime, ListData } from "src/types";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [AppService],
})
export class HomeComponent implements OnInit {
  isSlideLoading: boolean = false;
  isListAnimeLoading: boolean = false;

  slides: Anime[] = [];
  listAnime: Anime[] = [];

  listAnimeProp: ListData = {
    category: "recently",
    slug: "",
  };

  constructor(private http: AppService) {}

  ngOnInit(): void {
    this.isSlideLoading = true;
    this.http.getSlide().subscribe((res) => {
      this.slides = res.data;
      this.isSlideLoading = false;
    });
    this.isListAnimeLoading = true;
    this.http.getList(this.listAnimeProp).subscribe((res) => {
      this.listAnime = res.data;
      this.isListAnimeLoading = false;
    });
  }
}
