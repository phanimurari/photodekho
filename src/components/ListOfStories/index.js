import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
        infinite: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 7,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 6,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 5,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
  ],
}

const ListOfStories = props => {
  const {storiesList, altText} = props

  return (
    <ul style={{width: '80%'}}>
      <Slider {...settings}>
        {storiesList.map(story => {
          const {id, image} = story
          return (
            <li className="react-slick-item" key={id}>
              <img
                className="poster"
                src={image}
                width="100%"
                height="100%"
                alt={altText}
              />
            </li>
          )
        })}
      </Slider>
    </ul>
  )
}

export default ListOfStories
