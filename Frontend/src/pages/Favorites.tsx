import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MovieContext";
import Header from "../components/Header";
import { getPopularMovies } from "../api/MoviesApi";
import "../css/Movies.css";

function Favorites() {

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


    const favorites = movies.filter(movie => movie.liked);


    return (
        <div className="Favorites">

            <Header />

            {loading ? (

                <div className="Loading">
                    Loading movies...
                </div>

            ) : (

                <div className="MovieGrid">

                    {favorites.length > 0 ? (

                        favorites.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onLike={toggleLike}
                            />
                        ))

                    ) : (

                        <p>Nie masz jeszcze ulubionych filmów 🤍</p>

                    )}

                </div>

            )}

        </div>
    );
}


export default Favorites;