import styled from "styled-components";

export const GaugeWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: solid black 0px;
  border-radius: 50%;
  background: linear-gradient(
    to bottom,
    ${(props) => props.theme.$degradedColor} 25%,
    ${(props) => props.theme.$backgroundColor} 70%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterCircle = styled.div`
  position: relative;
  height: 81.86%;
  width: 81.86%;
  border-radius: 50%;
  background: ${(props) => props.theme.$backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterRing = styled.div`
  height: 60%;
  width: 60%;
  border-radius: 50%;
  border: solid 1px transparent;
  background: linear-gradient(${(props) => props.theme.$backgroundColor} 0 0)
      padding-box,
    linear-gradient(to bottom, white 35%, transparent 70%) border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  /* VALUE */
  font-size: ${(props) => props.theme.$fontSizeValue}vmin;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  z-index: 12;
  position: relative;
  color: ${(props) => props.theme.$textColor};

  /* UNIT OF MEASURE */
  span {
    position: absolute;
    top: 60%;
    right: 50%;
    transform: translateX(50%);
    font-size: ${(props) => props.theme.$fontSizeUnitOfMeasure}vmin;
    color: ${(props) => props.theme.$textColor};
  }
`;

export const GaugeTicks = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
`;

export const Tick = styled.div`
  position: absolute;
  width: ${({ size }) =>
    size === "large" ? "1.6%" : size === "medium" ? "1.6%" : "0.6%"};
  height: ${({ size }) =>
    size === "large" ? "7.5%" : size === "medium" ? "4.1%" : "4.1%"};

  background-color: white;
  left: calc(50%);
  top: 0;
  transform-origin: var(--tick-transform-origin);
  transform: translateX(-50%) rotate(calc(${(props) => props.rotation}deg));
  z-index: 10;
`;

export const AlarmArea = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
`;

export const Arrow = styled.div`
  z-index: 10;
  position: absolute;
  width: ${(props) => props.theme.$arrowWidth}%;
  height: 50%;
  background-color: ${(props) => props.theme.$arrowColor};
  left: calc(50%);
  // radio de desenfoque, color de la sombra
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  top: -0.8%;
  transform-origin: 50% 102.5%;
  transition: all ${({ animationDuration }) => animationDuration}ms linear;
  transform: rotate(${({ value }) => value}deg) translateX(-50%);
`;

export const WrapperIndicatorNumber = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const IndicatorNumber = styled.span`
  z-index: 50;
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  font-size: ${(props) => props.theme.$fontSizeIndicatorNumber}vmin;
  transform: translateX(-50%);
  color: ${(props) => props.theme.$textColor};
`;