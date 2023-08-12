import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/images/logonew.png';

const Navbar = ({ toggle }) => {
  const navigate = useNavigate();

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to='/'> <img src={logoImage} alt="Logo" style={{ width: '7.5rem', height: '4.5rem' }} /> </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to='aboutus'>About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to='services'>Services</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to='footer'>Contact Us</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/Register" onClick={() => navigate('/Register')}>Sign Up</NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/Login">Sign In</NavBtnLink>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
