import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardGroup, Container } from 'reactstrap';
import axios from 'axios';

import { log, error } from '../utilities/Logger';
import Visit from './Visit';
import Message from './Message';

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

  return (
    <Container className="my-3">
      <CardGroup className="mx-auto">
        <Visit />
        <Card style={{ maxWidth: '700px' }}>
          <Message token={token} />
        </Card>
      </CardGroup>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Contact);
