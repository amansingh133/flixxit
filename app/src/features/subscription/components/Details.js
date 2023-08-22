import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../styles/Details.css";
import { callApi } from "../../../api/callApi";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter, formatDateTime } from "../utils/util-functions";
import RedirectModal from "../../../components/modal/components/RedirectModal";

const SubscriptionDetails = ({ details }) => {
  const axiosPrivate = useAxiosPrivate();
  const [openModal, setOpenModal] = useState(false);
  const [cancelDate, setCancelDate] = useState(null);

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
          <div className="subDetails-details">
            <h2>{details.email}</h2>

            <div className="subDetails-container">
              <div className="details-wrapper">
                <div className="indi-detail">
                  <h5 className="detail-type">Subscription Type</h5>
                  <h5 className="detail-value">
                    {capitalizeFirstLetter(details.subscriptionType)}
                  </h5>
                </div>
                <div className="indi-detail">
                  <h5 className="detail-type">Subscription Date</h5>
                  <h5 className="detail-value">
                    {formatDateTime(details.paymentDate)}
                  </h5>
                </div>
                <div className="indi-detail">
                  <h5 className="detail-type">Expiration Date</h5>
                  <h5 className="detail-value">
                    {formatDateTime(details.expirationDate)}
                  </h5>
                </div>
              </div>

              <div className="subDetails-buttons-container">
                <button
                  className="subDetails-buttons"
                  onClick={() => cancelSubscription(details.subscriptionType)}
                >
                  Cancel Subscription
                </button>
                <Link
                  className="subDetails-buttons"
                  to="/subscription/plans"
                  state={{ planDetails: details }}
                >
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <RedirectModal
          message={`Subscription cancelled! Date: ${cancelDate} `}
          linkTo="/profile"
          linkText="Profile"
          openModal={openModal}
        />
      )}
    </div>
  );
};

export default SubscriptionDetails;
