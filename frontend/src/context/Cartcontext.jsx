import { createContext, useContext, useState, useEffect } from "react";
import { readLocalCart, removeLocalItem, setLocalQuantity } from "../utils/LocalCart.js"
import { loadservercart, updatecartservice, removeitemsfromcart } from "../utils/ServerCart.js"
import useAuth from '../context/Authcontext.jsx';

const cartcontext = createContext();


export function Cartcontext({ children }) {

    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();

    const [loadingstate, setloading] = useState(false);
    useEffect(() => {
        ; (async function getcart() {
            try {
                setloading(true);
                const items = await loadservercart(user);
                setloading(false);
                setCartItems(items.items)
            } catch (error) {
                setCartItems(readLocalCart());
            }
        })();

    }, [user]);


    const updateQuantity = async (id, newQuantity) => {
        const items = await updatecartservice(id, newQuantity, user);
        console.log("step:1-call-items updatecall:", items)
        setCartItems(items.items);
    };

    const removeItem = async (id) => {
        const data = await removeitemsfromcart(id, user);
        setCartItems(data.items);
    };

    const [promoCode, setPromoCode] = useState('');
    const [isPromoApplied, setIsPromoApplied] = useState(false);

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === 'luxe10') {
            setIsPromoApplied(true);
            alert('Promo code applied successfully!');
        } else {
            alert('Invalid promo code. Try "LUXE10" for 10% off!');
        }
    };


    const subtotal = cartItems.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0);
    const savings = cartItems.reduce((sum, item) => {
        const itemSavings = item.price ? (item.price - item.selling_price) * item.quantity : 0;
        return sum + itemSavings;
    }, 0);
    const discount = isPromoApplied ? subtotal * 0.1 : 0;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = (subtotal - discount) * 0.03;
    const total = subtotal - discount + shipping + tax;

    return <cartcontext.Provider value={{ cartItems, loadingstate, user, updateQuantity, removeItem, promoCode, isPromoApplied, applyPromoCode, subtotal, savings, discount, shipping, tax, total ,setPromoCode}}>
        {children}
    </cartcontext.Provider>

}

export function useCart() {
    return useContext(cartcontext);
}