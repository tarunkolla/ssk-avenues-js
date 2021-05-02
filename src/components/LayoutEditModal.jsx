import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from 'reactstrap';
import axios from 'axios';

import { log, error } from '../utilities/Logger';

const propTypes = {};

const LayoutEditModal = ({ isOpen, onClose, layout, token }) => {
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
          <FormGroup>
            <Label for="Title">Title</Label>
            <Input
              type="text"
              name="title"
              id="Title"
              placeholder="Title for the layout"
              value={formData?.title || ''}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="url">Address URL</Label>
            <Input
              type="url"
              name="addressHref"
              id="addressHref"
              value={formData?.addressHref || ''}
              placeholder="Link to be open when address is clicked"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={formData?.address || ''}
              placeholder="Address to be displayed with a link to href"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={formData?.description || ''}
              placeholder="Description of the layout"
              onChange={onChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" outline color="secondary" onClick={onClose}>
          Cancel
        </Button>{' '}
        <Button size="sm" color="success" onClick={onSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

LayoutEditModal.propTypes = propTypes;

export default LayoutEditModal;
