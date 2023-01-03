import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PeopleDetails() {
  const params = useParams();
  const [details, setDetails] = useState({})

  async function getDetails(){
      let {data} = await axios.get(`https://api.themoviedb.org/3/person/${params.id}?api_key=74052a12ed43d666ebfc2e802b1f07e2&language=en-US`)
      setDetails(data)
  }

  useEffect(() => { 
      getDetails()
   }, []);
  return (
    <>
      {details ? <div key={details.id} className='col-md-10 d-flex my-5'>
        {details && <div className="row">
          <div className="col-md-6">
            <img src={'https://image.tmdb.org/t/p/w500/' + details.profile_path} className='w-75' alt="" />
          </div>
          <div className="col-md-6">
            <div className="content my-2">
              <p> Name : {details.name}</p>
              <p> overview :{details.biography}</p>
              
              <p>Birthday : {details.birthday}</p>
              <p>Place of Birth : {details.place_of_birth}</p>
            </div>
          </div>
        </div>}
      </div> : ''}
    </>
  )
}
