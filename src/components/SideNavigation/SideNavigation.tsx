import './SideNavigation.scss';

import { Offcanvas, Navbar, Nav, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import classNames from 'classnames';
import { removeUser } from 'store/slices/userSlice';

import { useAppDispatch } from '../../hooks/redux-hooks';
import { Roles } from '../../types/Roles';
import { Categories } from '../../types/Categories';

type Props = {
  roleChange: (category: Roles | Categories) => void;
};
export const SideNavigation: React.FC<Props> = ({ roleChange }) => {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [activeKey, setActiveKey] = useState<Roles>(Roles.passenger);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (selectedKey: string) => {
    setActiveKey(selectedKey as Roles);
    roleChange(selectedKey as Roles);
  };

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <>
      <Navbar
        className={classNames('navbar', {
          'navbar--sidebar-open': show,
          'navbar--sidebar-closed': !show,
        })}
        bg="light"
        expand={false}
      >
        <Navbar.Toggle
          className="navbar__toggle"
          aria-controls="offcanvas-navbar"
          onClick={handleShow}
        />
      </Navbar>

      <Offcanvas
        id="offcanvas-navbar"
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav
            activeKey={activeKey}
            className="flex-column"
            onSelect={selectedKey => handleSelect(selectedKey || activeKey)}
          >
            <Nav.Item>
              <Nav.Link eventKey={Roles.passenger}>Passengers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={Roles.driver}>Drivers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={Categories.trips}>Trips</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Button
              variant="outline-danger"
              className="auth__button"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
