import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';
import logo from '../../assets/logo-2.png';

const LandingPageLinks = () => (
	<React.Fragment>
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
            <Link to='/signup'>
			    Sign Up
            </Link>
		</p>
	</React.Fragment>
);

const Navbar = ({ user, globalLogout }) => {

	const logout = () => {
		globalLogout();
	}
	
	return (
		<div className={styles.landingNavbar}>
			<div className={styles.landingNavbarLogo}>
				<img src={logo} alt="kitchen-logo" />
			</div>
			<div className={styles.landingNavbarLinks}>
				{user ? (
					<React.Fragment>
						<p>
							<a href="/">Home</a>
						</p>
						<p>
							<a href="/">Recipes</a>
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
						<p onClick={logout}>
							<a>Logout</a>
						</p>
					</React.Fragment>
				) : (
					<LandingPageLinks />
				)}
			</div>
		</div>
	);
};

export default Navbar;