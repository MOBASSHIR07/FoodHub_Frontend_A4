import { Meal } from "@/app/types/provider";
import { toast } from "sonner";

export interface CartItem extends Meal {
    quantity: number;
}

const CART_KEY = "foodhub-cart";

// Helper to get cart
export const getCart = (): CartItem[] => {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

// Add to cart with Shop Name fix
export const addToCart = (meal: Meal) => {
    if (typeof window === "undefined") return;

    const cart = getCart();

    if (cart.length > 0 && cart[0].providerId !== meal.providerId) {
        toast.error("Provider Mismatch", {
            description: "You can only add meals from one kitchen at a time.",
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

    const shopName = meal.provider?.businessName || "Kitchen";
    toast.success(`${meal.name} added!`, {
        description: `From ${shopName}`,
        icon: "🛒",
    });
};

// Update quantity (No Toast)
export const updateCartItemQuantity = (mealId: string, quantity: number) => {
    if (typeof window === "undefined") return;

    const cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === mealId);

    if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = quantity;
        }

        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event("cart-updated"));
    }
};

// Remove single item
export const removeFromCart = (mealId: string) => {
    if (typeof window === "undefined") return;
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== mealId);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
};

// Clear entire cart (The missing export)
export const clearCart = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event("cart-updated"));
};