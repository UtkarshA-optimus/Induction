import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieService } from "./movie-list/movie-list.service";
import { HttpClientModule } from "@angular/common/http";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxAutoScrollModule } from "ngx-auto-scroll";
// import { NgProgressModule } from "ngx-progressbar";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgProgressModule } from "@ngx-progressbar/core";
import { NgProgressHttpModule } from "@ngx-progressbar/http";

@NgModule({
  declarations: [AppComponent, MovieListComponent, MovieDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxAutoScrollModule,
    NgbModule,
    BrowserAnimationsModule,
    NgProgressModule.withConfig({
      spinnerPosition: "left",
      color: "#2387B7"
    }),
    NgProgressHttpModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
