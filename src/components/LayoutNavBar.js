import React, { useState } from 'react';
import { Breadcrumb, Button } from 'reactstrap';
import AddLayoutModal from './AddLayoutModal';

const LayoutNavBar = ({ token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAddItem = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Breadcrumb tag="nav" listTag="div">
        <Button className="ml-auto" outline onClick={onAddItem} size="sm">
          Add item
        </Button>
      </Breadcrumb>
      <AddLayoutModal
        isModalOpen={isModalOpen}
        token={token}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default LayoutNavBar;
