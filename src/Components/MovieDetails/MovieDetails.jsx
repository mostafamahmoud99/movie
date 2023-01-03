import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
    const params = useParams();
    const [details, setDetails] = useState({});


    async function getDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=74052a12ed43d666ebfc2e802b1f07e2&language=en-US`);
        setDetails(data)
    }



    useEffect(() => {
        getDetails()

    }, []);



    return (
        <>

            {details ? <div key={details.id} className='col-md-8 d-flex my-5'>
                {details && <div className="row">
                    <div className="col-md-6">
                        <img src={'https://image.tmdb.org/t/p/w500/' + details.poster_path} className='w-75' alt="" />
                    </div>
                    <div className="col-md-6">
                        <div className="content my-2">
                            <p> Name : {details.original_title}</p>
                            <p> overview : {details.overview}</p>
                            {details.tagline ? <p>Description : {details.tagline}</p> : ''}
                            <p>Date : {details.release_date}</p>
                            <p>Vote : {details.vote_average}</p>
                            {details.production_countries ? <p> Country production : {details.production_countries[0].name} </p> : ''}
                            <p>Production companies : </p>
                            <ol>
                                {details.production_companies ? details.production_companies.map((m, index) => <li className='my-2' key={index}>{m.name}</li>) : ''}
                            </ol>

                        </div>
                    </div>
                </div>}
            </div> : ''}







        </>
    )
}



