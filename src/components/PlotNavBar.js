import React, { useState } from 'react';
import {
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  ButtonToolbar,
  Button,
} from 'reactstrap';
import AddPlotModal from './AddPlotModal';

const PlotNavBar = ({ layoutId, token, getPlots, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onAddItem = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Breadcrumb tag="nav" listTag="div">
        {role.includes('STAFF') && (
          <Button className="ml-auto" outline onClick={onAddItem} size="sm">
            Add item
          </Button>
        )}
      </Breadcrumb>
      <AddPlotModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeModal={onAddItem}
        layoutId={layoutId}
        token={token}
        getPlots={getPlots}
      />
    </div>
  );
};

export default PlotNavBar;
