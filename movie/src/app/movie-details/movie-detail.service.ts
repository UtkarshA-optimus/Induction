import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../movie.model';

@Injectable({
    providedIn: 'root'
  })

  export class MovieService{
      private _url : string = ' http://www.omdbapi.com/?i=tt3896198&apikey=a0af53b6&';

      constructor(private http: HttpClient){}

      getMovieDetails( movieName : string ,releaseYear : string ) : Observable<any>{
        const params: HttpParams = new HttpParams().set('t',movieName).set('y',releaseYear);
        return this.http.get<any>(this._url, { params })
      }

  }