import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { error, log } from '../utilities/Logger';
import Loading from './Loading';
import NotFound from './NotFound';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LayoutCardView from './LayoutCardView';

const LayoutOverview = (props) => {
  const [layoutPlots, setLayoutPlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [hasEditPrev, setHasEditPrev] = useState(false);

  // const getLayout = useCallback(() => {
  //   axios({
  //     method: 'GET',
  //     url: `/api/layouts/${props.match.params.id}`,
  //   })
  //     .then((res) => {
  //       setLayoutPlots(res.data);
  //       log('Layouts retrived succesfully');
  //     })
  //     .then(() => {
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       error(err);
  //       setIsLoading(false);
  //       setIsNotFound(true);
  //     });
  // }, [props.match.params.id]);

  // useEffect(() => {
  //   getLayout();
  // }, [getLayout, props.auth.isAuthenticated]);

  // const deletePlot = (plotId) => {
  //   const config = {
  //     headers: {
  //       'Content-type': 'application/json',
  //       'x-auth-token': props.auth.token,
  //     },
  //   };

  //   axios
  //     .delete(`/api/plots/${plotId}`, config)
  //     .then(() => {
  //       log('Plot deleted succesfully');
  //       getLayout();
  //     })
  //     .catch((e) => error('Could not delete plot', e));
  // };

  return (
    <div className="my-3 mx-3">
      {isLoading && <Loading />}
      {!isLoading && isNotFound && <NotFound />}
      {!isLoading && !isNotFound && (
        <LayoutCardView
          layoutId={props.match.params.id}
          token={props.auth.token}
          role={props.auth.user.role}
        />
      )}
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

LayoutOverview.protoTypes = propTypes;
LayoutOverview.defaultProps = defaultProps;

export default connect(mapStateToProps)(LayoutOverview);
