import React, { useState, useEffect, useCallback } from 'react';
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
  const [layoutPlots, setLayoutPlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [hasEditPrev, setHasEditPrev] = useState(false);

  const role = props.auth.user.role;

  useEffect(() => {
    getPlots();
  }, [props.auth.isAuthenticated]);

  const filterPlots = (layout) => {
    let filteredPlots;

    if (role.includes('STAFF')) {
      setHasEditPrev(true);
      filteredPlots = layout.plots;
    } else if (role.includes('AGENT')) {
      filteredPlots = layout.plots?.filter((plot) => plot.status !== 'SOLD');
    } else {
      filteredPlots = layout.plots?.filter((plot) => plot.status === 'LISTED');
    }

    return filteredPlots;
  };

  const getPlots = useCallback(() => {
    axios({
      method: 'GET',
      url: `/api/layouts/${props.match.params.id}`,
    })
      .then((res) => {
        setLayoutPlots(filterPlots(res.data));
        log('Plots retrived succesfully');
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        error(err);
        setIsLoading(false);
        setIsNotFound(true);
      });
  }, [props.auth.user.role]);

  const deletePlot = (plotId) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': props.auth.token,
      },
    };

    axios
      .delete(`/api/plots/${plotId}`, config)
      .then(() => {
        log('Plot deleted succesfully');
        getPlots();
      })
      .catch((e) => error('Could not delete plot', e));
  };

  return (
    <div style={{ padding: '1em' }}>
      {isLoading && <Loading />}
      {!isLoading && isNotFound && <NotFound />}
      {!isLoading && !isNotFound && (
        <>
          <PlotNavBar
            layoutId={props.match.params.id}
            token={props.auth.token}
            getPlots={getPlots}
            role={props.auth.user.role}
          />
          <PlotsListView
            role={role}
            isAuthenticated={props.auth.isAuthenticated}
            plots={layoutPlots}
            token={props.auth.token}
            getPlots={getPlots}
            hasEditPrev={hasEditPrev}
            deletePlot={deletePlot}
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
