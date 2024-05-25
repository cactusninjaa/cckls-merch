import { useState } from 'react';
import ButtonHeader from "../components/header/buttonHeader";
import LogoHeader from "../components/header/logoHeader";
import './header.css'; // Assurez-vous d'avoir ce fichier CSS dans le même répertoire

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header>
            <LogoHeader />
            <div className={`menu ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="hamburger"></div>
            </div>
            {isOpen && (
                <div className="links">
                    <ButtonHeader text="Shop" onClick={() => {document.location.href = "/"}} />
                    <ButtonHeader text="About" onClick={() => {document.location.href = "/about"}} />
                    <ButtonHeader text="Cart" onClick={() => {document.location.href = "/cart"}}/>
                </div>
            )}
        </header>
    );
}

export default Header;