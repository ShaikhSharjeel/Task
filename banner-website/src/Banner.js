import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Banner = () => {
  const [bannerData, setBannerData] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        setBannerData(response.data);
        setTimeLeft(response.data.timer);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setBannerData({ ...bannerData, visible: false });
    }
  }, [timeLeft]);

  if (!bannerData.visible) return null;

  return (
    <div className="banner">
      <h1><i className="fas fa-bullhorn"></i> {bannerData.description}</h1>
      <p><i className="fas fa-clock"></i> Time remaining: {timeLeft} seconds</p>
      <a href={bannerData.link}><i className="fas fa-external-link-alt"></i> Click Here</a>
    </div>
  );
};

export default Banner;
