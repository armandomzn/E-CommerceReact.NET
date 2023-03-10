import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import Header from "./Header";
import "./styles.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/utils";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import { Basket } from "../models/basket";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const getBasket = async () => {
      setLoading(true);
      try {
        //* Si el cookie del comprador existe, entonces recuperamos el basket
        const buyerId = getCookie("buyerId");
        if (buyerId) {
          const basket: Basket = await agent.Basket.get();
          dispatch(setBasket(basket));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getBasket();
    //* Pasamos la funcion como dependencia para que useEffect utilice la version mas actualizada de la funcion.
    //* Si no se volviera a ejecutar el useEffect con la funcion actualizada, la funcion utilizaria informacion del estado obsoleta.
    //* De esta forma garantizamos que useEffect usa la version mas reciente de la funcion
    //* En cada renderizado la funcion sera redefinida, el efecto se llamara en cada render
  }, [dispatch]);

  if (loading) return <LoadingComponent message="Initializing app..." />;

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
