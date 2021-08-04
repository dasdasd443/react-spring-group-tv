import NavigationCSS from './navigation.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navigation = () => {
    let curProd = useSelector(state => state.currentProduct);
    return (
        <section className="navigation" style={NavigationCSS}>
            <section className="navigation__links">
                <Link to='/'>Home</Link>
                <span>/</span>
                <Link to='/store'>Accessories</Link>
                <span>/</span>
                <span>{curProd.title || curProd.itemName}</span>
            </section>
        </section>
    );
}

export default Navigation;