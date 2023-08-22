import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import "../styles/Plans.css";
import { callApi } from "../../../api/callApi";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import RedirectModal from "../../../components/modal/components/RedirectModal";
import { capitalizeFirstLetter } from "../utils/util-functions";

const Plans = () => {
  const plans = [{ monthly: 99 }, { yearly: 999 }];
  const [openModal, setOpenModal] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const planDetail = location.state?.planDetails || false;

  const handleSubscription = async (key) => {
    try {
      const res = await callApi(
        axiosPrivate,
        "/subscription/subscribe",
        "post",
        {
          type: key,
        }
      );
      if (res.status === 200) {
        setOpenModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="plans-container">
      <Navbar />
      {plans.map((plan, index) => (
        <div key={index}>
          {Object.entries(plan).map(([key, value]) => (
            <div key={key} className="plan-container">
              <h3>{capitalizeFirstLetter(key)}</h3>
              <h4>{`\u20B9 ${value}`}</h4>
              <button
                className="plan-button"
                onClick={() => handleSubscription(key)}
                disabled={planDetail.isSubscribed}
              >
                {planDetail?.isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      ))}
      {openModal && (
        <RedirectModal
          message="Subscription successful! You can view the details here."
          linkTo="/subscription/details"
          linkText="Details"
          openModal={openModal}
        />
      )}
    </div>
  );
};

export default Plans;
