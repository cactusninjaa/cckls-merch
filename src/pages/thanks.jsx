import { useNavigate } from "react-router-dom";
import Button from "../components/button";

export default function Thanks() {
    const navigate = useNavigate();
    return (
        <div className="thanks">
            <h1>❤️ Merci pour votre commande ❤️</h1>

            <p>Vous recevrez un message pour récupérer votre commande une fois arrivée</p>

            <Button text="Accueil" onClick={navigate('/')} />
        </div>
    );
}
