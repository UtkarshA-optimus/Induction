import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AppConstants } from "src/constants";
import { Observable, Subject } from "rxjs";
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";

@Injectable()
export class MovieService {
  public searched: boolean = false;
  private _upcomingUrl: string = AppConstants.upcomingMoviesUrl;
  private _playingUrl: string = AppConstants.playingNowMoviesUrl;
  private _searchingUrl: string = AppConstants.searchMovieUrl;
  public searchResult: any = new Subject<any>();

  constructor(private http: HttpClient) {}

  sendlist(property: any) {
    this.searchResult.next({
      text: property
    });
  }

  getList(): Observable<any> {
    return this.searchResult.asObservable();
  }

  getMovieList(): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set("language", "en-US")
      .set("page", "1");
    return this.http.get<any>(this._upcomingUrl, { params });
  }

  nowPlayingMovies(): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set("language", "en-US")
      .set("page", "1");
    return this.http.get<any>(this._playingUrl, { params });
  }

  getMovieDetails(movieName: string, releaseYear?: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set("t", movieName)
      .set("y", releaseYear);
    return this.http.get<any>(this._searchingUrl, { params });
  }
}
