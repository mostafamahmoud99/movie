import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let MoviesContext = createContext([]);

export function MoviesContextProvider(props) {
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  async function getData(mediaType,callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=74052a12ed43d666ebfc2e802b1f07e2`);
    callback(data.results.slice(0,10))
  }
  useEffect(()=>{
    getData('movie',setTrendingMovie);
    getData('tv',setTrendingTv);
    getData('person',setTrendingPeople);
  },[]);



  return (
    <MoviesContext.Provider value={{trendingMovie,trendingTv,trendingPeople}}>
        {props.children}
    </MoviesContext.Provider>
  );
}
