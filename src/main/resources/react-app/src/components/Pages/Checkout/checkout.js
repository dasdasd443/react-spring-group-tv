import Header from '../../Header/header';
import Title from '../../Header/Title/title';
import Links from '../../Header/Links/links';
import Navigation from '../../Header/Navigation/navigation';
import Images from '../../exportFiles/exportImages';
import ItemList from './mini-components/Item/item-list';
import {useSelector} from 'react-redux';
import { useCallback, useState } from 'react';
import {Link} from 'react-router-dom';
import './checkout.css';
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, CardMedia } from '@material-ui/core';
import ActionDialog from '../User/components/action-dialog';
let images = new Images();
const Checkout = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)

    const products = useSelector(state => state.checkoutProducts);
    let total= products.reduce( useCallback((total, elem) => {
        return total + elem.unitPrice;
    }), 0);
    
    const productsElement = products.map(useCallback(product => 
        <section key={product.product_id}><ItemList product={product}/><hr/></section>)
    );

    const [checkoutDialog, setCheckoutDialog] = useState(false);
    const CheckoutProducts = useCallback(async function CheckoutProducts(){
        let checkout= products.map(item => {
            return item.product_id;
        })
        let quantity = products.map(item => {
            return item.quantity
        })

        let formData = new FormData();
        formData.append('user_id',user.id);
        formData.append('products',checkout);
        formData.append('quantity',quantity);
        formData.append('order_date', new Date());

        await fetch('http://localhost:5000/api/orders/checkout',{
            method:'POST',
            headers:{
                'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
            },
            body: formData
        })
    });
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
                            <div style={{padding:'20px 0'}}>
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
                                    <li><span>Subtotal</span><span className='sub-total'>${total.toLocaleString(undefined, {minimumFractionDigits:2})}</span></li>
                                    <li><span>Shipping fee</span><span>$20</span></li>
                                    <li><span>Coupon</span><span>No</span></li>
                                </ul>
                            </section>
                            <hr/>
                            <section className="checkout-container__total">
                                <h1>Total</h1>
                                <h1 className="total-price">${(total + 20).toLocaleString(undefined, {minimumFractionDigits:2})}</h1>
                            </section>
                            <Button onClick={()=>setCheckoutDialog(true)}>Checkout</Button>
                            <ActionDialog
                            open={checkoutDialog}
                            cancelAction={()=> setCheckoutDialog(false)}
                            okAction={CheckoutProducts}
                            title="Checkout"
                            content={
                                <Table >
                                    <TableContainer>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Product</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                products.map(product => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell><CardMedia style={{maxWidth:'400px'}} component="img" image={`http://localhost:5000/product/get-image/${product.product_id}/${product.image}`}/></TableCell>
                                                            <TableCell>{product.product_name}</TableCell>
                                                            <TableCell>{product.quantity}</TableCell>
                                                            <TableCell>P {(product.unitPrice).toLocaleString(undefined, {minimumFractionDigits:2})}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </TableContainer>
                                </Table>
                            }
                            ok="Checkout"
                            cancel="Cancel"
                            />
                        </form>
                        </div>
                    </section>
                </div>
            </div>
    );
}

export default Checkout;