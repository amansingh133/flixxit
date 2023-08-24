import React, { useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import "../styles/SearchForm.css";
import { AiOutlineSearch, AiFillCloseCircle } from "react-icons/ai";
import { handleSearch } from "../utils/handle-search";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../slices/search-slice";
import { resetSearch, clearInput } from "../utils/clear-search";

const SearchForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { focused, query } = useSelector((state) => state.search);

  const debouncedSearch = useDebounce(() => {
    handleSearch(dispatch, query);
  }, 3000);

  return (
    <div className="search-input-container">
      {focused ? (
        <AiFillCloseCircle
          color="#fff"
          size={50}
          className="search-icon"
          cursor="pointer"
          onClick={() => resetSearch(dispatch)}
        />
      ) : (
        <AiOutlineSearch
          color="#e50914"
          size={40}
          className="search-icon"
          onClick={() => inputRef.current.focus()}
          cursor="pointer"
        />
      )}
      <input
        ref={inputRef}
        className={`search-input ${focused ? "focused" : ""}`}
        type="text"
        name="query"
        id="query"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          dispatch(setQuery(e.target.value));
          debouncedSearch();
        }}
        autoComplete="off"
      />

      {query && (
        <p
          className={`clear-search ${query ? "visible" : ""}`}
          onClick={() => {
            clearInput(dispatch);
          }}
        >
          CLEAR
        </p>
      )}
    </div>
  );
};

export default SearchForm;
