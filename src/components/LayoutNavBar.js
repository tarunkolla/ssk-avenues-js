import React, { useState } from 'react';
import { Breadcrumb, Button } from 'reactstrap';
import AddLayoutModal from './AddLayoutModal';

const LayoutNavBar = ({ token, getLayouts, role }) => {
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
      <AddLayoutModal
        isModalOpen={isModalOpen}
        token={token}
        setIsModalOpen={setIsModalOpen}
        getLayouts={getLayouts}
      />
    </div>
  );
};

export default LayoutNavBar;
