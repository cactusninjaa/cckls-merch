import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';


export default function Cart() {
    const [cart, setCart] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Récupérez le panier du localStorage
        const localStorageCart = localStorage.getItem('cart');
        // Si le panier existe, parsez-le en objet JavaScript. Sinon, utilisez un tableau vide.
        setCart(localStorageCart ? JSON.parse(localStorageCart) : []);
    }, []);

    const removeFromCart = (index) => {
        // Supprimez le produit du tableau de la carte
        const newCart = [...cart];
        newCart.splice(index, 1);
        // Enregistrez le tableau de la carte mis à jour dans le localStorage
        localStorage.setItem('cart', JSON.stringify(newCart));
        // Mettez à jour l'état de la carte
        setCart(newCart);
    }

    // Calculez le total du prix du panier
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    if (cart.length === 0) {
        return <p>Cart is empty</p>;
    }
    const increaseQuantity = (index) => {
        const newCart = [...cart];
        newCart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }

    const decreaseQuantity = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity--;
        } else {
            newCart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    }
  

    

    const handlePayment = () => {
        window.open('https://www.paypal.com/paypalme/thomasshv', '_blank');
        setShowPopup(true);
    }

    const handleConfirmPayment = () => {
        localStorage.removeItem('cart');
        setCart([]);
        setShowPopup(false);
        navigate('/');
    }

    const handleCancelPayment = () => {
        setShowPopup(false);
    }

    return (
        <div>
            <h1>Cart</h1>
            {cart.map((product, index) => (
                <div key={index}>
                    <h2>{product.name}</h2>
                    <p>{product.price * product.quantity}€</p>
                    <p>Quantité: {product.quantity}</p>
                    <p>Taille sélectionnée: {product.selectedSize}</p>
                    <img src={'/assets/img/shopItems/' + product.img} alt={product.name}/>
                    <Button onClick={() => decreaseQuantity(index)} text="-" />
                    <Button onClick={() => increaseQuantity(index)} text="+" />
                    <Button onClick={() => removeFromCart(index)} text="Supprimer" />
                </div>
            ))}
            <h2>Total: {total}€</h2>
            <Button text="Payer" onClick={handlePayment} />

            {showPopup && (
                <div className="popup">
                    <h2>Confirmez-vous le paiement ?</h2>
                    <Button text="Oui" onClick={handleConfirmPayment} />
                    <Button text="Non" onClick={handleCancelPayment} />
                </div>
            )}
        </div>
    );
  
}