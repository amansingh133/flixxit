import React from "react";
import Watchlist from "../components/WatchList";
import Navbar from "../../../components/navbar/Navbar";
import "../styles/Watchlist.css";

const WatchlistPage = () => {
  return (
    <div className="watchlist-wrapper">
      <Navbar />

      <Watchlist />
    </div>
  );
};

export default WatchlistPage;
