import React from "react";
import CheckboxGroup from "./CheckBoxGroup";
import "../styles/PreferenceForm.css";

const PreferenceForm = ({ handleSubmit, handleCheckBox }) => {
  const genreOptions = [
    { label: "Action", value: "Action" },
    { label: "Adventure", value: "Adventure" },
    { label: "Horror", value: "Horror" },
    { label: "Sci Fi", value: "Sci Fi" },
  ];

  const categoryOptions = [
    { label: "TV Shows", value: "TV Shows" },
    { label: "Movies", value: "Movies" },
  ];

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Korean", value: "Korean" },
    { label: "Spanish", value: "Spanish" },
  ];

  return (
    <div className="preference-page-container">
      <div className="preference-form-wrapper">
        <h1>Update Your Preferences</h1>
        <form className="preference-form" onSubmit={handleSubmit}>
          <CheckboxGroup
            title="Genres"
            options={genreOptions}
            field="genres"
            handleCheckBox={handleCheckBox}
          />
          <CheckboxGroup
            title="Categories"
            options={categoryOptions}
            field="categories"
            handleCheckBox={handleCheckBox}
          />
          <CheckboxGroup
            title="Languages"
            options={languageOptions}
            field="languages"
            handleCheckBox={handleCheckBox}
          />
          <button className="preference-button" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreferenceForm;
