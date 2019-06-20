import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MovieService } from './movie-details/movie-detail.service';
import { Movie } from './movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private card: boolean = false;
  private details : Movie[];

  constructor (private fb: FormBuilder, private movieDetailService: MovieService){}

  movieform = this.fb.group({
    movieName : ['', Validators.required],
    releaseYear : ''
  });

  ngOnInit(){
    // this.card = false;
  }

  onSearch(){
    const data = this.movieform.value; 
    this.movieDetailService.getMovieDetails(data.movieName,data.releaseYear)
    .subscribe((data) =>
      { this.details = data;
        this.card = true;},
      (err: any) => {console.log(err)}
      );
      ;
  }
}
