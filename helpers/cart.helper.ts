import { Meal } from "@/app/types/provider";
import { toast } from "sonner";

export interface CartItem extends Meal {
  quantity: number;
}

const CART_KEY = "foodhub-cart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (meal: Meal) => {
  if (typeof window === "undefined") return;

  const cart = getCart();
  
  
  if (cart.length > 0 && cart[0].providerId !== meal.providerId) {
    toast.error("Provider Mismatch", {
      description: "You can only add meals from one kitchen at a time. Clear your cart to switch kitchens.",
    });
    return;
  }

  const existingItemIndex = cart.findIndex((item) => item.id === meal.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...meal, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  

  window.dispatchEvent(new Event("cart-updated"));
  
  toast.success(`${meal.name} added!`, {
    description: `From ${meal.provider?.businessName}`,
    icon: "🛒",
  });
};


export const removeFromCart = (mealId: string) => {
  if (typeof window === "undefined") return;
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== mealId);
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cart-updated"));
};