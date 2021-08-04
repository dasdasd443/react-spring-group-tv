import ProductInformationCSS from './product-information.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faShoppingCart, faHeart,faPlus,faMinus,faStar,faCheck} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { SolarSystemLoading } from 'react-loadingg';
import { addToCart } from '../../../../../store/action/store-actions';
import { addToFavorites, removeFromFavorites } from '../../../../../store/action/favorites-action';
import { setCurrentProduct } from '../../../../../store/action/current-product-actions';
const ProductInformation = ({curProd}) => {
    const products = useSelector(state => state.productList);
    const checkoutList = useSelector(state => state.checkoutProducts);
    const favorites = useSelector(state => state.favorites);
    const [curProduct,setcurProduct] = useState(curProd);
    const [isLoaded, setisLoaded] = useState(false);
    const [isAdded, setisAdded] = useState((checkoutList.some(item => item.id==curProd.id))?true:false);
    const [isFavorite, setisFavorite] = useState((favorites.some(item => item.id==curProd.id))?true:false);
    const dispatch = useDispatch();

    const addToCartFunc = useCallback((item) => {
        item = {...item, unitPrice: item.quantity * item.price, quantity: item.quantity - 1};
        setisAdded(true);
        dispatch(addToCart(item));
    })
    
    const removeFromFavoritesFunc = useCallback((id) => {
        setisFavorite(false);
        dispatch(removeFromFavorites(id));
    })

    const addToFavoritesFunc = useCallback((item) => {
        setisFavorite(true);
        dispatch(addToFavorites(item));
    })
    
    return (
            <section className="items-left" style={ProductInformationCSS}>
                {(curProduct)? <div>
                <div className="items-left-details">
                    <div className="items-left-details--productImages">
                        <figure className="items-left-details--productImages--largeView">
                            <img src={curProduct.image} alt=""/>
                        </figure>
                    </div>
                    <div className="items-left-details-productDetails">
                        <h2 className="items-left-details-h2">{curProduct.itemName || curProduct.title}</h2>

                        <div className="items-left-details-productDetails-reviewDetails">
                            <div className="items-left-details-productDetails-reviewDetails--str">
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                            <span className="items-left-details-productDetails-reviewDetails--reviews">0 reviews</span>
                            <span className="items-left-details-productDetails-reviewDetails--subReviews">Submit a review</span>
                        </div>
                        <hr/>
                        <div className="bs-category-gallery--one--box--price items-container-menus-content--price price-bolder">
                            <p className="bs-category-gallery--one--box--price--enabled price-bolder-red" >${curProduct.price.toFixed(2)}</p>
                            <p className="bs-category-gallery--one--box--price--disabled">$599</p>
                        </div>
                        
                        <div className="stock">
                        <span className="stock--label">Availability :</span>
                        <span className="stock--value">In Stock</span>
                        </div>

                        <div className="category">
                        <span className="category--label">Category :</span>
                        <span className="category--value">{curProduct.category[0].toUpperCase() + curProduct.category.slice(1).toLowerCase()}</span>
                        </div>

                        <p className="items-left-details-productDetails-free"> Free Shipping</p>
                        
                        <hr/>

                        <div className="color">
                            <label htmlFor="" className="color-label">Select Color :</label> 
                            <label className="color-option">
                                <input name="color" type="radio" className="color-radio" />
                                <span className="pink"></span>
                                </label>
                                
                                <label className="color-option">
                                <input name="color" type="radio" className="color-radio" />
                                <span className="red"></span>
                                </label>
                                
                                <label className="color-option">
                                <input name="color" type="radio" className="color-radio" />
                                <span className="black"></span>
                                </label>

                                <label className="color-option">
                                <input name="color" type="radio" className="color-radio" />
                                <span className="white"></span>
                                </label>

                                <label className="color-option">
                                <input name="color" type="radio" className="color-radio" />
                                <span className="brown"></span>
                                </label>
                        </div>

                        <div className="sizing">
                        <label htmlFor="" className="sizing-label">Size</label>
                        <select name="" id="" className="sizing-select">
                            <option value="">XS</option>
                            <option value="">S</option>
                            <option value="">M</option>
                        </select>
                        </div>
                        <hr/>
                        <div className="bottomOptions">
                            <div className="numOrder">
                                <button className="numOrder--sub"onClick={()=>setcurProduct({...curProduct, quantity: (curProduct.quantity > 0)? curProduct.quantity - 1: curProduct.quantity})} ><FontAwesomeIcon icon={faMinus}/></button>
                                <span className="numOrder--value">{curProduct.quantity}</span>
                                <input className="numOrder--value__input" type="hidden" value={curProduct.quantity}/>
                                <button className="numOrder--add" onClick={()=>setcurProduct({...curProduct, quantity: curProduct.quantity + 1})}><FontAwesomeIcon icon={faPlus}/></button>
                            </div>
                            <div className="buttonCartheart">
                                {(!isAdded)?    <button className="buttonCartheart-add enabled" onClick={()=> addToCartFunc(curProduct)}><FontAwesomeIcon icon={faShoppingCart}/> Add to Cart</button>:
                                                <button className="buttonCartheart-add"><FontAwesomeIcon icon={faCheck}/> Added to Cart</button>}
                                {(!isFavorite)?  <button className="buttonCartheart-heart enabled" onClick={() => addToFavoritesFunc(curProduct)}><FontAwesomeIcon icon={faHeart}/></button>: 
                                                <button className="buttonCartheart-heart enabled favorite" onClick={()=> removeFromFavoritesFunc(curProd.id)}><FontAwesomeIcon icon={faHeart}/></button>}
                                </div>
                        </div>
                    </div>
                </div>

                <div className="socialmedia">
                    <button className="socialmedia--facebook"><FontAwesomeIcon icon={faFacebookF}/>Share on Facebook</button>
                    <button className="socialmedia--twitter"><FontAwesomeIcon icon={faTwitter}/>Share on Twitter</button>
                </div>

                <div className="productInformation">
                    <div className="productInformation-menu">
                        <a href="#">Product Information</a>
                        <a href="#">Reviews <span>0</span></a>
                        <a href="#">Another tab</a>
                    </div>
                    <hr className="productInformation--hr"/>
                    <p className="productInformation-p">
                        {curProduct.description}
                    </p>
                </div>
                </div>: <SolarSystemLoading/>}
            </section>
    );
}

export default ProductInformation;