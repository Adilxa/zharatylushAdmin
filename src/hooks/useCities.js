import { collection, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";

const useCities = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getCities = useCallback( async () => {
    const arr = [];
    const data = await getDocs(collection(db, "cities"));
    data.forEach((doc) => {
      arr.push({ cid: doc.id, ...doc.data() });
    });
    setCities(arr)
    setLoading(false);
  }, []);

  return { isLoading, cities, getCities, setLoading };
};

export default useCities;
