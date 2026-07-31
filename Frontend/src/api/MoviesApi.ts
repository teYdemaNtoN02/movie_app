import type { Movie } from "../types/Movie";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

interface OMDBSearchMovie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

interface OMDBResponse {
    Search?: OMDBSearchMovie[];
    Response: string;
}


export async function getPopularMovies(): Promise<Movie[]> {

    const movies: Movie[] = [];

    const searches = [
        "marvel",
        "star",
        "love",
        "war",
        "the"
    ];

    for (const query of searches) {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`
        );

        if (!response.ok) {
            throw new Error("Nie udało się pobrać filmów");
        }

        const data: OMDBResponse = await response.json();


        if (data.Search) {
            const formattedMovies: Movie[] = data.Search.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                release_date: movie.Year,
                poster_path: movie.Poster,
                liked: false
            }));

            console.log("FORMATTED", formattedMovies);

            movies.push(...formattedMovies);
        }
    }

    // usuwanie duplikatów po imdbID
    const uniqueMovies = Array.from(
        new Map(movies.map(movie => [movie.id, movie])).values()
    );

    return uniqueMovies.slice(0, 30);
}

export async function getMovieDetails(id: string) {

    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );


    if (!response.ok) {
        throw new Error("Nie udało się pobrać szczegółów filmu");
    }


    const data = await response.json();

    return data;
}