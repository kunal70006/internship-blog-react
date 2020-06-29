import React from "react";
import styles from "./LandingPage.module.css";

import Navbar from "../Navbar/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div className={styles.outerContainer}>
          <h1 id="blog-site">Blog Site</h1>
          <div className={styles.innerContainer}>
            <div className={styles.blog}>
              <img
                src="https://images.unsplash.com/photo-1593304218784-7fffc5cbf5fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                alt="img"
                className={styles.image}
              />
              <div className={styles.textContainer}>
                <h1 className={styles.heading}>Lorem ipsum dolor sit amet.</h1>
                <p className={styles.date}>Sat June 2020</p>
                <p className={styles.desc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eveniet fuga cupiditate optio dolorem esse distinctio
                  magnam, ipsa nostrum ratione?
                </p>
                <button className={styles.readMoreBtn}>
                  <span>
                    Read More <i className="fas fa-chevron-right"></i>
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.blog}>
              <img
                src="https://images.unsplash.com/photo-1593344576957-ec803c334d24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                alt="img"
                className={styles.image}
              />
              <div className={styles.textContainer}>
                <h1 className={styles.heading}>Lorem ipsum dolor sit amet.</h1>
                <p className={styles.date}>Sat June 2020</p>
                <p className={styles.desc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eveniet fuga cupiditate optio dolorem esse distinctio
                  magnam, ipsa nostrum ratione?
                </p>
                <button className={styles.readMoreBtn}>
                  <span>
                    Read More <i className="fas fa-chevron-right"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
