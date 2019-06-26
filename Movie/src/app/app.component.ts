import { Component, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MovieService } from "./movie-list/movie-list.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Movie";
  preventAbuse = false;
  @Input() value: number = 0;

  private card: boolean = false;
  private details = [];

  constructor(
    private fb: FormBuilder,
    private movieDetailService: MovieService
  ) {}

  movieform = this.fb.group({
    movieName: ["", Validators.required],
    releaseYear: ""
  });

  ngOnInit() {
    // this.card = false;
    // this.width = 30;
  }

  onSearch() {
    const data = this.movieform.value;
    this.movieDetailService
      .getMovieDetails(data.movieName, data.releaseYear)
      .subscribe(
        data => {
          // this.movieDetailService.searchResult = data;
          this.movieDetailService.searched = true;
          this.movieDetailService.sendlist(data);
          console.log("SEARCH RESULT", this.movieDetailService.searchResult);
          setTimeout(() => {
            this.preventAbuse = false;
          }, 800);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
