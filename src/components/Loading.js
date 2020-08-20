import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
      }}
    >
      <Spinner color="secondary" />
    </div>
  );
};

export default Loading;
