import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../Firebase";
import styles from "./LandingPage.module.css";

import Navbar from "../Navbar/Navbar";

const LandingPage = () => {
  //Data from server will be stored in "blogs"
  const [blogs, setBlogs] = useState([]);

  const history = useHistory();

  useEffect(() => {
    //Data will be set here when page first loads
    let tempItems = [];

    firebase
      .firestore()
      .collection("items")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const itemObj = {
            title: doc.data().name,
            description: doc.data().description,
            imageUrl: doc.data().imageUrl,
            id: doc.id,
          };
          tempItems.push(itemObj);
        });
      })
      .then(() => {
        setBlogs(tempItems);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <div className={styles.outerContainer}>
          <h1 id="blog-site">Blog Site</h1>
          <div className={styles.innerContainer}>
            {blogs.map((blog) => {
              return (
                <div className={styles.blog}>
                  <img src={blog.imageUrl} alt="img" className={styles.image} />
                  <div className={styles.textContainer}>
                    <h1 className={styles.heading}>{blog.title}</h1>
                    <p className={styles.date}>Sat June 2020</p>
                    <p className={styles.desc}>{blog.description}</p>
                    <button
                      className={styles.readMoreBtn}
                      onClick={() => {
                        history.push({
                          pathname: "/show",
                          id: blog.id,
                        });
                      }}
                    >
                      <span>
                        Read More <i className="fas fa-chevron-right"></i>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
