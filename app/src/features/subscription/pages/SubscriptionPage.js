import React, { useEffect, useState } from "react";
import "../styles/SubscriptionPage.css";

import Navbar from "../../../components/navbar/Navbar";
import SubscriptionDetails from "../components/Details";
import Subscribe from "../components/Subscribe";
import { callApi } from "../../../api/callApi";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const SubscriptionPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [subscriptionDetails, setSubcriptionDetails] = useState({});

  useEffect(() => {
    callApi(axiosPrivate, "/subscription/status", "get")
      .then((res) => setSubcriptionDetails(res.data))
      .catch((error) => console.error(error));
  }, [axiosPrivate]);

  return (
    <div className="subscription-page">
      <Navbar />

      <div className="subscription-container">
        {subscriptionDetails.isSubscribed ? (
          <SubscriptionDetails details={subscriptionDetails} />
        ) : (
          <Subscribe details={subscriptionDetails} />
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
