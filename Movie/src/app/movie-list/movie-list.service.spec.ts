import { TestBed } from "@angular/core/testing";
import { MovieService } from "./movie-list.service";
import { HttpClientModule } from "@angular/common/http";
import { of } from "rxjs";

describe("MovieService", () => {
  let movieService: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MovieService]
    });

    movieService = TestBed.get(MovieService);
  });

  it("Movie service should be created", () => {
    expect(movieService).toBeTruthy();
  });

  it("should return the list of movies", () => {
    let response;

    movieService.getMovieList().subscribe(res => {
      response = res.text;
      expect(res).toBeGreaterThanOrEqual(1);
    });
  });

  it("it should return the search results", () => {
    let response;
    movieService.getMovieDetails("Captain America", "2011").subscribe(res => {
      response = res.results;
      expect(response.length.tobe(1));
    });
  });
});
