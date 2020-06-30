import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import firebase, { storage } from "../../Firebase";
import styles from "./Edit.module.css";

import Navbar from "../Navbar/Navbar";

const Edit = () => {
  const history = useHistory();
  const location = useLocation();

  const [currentBlog, setCurrentBlog] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const [tempItem, setTempItem] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const [isTitleFieldDisabled, setIsTitleFieldDisabled] = useState(true);
  const [isDescFieldDisabled, setIsDescFieldDisabled] = useState(true);

  const [newImage, setNewImage] = useState({});

  const getItemDetails = (id) => {
    firebase
      .firestore()
      .collection("items")
      .doc(id)
      .get()
      .then((snapshot) => {
        setCurrentBlog(snapshot.data());
        setTempItem(snapshot.data());
      });
  };

  useEffect(() => {
    if (typeof location.id === "undefined") {
      let id = sessionStorage.getItem("blogID");
      getItemDetails(id);
    } else {
      sessionStorage.setItem("blogID", location.id);
      getItemDetails(location.id);
    }
  }, []);

  const handleTextFieldChange = (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      switch (event.target.placeholder) {
        case "Placeholder name":
          setIsTitleFieldDisabled(!isTitleFieldDisabled);
          break;
        case "Placeholder desc":
          setIsDescFieldDisabled(!isDescFieldDisabled);
          break;
      }
    }
  };

  const changeImage = (event) => {
    if (event.target.files[0]) {
      setNewImage(event.target.files[0]);
    }
  };

  const submitChanges = () => {
    var date = new Date().toISOString();
    const uploadTask = storage.ref(`images/${date}`).put(newImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
      },
      (error) => {
        //error handler
        alert(error.code, error.message);
      },
      () => {
        //completion function
        storage
          .ref("images")
          .child(date)
          .getDownloadURL()
          .then((url) => {
            console.log("URL=", url);
            setTempItem({
              name: tempItem.name,
              description: tempItem.description,
              imageUrl: url,
            });

            const itemObj = {
              name: tempItem.name,
              description: tempItem.description,
              imageUrl: url,
            };
            firebase
              .firestore()
              .collection("items")
              .doc(sessionStorage.getItem("blogID"))
              .update(itemObj);
            storage
              .refFromURL(currentBlog.imageUrl)
              .delete()
              .then(() => {
                console.log(
                  "File on link ",
                  currentBlog.imageUrl,
                  " has been deleted"
                );
              });
          });
      }
    );
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className={styles.editContainer}>
          <h1 className={styles.title}>Edit Item</h1>
          <div className={styles.itemDiv}>
            <textarea
              cols="40"
              rows="5"
              disabled={isTitleFieldDisabled}
              placeholder={"Placeholder name"}
              className={styles.textField}
              onChange={(event) => {
                setTempItem({
                  name: event.target.value,
                  description: tempItem.description,
                  imageUrl: tempItem.imageUrl,
                });
              }}
              value={tempItem.name}
              onKeyPress={handleTextFieldChange}
            ></textarea>
            <button
              className={styles.editBtn}
              onClick={() => setIsTitleFieldDisabled(!isTitleFieldDisabled)}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>

          <div className={styles.itemDiv}>
            <textarea
              cols="40"
              rows="20"
              disabled={isDescFieldDisabled}
              placeholder={"Placeholder desc"}
              className={styles.textField}
              onChange={(event) => {
                setTempItem({
                  name: tempItem.name,
                  description: event.target.value,
                  imageUrl: tempItem.imageUrl,
                });
              }}
              value={tempItem.description}
              onKeyPress={handleTextFieldChange}
            ></textarea>
            <button
              className={styles.editBtn}
              onClick={() => setIsDescFieldDisabled(!isDescFieldDisabled)}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>

          <img src={tempItem.imageUrl} className={styles.img} alt="name" />
          <input
            type="file"
            accept="image/*"
            className={styles.imgChange}
            onChange={(event) => changeImage(event)}
          />

          <button
            onClick={() => submitChanges()}
            className={styles.submitChanges}
          >
            Submit Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default Edit;
