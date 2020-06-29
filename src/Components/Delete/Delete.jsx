import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "../../Firebase";
import styles from "./Delete.module.css";

import Navbar from "../Navbar/Navbar";

const Delete = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Hello del</h1>
      </main>
    </div>
  );
};

export default Delete;
