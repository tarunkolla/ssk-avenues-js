import React from 'react';
import { InfoAlert } from '../utilities/CustomAlerts';
import { Card, Jumbotron, Container } from 'reactstrap';
import '../styles/App.scss';
import logo from '../assets/old-logo.jpg';

const Home = () => {
  return (
    <>
      <div className="fg-home-page">
        <img
          src={logo}
          className="mx-auto d-block "
          style={{ height: '5em', marginTop: '10em' }}
        />
        <h5 className=" my-3 align-middle text-center fg-home-page-title">
          Quality is Never Out of Style
        </h5>
      </div>
      <Jumbotron
        style={{
          height: '89vh',
          margin: '0.5em',
          borderRadius: '.25em',
          opacity: '.65',
        }}
        fluid
      ></Jumbotron>
      <div className="bg-home-image" />
    </>
  );
};

export default Home;
