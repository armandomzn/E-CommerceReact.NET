import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
  removeItem: (productId: string, quantity: number) => void;
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export const useStoreContext = () => {
  let context = useContext(StoreContext);
  //* El contexto debe estar dentro del provider para poder ser usado
  if (context === undefined) {
    throw new Error("Oops - we do not seem to be inside the provider");
  }
  return context;
};

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: string, quantity: number) => {
    //* Checamos si el basket existe
    if (!basket) {
      return;
    }
    //* Pasamos los items actuales a un nuevo arreglo
    const items = [...basket.items];
    //* Buscamos el producto dentro de los items y si coincide, disminuiremos uno
    const itemIndex = items.findIndex((item) => item.productId === productId);
    //* Si el indice es mayor a 0 o igual entonces restamos menos 1 a la cantidad, caso contrario el index sera -1 y quiere decir que no se encontro el producto
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      //* Comprobamos si la cantidad es igual o menor a 0
      if (items[itemIndex].quantity <= 0) {
        //* Si la cantidad es igual o menor a 0, entonces borramos el producto de los items y establecemos el nuevo basket sin el item
        items.splice(itemIndex, 1);
        setBasket((prev) => {
          return { ...prev!, items };
        });
      }
    }
  };

  return (
    <StoreContext.Provider value={{ removeItem, basket, setBasket }}>
      {children}
    </StoreContext.Provider>
  );
};
