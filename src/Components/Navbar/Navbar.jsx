import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li className={styles.navLinks}>
          <div className={styles.title}>
            <i className="fas fa-code"></i>
            <p>Blog Site</p>
          </div>
        </li>
        <li className={styles.navLinks}>
          <a href="/">Home</a>
        </li>
        <li className={styles.navLinks}>
          <a href="/create">New Post</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
