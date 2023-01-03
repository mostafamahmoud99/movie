import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../MoviesContext'

export default function Movies() {
  const { trendingMovie } = useContext(MoviesContext);

  return (
    <>
      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brder w-25 my-3"></div>
            <h2>Trending Movies<br />to watch<br /> Now</h2>
            <p className='text-muted'>Watch Movies Right Now</p>
            <div className="brder my-3"></div>
          </div>
        </div>
        {trendingMovie ? trendingMovie.map((movie) => (
          <div key={movie.id} className='col-md-2'>
            <div className="content text-center">
              <Link to={`${movie.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} className='w-100' alt={movie.title} />
              </Link>
              <h3 className='h5 my-3'>{movie.original_title}</h3>
            </div>
          </div>
        )) : ''}
      </div>
    </>
  )
}
