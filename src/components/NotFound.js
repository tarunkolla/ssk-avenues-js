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
import { withRouter } from 'react-router-dom';

const NotFound = ({ history }) => (
  <Container style={{ marginTop: '10vh', maxWidth: 'fit-content' }}>
    <Card body className="text-center">
      <CardBody>
        <CardTitle tag="h3" className="text-muted">
          Error #404
        </CardTitle>
        <CardSubtitle className="text-muted">
          Oops! Page not found.
        </CardSubtitle>
        <Button color="link" size="small" onClick={() => history.push('/')}>
          Go Home
        </Button>
      </CardBody>
    </Card>
  </Container>
);

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(NotFound);
