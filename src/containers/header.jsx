import ButtonHeader from "../components/header/buttonHeader";
import LogoHeader from "../components/header/logoHeader";

const Header = () => {
    return (
        <header>
            <LogoHeader />
            <div>
                <ButtonHeader text="About" onClick={() => {document.location.href = "/about"}} />
                <ButtonHeader text="Merch" onClick={() => {document.location.href = "/merch"}} />
                <ButtonHeader text="Cart" onClick={() => {document.location.href = "/cart"}}/>
            </div>
        </header>
    );
    }
export default Header;