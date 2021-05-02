import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from 'reactstrap';
import axios from 'axios';

import { log, error } from '../utilities/Logger';

const propTypes = {};

const PlotEditModal = ({ isOpen, onClose, layout, token }) => {
  const [formData, updateFormData] = useState(layout);

  const onChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (event) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    event.preventDefault();

    axios
      .patch(`/api/layouts/${layout._id}`, JSON.stringify(formData), config)
      .then(() => {
        log('Layout updated succesfully');
      })
      .catch((err) => {
        error(err);
      })
      .finally(() => onClose());
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Update Layout</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup></FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" outline color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button size="sm" color="success" onClick={onSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

PlotEditModal.propTypes = propTypes;

export default PlotEditModal;
