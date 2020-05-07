import React, {useState} from 'react';
import styles from './List.module.css';

import Movie from './Movie/Movie';

const list = () => {
    const [movieList, changeMovieList] = useState({
        movies: [
            {
                id: 1,
                title: "Parasite",
                poster: "https://resizing.flixster.com/LJFXocV5Zr5vkVQjLyIyikgk4bE=/fit-in/200x296.2962962962963/v1.bTsxMzIyNDEwMjtqOzE4NDY4OzEyMDA7MjQwMDszNTU2",
                link: "https://www.rottentomatoes.com/m/parasite_2019",
            },
            {
                id: 2,
                title: "Us",
                poster: "https://resizing.flixster.com/iutYrePUPIK-BGTPEiJaq6m7WtU=/fit-in/200x296.2962962962963/v1.bTsxMzAyNTI3OTtqOzE4NDY1OzEyMDA7MzYwMDs1NzAw",
                link: "https://www.rottentomatoes.com/m/us_2019",
            },
            {
                id: 3,
                title: "The Irishman",
                poster: "https://resizing.flixster.com/qsSjUKbnz8Q8tsCsRNNIdZOy6ow=/fit-in/200x296.2962962962963/v1.bTsxMzE4OTE2NTtqOzE4NDY3OzEyMDA7MjAwMDsyOTI5",
                link: "https://www.rottentomatoes.com/m/the_irishman",
            },
            {
                id: 4,
                title: "Once upon a time in Hollywood",
                poster: "https://resizing.flixster.com/t96CzGm_bNkIXASer-CyKhXlOyU=/fit-in/200x296.2962962962963/v1.bTsxMzEwMTEzNDtqOzE4NDY2OzEyMDA7MTY5OzI1MA",
                link: "https://www.rottentomatoes.com/m/once_upon_a_time_in_hollywood",
            },
            {
                id: 5,
                title: "The Lighthouse",
                poster: "https://resizing.flixster.com/SIT_xXqbyjJ-TWZa8Pq4dT8SSeA=/fit-in/200x296.2962962962963/v1.bTsxMzE4MDM2NDtqOzE4NDY3OzEyMDA7NDA1MDs2MDAw",
                link: "https://www.rottentomatoes.com/m/the_lighthouse_2019",
            },
        ]
    })
    return(
        <div className={styles.List}>
            {movieList.movies.map(movie => {
                return <Movie key={movie.id} title={movie.title} poster={movie.poster} link={movie.link}/>
            })}
        </div>
    )
}

export default list