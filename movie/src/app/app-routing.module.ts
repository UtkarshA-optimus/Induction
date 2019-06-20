import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router'
import { MovieDetailsComponent } from './movie-details/movie-details.component';



const routes : Routes = [
  { path : 'details' , component: MovieDetailsComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
