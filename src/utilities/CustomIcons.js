import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ShareIcon from '@material-ui/icons/Share';
import AddBoxIcon from '@material-ui/icons/AddBox';

const AddButton = (props) => {
  return (
    <IconButton onClick={props.onClick} size="small">
      <LibraryAddIcon />
    </IconButton>
  );
};

const ShareButton = (props) => {
  return (
    <IconButton onClick={props.onClick} size="small">
      <ShareIcon />
    </IconButton>
  );
};

const LikeButton = () => {
  return (
    <IconButton size="small">
      <FavoriteIcon />
    </IconButton>
  );
};

const UnlikeButton = () => {
  return (
    <IconButton size="small">
      <FavoriteBorderIcon />
    </IconButton>
  );
};

const EditButton = (props) => {
  return (
    <IconButton onClick={props.onClick} size="small">
      <EditIcon />
    </IconButton>
  );
};

const InfoButton = (props) => {
  return (
    <IconButton onClick={props.onClick} size="small">
      <InfoIcon />
    </IconButton>
  );
};

const DeleteButton = (props) => {
  return (
    <IconButton onClick={props.onClick} size="small">
      <DeleteForeverIcon
        style={{
          color: 'red',
        }}
      />
    </IconButton>
  );
};

const AddPlusButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} size="small">
      <AddBoxIcon
        style={{
          color: 'grey',
        }}
      />
    </IconButton>
  );
};

export {
  AddPlusButton,
  EditButton,
  UnlikeButton,
  LikeButton,
  InfoButton,
  AddButton,
  DeleteButton,
  ShareButton,
};
