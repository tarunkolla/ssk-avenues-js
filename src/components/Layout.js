import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { CardColumns } from 'reactstrap';

import { error, log } from '../utilities/Logger';
import LayoutCard from './LayoutCard';
import LayoutNavBar from './LayoutNavBar';
import Loading from './Loading';

const Layout = ({ isAuthenticated, role, ...props }) => {
  const [layouts, setLayouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getLayouts = useCallback(() => {
    axios({
      method: 'GET',
      url: '/api/layouts/',
    })
      .then((res) => {
        setLayouts(res.data);
        log('Layouts retrived succesfully');
      })
      .catch((err) => {
        error(err);
      })
      .finally(setIsLoading(false));
  }, []);

  const deleteLayoutCardHandler = useCallback(
    (layoutId) => {
      const config = {
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': props?.token,
        },
      };

      setIsLoading(true);
      axios
        .delete(`/api/layouts/${layoutId}`, config)
        .then(() => {
          getLayouts();
          log('Layout deleted succesfully');
        })
        .catch((e) => error('Could not delete layout', e))
        .finally(setIsLoading(false));
    },
    [getLayouts, props?.token]
  );

  useEffect(() => {
    getLayouts();
  }, [getLayouts]);

  return (
    <div className="my-3 mx-3">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <LayoutNavBar
            token={props.token}
            getLayouts={getLayouts}
            role={role}
          />
          <CardColumns>
            {layouts.map((layout) => (
              <LayoutCard
                {...layout}
                key={layout._id}
                isAuthenticated={isAuthenticated}
                role={role}
                deleteLayoutCard={deleteLayoutCardHandler}
              />
            ))}
          </CardColumns>
        </>
      )}
    </div>
  );
};

export default Layout;
