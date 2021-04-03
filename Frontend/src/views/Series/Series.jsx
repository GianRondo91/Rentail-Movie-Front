import React, { useEffect, useState } from 'react';
import Movie from '../../components/Movie/Movie';
//import video from '../../video/videoplayback.mp4';
import Header from '../../components/Header/Header';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { } from '@fortawesome/free-solid-svg-icons';
import casaDePapel from '../../img/casa02.jpg';
import BasicPagination from '../../components/Pagination/Pagination';
import axios from 'axios';



const Series = (props) => {

   const [series, setSeries] = useState([]);
   const [favoritos, setFavoritos] = useState([]);
   const [query, setSearch] = useState("");

   //Constuccion de URL consultas TMDB

   let key = "ef2edc9da61e81787a8079a7df721936";
   let base_url = `http://api.themoviedb.org/3/movie/`;
   let language = "language=es-ES"
   let colectionSeries = 'https://api.themoviedb.org/3/tv/popular?api_key=ef2edc9da61e81787a8079a7df721936&language=en-US&page=1'

   useEffect(() => {

      //Ultimas Peliculas

      let Latest = `${base_url}now_playing?api_key=${key}&${language}&page=1`;
      let destacado = `${base_url}now_playing?api_key=${key}&${language}&page=2`;
      let populares = `${base_url}popular?api_key=${key}&${language}`;
      let recomendaciones = `${base_url}top_rated?api_key=${key}&${language}`

      //Populares

      fetch(colectionSeries)
         .then(res => (res.json()))
         .then(data => {
            console.log(data.results)
            setSeries(data.results)
         })

   }, []);

    // Busqueda de series por titulo
    let url_Base_series = 'https://api.themoviedb.org/3/search/tv?';
    let api_key = 'ef2edc9da61e81787a8079a7df721936';
    const [searchQuery, setSearchQuery] = useState("");
    const [seriesSearch, setSeriesSearch] = useState([]);
    const search = async (query) => {
      let resultSearch = await axios.get(`${url_Base_series}api_key=${api_key}&language=es&query=${query}`);
      setSearchQuery(query);
      console.log(resultSearch.data)
      return setSeriesSearch(resultSearch.data.results);
      
   }
   

   //Functions:

   let history = useHistory();

   if (!props.token) {
      history.push('/');
      return null;
   };

   const takeMeTo = (movie) => {

      localStorage.setItem('movie', JSON.stringify(movie));
      let LittleJson = JSON.parse(localStorage.getItem('movie'));
      console.log(LittleJson);

      history.push('/MovieProfile')
   }

   return (

      <div className='contenedor-padre-series'>

        < Header onSearch={search} />
         <div className="imagen-portada">
            <img className='portada' src={casaDePapel} alt="Casa de papel" />
         </div>
         <div className="separadorSeries"></div>
         <h2 className='series-title'>Resultado de la búsqueda {searchQuery}</h2>
            <div className="carousel-series">
               {seriesSearch.map(serie => <Movie style='uno' key={serie.id}  {...serie} onClick={() => takeMeTo(serie)} />)}
            </div>
         <div className="separadorSeries"></div>
         <div className="portada-series">
            {series.map(series => <Movie style='dos' key={series.id}  {...series} onClick={() => takeMeTo(series)} />)}
         </div>


      </div>

   )

}
const mapStateToProps =state =>{
   return{
     user : state.user,
     token : state.token
   }
 };
export default connect(mapStateToProps)(Series);
