import { useState, useEffect, createContext } from "react";
import { HMI_VALUE_PROPERTY_NAMES } from "../Constants";

export const HMI_VALUE_CONTEXT = createContext({});

const getDefaultValues = () => {
  const defaultValues = {};
  for (const key in HMI_VALUE_PROPERTY_NAMES) {
    const { propertyName, defaultValue } = HMI_VALUE_PROPERTY_NAMES[key];

    const parsedValue = parseFloat(defaultValue);
    const value = !isNaN(parsedValue) && parsedValue.toString() === defaultValue.toString() 
                   ? parsedValue 
                   : defaultValue;

    defaultValues[propertyName] = value;
  }
  return defaultValues;
};

const updateHMIValue = (prevValues, data) => {
  for (let index = 0; index < data.length; index++) {
    if (index in HMI_VALUE_PROPERTY_NAMES && data[index]) {
      const { propertyName } = HMI_VALUE_PROPERTY_NAMES[index];

      // Intentar convertir el valor a un número flotante
      const parsedValue = parseFloat(data[index]);
      const isNumber = !isNaN(parsedValue) && parsedValue.toString() === data[index];

      prevValues = {
        ...prevValues,
        [propertyName]: isNumber ? parsedValue : data[index],
      };
    }
  }
  return prevValues;
};

export const HMI_VALUE_PROVIDER = ({ children }) => {
  const [hmiData, setHmiData] = useState(getDefaultValues());

  // Función manejadora que se invoca cuando hay una señal de HMI
  const handleHMIDataSignal = (data) => {
    setHmiData((prev) => updateHMIValue(prev, data));
  };

  // Efecto para asignar y limpiar la función global OnHMIDataSignal
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.Values) {
        handleHMIDataSignal(window.Values);
      }
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <HMI_VALUE_CONTEXT.Provider value={{ hmiData }}>
      {children}
    </HMI_VALUE_CONTEXT.Provider>
  );
};
