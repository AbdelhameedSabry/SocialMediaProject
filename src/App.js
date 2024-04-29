import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Interceptor from "./components/Interceptor";

function App() {
  const [mode, setMode] = useState("dark");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <BrowserRouter>
      <UserProvider>
        <Interceptor>
          <ThemeProvider theme={darkTheme}>
            <Router setMode={setMode} mode={mode} />
          </ThemeProvider>
        </Interceptor>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
