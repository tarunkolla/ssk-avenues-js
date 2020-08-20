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
  FormFeedback,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';
import { log, error } from '../utilities/Logger';
import { ErrorAlert } from '../utilities/CustomAlerts';

const AddLayoutModal = (props) => {
  const { isModalOpen, setIsModalOpen, token } = props;
  const [isAdded, setIsAdded] = useState(true);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [formData, updateFormData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const changeUnmountOnClose = (e) => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    e.preventDefault();

    axios
      .post('/api/layouts/', JSON.stringify(formData), config)
      .then((res) => {
        log('Layout added succesfully');
        setErrorMessage('');
        setIsModalOpen(false);
      })
      .catch((err) => {
        setErrorMessage(err);
        error(err);
        setErrorMessage(err.message);
        setIsAdded(false);
      });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      toggle={closeModal}
      unmountOnClose={unmountOnClose}
      modalTransition={{ timeout: 700 }}
      backdropTransition={{ timeout: 700 }}
    >
      <ModalHeader toggle={closeModal}>Add Layout</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="Title">Title</Label>
            <Input
              type="text"
              name="title"
              id="Title"
              placeholder="Title for the layout to be displayed"
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Add location of the layout"
              onChange={onChange}
            />
          </FormGroup>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="totalPlots">Total Plots</Label>
                <Input
                  type="number"
                  name="totalPlots"
                  id="totalPlots"
                  placeholder="Defaults to one"
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="availablePlots">Available Plots</Label>
                <Input
                  type="number"
                  name="availablePlots"
                  id="availablePlots"
                  placeholder="Defaults to one"
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Add description of the layout"
              onChange={onChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button outline color="success" onClick={onSubmit}>
          Submit
        </Button>{' '}
        <Button outline color="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddLayoutModal;
