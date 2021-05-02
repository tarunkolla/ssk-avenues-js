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

const Message = ({ token }) => {
  const [formData, updateFormData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    e.preventDefault();
    axios
      .post(`/api/smtp`, JSON.stringify(formData), config)
      .then((res) => {
        log('Mail sent succesfully');
        setErrorMessage('');
      })
      .catch((err) => {
        error(err);
        setErrorMessage(err.message);
      });
  };

  return (
    <CardBody>
      <CardTitle className="font-weight-bold">Send us a message</CardTitle>
      <Form onSubmit={onSubmit}>
        <FormGroup className="mt-2 mb-2 mr-sm-2 mb-sm-0">
          <Row form>
            <Col>
              <Label for="name" className="mr-sm-2">
                Name
              </Label>
              <Input type="name" name="name" id="name" onChange={onChange} />
            </Col>
            <Col>
              <Label for="phone" className="mr-sm-2">
                Phone
              </Label>
              <Input type="tel" name="phone" id="phone" onChange={onChange} />
            </Col>
          </Row>
          <Row form>
            <Col>
              <Label for="email" className="mr-sm-2">
                Email
              </Label>
              <Input type="email" name="email" id="email" onChange={onChange} />
            </Col>
            <Col>
              <Label for="address" className="mr-sm-2">
                Address
              </Label>
              <Input
                type="text"
                name="address"
                id="address"
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row form>
            <Col>
              <Label for="message" className="mr-sm-2">
                Message
              </Label>
              <Input
                rows="6"
                type="textarea"
                name="message"
                id="message"
                onChange={onChange}
              />
            </Col>
          </Row>
          <Button className="mt-4" outline color="success">
            Send Message
          </Button>
        </FormGroup>
      </Form>
    </CardBody>
  );
};

export default Message;
