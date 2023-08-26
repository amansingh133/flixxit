import React, { useEffect, useState } from "react";
import { getConsumption } from "../utils/get-consumption";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import HistoryCard from "./HistoryCard";
import Message from "../../../pages/Message/Message";
import "../styles/History.css";

const History = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getConsumption(axiosPrivate, dispatch)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [axiosPrivate, dispatch]);

  const { items, error } = useSelector((state) => state.consumption);

  if (isLoading) {
    return <Message message="Loading..." />;
  }

  return (
    <div className="history-container">
      {error ? (
        <Message message={error} />
      ) : items.length === 0 ? (
        <Message message="You haven't viewed any content yet. Start flixxing now!" />
      ) : (
        items.map((item) => (
          <HistoryCard key={item.content._id} item={item.content} />
        ))
      )}
    </div>
  );
};

export default History;
