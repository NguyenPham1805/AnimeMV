import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_URL } from "src/constant";
import { InfoResponse, ListData, ListResponse, SearchProps } from "src/types";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  getSlide() {
    return this.http.get<any>(API_URL + "/slide");
  }

  getList({ category, slug, ...rest }: ListData) {
    return this.http.get<ListResponse>(API_URL + `/${category}/${slug}`, {
      params: new HttpParams({
        fromObject: {
          page: rest.page! || 1,
          sort: rest.sort! || 1,
        },
      }),
    });
  }

  getSearch(prop: SearchProps) {
    return this.http.get<ListResponse>(API_URL + "/search", {
      params: new HttpParams({
        fromObject: {
          q: prop.q,
          limit: prop.limit,
          page: prop.page,
        },
      }),
    });
  }

  getInfo(slug: string) {
    return this.http.get<InfoResponse>(API_URL + `/anime/${slug}`);
  }

  getSource(animeId: number, episodeIndex: number) {
    return this.http.get<any>(
      API_URL + `/anime/${animeId}/episodes/${episodeIndex}`
    );
  }
}
