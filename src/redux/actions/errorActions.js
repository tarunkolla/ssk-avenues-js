import { GET_ERRORS, CLEAR_ERRORS } from './types';

const returnErrors = (message, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {
      message,
      status,
      id,
    },
  };
};

const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export { returnErrors, clearErrors };
