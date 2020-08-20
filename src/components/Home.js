import React from 'react';
import { InfoAlert } from '../utilities/CustomAlerts';
import { Card, Jumbotron, Container } from 'reactstrap';
import '../styles/App.scss';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <>
      <Jumbotron style={{ margin: '0.5em', borderRadius: '.25em' }} fluid>
        <Container>
          {/* <Card
            className="xs-auto"
            style={{ margin: '0.5em', opacity: '1' }}
            top
            body
            width="100%"
          > */}
          <img
            src={logo}
            class="rounded mx-auto d-block"
            style={{ width: '4em', height: '4em' }}
          />
          {/* </Card> */}
        </Container>
      </Jumbotron>
      <div className="bg-home-image" />
    </>
  );
};

export default Home;
