import React, { useState, useEffect } from 'react';
import DirectionsIcon from '@material-ui/icons/Directions';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import { connect } from 'react-redux';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardGroup,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import axios from 'axios';

import location from '../assets/office-location.png';
import { log, error } from '../utilities/Logger';

const Visit = () => {
  return (
    <Card style={{ maxWidth: '700px' }}>
      <CardBody>
        <CardTitle className="font-weight-bold">Visit us</CardTitle>
        <CardImg
          style={{ borderRadius: '.5em' }}
          src={location}
          alt="SSK Avenues map"
        />
        <CardTitle style={{ marginTop: '.95em' }}>
          SSK Avenues Pvt. Ltd
        </CardTitle>
        <CardTitle style={{ fontSize: 'small' }}>
          <RoomIcon
            style={{
              color: 'grey',
              height: '.75em',
              width: '.75em',
            }}
          />
          Hanuman Nagar Rd, Shivapuri Colony, Hanuman Nagar, Shirdi Sai Nagar,
          Manikonda, Hyderabad, Telangana 500089.
        </CardTitle>
        <CardTitle style={{ fontSize: 'small' }}>
          <PhoneIcon
            style={{
              color: 'grey',
              height: '.75em',
              width: '.75em',
            }}
          />
          +91-97009 74490
        </CardTitle>
        <CardTitle>
          <a target="_blank" href="https://goo.gl/maps/DjB7Ccbn7Pe5morh6">
            <DirectionsIcon
              style={{
                color: 'grey',
                height: '.75em',
                width: '.75em',
              }}
            />
            Get directions
          </a>
        </CardTitle>
      </CardBody>
    </Card>
  );
};

export default Visit;
