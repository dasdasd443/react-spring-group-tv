import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './item-list.css';
import {checkoutdecrement, checkoutincrement,deleteItem} from '../../../../../store/action/action';
const ItemList = ({product}) => {
    const dispatch = useDispatch();
    return (
        <section className="items-list__item">
            <div className="items-list__item--name">
                <section className="items-list__item--name__delete">
                    <FontAwesomeIcon  icon={faTimes} />
                    <span className='background' onClick={()=> dispatch(deleteItem(product.product_id))}></span>
                </section>
                <section className="image-container">
                    <img src={`http://localhost:5000/product/get-image/${product.product_id}/${product.image}`} alt=""/>
                </section>
                <span><Link to={`/product-item/${product.product_id}`}>{product.product_name}</Link></span>
            </div>
            <div>
                <span>${product.price}</span>
                <input type="hidden" className='price' value={product.price}/>
            </div>
            <div className="items-list__item--quantity">
                <form action="" onSubmit={ e => e.preventDefault()}>
                    <button className='minus-quantity' onClick={() => dispatch(checkoutdecrement(product.product_id))}><FontAwesomeIcon icon={faMinus}/></button>
                    <input type="number" name="quantity" className="quantity" min="0" value={product.quantity} readOnly/>
                    <button className='add-quantity' onClick={() => dispatch(checkoutincrement(product.product_id))}><FontAwesomeIcon icon={faPlus}/></button>
                </form>
            </div>
            <div>
                <input type="hidden" name="" value="0" className="unit-price-hidden"/>
                <span className='unit-price'>${product.unitPrice.toFixed(2)}</span>
            </div>
        </section>
    );
}

export default ItemList;