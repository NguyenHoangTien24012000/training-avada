import axios from "axios";
import { useState } from "react";

export function useFetchDelete(url) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async ({
    data,
    deleteSuccess = () => {},
    deleteError = () => {},
  }) => {
    try {
      setDeleting(true);
      const res = await axios.delete(url, {data});
      const dataResponse = res.data;
      if(dataResponse.success){
        deleteSuccess();
      }
      if(dataResponse.error){
        deleteError();
      }
    } catch (error) {
        console.error(error.message)
    }finally{
        setDeleting(false);
    }
  };
  return {deleting, handleDelete}
}
