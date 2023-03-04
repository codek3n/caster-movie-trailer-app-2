import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchForm from '../search/SearchForm';
import Hamburger from 'hamburger-react';
import './navbar.scss';

import casterLogo from '../../assets/images/caster-logo.png'


const Navbar = ({ setQuery, pageNumber, setPageNumber }) => {

  const [navColor, setNavColor] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setOpen] = useState(false);


  const changeNavColor = () => {
    if (window.scrollY >= 10) {
      setNavColor(true);
    } else {
      setNavColor(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNavColor)

    return () => {
      window.removeEventListener('scroll', changeNavColor)
    }
  }, [navColor])


  const goTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth'
    });
  }


  return (
    <>
      <div className={navColor || isTyping ? 'navbar scrolling-active' : 'navbar'}>
        <div className='navbar__container'>
          <div className={isTyping ? 'navbar__logo is-typing'
            : 'navbar__logo'}>
            <Link to='/' onClick={() => goTop()}>
              {/* CASTER */}
              <img src={casterLogo} alt="" className='logo' />
            </Link>
          </div>

          <div className='navbar__search'>
            <SearchForm
              setQuery={setQuery}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </div>

          <div className='navbar__popular'>
            <NavLink to='/popular' onClick={() => setPageNumber(1)}>
              Popular
            </NavLink>
          </div>

          <div className='navbar__upcoming'>
            <NavLink to='/upcoming' onClick={() => setPageNumber(1)}>
              Upcoming
            </NavLink>
          </div>

          <button className={isTyping ? 'navbar__menu is-typing'
            : 'navbar__menu'}>
            <Hamburger className='navbar__menu--icon'
              size={100}
              toggled={isOpen}
              toggle={setOpen}
            />
          </button>

          <div className={isOpen ? 'menu menu--active' : 'menu'}>

            <div className='menu__container--item' onClick={() => setOpen(false)}>
              <div className='navbar__popular--mobile'>
                <NavLink to='/popular' onClick={() => setPageNumber(1)}>
                  Popular
                </NavLink>
              </div>

              <div className='navbar__upcoming--mobile'>
                <NavLink to='/upcoming' onClick={() => setPageNumber(1)}>
                  Upcoming
                </NavLink>
              </div>
            </div>
          </div>

          <div className={isOpen ?
            'menu__modal--background--active'
            : 'menu__modal--background'}>
          </div>

        </div>

      </div >

    </>
  )
}

export default Navbar