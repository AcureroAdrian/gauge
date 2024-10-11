import { useContext } from "react";
import { HMI_VALUE_CONTEXT } from "./HMI_VALUE";

export const useGetHmiValues = () => {
  return useContext(HMI_VALUE_CONTEXT);
};
