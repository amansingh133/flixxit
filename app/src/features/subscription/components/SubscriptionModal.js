import React from "react";
import RedirectModal from "../../../components/modal/components/RedirectModal";
import { memo } from "react";

const SubscriptionModal = memo(({ openModal, cancelDate, closeModal }) => {
  return (
    <>
      {openModal && (
        <RedirectModal
          message={`Subscription cancelled! Date: ${cancelDate} `}
          linkTo="/profile"
          linkText="Profile"
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
    </>
  );
});

export default SubscriptionModal;
