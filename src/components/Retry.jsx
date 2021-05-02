import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
} from 'reactstrap';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom';

const Retry = ({ onReload, history }) => {
  return (
    <Container style={{ marginTop: '10vh', maxWidth: 'fit-content' }}>
      <Card body className="text-center">
        <CardBody>
          <CardTitle tag="h3" className="text-muted">
            Sorry, an unexpected error occured
          </CardTitle>
          <CardSubtitle style={{ padding: '1em' }} className="text-muted">
            <List>
              <ListItemText style={{ textAlign: 'left' }} primary="Try:" />
              <ListItemText
                style={{ textAlign: 'left', paddingLeft: '1em' }}
                secondary="Reloading the page"
              />
              <ListItemText
                style={{ textAlign: 'left', paddingLeft: '1em' }}
                secondary="Reaching out to the admin if the issue persists"
              />
            </List>
          </CardSubtitle>
          <Box m="1em" />
          <Button
            style={{ float: 'left' }}
            color="secondary"
            outline
            size="small"
            onClick={() => history.push('/')}
          >
            Go Home
          </Button>
          <Button
            style={{ float: 'right' }}
            color="success"
            size="small"
            onClick={onReload}
          >
            Reload
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

Retry.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Retry);
