export const scaleNumber = (
  inputNumber,
  minValue = 0,
  maxValue = 100,
  minOutput = -120,
  maxOutput = 120
) => {
  if (inputNumber <= minValue) return minOutput;
  else if (inputNumber >= maxValue) return maxOutput;
  // Ajustar el rango de entrada
  const adjustedInput = inputNumber - minValue;

  // Calcular el rango de entrada
  const inputRange = maxValue - minValue;

  // Calcular el rango de salida
  const outputRange = maxOutput - minOutput;

  // Escalar el número ajustado al nuevo rango de salida
  const outputNumber = minOutput + (adjustedInput / inputRange) * outputRange;

  return outputNumber;
};
