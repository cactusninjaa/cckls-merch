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
        // Cachez la notification après 2 secondes
        setTimeout(() => setNotification(false), 2000);
    }
    
    productId = Number(productId);
    
    const product = shopItems.find(item => item.id === productId);

    const [mainImage, setMainImage] = useState('/assets/img/shopItems/' + product.img);
    const [image2, setImage2] = useState('/assets/img/shopItems/' + product.img2);
    const [image3, setImage3] = useState('/assets/img/shopItems/' + product.img3);
    const [image4, setImage4] = useState('/assets/img/shopItems/' + product.img4);

    const swapImage = (mainImage, setMainImage, otherImage, setOtherImage) => {
    const temp = mainImage;
    setMainImage(otherImage);
    setOtherImage(temp);
    };

    if (!product) {
        return <div>Product not found</div>;
    }
    return (
        <div className='product'>
            <div className='first-col'>
            <img id='main' src={mainImage} alt={product.name}/>
            <div className='wrap'>
                <img src={image2} alt={product.name} onClick={() => swapImage(mainImage, setMainImage, image2, setImage2)}/>
                <img src={image3} alt={product.name} onClick={() => swapImage(mainImage, setMainImage, image3, setImage3)}/>
                <img src={image4} alt={product.name} onClick={() => swapImage(mainImage, setMainImage, image4, setImage4)}/>
            </div>
        </div>
            <div className='second-col'>
  
                <div className='header'>
                    <h2>{product.name}</h2>
                    <p>{product.price}€</p>
                </div>
                <div>
                    
                </div>
                <h3>Description</h3>
                <p>{product.description}</p>
                <h3>Tailles</h3>
                <select onChange={(e) => setSelectedSize(e.target.value)}>
                    <option value="">-- Sélectionnez --</option>
                    {product.sizes.map((size, index) => (
                        <option key={index} value={size}>{size}</option>
                    ))}
                </select>
                {sizeError && <p className='error'>❌ Veuillez sélectionner une taille ❌</p>}
          

                <Button onClick={() => addToCart(product)} text="Ajouter au panier" />
                {notification && <div className='notification'><p>✅ Le produit a été ajouté au panier ✅</p></div>}
            </div>
        </div>
    );
}