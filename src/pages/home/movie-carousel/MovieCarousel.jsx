import './MovieCarousel.css';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import { useState } from 'react';

const MovieCarousel = ({ getImage, config, movies }) => {
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-wrapper">
    {
      movies && config ?
      <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
      {
        movies.map(movie => {
          return (
            <Carousel.Item className="carousel-item" key={ movie.id }>
              {
                movie?.poster_path ?
                <Image className="image" src={getImage(movie, 'w500')} />
                :
                <div className='carousel-replacement-image'><h1>No Image Available</h1></div>
              }
              <Carousel.Caption>
                <h3>{ movie.title }</h3>
                <p>{ movie.overview }</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
      :

      <div></div>
    }
     
    </div>
  )
}

export default MovieCarousel