import React, { useEffect, useState } from "react";
import { getConsumption } from "../utils/get-consumption";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const History = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConsumption(axiosPrivate, dispatch)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [axiosPrivate, dispatch]);

  const { items, error } = useSelector((state) => state.consumption);

  return <div className="history-container">history</div>;
};

export default History;
