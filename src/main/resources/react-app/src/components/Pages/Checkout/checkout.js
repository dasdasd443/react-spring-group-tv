import Header from '../../Header/header';
import Title from '../../Header/Title/title';
import Links from '../../Header/Links/links';
import Navigation from '../../Header/Navigation/navigation';
import Images from '../../exportFiles/exportImages';
import ItemList from './mini-components/Item/item-list';
import {useSelector} from 'react-redux';
import { useCallback } from 'react';
import {Link} from 'react-router-dom';
import './checkout.css';
let images = new Images();
const Checkout = () => {
    const products = useSelector(state => state.checkoutProducts);
    let total= products.reduce( useCallback((total, elem) => {
        return total + elem.unitPrice;
    }), 0);
    
    const productsElement = products.map(useCallback(item => 
        <section key={item.id}><ItemList id={item.id} itemName={item.itemName || item.title} image={item.image} price={item.price.toFixed(2)} quantity={item.quantity} unitPrice={item.unitPrice}/><hr/></section>)
    );
    return (
            <div className='container'>
                <div className='App'>
                    <Header/>
                    <Title/>
                    <Links/>
                </div>
                <Navigation/>
                <div className="App">
                    <section className='page11'>
                        <div className="App items-list">
                            <section className="items-list__header">
                                <span>Product</span>
                                <span>Unit Price</span>
                                <span>QTY</span>
                                <span>Price</span>
                            </section>
                            <hr/>
                            <div>
                            {(productsElement.length == 0)? <span>Your cart is Empty! Click <Link to='/store'>here</Link> to shop!</span>: productsElement}
                            </div>
                        </div>
                        <div className="total">
                        <section className="voucher">
                            <form action="">
                                <input type="text" name="" placeholder="Voucher Code" id="voucher-code"/>
                                <button>Redeem</button>
                            </form>
                        </section>
                        <form action="" className="checkout">
                            <section className="checkout-container">
                                <ul className="checkout-container__price-list">
                                    <li><span>Subtotal</span><span className='sub-total'>${total.toFixed(2)}</span></li>
                                    <li><span>Shipping fee</span><span>$20</span></li>
                                    <li><span>Coupon</span><span>No</span></li>
                                </ul>
                            </section>
                            <hr/>
                            <section className="checkout-container__total">
                                <h1>Total</h1>
                                <h1 className="total-price">${(total + 20).toFixed(2)}</h1>
                            </section>
                            <button>Checkout</button>
                        </form>
                        </div>
                    </section>
                </div>
            </div>
    );
}

export default Checkout;