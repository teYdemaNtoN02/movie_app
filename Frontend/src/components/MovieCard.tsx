import type { Movie } from "../types/Movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
    movie: Movie;
    onLike: (id: string) => void;
}

function MovieCard({ movie, onLike }: MovieCardProps) {

    const navigate = useNavigate();

    return (
        <div className="MovieCard">
            <img 
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    src={movie.poster_path}
                    alt={movie.title}
                />

            <div className="MovieBottom">
                <div className="MovieData">
                <h1>{movie.title}</h1>
                <p>{movie.release_date}</p>
                </div>

                <button 
                    className={`MovieFavorite ${movie.liked ? "liked" : ""}`}
                    onClick={() => onLike(movie.id)}
                    >
                    ♥
                </button>
            </div>
        </div>
    );
}

export default MovieCard;