import React, { useState } from 'react';
import {
  Jumbotron,
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Badge,
  Button,
  NavLink,
  Breadcrumb,
} from 'reactstrap';

const AboutUs = () => {
  return (
    <Jumbotron className="mx-3">
      <h4 className="lead">About Us</h4>
      <hr className="my-2" />
      <p>
        <strong>SSK Avenues Pvt. Ltd.,</strong> a professionally managed Real
        Estate Development Company, specializing in the construction of well
        designed &amp; functionally effective Residential Buildings, Commercial
        Buildings &amp; Farm Houses.
      </p>
      <p>
        Since 2004, We have completed and delivered several projects comprising
        Independent Villas, Premium Apartments, Commercial Projects, and Farm
        Houses. These projects are widely appreciated for their design and
        functional utility and the Engineering detail. Our Endeavour, all the
        time, has been to build the most affordable houses, maintaining the best
        standards. Our projects are developed with a vision to offer a
        sustainable balance between affordability and luxury, standards of
        construction, and the environment.
      </p>
    </Jumbotron>
  );
};
const ManagementTeam = () => {
  return (
    <Jumbotron className="mx-3">
      <h4 className="lead">Management Team</h4>
      <hr className="my-2" />
      <p>
        <strong>
          Mr. K. Krishna Prasad, B.Sc (Ag), M.Sc(Ag), PGDRM (IRMA), Director:
        </strong>{' '}
        Ex Employee of Central Government, worked for{' '}
        <b>National Dairy Development Board</b> for about <b>10 Years</b>, as
        Project Director for the Oilseeds Project of Andhra Pradesh. Resigned
        his services from the Government and ventured into the software. Sailed
        with the software industry for 6 Years in Technical and Managerial
        roles. Ventured into Reality Projects. Executed several Reality Projects
        in Hyderabad. Got diversified into Power Sector and presently Owns
        partly/fully 5 SHEPs in Odisha & Chattisgarh, totaling to 40 MW. Carries
        with him, <b>3 DECADES</b> of Managerial Expertise in Project Execution,
        Project Finance, and Operations.
      </p>
      <p>
        <strong> Sudha Kolla, B.Com, Director: </strong> Carries with her rich
        Experience in Administration and accounting. Has been the guiding force,
        for the past 15 years in the business. and Active in business deals.
        Meticulous planning and precision execution are her capabilities.
      </p>
      <p>
        <strong>Goutam Kolla, B.Tech (Mechatronics), MS (IE), Director:</strong>{' '}
        Specialised in Industrial Engineering and Quality Aspects of Production
        Engineering, works on the engineering aspects of the company’s Projects.
        Meticulous in execution adds strength to the company.
      </p>
    </Jumbotron>
  );
};

const BusinessUnits = () => {
  return (
    <Jumbotron className="mx-3">
      <h4 className="lead">Business Units</h4>
      <hr className="my-2" />
      <p>
        <strong>Real Estate:</strong> Real Estate Activities include
        identification of legally valid & commercially viable properties,
        ascertain their legality and develop the property into a suitable
        Project. We also structure land transactions and offer to the potential
        Developers/ Builders, for Development. We are engaged in the
        Construction of Residential & Commercial Projects with significant
        Projects and Real Estate activity in Hyderabad, Telangana, India. We
        have completed more than a million Sq. Ft of construction in all
        verticals. Our operations span every aspect of the real estate business,
        Residential Buildings, Commercial Buildings, Residential Layouts, Farm
        Houses, Farm Layouts, and Farm Development. Our Residential Projects
        comprise Individual Homes, Townships, and Apartment Complexes. Our
        Commercial Projects comprise Premium Office Spaces, Retail Business
        Centers, and Food Courts.
      </p>
      <p>
        <strong>Contract Works:</strong> In addition to executing its projects,
        the Company is also engaged in the execution of civil engineering
        projects. We have considerable experience in executing Residential and
        Commercial projects as Principal Contractor. Budget Controls and Time
        schedules remain our focus to deliver a quality Project. The company
        provided integrated Engineering, Procurement, and Construction (EPC)
        services for Civil Construction Projects. In addition to the Civil Works
        in Engineering, we undertake Green Works, FARM DEVELOPMENT.
      </p>
      <p>
        <strong>Small Hydro Electric Power Projects:</strong> With our
        experiences in construction and real estate development associated with
        our Expertise in Project Management, We forayed into{' '}
        <b>Small Hydro Electric Power (SHEP)</b> Projects Understanding the
        increasing importance of power requirement, the company is all set to
        leverage opportunities in this sector and reaffirm the success of its
        approach towards clean energy. Hydro projects have minimal social &
        environmental issues and a low gestation period owing to fewer
        clearances and predictable construction plans. The company has all the
        capability to execute the Small Hydro Electric Projects (SHEP). The team
        of professionals who have been associated with the Hydro Energy has all
        the capability to execute with dedication any SHEP. Our teams of Domain
        Experts, Engineers & Surveyors have the needed expertise in Project
        Execution, commercial aspects & operational management of SHEPs to
        handle all the activities from WATER to WIRE. Our support services for
        the SHEPs span from Water to Wire, which includes Preparation of
        Feasibility Reports, Detailed Project Reports, Detailed Survey study of
        the site, Techno-Economic Clearances. With our Civil Engineering
        Expertise and insight into the Small Hydro Electric Projects, We
        ventured into the Execution of these Power Projects and all the related
        works from Foundation to Project Commissioning.
      </p>
    </Jumbotron>
  );
};

