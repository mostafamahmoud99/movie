import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../MoviesContext'


export default function Tv() {
  const { trendingTv } = useContext(MoviesContext);
  console.log(trendingTv)
  return (
    <>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brder w-25 my-3"></div>
            <h2>Trending Series<br />to watch<br /> Now</h2>
            <p className='text-muted'>Watch Series Right Now</p>
            <div className="brder my-3"></div>
          </div>
        </div>
        {trendingTv ? trendingTv.map((tv) => (
          <div key={tv.id} className='col-md-2'>
            <div className="content text-center">
              <Link to={`${tv.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500/' + tv.poster_path} className='w-100' alt={tv.title} />
              </Link>

              <h3 className='h5 my-3'>{tv.original_name}</h3>
            </div>
          </div>
        )) : ''}
      </div>
    </>
  )
}
