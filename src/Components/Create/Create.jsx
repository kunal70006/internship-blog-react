import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase, { storage } from "../../Firebase";
import styles from "./Create.module.css";

import Navbar from "../Navbar/Navbar";

const Create = () => {
  const [image, setImage] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  const today = new Date();
  const date = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`;

  const selectImage = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handlePost = (event) => {
    //TODO send files to server
    event.preventDefault();
    var date = new Date().toISOString();
    const uploadTask = storage.ref(`images/${date}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
      },
      (error) => {
        //error handler
        alert(error.code + error.message);
      },
      () => {
        //completion function
        storage
          .ref("images")
          .child(date)
          .getDownloadURL()
          .then((url) => {
            const itemObj = {
              name: title,
              description: description,
              imageUrl: url,
            };

            firebase.firestore().collection("items").add(itemObj);
          })
          .then(() => {
            history.push("/");
          });
      }
    );
    console.log(`${title} ${description}`);
  };
  return (
    <div>
      <Navbar />
      <main>
        <div className={styles.container}>
          <h1 className={styles.heading}>Create a new post</h1>
          <input
            type="text"
            className={styles.inputs}
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <textarea
            name="desc"
            className={styles.inputs}
            cols="30"
            rows="5"
            placeholder="Description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          ></textarea>

          <p>Upload an Image</p>
          <input
            type="file"
            accept="image/*"
            className={styles.imageSelector}
            onChange={(event) => selectImage(event)}
          />
          <button className={styles.postBtn} onClick={handlePost}>
            Post!
          </button>
        </div>
      </main>
    </div>
  );
};

export default Create;
