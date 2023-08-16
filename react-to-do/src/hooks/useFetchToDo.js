import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL_BASE } from "../config/constants";

export default function useFetchToDo() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  async function loadTodoes() {
    try {
      setLoading(true);
      const res = await axios.get(`${URL_BASE}/tasks`);
      const { data } = res.data;
      setTasks(data);
    } catch (error) {
      console.error("Get all task failed ", error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadTodoes();
  }, []);


  return [tasks, setTasks, loading];
}


