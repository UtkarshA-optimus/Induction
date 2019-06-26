import { Component, OnInit } from "@angular/core";
import { MovieService } from "../movie-list/movie-list.service";

@Component({
  selector: "movie-detail",
  templateUrl: "movie-detail.component.html",
  styleUrls: ["movie-detail.component.css"]
})
export class MovieDetailComponent implements OnInit {
  private movies = [];
  searchResult: any = this.movieService.searchResult;
  private search: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.nowPlaying();
    this.movieService.getList().subscribe(data => {
      this.searchResult = data.text;
      this.search = true;
      console.log("UPDATED", this.searchResult);
    });
  }

  nowPlaying() {
    this.movieService.nowPlayingMovies().subscribe(data => {
      this.movies = data.results;
      console.log("NOW PLAYING", this.movies);
    });
  }

  images = [1, 2, 3].map(
    () => `https://picsum.photos/900/500?random&t=${Math.random()}`
  );
}
