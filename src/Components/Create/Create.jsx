import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
    console.log(`${title} ${description}`);
    history.push("/");
  };
  return (
    <div>
      <Navbar />
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
    </div>
  );
};

export default Create;
