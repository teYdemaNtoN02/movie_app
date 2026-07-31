import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/Movie";


interface MovieContextType {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    toggleLike: (id: string) => void;
}


const MovieContext = createContext<MovieContextType | undefined>(undefined);



export function MovieProvider({ children }: { children: ReactNode }) {

    const [movies, setMovies] = useState<Movie[]>([]);



    function toggleLike(id: string) {

    setMovies(prevMovies => {

        const updatedMovies = prevMovies.map(movie =>
            movie.id === id
                ? {
                    ...movie,
                    liked: !movie.liked
                }
                : movie
        );


        const likedIds = updatedMovies
            .filter(movie => movie.liked)
            .map(movie => movie.id);


        localStorage.setItem(
            "likedMovies",
            JSON.stringify(likedIds)
        );


        return updatedMovies;
    });
}



    return (
        <MovieContext.Provider
            value={{
                movies,
                setMovies,
                toggleLike
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}



export function useMovies() {

    const context = useContext(MovieContext);


    if (!context) {
        throw new Error(
            "useMovies must be used inside MovieProvider"
        );
    }


    return context;
}