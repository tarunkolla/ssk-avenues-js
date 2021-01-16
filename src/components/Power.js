import React from 'react';
import { Card } from 'reactstrap';

const Associates = () => {
  return (
    <div className="mx-3 my-3">
      <Card body>
        <p className="lead">Associates</p>
        <hr className="my-2" />
        <p>
          <strong>Vijay Durga Power Projects Pvt. Ltd:</strong> Owns a Run-Off
          the River, 5 MW Small Hydro Electric Project on River Gunghutta with
          its powerhouse located in Village called Laigu and its Weir Located in
          Kahrdana, Batauli Tehsil, Surguja Dt, Chattisgarh
        </p>
        <p>
          <strong>Phalguna Power Projects Pvt. Ltd.:</strong> Owns a Run-Off the
          River, 6 MW Small Hydro Electric Project on River Hasdeo, with its
          Power House located in Village Lai and its Weir Located in Amritdhara,
          Manendergarh Tehsil, Korea Dt, Chattisgarh
        </p>
        <p>
          <strong>Savitri Power Projects Pvt. Ltd.:</strong> Owns a Reservoir
          Based 1.2 MW Power Project under operation in River Son at the Gangrel
          Reservoir.
        </p>
      </Card>
    </div>
  );
};

export default Associates;
