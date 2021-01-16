import React, { useState } from 'react';
import { Card } from 'reactstrap';
import classnames from 'classnames';

const aboutPageTabs = {
  ABOUT_US: 'aboutUs',
  TEAM: 'team',
  BUSINESS_UNIT: 'businessUnit',
  ASSOCIATIONS: 'associations',
};

const AboutUs = () => {
  return (
    <div className="mx-3">
      <Card body>
        <p className="lead">About Us</p>
        <hr className="my-2" />
        <p>
          <strong>SSK Avenues Pvt. Ltd.,</strong> a professionally managed Real
          Estate Development Company, specializing in the construction of well
          designed &amp; functionally effective Residential Buildings,
          Commercial Buildings &amp; Farm Houses.
        </p>
        <p>
          Since 2004, We have completed and delivered several projects
          comprising Independent Villas, Premium Apartments, Commercial
          Projects, and Farm Houses. These projects are widely appreciated for
          their design and functional utility and the Engineering detail. Our
          Endeavour, all the time, has been to build the most affordable houses,
          maintaining the best standards. Our projects are developed with a
          vision to offer a sustainable balance between affordability and
          luxury, standards of construction, and the environment.
        </p>
      </Card>
    </div>
  );
};
const ManagementTeam = () => {
  return (
    <div className="mx-3">
      <Card body>
        <p className="lead">Management Team</p>
        <hr className="my-2" />
        <p>
          <strong>
            Mr. K. Krishna Prasad, B.Sc (Ag), M.Sc(Ag), PGDRM (IRMA), Director:
          </strong>{' '}
          Ex Employee of Central Government, worked for{' '}
          <b>National Dairy Development Board</b> for about <b>10 Years</b>, as
          Project Director for the Oilseeds Project of Andhra Pradesh. Resigned
          his services from the Government and ventured into the software.
          Sailed with the software industry for 6 Years in Technical and
          Managerial roles. Ventured into Reality Projects. Executed several
          Reality Projects in Hyderabad. Got diversified into Power Sector and
          presently Owns partly/fully 5 SHEPs in Odisha & Chattisgarh, totaling
          to 40 MW. Carries with him, <b>3 DECADES</b> of Managerial Expertise
          in Project Execution, Project Finance, and Operations.
        </p>
        <p>
          <strong> Sudha Kolla, B.Com, Director: </strong> Carries with her rich
          Experience in Administration and accounting. Has been the guiding
          force, for the past 15 years in the business. and Active in business
          deals. Meticulous planning and precision execution are her
          capabilities.
        </p>
        <p>
          <strong>
            Goutam Kolla, B.Tech (Mechatronics), MS (IE), Director:
          </strong>{' '}
          Specialised in Industrial Engineering and Quality Aspects of
          Production Engineering, works on the engineering aspects of the
          company’s Projects. Meticulous in execution adds strength to the
          company.
        </p>
      </Card>
    </div>
  );
};

const About = () => {
  const [activeTab, setActiveTab] = useState(aboutPageTabs.ABOUT_US);

  return (
    <div className="my-3">
      <AboutUs />
      <div className="my-3" />
      <ManagementTeam />
    </div>
  );
};

export default About;
