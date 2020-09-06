import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';

const NavigationBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState('Account');

  const toggle = () => setIsOpen(!isOpen);

  const { firstName, lastName } = user;

  useEffect(() => {
    if (firstName && lastName) {
      setAccount(firstName + ' ' + lastName);
    }
  }, [firstName, lastName]);

  return (
    <Navbar
      color="light"
      light
      expand="md"
      style={{ margin: '.5em', borderRadius: '.25em' }}
    >
      <NavbarBrand href="/">SSK Avenues</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/realestate">Real estate</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/power">Power</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Contact</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/account">{account}</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(NavigationBar);
