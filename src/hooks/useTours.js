import { useCallback, useEffect, useState } from "react";
import $api from "../http/Api";

const useTours = () => {
  const [error, setError] = useState("");
  const [tours, setTours] = useState([]);
  const [tourDetail, setTourDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getTours = useCallback(async () => {
    await $api.get("tour").then((res) => setTours(res.data));
    setLoading(false);
  }, []);

  // const addTour = async (data) => {
  //   const res = await addDoc(collection(db, "tours"), {
  //     ...data,
  //     createdAt: Timestamp.fromDate(new Date()),
  //   });
  //   return res;
  // };

  const getTourDetail = async (id) => {
    const res = await $api.get("tour/" + id);

    setLoading(false);
    if (res) {
      setTourDetail(res.data);
    } else {
      setError("Данный тур не найден!");
    }
  };

  // const updateTour = async (id, data) => {
  //   const ref = doc(db, "tours", id);
  //   const res = await updateDoc(ref, data);
  //   return res;
  // };

  useEffect(() => {
    getTours()
  } , [])

  return {
    isLoading,
    tours,
    getTours,
    // addTour,
    tourDetail,
    getTourDetail,
    error,
    // updateTour,
  };
};

export default useTours;
