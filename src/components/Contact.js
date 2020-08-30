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

const Contact = ({ token }) => {
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
  //"proxy": "http://13.58.97.132:5000/",
  return (
    <Container style={{ marginTop: '4em' }}>
      <CardGroup className="mx-auto">
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
              Hanuman Nagar Rd, Shivapuri Colony, Hanuman Nagar, Shirdi Sai
              Nagar, Manikonda, Hyderabad, Telangana 500089.
            </CardTitle>
            <CardTitle style={{ fontSize: 'small' }}>
              <PhoneIcon
                style={{
                  color: 'grey',
                  height: '.75em',
                  width: '.75em',
                }}
              />
              +91 9700 9744 90
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
        <Card style={{ maxWidth: '700px' }}>
          <CardBody>
            <CardTitle className="font-weight-bold">
              Send us a message
            </CardTitle>
            <Form onSubmit={onSubmit}>
              <FormGroup className="mt-2 mb-2 mr-sm-2 mb-sm-0">
                <Row form>
                  <Col>
                    <Label for="name" className="mr-sm-2">
                      Name
                    </Label>
                    <Input
                      type="name"
                      name="name"
                      id="name"
                      onChange={onChange}
                    />
                  </Col>
                  <Col>
                    <Label for="phone" className="mr-sm-2">
                      Phone
                    </Label>
                    <Input
                      type="tel"
                      name="phone"
                      id="phone"
                      onChange={onChange}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <Label for="email" className="mr-sm-2">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      onChange={onChange}
                    />
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
        </Card>
      </CardGroup>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Contact);
