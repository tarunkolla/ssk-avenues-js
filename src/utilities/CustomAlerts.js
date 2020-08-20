import React, { useEffect, Fragment, useState } from 'react';
import { Alert, Fade } from 'reactstrap';

const alertTypes = {
  WARN: 'warning',
  ERROR: 'danger',
  INFO: 'success',
  DEFAULT: 'dark',
};

const defaultProps = {
  dismissInterval: 1000 * 4, // 4 seconds
  type: alertTypes.DEFAULT,
  message: 'Unknown alert',
};

const CustomAlerts = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsOpen(false),
      defaultProps.dismissInterval
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert
      isOpen={isOpen}
      transition={{ in: true, out: true, timeout: props.dismissInterval / 4 }}
      color={props.type}
      style={{ position: 'absolute', width: '100vw' }}
    >
      {props.message}
    </Alert>
  );
};

const InfoAlert = (props) => {
  return <CustomAlerts type={alertTypes.INFO} {...props} />;
};

const WarnAlert = (props) => {
  return <CustomAlerts type={alertTypes.WARN} {...props} />;
};

const ErrorAlert = (props) => {
  return <CustomAlerts type={alertTypes.ERROR} {...props} />;
};

CustomAlerts.defaultProps = defaultProps;

export { InfoAlert, WarnAlert, ErrorAlert };
