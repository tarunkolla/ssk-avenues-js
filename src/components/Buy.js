import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './Layout';
import AdBar from './AdBar';

const BuyView = (props) => {
  console.log(props);
  return (
    <div>
      <AdBar></AdBar>
      <Layout
        role={props.auth.user}
        isAuthenticated={props.auth.isAuthenticated}
        token={props.auth.token}
      />
    </div>
  );
};

const propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      role: PropTypes.oneOf(['PUBLIC', 'USER', 'AGENT', 'ADMIN', 'STAFF']),
    }),
  }),
};

const defaultProps = { auth: { user: { role: 'PUBLIC' } } };

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

BuyView.protoTypes = propTypes;
BuyView.defaultProps = defaultProps;

export default connect(mapStateToProps)(BuyView); // may not need auth here
