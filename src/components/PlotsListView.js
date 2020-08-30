import React, { useState, useEffect } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  ButtonGroup,
  Row,
  Col,
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

const PlotItem = ({
  isAuthenticated,
  role,
  hasEditPrev,
  getPlots,
  deletePlot,
  ...props
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isEditInView, setIsEditInView] = useState(false);

  const convertUTCDateToLocalDate = (lastUpdated) => {
    const date = new Date(lastUpdated);
    const newDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return `${newDate.toLocaleDateString(undefined, {
      day: 'numeric',
    })}/${newDate.toLocaleDateString(undefined, {
      month: 'numeric',
    })}, ${newDate.toLocaleTimeString([], { timeStyle: 'short' })}`;
  };

  const saveButton = isSaved ? <LikeButton /> : <UnlikeButton />;

  const handleEdit = () => {
    setIsEditInView(!isEditInView);
  };

  return (
    <div style={{ paddingBottom: '1em' }}>
      <EditPlotModal
        isModalOpen={isEditInView}
        setIsModalOpen={setIsEditInView}
        closeModal={handleEdit}
        plotId={props._id}
        token={props.token}
        status={props.status}
        plotNumber={props.plotNumber}
        area={props.area}
        type={props.type}
        description={props.description}
        getPlots={getPlots}
      />
      <Card
        style={{
          maxWidth: '750px',
        }}
        body
        outline
        color={getStatus(props.status)}
        className="mx-auto text-muted"
      >
        <CardTitle style={{ marginBottom: '0' }}>
          <Row tag="h6">
            <Col align="left">
              Plot #<b>{props.plotNumber}</b>
            </Col>
            <Col xs="auto" align="right">
              <Badge color={getStatus(props.status)}>{props.status}</Badge>
            </Col>
          </Row>
        </CardTitle>
        <CardSubtitle>
          <Row>
            <Col style={{ fontSize: 'small', margin: '0' }}>
              {props.area ? (
                <p align="left" style={{ margin: '0' }}>
                  Type: <b>{props.type}</b> | Area: <b>{props.area}</b>
                </p>
              ) : (
                <p align="left" style={{ margin: '0' }}>
                  Type: <b>{props.type}</b>
                </p>
              )}
              <p align="left" style={{ margin: '0' }}>
                Updated: <b>{convertUTCDateToLocalDate(props.lastUpdated)}</b>
              </p>
            </Col>
            <Col xs="auto" align="right" style={{ paddingTop: '.25em' }}>
              <ButtonGroup>
                {isAuthenticated && saveButton}
                {hasEditPrev && <EditButton onClick={handleEdit} />}
                {hasEditPrev && (
                  <ButtonGroup>
                    <DeleteButton onClick={() => deletePlot(props._id)} />
                  </ButtonGroup>
                )}
              </ButtonGroup>
            </Col>
          </Row>
          {props.description && (
            <Row>
              <Col style={{ fontSize: 'small', margin: '0' }}>
                <p align="left" style={{ margin: '0' }}>
                  Description: {props.description}
                </p>
              </Col>
            </Row>
          )}
        </CardSubtitle>
      </Card>
    </div>
  );
};

const PlotsListView = ({
  isAuthenticated,
  role,
  plots,
  token,
  getPlots,
  hasEditPrev,
  deletePlot,
}) => {
  return (
    <Container>
      {plots.map((plot) => (
        <PlotItem
          {...plot}
          key={plot._id}
          role={role}
          isAuthenticated={isAuthenticated}
          hasEditPrev={hasEditPrev}
          token={token}
          getPlots={getPlots}
          deletePlot={deletePlot}
        />
      ))}
    </Container>
  );
};

export default PlotsListView;

// button icons etc.
// spinner for save icon on axios call
//this is a mess
