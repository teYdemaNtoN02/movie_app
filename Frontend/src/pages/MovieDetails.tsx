import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/MoviesApi";
import "../css/MovieDetails.css";
import Header from "../components/Header";



function MovieDetails() {

    const { id } = useParams();

    const [movie, setMovie] = useState<any>(null);


    useEffect(() => {

        async function loadMovie() {

            if (!id) return;

            const data = await getMovieDetails(id);

            setMovie(data);
        }


        loadMovie();

    }, [id]);


    if (!movie) {
        return <h1>Loading...</h1>;
    }


    return (
        <div className="MovieDetails">
            <Header />
            <div className="MovieInformation">
                <div className="MoviePoster">
                    <h1>{movie.Title}</h1>

                    <img 
                        src={movie.Poster}
                        alt={movie.Title}
                    />
                </div>
                <div className="MovieData">
                    <p>Year: {movie.Year}</p>

                    <p>Average Rating:⭐ {movie.imdbRating}</p>

                    <p>Genre: {movie.Genre}</p>

                    <p>Plot:{movie.Plot}</p>

                    <p>Director: {movie.Director}</p>

                    <p>Actors: {movie.Actors}</p>
                </div>
            </div>
        </div>
    );
}


export default MovieDetails;