import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  Row,
  Col,
  FormGroup,
  ButtonGroup,
} from 'reactstrap';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import { DeleteButton, AddPlusButton } from '../utilities/CustomIcons';

import { log, error } from '../utilities/Logger';

const propTypes = {};

const PlotEditModal = ({ isOpen, onCancel, plots, token, layoutId }) => {
  const [formData, updateFormData] = useState();
  const [currentPlots, setCurrentPlots] = useState(0);

  const onChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onAddPlot = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }

    axios
      .patch(`/api/layouts/${layoutId}/plots`, JSON.stringify(formData), config)
      .then(() => {
        log('Plots updated succesfully');
      })
      .catch((err) => {
        error(err);
      });
  };

  const onDeletePlot = (plotId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    axios
      .delete(`/api/layouts/${layoutId}/plots/${plotId}`, config)
      .then(() => {
        log('Plots deleted succesfully');
      })
      .catch((err) => {
        error(err);
      });
  };

  const onNext = () => {
    setCurrentPlots(currentPlots + 5);
  };
  const onPrev = () => {
    setCurrentPlots(currentPlots - 5);
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>Update Layout</ModalHeader>
      <ModalBody>
        <List>
          <ListItem>
            <ListItemText secondary="Delete by plot number" />
          </ListItem>
          {plots
            .slice(currentPlots, currentPlots + 5)
            .map(({ plotNumber, _id }) => (
              <ListItem key={_id}>
                <ListItemText primary={`Plot #${plotNumber}`} />
                <ListItemSecondaryAction>
                  <ListItemIcon>
                    <DeleteButton onClick={() => onDeletePlot(_id)} />
                  </ListItemIcon>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          <ListItem>
            <ButtonGroup size="sm" className="mx-auto">
              <Button disabled={currentPlots <= 0} onClick={onPrev}>
                Prev
              </Button>
              <Button disabled outline>
                {currentPlots / 5 + 1} of {Math.ceil(plots.length / 5)}
              </Button>
              <Button
                disabled={currentPlots + 5 >= plots.length}
                onClick={onNext}
              >
                Next
              </Button>
            </ButtonGroup>
          </ListItem>
          <ListItem>
            <ListItemText secondary="Add a new plot" />
          </ListItem>
          <ListItem>
            <Form>
              <FormGroup className="mt-2 mb-2 mr-4 ml-0">
                <Row form>
                  <Col>
                    <Input
                      type="text"
                      name="plotNumber"
                      id="plotNumber"
                      placeholder="plot number"
                      value={formData?.plotNumber || ''}
                      onChange={onChange}
                    />
                  </Col>
                  <Col>
                    <Input
                      type="number"
                      name="area"
                      id="area"
                      placeholder="area"
                      value={formData?.area || ''}
                      onChange={onChange}
                    />
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="units"
                      id="units"
                      placeholder="units"
                      value={formData?.units || ''}
                      onChange={onChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Form>

            <ListItemSecondaryAction>
              <ListItemIcon>
                <AddPlusButton onClick={onAddPlot} />
              </ListItemIcon>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" outline color="primary" onClick={onCancel}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

PlotEditModal.propTypes = propTypes;

export default PlotEditModal;
