
import BestSellerCard from '../../../../mini-component/best-seller-card';
import ProductsRelatedCSS from './products-related.css';
import Images from '../../../../exportFiles/exportImages';
import { useEffect,useState,useCallback } from 'react';
import { SolarSystemLoading } from 'react-loadingg';
import {useSelector} from 'react-redux';
let images = new Images();
const ProductsRelated = ({id}) => {
    const [products,setProducts] = useState(useSelector((state => state.productList)));
    const [relatedProducts,setRelatedProducts] = useState(0);
    const [isLoaded, setisLoaded] = useState(false);
    const [curProduct,setcurProduct] = useState(0);

    const getProducts = useCallback(async function getProducts(){
        const response = await fetch(`http://localhost:5000/product/all`)
        .then(res => res.json())
        .then(json => json)
        setProducts(response)
    })
    const getData = useCallback(async function getData(){
        const response = await fetch(`http://localhost:5000/product/get-product/${id}`)
        .then(res=>res.json())
        .then(json=>json)
        setcurProduct({...response, quantity: 1});
        setisLoaded(true);
        if(products){
            let relprod = products.filter(product => product.category === response.category)
            relprod = relprod.filter(product => product.product_id !== response.product_id)
            setRelatedProducts(relprod.map(product =>{ 
                return <BestSellerCard key={product.product_id} product={product} hotornot={"not"}/>
            }))
        }
        
    })

    useEffect(()=>{
        let mounted = true;
        if(!isLoaded){
            getProducts();
            getData();
        }
        return () => mounted = false;
    },[id,products]);
    
    
    return (
        <section className="related-products" style={ProductsRelatedCSS}>
                <h2 className="related-products-title">RELATED PRODUCTS</h2>
                <div className="bs-category-gallery--one">
                    {(products && relatedProducts != 0)? relatedProducts:<SolarSystemLoading/>}
                </div>
            </section>
    );
}

export default ProductsRelated;