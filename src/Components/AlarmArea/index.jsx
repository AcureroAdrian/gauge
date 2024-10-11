import { useEffect, useState } from "react";
import { Area } from "./styles";
import { useGetHmiValues } from "../../Context/hooks";

const percentToDegrees = (percent) => {
  // Convertimos el porcentaje en grados dentro del rango -210 a 30
  return (percent / 100) * 240 - 210;
};

const lengthPercent = (startDegrees, endDegrees) => {
  const difference = endDegrees - startDegrees;
  return difference * 2.01 + 300;
};

const AlarmArea = ({ color, start, end, visible }) => {
  const [startDegrees, setStartDegrees] = useState();
  const [widthArea, setWidthArea] = useState();
  const { hmiData } = useGetHmiValues();

  const limitValue = (value) => {
    if (value < 0) {
      return 0;
    } else if (value > 100) {
      return 100;
    } else {
      return value;
    }
  };

  useEffect(() => {
    start = limitValue(start);
    end = limitValue(end);
    setStartDegrees(percentToDegrees(start));
    setWidthArea(lengthPercent(start, end));
  }, [hmiData.minValue, hmiData.maxValue, start, end]);

  lengthPercent(start, end);

  return (
    <Area
      startdegrees={startDegrees}
      display={!visible ? "none" : "initial"}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <circle
        r="48%"
        cx="50%"
        cy="50%"
        strokeDasharray={`${widthArea}%`}
        stroke={color}
      />
    </Area>
  );
};

export default AlarmArea;
