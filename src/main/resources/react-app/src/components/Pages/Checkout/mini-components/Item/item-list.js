import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './item-list.css';
import {checkoutdecrement, checkoutincrement,deleteItem} from '../../../../../store/action/action';
const ItemList = ({id,itemName, image, price,quantity, unitPrice}) => {
    const dispatch = useDispatch();
    return (
        <section className="items-list__item">
            <div className="items-list__item--name">
                <section className="items-list__item--name__delete">
                    <FontAwesomeIcon  icon={faTimes} />
                    <span className='background' onClick={()=> dispatch(deleteItem(id))}></span>
                </section>
                <section className="image-container">
                    <img src={image} alt=""/>
                </section>
                <span><Link to={`/product-item/${id}`}>{itemName}</Link></span>
            </div>
            <div>
                <span>${price}</span>
                <input type="hidden" className='price' value={price}/>
            </div>
            <div className="items-list__item--quantity">
                <form action="" onSubmit={ e => e.preventDefault()}>
                    <button className='minus-quantity' onClick={() => dispatch(checkoutdecrement(id))}><FontAwesomeIcon icon={faMinus}/></button>
                    <input type="number" name="quantity" className="quantity" min="0" value={quantity} readOnly/>
                    <button className='add-quantity' onClick={() => dispatch(checkoutincrement(id))}><FontAwesomeIcon icon={faPlus}/></button>
                </form>
            </div>
            <div>
                <input type="hidden" name="" value="0" className="unit-price-hidden"/>
                <span className='unit-price'>${unitPrice.toFixed(2)}</span>
            </div>
        </section>
    );
}

export default ItemList;