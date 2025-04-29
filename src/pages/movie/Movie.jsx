import { useEffect, useState } from 'react'
import './Movie.css'
import { useLocation } from 'react-router-dom';
import { API_BASE_URL, API_OPTIONS } from '../../../api';
import NavMenu from '../home/nav/NavMenu';
import { Spinner, Image, Card } from 'react-bootstrap';
import blackBackground from '../../assets/black-background.jpg';

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchConfig();
    fetchMovie();
    fetchMovieCredits();
  }, [])

  const fetchMovie = async() => {
    try {
      setLoading(true);

      const movieId = location.pathname.substring(1);

      const url = `${API_BASE_URL}/movie/${movieId}`;
      const response = await fetch(url, {...API_OPTIONS});

      if (!response?.ok) {
        throw new Error('Failed');
      }

      const data = await response.json();

      setMovie(data);

    } catch(error) {
      console.error(error)
    } finally {
      setLoading(false)
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

  const fetchMovieCredits = async() => {
    try {
      setLoading(true);

      const movieId = location.pathname.substring(1);

      const url = `${API_BASE_URL}/movie/${movieId}/credits`;
      const response = await fetch(url, {...API_OPTIONS});

      if (!response?.ok) {
        throw new Error('Failed');
      }

      const data = await response.json();

      setCredits(data);

    } catch(error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (size = "w500", path='poster_path') => {
    if (!config?.images?.base_url || !movie?.[path]) return null;
    return config?.images?.base_url + size + movie[path]
  }

  const getCastImage = (cast, size = "w342") => {
    if (!config?.images?.base_url || !cast?.profile_path) return null;
    return config?.images?.base_url + size + cast.profile_path
  }

  return (
    
    <div className='movie'>
      <NavMenu />
      {loading ?
      <div className="spinner-wrapper">
        <Spinner className="spinner"/>
      </div>
      :
      !movie?
      <></>
      :
      <div 
        className="details"
        style={{
          backgroundImage: `url(${getImageUrl('original', 'backdrop_path')}), url(${blackBackground})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="movie-box">
          {
            !movie?.poster_path ?
            <div className="dummy-image"></div>
            :
            <Image src={getImageUrl('w342')} alt="movie poster"/>
          }
          <div className="info">
            <h1 className='title'>{movie?.title}</h1>
            <p className='description'>{movie?.overview}</p>
            <span className="genres">
              <h1 className="genre-title">Genres:</h1>
            {
              movie.genres.map((genre) => {
                return (
                  <p key={genre.id} className="genre">{genre.name}</p>
                )
              })
            }
            </span>
            <span className="rating">Rating: {movie.vote_average}</span>
            <span className="duration">Duration: {movie.runtime} minutes</span>
          </div>
        </div>
      </div>
      }
      <h1 className='cast-title'>Cast</h1>
      {
      credits?.cast?.length &&
      <div className="cast-wrapper">
        {
          credits.cast.map(actor => {
            return (
              <Card key={actor.cast_id} className="cast">
                {
                  actor?.profile_path ?
                  <Card.Img variant="top" className='image' src={getCastImage(actor, 'w342')}/>
                  :
                  <div className='replacement-cast-image'><h1>No Image Available</h1></div>
                }
                <Card.Body className='body'>
                  <Card.Title>{ actor.name }</Card.Title>
                  <Card.Text className='description'>
                    { actor.character }
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })
        }
      </div>

      }
    </div>
  )
}

export default Movie