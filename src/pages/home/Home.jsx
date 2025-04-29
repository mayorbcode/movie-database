import './Home.css'
import NavMenu from './nav/NavMenu'
import MovieCarousel from './movie-carousel/MovieCarousel'
import Search from './search/Search'
import { Movies } from './movies/Movies'
import { useState, useEffect } from 'react'
import moviePng from '../../assets/movie.png'
import Spinner from 'react-bootstrap/Spinner'
import { API_BASE_URL, API_OPTIONS } from '../../../api'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [latestMovies, setLatestMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState(null);

  const fetchMovies = async() => {
    try {
      setIsLoading(true);

      const url = searchTerm ?
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`
      :
      `${API_BASE_URL}/discover/movie?primary_release_date.desc`;

      const response = await fetch(url, {
        ...API_OPTIONS,
      })

      if (!response?.ok) {
        throw new Error('Failed');
      }

      const data = await response.json();

      setMovies(data?.results || []);

      if (latestMovies.length) return;
      
      setLatestMovies(data.results.slice(0, 10))
      
    } catch (error) {
      setError("Error Fetching Movies")
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  const fetchConfig = async() => {
    try {
      const url = API_BASE_URL + "/configuration"
      const response = await fetch(url, { ...API_OPTIONS })

      const data = await response.json()

      setConfig(data);
    } catch(error) {
      console.error(error)
    };
  }

  const getImageUrl = (movie, size = "w500") => {
    if (!config?.images?.base_url || !movie?.poster_path) return moviePng;

    return config?.images?.base_url + size + movie.poster_path
  }
  
  useEffect(() => {
    fetchMovies();

    if (config) return;

    fetchConfig();
  }, [searchTerm])


  return (
    <div className='home'>
     <NavMenu />
     {
      (isLoading && !latestMovies?.length) ?
      <div className="spinner-wrapper">
        <Spinner className="spinner"/>
      </div>
      :
      <>
        <MovieCarousel getImage={getImageUrl} config={config} movies={ latestMovies } />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <Movies getImage={getImageUrl} movies={ movies } loading={isLoading} />
      </>
     }
    </div>
  )
}

export default Home