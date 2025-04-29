import './Movies.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import noData from '../../../assets/no-data.jpg'
import { useNavigate } from 'react-router-dom';

export const Movies = ({ getImage, movies, loading }) => {
  const navigate = useNavigate();

  const navigateToMovie = (id) => {
    navigate(`/${id}`)
  }

  return (
    <div className='movies'>

      {
      (!movies?.length && !loading) ?
      <div className="empty">
        <img className="no-data-image" src={noData} alt="no data" />
      </div>
      :
      movies.map(movie => {
        return (
          <Card key={movie.id} className="movie" onClick={() => navigateToMovie(movie.id)}>
            {
              movie?.poster_path ?
              <Card.Img variant="top" className='image' src={getImage(movie, 'w342')}/>
              :
              <div className='replacement-image'><h1>No Image Available</h1></div>
            }
            <Card.Body className='body'>
              <Card.Title>{ movie.title }</Card.Title>
              <Card.Text className='description'>
                { movie.overview }
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}
