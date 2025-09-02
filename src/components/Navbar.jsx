import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = ({ username = "" }) => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>A</span>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <button
            className={styles.linkBtn}
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </li>
        <li>
          <button
            className={styles.linkBtn}
            onClick={() => navigate("/courses")}
          >
            Courses
          </button>
        </li>
        <li>
          <button
            className={styles.linkBtn}
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
        </li>
      </ul>
      <div className={styles.userSection}>
        <span className={styles.username}>{username}</span>
        {/* <button className={styles.logout}>Logout</button> */}
      </div>
    </nav>
  );
};

export default Navbar;