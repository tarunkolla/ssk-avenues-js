import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Container,
  Card,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
  FormText,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
} from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { login, register, logout } from '../redux/actions/authActions';

const userState = {
  SIGNIN: 'signIn',
  SIGNUP: 'signUp',
  SIGNOUT: 'signOut',
};

const Account = (props) => {
  const [activeTab, setActiveTab] = useState(userState.SIGNIN);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleChangeFirstName = (event) => setFirstName(event.target.value);
  const handleChangeLastName = (event) => setLastName(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const onRegister = (event) => {
    event.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    props.register(newUser);
  };

  const onLogin = (event) => {
    event.preventDefault();
    const userInfo = { email, password };

    props.login(userInfo);
  };

  const onLogout = (event) => {
    event.preventDefault();

    props.logout();
  };

  //useEffect();

  return (
    <Container
      className="w-responsive p-3 mt-2"
      style={{ maxWidth: 'fit-content' }}
    >
      {props.auth.isAuthenticated ? (
        <LogoutView onSubmit={onLogout} />
      ) : (
        <>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === userState.SIGNIN,
                })}
                onClick={() => {
                  toggle(userState.SIGNIN);
                }}
              >
                Sign In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === userState.SIGNUP,
                })}
                onClick={() => {
                  toggle(userState.SIGNUP);
                }}
              >
                Sign Up
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId={userState.SIGNIN}>
              <Row style={{ paddingTop: '.5em' }}>
                <Col sm="12" className="text-muted">
                  <p>Sign up if you don't have an account.</p>
                </Col>
              </Row>
              <LoginView
                onSubmit={onLogin}
                handleChangeEmail={handleChangeEmail}
                handleChangePassword={handleChangePassword}
              />
            </TabPane>
            <TabPane tabId={userState.SIGNUP}>
              <Row style={{ paddingTop: '.5em' }}>
                <Col sm="12" className="text-muted">
                  <p>Create a new account with SSK Avenues.</p>
                </Col>
              </Row>
              <RegisterView
                onSubmit={onRegister}
                handleChangeFirstName={handleChangeFirstName}
                handleChangeLastName={handleChangeLastName}
                handleChangeEmail={handleChangeEmail}
                handleChangePassword={handleChangePassword}
              />
            </TabPane>
          </TabContent>
        </>
      )}
    </Container>
  );
};

const LoginView = (props) => {
  return (
    <Card body>
      <Form onSubmit={props.onSubmit}>
        <FormGroup className="mt-2 mb-2 mr-sm-2 mb-sm-0">
          <Row form>
            <Col>
              <Label for="email" className="mr-sm-2">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={props.handleChangeEmail}
              />
              <FormText>Enter your account email.</FormText>
            </Col>
          </Row>
          <Row form>
            <Col>
              <Label for="password" className="mr-sm-2">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={props.handleChangePassword}
              />
              <FormText>Enter your account password.</FormText>
            </Col>
          </Row>
          <Button className="mt-4" outline color="success">
            Sign In
          </Button>
        </FormGroup>
      </Form>
    </Card>
  );
};

const RegisterView = (props) => {
  return (
    <Card body>
      <Form onSubmit={props.onSubmit}>
        <FormGroup className="mt-2 mb-2 mr-sm-2 mb-sm-0">
          <Row form>
            <Col>
              <Label for="firstName" className="mr-sm-2">
                First Name
              </Label>
              <Input
                type="firstname"
                name="firstname"
                id="firstName"
                onChange={props.handleChangeFirstName}
              />
            </Col>
            <Col>
              <Label for="lastName" className="mr-sm-2">
                Last Name
              </Label>
              <Input
                type="lastname"
                name="lastname"
                id="lastName"
                onChange={props.handleChangeLastName}
              />
            </Col>
          </Row>
          <Row form>
            <Col>
              <Label for="email" className="mr-sm-2">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={props.handleChangeEmail}
              />
              <FormText>Enter a valid emial</FormText>
            </Col>
          </Row>
          <Row form>
            <Col>
              <Label for="password" className="mr-sm-2">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={props.handleChangePassword}
              />
              <FormText>Enter a new password</FormText>
            </Col>
          </Row>

          <Button className="mt-4" outline color="success">
            Sign Up
          </Button>
        </FormGroup>
      </Form>
    </Card>
  );
};

const LogoutView = (props) => {
  return (
    <>
      <Button className="mt-4" outline color="warning" onClick={props.onSubmit}>
        Sign Out
      </Button>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { login, register, logout })(Account);
