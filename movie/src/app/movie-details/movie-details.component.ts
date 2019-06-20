import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie-detail.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor( private movieService: MovieService) { }

  ngOnInit() {
  }
  

}
