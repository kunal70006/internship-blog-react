import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "../../Firebase";
import styles from "./Show.module.css";

import Navbar from "../Navbar/Navbar";

const Show = () => {
  const history = useHistory();
  const location = useLocation();

  const [currentBlog, setCurrentBlog] = useState({
    name: "",
    description: "",
    imageUrl: "",
    id: "",
  });

  useEffect(() => {
    if (typeof location.id === "undefined") {
      let id = sessionStorage.getItem("blogID");
      firebase
        .firestore()
        .collection("items")
        .doc(id)
        .get()
        .then((data) => {
          setCurrentBlog(data.data());
        });
    } else {
      sessionStorage.setItem("blogID", location.id);
      firebase
        .firestore()
        .collection("items")
        .doc(location.id)
        .get()
        .then((data) => {
          setCurrentBlog(data.data());
        });
    }
  }, []);

  const deleteItem = () => {
    if (typeof location.id === "undefined") {
      let id = sessionStorage.getItem("blogID");
      firebase
        .firestore()
        .collection("items")
        .doc(id)
        .delete()
        .then(() => {
          history.push("/");
        });
    } else {
      sessionStorage.setItem("blogID", location.id);
      firebase
        .firestore()
        .collection("items")
        .doc(location.id)
        .delete()
        .then(() => {
          history.push("/");
        });
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className={styles.container}>
          <h1 className={styles.heading}>Blog</h1>
          <div className={styles.innerContainer}>
            <h1 className={styles.title}>{currentBlog.name}</h1>
            <p className={styles.desc}>{currentBlog.description}</p>
            <img
              className={styles.img}
              src={currentBlog.imageUrl}
              alt={currentBlog.title}
            />
          </div>
          <div className={styles.btnContainer}>
            <button
              className={styles.Btns}
              onClick={() =>
                history.push({ pathname: "/edit", id: currentBlog.id })
              }
            >
              Edit
            </button>
            <button className={styles.Btns} onClick={() => deleteItem()}>
              Delete
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Show;