const Associates = () => {
  return (
    <Jumbotron className="mx-3">
      <h4 className="lead">Associates</h4>
      <hr className="my-2" />
      <p>
        <strong>Vijay Durga Power Projects Pvt. Ltd:</strong> Owns a Run-Off the
        River, 5 MW Small Hydro Electric Project on River Gunghutta with its
        powerhouse located in Village called Laigu and its Weir Located in
        Kahrdana, Batauli Tehsil, Surguja Dt, Chattisgarh
      </p>
      <p>
        <strong>Phalguna Power Projects Pvt. Ltd.:</strong> Owns a Run-Off the
        River, 6 MW Small Hydro Electric Project on River Hasdeo, with its Power
        House located in Village Lai and its Weir Located in Amritdhara,
        Manendergarh Tehsil, Korea Dt, Chattisgarh
      </p>
      <p>
        <strong>Savitri Power Projects Pvt. Ltd.:</strong> Owns a Reservoir
        Based 1.2 MW Power Project under operation in River Son at the Gangrel
        Reservoir.
      </p>
    </Jumbotron>
  );
};

const About = () => {
  const [isAboutSelected, toggleIsAboutSelected] = useState(true);
  const [isTeamSelected, toggleIsTeamSelected] = useState(true);
  const [isBusinessSelected, toggleIsBusinessSelected] = useState(true);
  const [isAssociatesSelected, toggleIsAssociatesSelected] = useState(true);

  return (
    <>
      <Breadcrumb className="mx-3 my-4">
        <Button disabled className="badge mx-1" size="sm" color="light">
          Filter:
        </Button>
        <Button
          className="badge mx-1"
          size="sm"
          outline={!isAboutSelected}
          color="success"
          onClick={() => {
            toggleIsAboutSelected(!isAboutSelected);
          }}
        >
          About Us
        </Button>
        <Button
          className="badge mx-1"
          size="sm"
          outline={!isTeamSelected}
          color="success"
          onClick={() => {
            toggleIsTeamSelected(!isTeamSelected);
          }}
        >
          Management Team
        </Button>
        <Button
          className="badge mx-1"
          size="sm"
          outline={!isBusinessSelected}
          color="success"
          onClick={() => {
            toggleIsBusinessSelected(!isBusinessSelected);
          }}
        >
          Business Units
        </Button>
        <Button
          className="badge mx-1"
          size="sm"
          outline={!isAssociatesSelected}
          color="success"
          onClick={() => {
            toggleIsAssociatesSelected(!isAssociatesSelected);
          }}
        >
          Associates
        </Button>
      </Breadcrumb>
      {isAboutSelected && <AboutUs />}
      {isTeamSelected && <ManagementTeam />}
      {isBusinessSelected && <BusinessUnits />}
      {isAssociatesSelected && <Associates />}
    </>
  );
};

export default About;
