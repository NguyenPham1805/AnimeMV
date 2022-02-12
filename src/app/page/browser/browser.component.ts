import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap } from "rxjs";
import { AppService } from "src/app/app.service";
import { GENRES, RANKINGS } from "src/constant";
import { Anime } from "src/types";

@Component({
  selector: "app-browser",
  templateUrl: "./browser.component.html",
  styleUrls: ["./browser.component.css"],
  providers: [AppService],
})
export class BrowserComponent implements OnInit {
  category: string = "";
  currentPage: number = 1;
  isLoading: boolean = false;
  listAnimeResponse: Anime[] = [];
  totalPage: number | undefined;
  typeName: string | undefined;

  constructor(
    private http: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.params
      .pipe(
        map((params) => {
          this.typeName = [...GENRES, ...RANKINGS].find(
            (type) => type.slug === params["slug"]
          )?.name;
          this.category = this.router.url.replace("/", "").split("/")[0];
          return {
            category: this.category,
            slug: params["slug"],
            page: this.currentPage,
          };
        }),
        switchMap((params) => this.http.getList(params))
      )
      .subscribe((res) => {
        this.listAnimeResponse = res.data;
        if (res.pagination) this.totalPage = res.pagination.totalPage;
        this.isLoading = false;
      });
  }

  handleChagePage(currentPage: number): void {
    this.currentPage = currentPage;
    this.ngOnInit();
  }
}
