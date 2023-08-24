import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../styles/Details.css";
import { callApi } from "../../../api/callApi";
import { formatDateTime } from "../utils/util-functions";

import SubscriptionInfo from "./Info";
import SubscriptionModal from "./SubscriptionModal";

const SubscriptionDetails = ({ details }) => {
  const axiosPrivate = useAxiosPrivate();
  const [openModal, setOpenModal] = useState(false);
  const [cancelDate, setCancelDate] = useState(null);

  const closeModal = () => {
    setOpenModal(false);
  };

  const cancelSubscription = async (subType) => {
    try {
      const res = await callApi(axiosPrivate, "/subscription/cancel", "post", {
        type: subType,
      });
      if (res.status === 200) {
        setOpenModal(true);
        const formatted = formatDateTime(res.data.cancellationDate);
        setCancelDate(formatted);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="subDetails-page">
      <h1>Subscription Details</h1>
      <div className="subDetails-body">
        <div className="subDetails-info">
          <SubscriptionInfo
            details={details}
            cancelSubscription={cancelSubscription}
          />
        </div>
      </div>
      <SubscriptionModal
        openModal={openModal}
        cancelDate={cancelDate}
        closeModal={closeModal}
      />
    </div>
  );
};

export default SubscriptionDetails;
