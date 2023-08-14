import React, { useState } from "react";
import PreferenceFrom from "./PreferenceFrom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { callApi } from "../../../api/callApi";

const Preference = () => {
  const axiosPrivate = useAxiosPrivate();

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    genres: [],
    categories: [],
    languages: [],
  });

  const [message, setMessage] = useState("");

  const handleCheckBox = (field, value) => {
    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [field]: prevState[field].includes(value)
        ? prevState[field].filter((item) => item !== value)
        : [...prevState[field], value],
    }));

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      genre: selectedCheckboxes.genres,
      category: selectedCheckboxes.categories,
      language: selectedCheckboxes.languages,
    };

    try {
      const response = await callApi(
        axiosPrivate,
        "/user/preferences",
        "put",
        data
      );

      setMessage(response.data.message);

      setSelectedCheckboxes({
        genres: [],
        categories: [],
        languages: [],
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <PreferenceFrom
      handleSubmit={handleSubmit}
      handleCheckBox={handleCheckBox}
      message={message}
    />
  );
};

export default Preference;
