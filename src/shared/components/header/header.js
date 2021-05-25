import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { useStyles } from './header.styles';

const Header = () => {
  const { root } = useStyles();
  return (
    <div className={root}>
      <Navbar bg='dark' variant='dark'>
        <Nav className='ml-auto'>
          <Link className='nav-link' to='business-tools'>
            Business Tools
          </Link>
          <Link className='nav-link' to='activity-monitor'>
            Activity Monitor
          </Link>
          <Link to='settings'>
            <IoMdSettings className='icon' />
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
