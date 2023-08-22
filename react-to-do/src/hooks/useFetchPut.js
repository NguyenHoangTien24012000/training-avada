import axios from "axios";
import { useState } from "react";

export function useFetchPut(url) {
  const [putting, setPutting] = useState(false);
  const handleUpdate = async ({data={},updateSuccess=()=>{}, updateError=()=>{}}) => {
    try {
      setPutting(true);
      const res = await axios.put(url, data);
      const dataResponse = res.data;
      if(dataResponse.success){
        updateSuccess();
      }
      if(dataResponse.error){
        updateError();
      }
    } catch (error) {
        console.error(error.message)
    }finally{
        setPutting(false);
    }
  };
  return {putting, handleUpdate};
}
