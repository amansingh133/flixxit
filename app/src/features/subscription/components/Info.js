import React from "react";
import { capitalizeFirstLetter, formatDateTime } from "../utils/util-functions";
import SubscriptionButtons from "./Buttons";

const SubscriptionInfo = ({ details, cancelSubscription }) => {
  return (
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
        <SubscriptionButtons
          details={details}
          cancelSubscription={cancelSubscription}
        />
      </div>
    </div>
  );
};

export default SubscriptionInfo;
