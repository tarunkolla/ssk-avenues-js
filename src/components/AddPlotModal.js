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
  Option,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';
import { log, error } from '../utilities/Logger';

const AddPlotModal = ({ isModalOpen, setIsModalOpen, token, getPlots }) => {
  const [isAdded, setIsAdded] = useState(false);
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
      .patch(
        `/api/layouts/${props.layoutId}/plots`,
        JSON.stringify(formData),
        config
      )
      .then((res) => {
        log('Plot added succesfully');
        setIsAdded(true);
        setIsModalOpen(false);
        setErrorMessage('');
        getPlots();
      })
      .catch((err) => {
        error(err);
        setErrorMessage(err.message);
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
      <ModalHeader toggle={closeModal}>Add Plot</ModalHeader>
      <ModalBody>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="plotNumber">Plot Number</Label>
                <Input
                  type="text"
                  name="plotNumber"
                  id="plotNumber"
                  onChange={onChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  onChange={onChange}
                >
                  <option>LISTED</option>
                  <option>PENDING</option>
                  <option>ONHOLD</option>
                  <option>SOLD</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="area">Area</Label>
                <Input type="text" name="area" id="area" onChange={onChange} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input type="select" name="type" id="type" onChange={onChange}>
                  <option>LOT</option>
                  <option>HOUSE</option>
                  <option>APPARTMENT</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Add description of the plot"
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

export default AddPlotModal;
