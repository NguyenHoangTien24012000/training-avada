import axios from "axios";
//@hoangtien biến k sử dụng thì remove đi nha tránh import thừa
import React, { useEffect, useState } from "react";
import { URL_BASE } from "../config/constants";

//@hoangtien chỗ này nên đặt tên có thể dùng cho nhiều Th tránh hiểu lầm VD: useFetch,useFetchApi
export default function useFetchToDo() {
  const [loading, setLoading] = useState(false);
  //@hoangtien đây cũng thế tách ra thành hook rồi mình sử dụng lại ở nhiều nơi ko nên để 1 ý nghĩ ntn
  const [tasks, setTasks] = useState([]);
  //@hoangtien
  async function loadTodoes() {
    try {
      setLoading(true);
      //@hoangtien mình nên truyền url vào hook, nếu đều ntn thì sẽ chỉ dùng cho được 1 api tasks https://i.imgur.com/MkFJ1Gp.png
      const res = await axios.get(`${URL_BASE}/tasks`);
      //@hoangtien để ý kiểm tra trc khi dùng object destructuring sẽ lỗi nếu ko có res.data
      const { data } = res.data;
      setTasks(data);
    } catch (error) {
      console.error("Get all task failed ", error.message);
    } finally {
      setLoading(false);
    }
  }

  //@hoangtien chỗ này nếu muốn fetch lại data khi có state nào thay đổi thì xử lý ntn
  useEffect(() => {
    loadTodoes();
  }, []);

  return [tasks, setTasks, loading];
}
