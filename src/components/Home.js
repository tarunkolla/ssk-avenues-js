import React from 'react';
import { Jumbotron } from 'reactstrap';

import logo from '../assets/old-logo.jpg';

import '../styles/Home.scss';

const Home = () => {
  return (
    <>
      <div className="fg-home-page">
        <img
          src={logo}
          className="mx-auto d-block "
          style={{ height: '5em', marginTop: '10em' }}
        />
        <h5 className=" my-3 text-center fg-home-page-title">
          Quality is Never Out of Style
        </h5>
      </div>
      <Jumbotron className="mx-3 my-3 bg-container"></Jumbotron>
    </>
  );
};

export default Home;
