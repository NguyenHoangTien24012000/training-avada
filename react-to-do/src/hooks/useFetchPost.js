import axios from "axios";
import { useState } from "react";

export function useFetchPost(url) {
  const [creating, setCreating] = useState(false);
  const handleCreate = async ({
    data = {},
    createSuccess = () => {},
    createError = () => {},
  }) => {
    try {
      setCreating(true);
      const res = await axios.post(url, data);
      const dataResponse = res.data;
      if (dataResponse.success) {
        const { data } = dataResponse;
        //@hoangtien chỗ này đâu cần await nhỉ. Nếu TH là Promise thì nên để ntn https://i.imgur.com/AVd1CMn.png
        await createSuccess(data);
      }
      if (dataResponse.error) {
        await createError();
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setCreating(false);
    }
  };
  return { creating, handleCreate };
}
