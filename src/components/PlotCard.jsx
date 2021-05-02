import React from 'react';
import PropTypes from 'prop-types';
import PlotCardView from './PlotCardView';
import { CardColumns } from 'reactstrap';

const PlotCard = ({ plots }) => {
  return (
    <>
      {plots.map((plot) => (
        <PlotCardView key={plot._id} {...plot} />
      ))}
    </>
  );
};

PlotCard.propTypes = {};

export default PlotCard;
