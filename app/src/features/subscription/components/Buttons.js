import React from "react";
import { Link } from "react-router-dom";
import { memo } from "react";

const SubscriptionButtons = memo(({ details, cancelSubscription }) => {
  return (
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
  );
});

export default SubscriptionButtons;
