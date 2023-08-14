import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Preference from "../components/Preference";
import "../styles/PreferencePage.css";

const Preferences = () => {
  return (
    <div className="preferences-page">
      <Navbar />
      <Preference />
    </div>
  );
};

export default Preferences;
