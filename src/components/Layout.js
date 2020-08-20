import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardColumns } from 'reactstrap';

import { error, log } from '../utilities/Logger';
import LayoutCard from './LayoutCard';
import LayoutNavBar from './LayoutNavBar';
import Loading from './Loading';

const Layout = ({ isAuthenticated, role, ...props }) => {
  const [layouts, setLayouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/layouts/',
    })
      .then((res) => {
        setLayouts(res.data);
        log('Layouts retrived succesfully');
        setIsLoading(false);
      })
      .catch((err) => {
        error(err);
      });
  }, []);

  console.log(layouts);
  return (
    <div style={{ padding: '1em' }}>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <LayoutNavBar token={props.token} />
          <CardColumns>
            {layouts.map((layout) => (
              <LayoutCard
                {...layout}
                key={layout._id}
                isAuthenticated={isAuthenticated}
                role={role}
              />
            ))}
          </CardColumns>
        </>
      )}
    </div>
  );
};

export default Layout;
