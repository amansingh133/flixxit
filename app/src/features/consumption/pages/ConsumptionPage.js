import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import History from "../components/History";

const ConsumptionPage = () => {
  return (
    <div className="consumption-history-page">
      <Navbar />

      <History />
    </div>
  );
};

export default ConsumptionPage;
