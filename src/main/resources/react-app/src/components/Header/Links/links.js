import LinksCSS from './links.css';
import {Link} from 'react-router-dom';


const Links = () => {
    return (
            <section className="links" style={LinksCSS}>
                <nav className="links__nav">
                    <ul className="links__nav--links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/product">Store</Link></li>
                        <li><Link to="/">iPhone</Link></li>
                        <li><Link to="/">iPad</Link></li>
                        <li><Link to="/">MacBook</Link></li>
                        <li><Link to="/store">Accessories</Link></li>
                    </ul>
                </nav>
            </section>
    );
}

export default Links;