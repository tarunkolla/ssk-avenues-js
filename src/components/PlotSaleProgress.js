import React from 'react';
import { Progress } from 'reactstrap';

const PlotSaleProgress = () => {
  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: '800px',
      }}
    >
      <Progress multi>
        <Progress bar color="success" value="20">
          Available
        </Progress>
        <Progress bar color="warning" value="30">
          Interested buyer
        </Progress>
        <Progress bar color="danger" value="30">
          Advance received
        </Progress>
        <Progress bar color="dark" value="20">
          Off market
        </Progress>
      </Progress>
    </div>
  );
};

export default PlotSaleProgress;
