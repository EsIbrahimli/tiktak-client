// src/common/hooks/useBasketActions.ts
import { useBasketStore } from "@/common/store/basketStore";

export const useBasketActions = () => {
  const { addItem, removeItem, removeAllOfItem } = useBasketStore();

  const increase = (productId: number) => {
    addItem(productId); // miqdar 1 artır
  };

  const decrease = (productId: number) => {
    removeItem(productId); // miqdar 1 azaldır
  };

  const removeAll = (productId: number) => {
    removeAllOfItem(productId); // məhsulu tam silir
  };

  return { increase, decrease, removeAll };
};