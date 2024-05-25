import { useState, useEffect } from 'react';
import Button from '../components/button';
import ButtonSecondary from '../components/buttonSecondary';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    const [cart, setCart] = useState([]);
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

  
   

    if (cart.length === 0) {
        return (
            <div className='cart cart-empty'> 
                <p>Votre panier est vide</p> 
                <Button text="Retrourner au shop" onClick={() => navigate('/')} />
            </div>
        )
    }
    console.log(cart)
    return (
        <div className='cart'>
            {cart.map((product, index) => (
                <div key={index} className='cart-card'>
                    <img src={'/assets/img/shopItems/' + product.img} alt={product.name}/>
                    <div className='main'>
                        <div className='header'>
                            <h2>{product.name}</h2>
                            <p>{product.price * product.quantity}€</p>
                        </div>
                        <div>
                            <p className='size'>Taille sélectionnée : {product.selectedSize}</p>
                            <div className='button'>
                                <div className='quantity'>
                                    <ButtonSecondary  onClick={() => decreaseQuantity(index)} text="-" />
                                    <div>{product.quantity}</div>
                                    <ButtonSecondary className="secondary" onClick={() => increaseQuantity(index)} text="+" />
                                </div>
                                <ButtonSecondary className="secondary" onClick={() => removeFromCart(index)} text="Supprimer" />
                            </div>
                        </div>
                    </div>
                </div>
                
            ))}
            <div className='cart-footer'>
                <h2>Total : {total}€</h2>
                <Button text="Suivant" onClick={() => navigate('/checkout')} />
            </div>
        </div>
    );
  
}