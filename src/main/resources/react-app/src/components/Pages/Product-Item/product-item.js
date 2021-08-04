import './product-item.css';
import Header from '../../Header/header.js';
import Title from '../../Header/Title/title';
import Links from '../../Header/Links/links';
import Navigation from '../../Header/Navigation/navigation';
import ProductInformation from './mini-components/Product-information/product-information';
import ProductBestSellers from './mini-components/Product-Bestsellers/product-bestsellers';
import ProductsRelated from './mini-components/Product-related/products-related';
import Footer from '../../Footer/footer';
import {useParams} from 'react-router-dom';

const ProductItem = () => {
    let {id} = useParams();
    return (
        <div className = "container">
                <div className="App">
                    <Header/>
                    <span className="line-title"></span>
                    <Title/>
                    <Links/>
                </div>
                <Navigation/>
                <div className="App">
                    <section className="main">
                        <ProductInformation id={id} className="main__product-information"/>
                        <ProductBestSellers className="main__product-bestsellers"/>
                    </section>
                    <ProductsRelated id={id}/>
                    <Footer/>
                </div>
            </div>
    );
}

export default ProductItem;