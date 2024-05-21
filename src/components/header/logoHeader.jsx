import logo from '/assets/img/logo.png'

const LogoHeader = () => {
    return(
        <div className="logoHeader"> 
            <a href="/">
                <img src={logo} alt="logo" />
            </a>
        </div>
    )
}
export default LogoHeader