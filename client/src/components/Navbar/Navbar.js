import { React, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import styles from './Navbar.module.css';
import logo from '../../assets/logo-2.png';

const LandingPageLinks = () => (
  <>
    <p>
      <a href="/">Product</a>
    </p>
    <p>
      <a href="/">Pricing</a>
    </p>
    <p>
      <a href="/">Contact Us</a>
    </p>
    <p>
      <NavLink
        className={({ isActive }) => {
          return isActiveFunc(isActive);
        }}
        to="/signup"
      >
        Sign Up
      </NavLink>
    </p>
  </>
);

const isActiveFunc = (isActive) => {
  if(isActive) return styles.landingNavbarActive;
}

const Navbar = ({ user, globalLogout }) => {	

  // === Auto Log-Out after session expires ===
  //   const location = useLocation();

	// useEffect(() => {
	// 	const token = user?.data.token;
		
	// 	if(token){
	// 	    const decodedToken = decode(token);
	// 	    if(decodedToken.exp*1000 < new Date().getTime()) {
	// 			globalLogout();
	// 			alert("Session Expired!\nPlease Sign In again")
	// 		}
	// 	}
	// 	// setUser(JSON.parse(localStorage.getItem("profile")));
	// }, [location]);


	
	return (
    <div className={styles.landingNavbar}>
      <div className={styles.landingNavbarLogo}>
        <img src={logo} alt="kitchen-logo" />
      </div>
      <div className={styles.landingNavbarLinks}>
        {user ? (
          <>
            <p>
              <NavLink
                className={({ isActive }) => {
                  return isActiveFunc(isActive);
                }}
                to="/home"
              >
                Home
              </NavLink>
            </p>
            <p>
              <NavLink
                className={({ isActive }) => {
                  return isActiveFunc(isActive);
                }}
                to="/recipe"
              >
                Recipes
              </NavLink>
            </p>
            <p>
              <a href="/">Community</a>
            </p>
            <p>
              <a href="/">Pricing</a>
            </p>
            <p>
              <a href="/">Contact Us</a>
            </p>
            <p onClick={globalLogout}>
              <a>Logout</a>
            </p>
          </>
        ) : (
          <LandingPageLinks />
        )}
      </div>
    </div>
  );
};

export default Navbar;