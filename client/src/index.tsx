import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Routes";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StoreProvider } from "./app/context/StoreContext";
import { store } from "./app/store/configureStore";
import { Provider } from "react-redux";
import { fetchProductsAsync } from "./features/catalog/catalogSlice";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

store.dispatch(fetchProductsAsync());

root.render(
  <React.StrictMode>
    <StoreProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StoreProvider>
  </React.StrictMode>
);
