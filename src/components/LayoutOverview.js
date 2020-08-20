import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { error, log } from '../utilities/Logger';
import Loading from './Loading';
import NotFound from './NotFound';
import PlotsListView from './PlotsListView';
import PlotNavBar from './PlotNavBar';
import LayoutCarousel from './LayoutCarousel';
import PlotSaleProgress from './PlotSaleProgress';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LayoutOverview = (props) => {
  const [layout, setLayout] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/layouts/${props.match.params.id}`,
    })
      .then((res) => {
        setLayout(res.data);
        log('Plots retrived succesfully');
        setIsLoading(false);
      })
      .catch((err) => {
        error(err);
        setIsLoading(false);
        setIsNotFound(true);
      });
  }, []);
  console.log(layout);
  return (
    <div style={{ padding: '1em' }}>
      {isLoading && <Loading />}
      {!isLoading && isNotFound && <NotFound />}
      {!isLoading && !isNotFound && (
        <>
          {/* <LayoutCarousel /> */}
          <PlotNavBar
            layoutId={props.match.params.id}
            token={props.auth.token}
          />
          <PlotsListView
            role={props.auth.user.role}
            isAuthenticated={props.auth.isAuthenticated}
            layout={layout}
            token={props.auth.token}
          />
          <PlotSaleProgress />
        </>
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
