import { useEffect, useState } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MovieContext";
import { getPopularMovies } from "../api/MoviesApi";
import "../css/Movies.css";


function Movies() {

    const { movies, setMovies, toggleLike } = useMovies();
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function loadMovies() {

            try {
                const data = await getPopularMovies();

                const likedMovies = JSON.parse(
                    localStorage.getItem("likedMovies") || "[]"
                );


                const moviesWithLikes = data.map(movie => ({
                    ...movie,
                    liked: likedMovies.includes(movie.id)
                }));


                setMovies(moviesWithLikes);

            } catch (error) {
                console.error("Error loading movies:", error);

            } finally {
                setLoading(false);
            }

        }


        loadMovies();

    }, [setMovies]);



    return (
        <div className="Movies">

            <Header />

            {loading ? (
                <div className="Loading">
                    Loading movies...
                </div>
            ) : (

                <div className="MovieGrid">

                    {movies.map(movie => (

                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onLike={toggleLike}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}


export default Movies;