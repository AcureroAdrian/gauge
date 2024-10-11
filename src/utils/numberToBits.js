export const numberToBits = (number, limitsScaled) => {
  // Validación de limitsScaled para asegurar que es un objeto con las propiedades esperadas
  if (!limitsScaled || typeof limitsScaled !== "object") {
    throw new Error("limitsScaled must be a valid object with the expected properties.");
  }

  let isTrue = false;
  let isFalse = false;

  // Comprobar y normalizar solo si number es un string
  if (typeof number === "string") {
    const lowerCaseNumber = number.toLowerCase();
    isTrue = lowerCaseNumber === "true";
    isFalse = lowerCaseNumber === "false";
  }

  if (isTrue) {
    return {
      HHEnabled: limitsScaled.startHH > 0,
      HEnabled: limitsScaled.startH > 0,
      LEnabled: limitsScaled.endL > 0,
      LLEnabled: limitsScaled.endLL > 0,
    };
  } else if (isFalse) {
    // isFalse solo se necesita aquí, para especificar todos falsos directamente
    return {
      HHEnabled: false,
      HEnabled: false,
      LEnabled: false,
      LLEnabled: false,
    };
  }

  // Ahora manejamos el caso de los números
  const numericValue = Number(number);
  if (isNaN(numericValue) || numericValue < 0 || numericValue > 255) {
    // Si no es un número válido, regresa todo false
    return {
      HHEnabled: false,
      HEnabled: false,
      LEnabled: false,
      LLEnabled: false,
    };
  }

  // Conversión a binario y asignación de valores basados en bits específicos y limitsScaled
  let bits = numericValue.toString(2).padStart(8, '0');
  return {
    HHEnabled: bits[6] === '1' && limitsScaled.startHH > 0,
    HEnabled: bits[5] === '1' && limitsScaled.startH > 0,
    LEnabled: bits[4] === '1' && limitsScaled.endL > 0,
    LLEnabled: bits[3] === '1' && limitsScaled.endLL > 0,
  };
};
