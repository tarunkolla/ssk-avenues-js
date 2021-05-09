import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Progress,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { Container, Draggable } from 'react-smooth-dnd';
import arrayMove from 'array-move';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import axios from 'axios';

import { DeleteButton } from '../utilities/CustomIcons';

const ImageUploadModal = ({
  isOpen,
  onCancel,
  onSubmit,
  images,
  layoutId,
  token,
}) => {
  const [items, setItems] = useState(images); //by reference
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [placeholder, setPlaceholder] = useState('No image selected');
  const [status, setStatus] = useState('');
  const [color, setColor] = useState('');

  const inputImageRef = useRef(null);

  const titleHandler = (fileName) => {
    return fileName.split('.')[0];
  };

  const onChange = (event) => {
    setColor('');
    setFile(event.target.files[0]);
    setTitle(titleHandler(event.target.files[0].name));
  };

  const deleteImage = useCallback(
    (index) => {
      items.splice(index, 1);
      setItems([...items]);
    },
    [items]
  );

  const onTitleChange = (event) => {
    setTitle(event.target.value.trim());
    if (event.target.value.trim().length === 0)
      setPlaceholder("Title can't be left empty");
  };

  const imageOrderHandler = () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    axios
      .patch(`/api/layouts/${layoutId}/images`, items, config)
      .then((res) => {
        setItems(res.data.images);
      })
      .catch(() => {})
      .finally(() => {
        onSubmit();
      });
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', file);
    fd.append('title', title);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }

    axios
      .patch(`/api/layouts/${layoutId}/image`, fd, {
        ...config,
        onUploadProgress: (getProgress) => {
          setProgress(
            parseInt(Math.round((getProgress.loaded * 100) / getProgress.total))
          );
        },
      })
      .then((res) => {
        setStatus('Successfully uploaded');
        setColor('success');
        setItems(res.data.images);
      })
      .catch(() => {
        setStatus('Failed to upload');
        setColor('danger');
      })
      .finally(() => {
        setTimeout(() => {
          setStatus('');
          setColor('');
          setFile('');
          setTitle('');
          setProgress(0);
          setPlaceholder(
            'Select a new image or retry if previous upload failed'
          );
        }, 3000);
      });
  };

  const onChooseFile = () => {
    inputImageRef.current.click();
  };

  const onDrop = ({ removedIndex, addedIndex }) => {
    setItems((items) => arrayMove(items, removedIndex, addedIndex));
  };

  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader>Add, delete, and rearrange images</ModalHeader>
      <ModalBody>
        <List>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            onDrop={onDrop}
          >
            <ListItem>
              <ListItemText secondary="Image title falls back to ID" />
              <ListItemSecondaryAction>
                <ListItemText secondary="Hold and drag to reorder" />
              </ListItemSecondaryAction>
            </ListItem>
            {items.map(({ image, title }, index) => (
              <Draggable key={image}>
                <ListItem>
                  <ListItemText primary={title || image} />
                  <ListItemSecondaryAction>
                    <ListItemIcon className="drag-handle">
                      <DragHandleIcon />
                      <DeleteButton onClick={() => deleteImage(index)} />
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>
        <input
          ref={inputImageRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onChange}
        />
        <InputGroup size="sm">
          <Input
            placeholder={placeholder}
            onChange={onTitleChange}
            value={title || ''}
          />
          <InputGroupAddon addonType="append">
            {file ? (
              <Button disabled={title === ''} onClick={fileUploadHandler}>
                Upload image
              </Button>
            ) : (
              <Button onClick={onChooseFile}>Select image</Button>
            )}
          </InputGroupAddon>
        </InputGroup>
        <Progress className="mt-4" color={color} value={progress}>
          {status}
        </Progress>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline size="sm" onClick={onCancel}>
          Cancel
        </Button>{' '}
        <Button color="success" size="sm" onClick={imageOrderHandler}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ImageUploadModal.defaultProps = { images: [] };

export default ImageUploadModal;
