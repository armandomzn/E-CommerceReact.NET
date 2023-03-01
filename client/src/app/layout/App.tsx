import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import Header from "./Header";
import "./styles.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const changeDarkMode = () => {
    setDarkMode((prev) => {
      return !prev;
    });
  };
  const theme = createTheme({
    palette: {
      background: {
        default: darkMode ? "#121212" : "#eaeaea",
      },
      mode: darkMode ? "dark" : "light",
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          theme="colored"
        />
        <CssBaseline />
        <Header changeDarkMode={changeDarkMode} darkMode={darkMode} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
