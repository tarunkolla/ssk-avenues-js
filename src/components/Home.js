import React from 'react';
import { InfoAlert } from '../utilities/CustomAlerts';
import { Card, Jumbotron, Container } from 'reactstrap';
import '../styles/App.scss';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <>
      <Container>
        {/* <img
          src={logo}
          className="rounded mx-auto d-block"
          style={{ width: '4em', height: '4em' }}
        /> */}
      </Container>
      <Jumbotron
        style={{
          height: '90vh',
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
