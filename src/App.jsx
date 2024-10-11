import Gauge from "./Components/Gauge";
import { useGetHmiValues } from "./Context/hooks";
import { GlobalStyle } from "./GlobalStyles";
import { ThemeProvider } from "styled-components";

function App() {
  const { hmiData } = useGetHmiValues();

  const theme = {
    $degradedColor: hmiData.degradedColor,
    $backgroundColor: hmiData.backgroundColor,
    $textColor: hmiData.textColor,
    $fontSizeValue: hmiData.fontSizeValue,
    $fontSizeUnitOfMeasure: hmiData.fontSizeUnitOfMeasure,
    $fontSizeIndicatorNumber: hmiData.fontSizeIndicatorNumber,
    $arrowColor: hmiData.arrowColor,
    $arrowWidth: hmiData.arrowWidth,
  };

  return (
    <ThemeProvider theme={theme}>
      <Gauge />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
