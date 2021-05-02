import React, { useState, useEffect } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  ButtonGroup,
  Row,
  Col,
  CardBody,
  Badge,
  Container,
  CardSubtitle,
} from 'reactstrap';

import getStatus from '../utilities/PlotStatus';
import {
  LikeButton,
  UnlikeButton,
  EditButton,
  DeleteButton,
} from '../utilities/CustomIcons';
import EditPlotModal from './EditPlotModal';

const PlotCardView = ({ status, plotNumber, area, units }) => {
  return (
    <Card>
      <CardBody className="text-muted">
        <CardTitle style={{ margin: '0' }}>Plot #{plotNumber}</CardTitle>
        <CardSubtitle
          style={{ whiteSpace: 'nowrap', fontSize: 'small', margin: '0' }}
        >
          {`Area: ${area}${units}`}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default PlotCardView;

// button icons etc.
// spinner for save icon on axios call
//this is a mess
