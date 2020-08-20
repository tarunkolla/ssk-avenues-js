import React from 'react';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import calColor from '../utilities/ColorRatio';
import RoomIcon from '@material-ui/icons/Room';
import { withRouter } from 'react-router-dom';
import { LikeButton, UnlikeButton, InfoButton } from '../utilities/CustomIcons';

const LayoutCard = ({ isAuthenticated, ...props }) => {
  const color = calColor(props.availablePlots, props.totalPlots);

  const layoutCardInfoHandler = (props) => {
    props.history.push(`/buy/layouts/${props._id}`);
  };

  const layoutCardSaveHandler = () => {
    console.log('save click');
  };

  const isSaved = false;
  const saveButton = isSaved ? <LikeButton /> : <UnlikeButton />;
  return (
    <Card>
      <CardImg
        top
        width="100%"
        src="/assets/318x180.svg"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle
          onClick={() => layoutCardInfoHandler(props)}
          tag="h4"
          style={{ fontWeight: 'bold' }}
        >
          {props.title}
        </CardTitle>
        <CardSubtitle style={{ fontSize: 'small', fontWeight: 'bold' }}>
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
        <ButtonGroup size="sm">
          {isAuthenticated && saveButton}
          <InfoButton onClick={() => layoutCardInfoHandler(props)} />
        </ButtonGroup>
      </CardBody>
    </Card>
  );
};

export default withRouter(LayoutCard);
