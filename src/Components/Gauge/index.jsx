import { useState, useEffect } from "react";
import {
  CenterCircle,
  CenterRing,
  GaugeWrapper,
  GaugeTicks,
  Tick,
  AlarmArea,
  Arrow,
  IndicatorNumber,
  WrapperIndicatorNumber,
} from "./styles.js";
import { default as Area } from "../AlarmArea/index.jsx";
import { useGetHmiValues } from "../../Context/hooks.js";
import { scaleNumber, numberToBits } from "../../utils";
import { useRef } from "react";

const Gauge = () => {
  const [ticks, setTicks] = useState();
  const [indicatorNumbers, setIndicatorNumbers] = useState([]);
  const [scaledNumber, setScaledNumber] = useState(0);
  const [milliseconds, setMilliseconds] = useState(1050);
  const [alarmBypass, setAlarmBypass] = useState();
  const [limitsScaled, setLimitsScaled] = useState({
    endLL: 0,
    endL: 0,
    startH: 0,
    startHH: 0,
  });
  const { hmiData } = useGetHmiValues();
  const prevValueRef = useRef(hmiData.value);

  const totalTicks = 41; // Suponiendo que hay 41 ticks en total
  const middleTick = Math.floor(totalTicks / 2);
  const quarterTick = Math.floor(totalTicks / 4);
  const eighthTick = Math.floor(totalTicks / 8);

  useEffect(() => {
    document.body.style.backgroundColor = hmiData.backgroundColor;
  }, [hmiData.backgroundColor]);

  useEffect(() => {
    const range = +hmiData.maxValue - +hmiData.minValue;
    const quarterIndicator = Math.round(+hmiData.minValue + range / 4);
    const middleIndicator = Math.round(+hmiData.minValue + range / 2);
    const threeQuartersIndicator = Math.round(
      +hmiData.minValue + (3 * range) / 4
    );

    setIndicatorNumbers([
      +hmiData.minValue,
      quarterIndicator,
      middleIndicator,
      threeQuartersIndicator,
      +hmiData.maxValue,
    ]);
  }, [hmiData.minValue, hmiData.maxValue]);

  // Función para calcular el tamaño del tick
  const getTickSize = (index) => {
    // Comienza asumiendo que el tick es pequeño
    let tickSize = "small";

    // Comprueba si el tick es un tick grande
    if (index % middleTick === 0 || index % quarterTick === 0) {
      tickSize = "large";
    }
    // Si no es un tick grande, comprueba si es un tick mediano
    else if (index % eighthTick === 0) {
      tickSize = "medium";
    }

    // Retorna el tamaño del tick
    return tickSize;
  };

  const rotationIncrement = (120 - -120) / (totalTicks - 1);

  useEffect(() => {
    const Ticks = Array.from({ length: totalTicks }).map((_, index) => {
      const tickSize = getTickSize(index);

      return (
        <Tick
          key={index}
          rotation={-120 + rotationIncrement * index}
          size={tickSize}
        />
      );
    });

    setTicks(Ticks);
  }, []);

  useEffect(() => {
    const currentValueScaled = scaleNumber(
      hmiData.value,
      hmiData.minValue,
      hmiData.maxValue
    );
    setScaledNumber(currentValueScaled);

    // Calcula la diferencia porcentual en base al rango total
    const difference = hmiData.value - prevValueRef.current;
    const range = hmiData.maxValue - hmiData.minValue;
    const differencePercent = (Math.abs(difference) / range) * 100;

    console.log(differencePercent);

    // Asigna los milisegundos según la diferencia porcentual
    if (differencePercent >= 75) {
      setMilliseconds(300);
    } else if (differencePercent >= 50) {
      setMilliseconds(500);
    } else {
      setMilliseconds(1000);
    }

    // Actualiza el valor anterior para la próxima vez que se ejecute useEffect
    prevValueRef.current = hmiData.value;
  }, [hmiData.value, hmiData.minValue, hmiData.maxValue]);

  useEffect(() => {
    // Función para convertir un valor a porcentaje
    const valorAPorcentaje = (valor, min, max) => {
      return ((valor - min) * 100) / (max - min);
    };

    // Convertir los valores de las alarmas a porcentajes
    setLimitsScaled({
      endLL: valorAPorcentaje(
        hmiData.endLL,
        hmiData.minValue,
        hmiData.maxValue
      ),
      endL: valorAPorcentaje(hmiData.endL, hmiData.minValue, hmiData.maxValue),
      startH: valorAPorcentaje(
        hmiData.startH,
        hmiData.minValue,
        hmiData.maxValue
      ),
      startHH: valorAPorcentaje(
        hmiData.startHH,
        hmiData.minValue,
        hmiData.maxValue
      ),
    });
  }, [
    hmiData.endLL,
    hmiData.endL,
    hmiData.startH,
    hmiData.startHH,
    hmiData.minValue,
    hmiData.maxValue,
  ]);

  useEffect(() => {
    setAlarmBypass(numberToBits(hmiData.alarmBypass, limitsScaled));
  }, [hmiData.alarmBypass, limitsScaled]);

  return (
    <GaugeWrapper degradedColor={hmiData.degradedColor}>
      <CenterCircle>
        <WrapperIndicatorNumber>
          {indicatorNumbers.map((ele, index) => {
            const deg = 240 / 4;
            const positionsArray = [
              { top: 68, left: 13 },
              { top: 25, left: 14.5 },
              { top: 1.5, left: 50 },
              { top: 25, left: 85.5 },
              { top: 68, left: 86.5 },
            ];

            // Obtén los valores top y left para este elemento
            const position = positionsArray[index];

            return (
              <IndicatorNumber
                deg={deg}
                top={position.top}
                left={position.left}
                index={index + 1}
                key={index}
              >
                {ele}
              </IndicatorNumber>
            );
          })}
        </WrapperIndicatorNumber>
        <CenterRing>
          {parseFloat(hmiData.value?.toFixed(1))}
          <span>{hmiData.unitOfMeasure}</span>
        </CenterRing>
      </CenterCircle>
      <GaugeTicks>{ticks}</GaugeTicks>
      <AlarmArea>
        <Area
          color={"#ff2600"}
          start={0}
          end={limitsScaled.endLL}
          visible={alarmBypass?.LLEnabled}
        />
        <Area
          color={"#ffe307"}
          start={!alarmBypass?.LLEnabled ? 0 : limitsScaled.endLL}
          end={limitsScaled.endL}
          visible={
            alarmBypass?.LEnabled &&
            (limitsScaled.endLL < limitsScaled.endL || !alarmBypass?.LLEnabled)
          }
        />
        <Area
          color={"#ffe307"}
          start={limitsScaled.startH}
          end={!alarmBypass?.HHEnabled ? 100 : limitsScaled.startHH}
          visible={
            alarmBypass?.HEnabled &&
            (limitsScaled.startHH > limitsScaled.startH ||
              !alarmBypass?.HHEnabled) &&
            !limitsScaled.startH >= 0
          }
        />
        <Area
          color={"#ff2600"}
          start={limitsScaled.startHH}
          end={100}
          visible={alarmBypass?.HHEnabled && !limitsScaled.startHH <= 0}
        />
      </AlarmArea>
      <Arrow value={scaledNumber} animationDuration={milliseconds} />
    </GaugeWrapper>
  );
};

export default Gauge;
