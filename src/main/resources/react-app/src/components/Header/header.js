import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingBasket, faSearch,faUser} from '@fortawesome/free-solid-svg-icons';
import {useState,useCallback} from 'react';
import {Link} from 'react-router-dom';
import HeaderCSS from './header.css';
import {useSelector} from 'react-redux';


const Header = (props) =>
{
    const products = useSelector(state => state.checkoutProducts);
    const subTotal = products.reduce(useCallback((total,curVal) => {
        return total + curVal.unitPrice;
    }),0);
    const numItems = products.reduce(useCallback((total, curVal) => {
        return total + curVal.quantity;
    }),0);
    const LogoutUser = useCallback(() => {
        sessionStorage.removeItem("user");
        window.location.href = "/";
    })
    const [loggedIn,setLoggedIn] = useState(JSON.parse(sessionStorage.getItem("user")));
    let user = (loggedIn != undefined)? <Link to="/" className="user" onClick={LogoutUser}>{loggedIn.fullName}</Link>: <Link to="/login" className="user">My profile</Link>;
    
    return (
        <section className="header" style={HeaderCSS}>
            <section className="header__lang">
                <section className="header__lang--item">
                    <span>EN</span>
                    <select name="" id=""></select>
                </section>
                <section className="header__lang--item">
                    <span>USD</span>
                    <select name="" id=""></select>
                </section>
            </section>
            <section className="header__account">
                <section className="header__account--item">
                    <FontAwesomeIcon icon={faUser}/><span >{user}</span>
                </section>
                <section className="header__account--item">
                    <Link to="/checkout"><FontAwesomeIcon icon={faShoppingBasket} />
                        <span>{numItems} Items</span>
                        <small>${subTotal.toFixed(2)}</small>
                    </Link>    
                </section>
                <section className="header__account--item">
                    <FontAwesomeIcon icon = {faSearch}/>
                </section>
            </section>
        </section>
        
    );
}

/*const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    height: '10vh',
    alignItems: 'center',
    fontSize: '14px',
}

const header__AccountStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontWeight: '600',
}

const header__lang = {
    display: 'flex',
    gap: '1rem',
}

const header__langItemStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
}
*/
export default Header;