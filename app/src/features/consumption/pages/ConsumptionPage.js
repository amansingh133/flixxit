import React, { Suspense } from "react";
import Navbar from "../../../components/navbar/Navbar";
import History from "../components/History";
import Message from "../../../pages/Message/Message";
import "../styles/ConsumptionPage.css";

const ConsumptionPage = () => {
  return (
    <div className="consumption-history-page">
      <Navbar />

      <Suspense fallback={<Message message="Loading..." />}>
        <History />
      </Suspense>
    </div>
  );
};

export default ConsumptionPage;
