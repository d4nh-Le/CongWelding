import React from 'react';
import { Carousel } from 'antd';
import './slideshow.css';
import SlideOne from '../images/welding1.jpg';
import SlideTwo from '../images/welding2.jpg';
import SlideThree from '../images/welding3.jpg';
import SlideFour from '../images/welding4.jpg';

const SlideShow = () => {
  const slides = [
    {
      label: 'Slide One',
      image: SlideOne,
    },
    {
      label: 'Slide Two',
      image: SlideTwo,
    },
    {
      label: 'Slide Three',
      image: SlideThree,
    },
    {
      label: 'Slide Four',
      image: SlideFour,
    },
  ];

  return (
    <Carousel autoplay>
      {slides.map((slide) => (
        <div key={slide.label}>
          <img src={slide.image} alt={slide.label} />
          <div className="label">{slide.label}</div>
        </div>
      ))}
    </Carousel>
  );
};

export default SlideShow;
