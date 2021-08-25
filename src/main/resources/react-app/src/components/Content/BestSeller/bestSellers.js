import BestSellerCSS from './bestSeller.css';
import Images from '../../exportFiles/exportImages';
import BestSellerCard from '../../mini-component/best-seller-card';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {setInitialProducts} from '../../../store/action/store-actions';
import {useState, useEffect,useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SolarSystemLoading} from 'react-loadingg';
import { CircularProgress } from '@material-ui/core';

let images = new Images();
const BestSeller = ({load}) => {
    const productList = useSelector(state => state.productList);
    //fuck you javascript, to set the initial products of the store to the default Rakuten, remove the API call and setInitialProducts dispatch
    // const [productsElement, setProductsElement] = useState((productList)? productList.map((elem,index) => {
    //     return (index != 0)? <BestSellerCard description={elem.description} key={elem.id} id={elem.id} itemName={elem.title || elem.itemName} price={elem.price.toFixed(2)} image={elem.image} hotornot="not"/>: <BestSellerCard key={elem.id} id={elem.id} description = {elem.description} itemName={elem.itemName || elem.title} price={elem.price.toFixed(2)} image={elem.image} hotornot="hot"/>
    // }): '');

    const [productsElement, setProductsElement] = useState(0);
    
    const [isLoaded, setisLoaded] = useState(useSelector(state => state.productList));
    const [products,setProducts] = useState(useSelector(state => state.productList));
    const dispatch = useDispatch();
    
    const getData = useCallback(async function getData(){
        const response = await fetch('http://localhost:5000/product/all')
        .then(res=>res.json())
        .then(json=>json)
        .then(json => {
            setProducts(json);
            dispatch(setInitialProducts(json));
            setProductsElement(json.map((product,index) => {
                return (index != 0)? <BestSellerCard product={product} hotornot="not"/>: <BestSellerCard product={product} hotornot="not"/>
            }));
        });
        setProducts(response);
        return response;
    })
    
    
    useEffect(()=> {
        getData();
    },[load]);

    return (
        <section className="bs-category" style={BestSellerCSS}>
            <div className="bs-category-title">
                <h3 className="bs-category-title-h3">BEST SELLER</h3>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            <div className="bs-category-menu">
                <nav className="bs-category-menu--nav" >
                    <ul className="bs-category-menu--ul">
                        <li><a href="#">All</a></li>
                        <li><a href="#">Mac</a></li>
                        <li><a href="#">iPhone</a></li>
                        <li><a href="#">iPad</a></li>
                        <li><a href="#">iPod</a></li>
                        <li><a href="#">Accessories</a></li>
                    </ul>
                </nav>
            </div>
            <div className="bs-category-gallery">
                
                <div className="bs-category-gallery--one">
                    {(productsElement !== 0)? productsElement: <CircularProgress/>}
                </div>
            </div>
        
        <div className="load-link">
            <center><a href="#" className="load-link">LOAD MORE</a></center>
        </div>
        </section>
    );
}

export default BestSeller;