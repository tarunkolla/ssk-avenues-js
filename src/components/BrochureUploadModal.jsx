import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import axios from 'axios';

const BrochureUploadModal = ({ isOpen, onCancel, layoutId, token }) => {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState({ name: 'No file selected' });
  const [status, setStatus] = useState('');
  const [color, setColor] = useState('');

  const inputFileRef = useRef(null);

  const onChange = (event) => {
    setColor('');
    setFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('brochure', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }

    axios
      .patch(`/api/layouts/${layoutId}/brochure`, fd, {
        ...config,
        onUploadProgress: (getProgress) => {
          setProgress(
            parseInt(Math.round((getProgress.loaded * 100) / getProgress.total))
          );
        },
      })
      .then(() => {
        setStatus('Successfully uploaded');
        setColor('success');
      })
      .catch(() => {
        setStatus('Failed to upload');
        setColor('danger');
      });
  };

  const onChooseFile = () => {
    inputFileRef.current.click();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Add or replace brochure</ModalHeader>
      <ModalBody>
        <input
          ref={inputFileRef}
          type="file"
          accept=".pdf,.doc"
          style={{ display: 'none' }}
          onChange={onChange}
        />
        <InputGroup size="sm">
          <Input disabled placeholder={file.name} />
          <InputGroupAddon addonType="append">
            <Button disabled={color === 'success'} onClick={onChooseFile}>
              Select file
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Progress className="mt-4" color={color} value={progress}>
          {status}
        </Progress>
      </ModalBody>
      <ModalFooter>
        {color === 'success' ? (
          <Button outline color="success" size="sm" onClick={onCancel}>
            Close
          </Button>
        ) : (
          <>
            <Button outline color="secondary" size="sm" onClick={onCancel}>
              Cancel
            </Button>{' '}
            <Button color="primary" size="sm" onClick={fileUploadHandler}>
              Upload
            </Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

BrochureUploadModal.propTypes = {};

export default BrochureUploadModal;
