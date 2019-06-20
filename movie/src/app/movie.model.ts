export class Movie {
    public Title  :string;
    public Released  :string;
    public Actors  :string;
    public Plot  :string;
    public Poster  :string;
    public Director : string;
    public Genre : string;

    constructor(movieName?:string , releaseYear?:string , cast?:string , description?:string , imgPath?:string){
        this.Title= movieName;
        this.Released = releaseYear;
        this.Actors = cast;
        this.Plot = description;
        this.Poster = imgPath
    }

}
