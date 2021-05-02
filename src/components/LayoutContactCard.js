import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardHeader, CardBody, CardTitle } from 'reactstrap';

import Message from './Message';

const LayoutContactCard = () => {
  return (
    <Card>
      <CardHeader
        style={{
          backgroundColor: '#28a745',
          color: 'white',
        }}
      >
        Call us at +91-97009 74490
      </CardHeader>
      <Message token="token" />
    </Card>
  );
};

export default LayoutContactCard;
