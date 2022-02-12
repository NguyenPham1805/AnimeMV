import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./page/home/home.component";
import { InfoComponent } from "./page/info/info.component";
import { WatchComponent } from "./page/watch/watch.component";
import { BrowserComponent } from "./page/browser/browser.component";
import { SearchComponent } from "./page/search/search.component";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { NotFoundComponent } from "./page/not-found/not-found.component";
import { MovieComponent } from "./page/movie/movie.component";
import { YearComponent } from "./page/year/year.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { AnimeCardComponent } from "./components/anime-card/anime-card.component";
import { LoginComponent } from "./components/login/login.component";
import { TitleComponent } from "./components/title/title.component";
import { BtnNavCarouselComponent } from "./components/btn-nav-carousel/btn-nav-carousel.component";
import { NavCarouselComponent } from "./components/nav-carousel/nav-carousel.component";
import { ListAnimeComponent } from "./components/list-anime/list-anime.component";
import { MobileMenuComponent } from "./components/mobile-menu/mobile-menu.component";
import { NavSelectComponent } from "./components/nav-select/nav-select.component";
import { SearchCardComponent } from "./components/search-card/search-card.component";
import { SuggestFrameComponent } from "./components/suggest-frame/suggest-frame.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { EpisodesComponent } from "./components/episodes/episodes.component";
import { VideoComponent } from "./components/video/video.component";
import { CommentComponent } from "./components/comment/comment.component";
import { CommentListComponent } from "./components/comment-list/comment-list.component";
import { CommentFormComponent } from "./components/comment-form/comment-form.component";

import { FormatViewsPipe } from "./pipe/format-views.pipe";
import { TimePipe } from "./pipe/time.pipe";
import { HistoryComponent } from './page/history/history.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InfoComponent,
    WatchComponent,
    BrowserComponent,
    SearchComponent,
    NotFoundComponent,
    MovieComponent,
    YearComponent,
    CarouselComponent,
    AnimeCardComponent,
    LoginComponent,
    TitleComponent,
    BtnNavCarouselComponent,
    NavCarouselComponent,
    ListAnimeComponent,
    SearchInputComponent,
    MobileMenuComponent,
    NavSelectComponent,
    SearchCardComponent,
    SuggestFrameComponent,
    PaginationComponent,
    EpisodesComponent,
    FormatViewsPipe,
    VideoComponent,
    CommentComponent,
    CommentListComponent,
    CommentFormComponent,
    TimePipe,
    HistoryComponent,
    HistoryItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
