import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "../../Firebase";
import styles from "./Edit.module.css";

import Navbar from "../Navbar/Navbar";

const Edit = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Hello Edit</h1>
      </main>
    </div>
  );
};

export default Edit;
