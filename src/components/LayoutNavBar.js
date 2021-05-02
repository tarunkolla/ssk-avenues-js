import React, { useState } from 'react';
import { Breadcrumb, Button } from 'reactstrap';
import AddLayoutModal from './AddLayoutModal';

const LayoutNavBar = ({ token, getLayouts, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onAddItem = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {role.includes('STAFF') && (
        <>
          <Breadcrumb tag="nav" listTag="div">
            <Button className="ml-auto" outline onClick={onAddItem} size="sm">
              Add item
            </Button>
          </Breadcrumb>
          <AddLayoutModal
            isModalOpen={isModalOpen}
            token={token}
            setIsModalOpen={setIsModalOpen}
            getLayouts={getLayouts}
          />
        </>
      )}
    </>
  );
};

export default LayoutNavBar;
