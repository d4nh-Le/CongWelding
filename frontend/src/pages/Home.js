import React from 'react';
import FeaturedItems from '../components/featureditems';
import SlideShow from '../components/slideshow';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <SlideShow />
      <FeaturedItems />
    </div>
  );
}

export default Home;
