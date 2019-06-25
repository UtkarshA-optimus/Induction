import { Component, OnInit } from "@angular/core";
import { MovieService } from "./movie-list.service";

@Component({
  selector: "movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
  public movies = [];

  constructor(private movieListService: MovieService) {}
  ngOnInit() {
    this.getList();
  }

  getList() {
    this.movieListService.getMovieList().subscribe(data => {
      this.movies = data.results;
      console.log("MOVIE-LIST", this.movies);
    });
  }

  onSelectMovie(movie: any) {
    console.log("MOVIE-NAME is", movie.original_title);
    this.movieListService.getMovieDetails(movie.original_title).subscribe(
      data => {
        // this.movieListService.searchResult = data;
        this.movieListService.searched = true;
        this.movieListService.sendlist(data);
        // console.log("SEARCH RESULT", this.movieListService.searchResult);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
