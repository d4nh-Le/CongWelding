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
      label: 'Quality Welding Supplies for All Your Welding Needs!',
      image: SlideOne,
    },
    {
      label: 'Shop Our Bestsellers ',
      image: SlideTwo,
    },
    {
      label: 'Join Us Today',
      image: SlideThree,
    },
    {
      label: 'Enter the World of Welding',
      image: SlideFour,
    },
  ];

    const labelStyle = {
    fontSize: 30,
  };

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
