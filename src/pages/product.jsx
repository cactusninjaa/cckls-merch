import { useParams } from 'react-router-dom';
import shopItems from '../data/shopItems.json'; 
import Button from '../components/button';
import { useState } from 'react';

export default function Product() {
    let { productId } = useParams();
    const [notification, setNotification] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeError, setSizeError] = useState(false);

    const addToCart = (product) => {
        if (!selectedSize) {
            setSizeError(true);
            return;
        }
        setSizeError(false);
        product.selectedSize = selectedSize;
        // Récupérez le panier du localStorage
        let cart = localStorage.getItem('cart');
        // Si le panier existe, parsez-le en objet JavaScript. Sinon, utilisez un tableau vide.
        cart = cart ? JSON.parse(cart) : [];
        // Vérifiez si le produit est déjà dans le panier avec la même taille sélectionnée
        const existingProduct = cart.find(item => item.id === product.id && item.selectedSize === selectedSize);
        if (existingProduct) {
            // Si le produit est déjà dans le panier avec la même taille, augmentez simplement sa quantité
            existingProduct.quantity++;
        } else {
            // Sinon, ajoutez-le au panier avec une quantité de 1 et la taille sélectionnée
            product.quantity = 1;
            product.selectedSize = selectedSize;
            cart.push(product);
        }
        // Enregistrez le panier mis à jour dans le localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Affichez la notification
        setNotification(true);
        // Cachez la notification après 1 secondes
        setTimeout(() => setNotification(false), 1000);
    }
    
    productId = Number(productId);
    
    const product = shopItems.find(item => item.id === productId);
    
    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <div>
            <img src={'/assets/img/shopItems/' + product.img} alt={product.name}/>
            <h2>{product.name}</h2>
            <p>{product.price}€</p>
            <p>{product.description}</p>
            <select onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="">Sélectionnez une taille</option>
                {product.sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                ))}
            </select>
            {sizeError && <p>Veuillez sélectionner une taille</p>}
            <Button onClick={() => addToCart(product)} text="Ajouter au panier" />
            {notification && <p>Le produit a été ajouté au panier</p>}
        </div>
    );
}