import axios from "axios";
import { useEffect, useState } from "react";

export function useFetchGet(url) {
  const [getting, setGetting] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  async function getData() {
    try {
      setGetting(true);
      const res = await axios.get(url);
      const dataResponse = res.data;
      if (dataResponse.success) {
        const { data } = dataResponse;
        setData(data);
        setError(false);
      }
      if (dataResponse.error) {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error("Get all task failed ", error.message);
    } finally {
      setGetting(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return { data, setData, error, getting };
}
