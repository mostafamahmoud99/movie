import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MoviesContext } from '../../MoviesContext'

export default function Person() {

  const { trendingPeople } = useContext(MoviesContext);



  return (
    <>
      <div className="row py-3">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brder w-25 my-3"></div>
            <h2>Trending People<br />In The <br /> World</h2>
            <p className='text-muted'>The Most Famous People Now</p>
            <div className="brder my-3"></div>
          </div>
        </div>
        {trendingPeople ? trendingPeople.map((person) => (
          <div key={person.id} className='col-md-2'>
            <div className="content text-center">
              <Link to={`${person.id}`}>
                <img src={'https://image.tmdb.org/t/p/w500/' + person.profile_path} className='w-100' alt={person.title} />
              </Link>
              <h3 className='h5 my-3'>{person.original_name}</h3>
            </div>
          </div>
        )) : ''}
      </div>
    </>
  )
}
