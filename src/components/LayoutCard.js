import React from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  ButtonGroup,
  Container,
} from 'reactstrap';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RoomIcon from '@material-ui/icons/Room';
import { withRouter } from 'react-router-dom';

import {
  LikeButton,
  UnlikeButton,
  InfoButton,
  DeleteButton,
} from '../utilities/CustomIcons';
import calColor from '../utilities/ColorRatio';

const LayoutCard = ({ isAuthenticated, role, deleteLayoutCard, ...props }) => {
  const color = calColor(props.availablePlots, props.totalPlots);

  const layoutCardInfoHandler = (id) => {
    props.history.push(`/realestate/layouts/${id}`);
  };

  const layoutCardSaveHandler = () => {
    console.log('save click'); // todo
  };

  const isSaved = false;
  const saveButton = isSaved ? <LikeButton /> : <UnlikeButton />;
  return (
    <Card>
      <a href={`/api/images/${props.images[0]}`} target="_blank">
        <CardImg
          top
          style={{ cursor: 'pointer' }}
          src={`/api/images/${props.images[0]}`}
          alt="Layout image"
        />
      </a>
      <CardBody>
        <CardTitle
          onClick={() => layoutCardInfoHandler(props._id)}
          tag="h4"
          style={{ fontWeight: 'bold', cursor: 'pointer' }}
        >
          {props.title}
        </CardTitle>
        <CardSubtitle
          style={{
            fontSize: 'small',
            fontWeight: 'bold',
            marginBottom: '.5em',
          }}
        >
          <FiberManualRecordIcon
            style={{
              color: color,
              height: '.75em',
              width: '.75em',
              paddingBottom: '.15em',
            }}
          />
          {'Avaiable lots: ' + props.availablePlots + ' of ' + props.totalPlots}
        </CardSubtitle>
        {props.address && (
          <CardSubtitle className="text-muted" style={{ fontSize: 'small' }}>
            <RoomIcon
              style={{
                color: 'grey',
                height: '.75em',
                width: '.75em',
                paddingBottom: '.15em',
              }}
            />
            {props.address}
          </CardSubtitle>
        )}
        <hr
          style={{
            color: 'grey',
          }}
        />
        <CardText className="text-muted">{props.description}</CardText>
        <Container style={{ display: 'flex' }}>
          <ButtonGroup size="sm">
            {isAuthenticated && saveButton}
            <InfoButton
              style={{ cursor: 'pointer' }}
              onClick={() => layoutCardInfoHandler(props._id)}
            />
          </ButtonGroup>
          {role?.includes('ADMIN') && (
            <ButtonGroup className="ml-auto">
              <DeleteButton onClick={() => deleteLayoutCard(props._id)} />
            </ButtonGroup>
          )}
        </Container>
      </CardBody>
    </Card>
  );
};

export default withRouter(LayoutCard);
