import React from 'react';
import { RiFacebookBoxFill } from 'react-icons/ri';
import { AiFillInstagram } from 'react-icons/ai';
import { FaTwitterSquare } from 'react-icons/fa';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { HashLink as Linking } from 'react-router-hash-link';
import './footer.scss';

// import casterLogo from '../../assets/images/caster-logo.png';
import logoCaster from '../../assets/images/caster-logo.png';


const Footer = ({ setPageNumber }) => {

  const goTop = () => {
    window.scrollTo({
      top: 0,
    });
  }

  const goToLatestTrailer = () => {
    window.scrollTo({
      top: 4000,
      behavior: 'smooth',
    });
  }

  return (
    <div className='footer'>
      <div className='footer__container'>
        <div className='footer__logo'>
          <img src={logoCaster} alt="" className='logo' />
          <p>
            <AiOutlineCopyrightCircle />
            2023, Caster. All rights reserved
          </p>
        </div>

        <ul className='footer__list'>
          <li>
            <Link to='/' onClick={() => goTop()}>
              Home
            </Link>
          </li>
          <li>
            <NavLink to='/popular' onClick={() => setPageNumber(1)}>
              Popular Movies
            </NavLink>
          </li>
          <li>
            <NavLink to='/upcoming' onClick={() => setPageNumber(1)}>
              Upcoming Movies
            </NavLink>
          </li>
          <li>
            {/* <Link to='/' onClick={() => goToLatestTrailer()}> */}
            <Linking to='/#trailer-latest'>
              Latest Trailer
            </Linking>
          </li>
        </ul>

        <div className='footer__socials'>
          <p>Contact :</p>
          <p className='social--email'>msycodebiz@gmail.com</p>
          <div className='footer__social--icons'>
            <RiFacebookBoxFill />
            <AiFillInstagram />
            <FaTwitterSquare className='social--twitter' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer