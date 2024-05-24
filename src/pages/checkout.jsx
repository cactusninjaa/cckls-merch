import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { useState, useEffect } from 'react';
import ButtonSecondary from '../components/buttonSecondary';


export default function Checkout() {
    const [errorMessage, setErrorMessage] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [cart, setCart] = useState([]); // Ajout de cette ligne
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');

    const handleConfirmPayment = () => {
        localStorage.removeItem('cart');
        setCart([]);
        setShowPopup(false);
        setConfirmPopup(false);
        navigate('/thanks');
    }

    const handleNameChange = (e) => {
        console.log('Name:', e.target.value);
        setName(e.target.value);
    }
    
    const handleFirstNameChange = (e) => {
        console.log('First Name:', e.target.value);
        setFirstName(e.target.value);
    }
    
    const handlePhoneChange = (e) => {
        console.log('Phone:', e.target.value);
        setPhone(e.target.value);
    }

    const handleButtonClick = () => {
        if (!name || !firstName || !phone) {
            setErrorMessage('❌ Veuillez remplir tous les champs avant de continuer. ❌');
        } else {
            setShowPopup(true);
        }
    }

    useEffect(() => {
        // Récupérez le panier du localStorage
        const localStorageCart = localStorage.getItem('cart');
        // Si le panier existe, parsez-le en objet JavaScript. Sinon, utilisez un tableau vide.
        setCart(localStorageCart ? JSON.parse(localStorageCart) : []);
    }, []);

    const handleCancelPayment = () => {
        setConfirmPopup(false);
    }
 

    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    const handlePayment = () => {
        const summary = `Nom : ${name}\nPrénom : ${firstName}\nTéléphone : ${phone}\n` + 
            cart.map(item => `Produit: ${item.name}, Prix: ${item.price}, Quantité: ${item.quantity}`).join('\n') + `Total : ${total}€`;
    
        navigator.clipboard.writeText(summary);
        window.open('https://www.paypal.com/paypalme/thomasshv', '_blank');
        setConfirmPopup(true);
        setShowPopup(false);
    }


    console.log(cart);
    
    return (
        <div className='checkout'>
            <h2>Vos informations personnelles</h2>
            <form>
                <input type="text" value={name} onChange={handleNameChange} placeholder='Nom' />
                <input type="text" value={firstName} onChange={handleFirstNameChange} placeholder='Prénom' />
                <input type="phone" value={phone} onChange={handlePhoneChange} placeholder='Numéro de téléphone' />
            </form>
            <h2>Résumé de la commande</h2>
            <div className='product-wrapper'>
                
                {cart.map((item, index) => (
                    <div className='product-card' key={index}>
                        <img src={'/assets/img/shopItems/' + item.img} alt="" />
                        <div className='product-card-header'>
                            <h3>{item.name}</h3>
                            <p>{item.price}€</p>
                        </div>
                        <p>Quantité : {item.quantity}</p>
                        <p>Taille : {item.selectedSize}</p>
                    </div>
                ))}
            </div>
            <div className='cart-footer'>
                <h2>Total : {total}€</h2>
                <Button 
                    text="Accéder au paiement" 
                    onClick={handleButtonClick} 
                />
            </div>
           

            {errorMessage && <p className="error">{errorMessage}</p>}
            {showPopup && (
            <div>
                <div className="overlay"></div>
                <div className="popup">
                    <h2>Copiez ces informations dans le message paypal</h2>
                    <p>Nom : {name}</p>
                    <p>Prénom : {firstName}</p>
                    <p>Téléphone : {phone}</p>
                    <br />
                    {cart.map((item, index) => (
                        <div key={index}>
                            <p>
                                Article {index + 1} : {item.name}, 
                                prix : {item.price}, 
                                quantité : {item.quantity}
                            </p>
                        </div>
                    ))}
                    <br />

                    <h3>Rentrez le montant ci-dessous :</h3>

                    <p>Total : {total}€</p>
                    <br />
                    <div className='popup-button'>
                        <ButtonSecondary text="Annuler" onClick={() => setShowPopup(false)} />
                        <Button text="Copier et Payer" onClick={handlePayment} />
                    </div>
                </div>
            </div>
        )}
            
            {confirmPopup && (
                <div>
                    <div className="overlay"></div>
                    <div className="popup">
                        <h2>Confirmez-vous le paiement ?</h2>
                        <br />
                        <div className='popup-button'>
                            <ButtonSecondary text="Non" onClick={handleCancelPayment} />
                            <Button text="Oui" onClick={handleConfirmPayment} />
                        </div>
                    </div>
                </div>
            )}
        </div>


    );
}
