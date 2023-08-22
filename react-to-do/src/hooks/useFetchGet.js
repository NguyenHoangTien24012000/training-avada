import axios from "axios";
//@hoangtien biến k sử dụng thì remove đi nha tránh import thừa
import { useEffect, useState } from "react";

//@hoangtien chỗ này nên đặt tên có thể dùng cho nhiều Th tránh hiểu lầm VD: useFetch,useFetchApi
export function useFetchGet(url) {
  const [getting, setGetting] = useState(false);
  //@hoangtien đây cũng thế tách ra thành hook rồi mình sử dụng lại ở nhiều nơi ko nên để 1 ý nghĩ ntn
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  //@hoangtien
  async function getData() {
    try {
      setGetting(true);
      //@hoangtien mình nên truyền url vào hook, nếu đều ntn thì sẽ chỉ dùng cho được 1 api tasks https://i.imgur.com/MkFJ1Gp.png
      const res = await axios.get(url);
      const dataResponse = res.data;
      //@hoangtien để ý kiểm tra trc khi dùng object destructuring sẽ lỗi nếu ko có res.data
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
  //@hoangtien chỗ này nếu muốn fetch lại data khi có state nào thay đổi thì xử lý ntn
  useEffect(() => {
    getData();
  }, []);

  return { data, setData, error, getting };
}
