import React, { useContext, useRef, useEffect, useState, useCallback } from "react"
import searchContext from "../Search/context"
import { searchMoviesBy } from "../../api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import SearchResults from "../SearchResults"

const Search = () => {
    const context = useContext(searchContext)
    const [movies, setMovies] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const fetchData = useCallback(async () => {
        return await searchMoviesBy(context.searchInput, null).then(response => {

            setMovies(response.results)
            //setPage(response.data.page)
            //setTotalPages(response.data.total_pages)

        })

    }, [context]);

    const loadMoreMovies = (text) => {
        queryNextBatch(text, page)
    }

    const queryNextBatch = async (text, page) => {

        let nextPage = page + 1

        return await searchMoviesBy(text, nextPage).then(response => {

            if (movies) {

                let loadedMovies = movies.concat(response.results)

                setMovies(loadedMovies)
                //setPage(response.data.page)
            }

        })

    }


    useEffect(() => {

        fetchData()

        return () => setMovies(null)
    }, [fetchData])

    const renderPosters = (data) => {

        return data.map((item, index) => {

            if (item.poster_path) return <div key={index}><img src={`${process.env.REACT_APP_IMAGE_BASE}w500/${item.poster_path}`} alt={"poster"} /></div>
            return null
            

        })
    }

    return (
        <div className="search-background">

            {movies ? (
                <React.Fragment>
                    {movies.length ? (
                        <React.Fragment>
                            <SearchResults mainTitle={`Results for "${context.searchInput}"`} data={movies} poster={false} />

                            {page < totalPages ? (
                                <div className="load-more" onClick={() => loadMoreMovies(context.searchInput)}>
                                    <span>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </span>

                                </div>) : null}

                        </React.Fragment>

                    ) : (<div className="not-found">No results :/ </div>)}
                </React.Fragment>
            ) : (
                    <div className="loading-content">
                        <div className="loading-circle"></div>
                        <span className="loading-name">LOADING...</span>
                    </div>

                )}

        </div>
    )
}

export default Search