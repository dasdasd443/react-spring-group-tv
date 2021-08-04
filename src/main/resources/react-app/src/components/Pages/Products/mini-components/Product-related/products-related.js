
import BestSellerCard from '../../../../mini-component/best-seller-card';
import ProductsRelatedCSS from './products-related.css';
import Images from '../../../../exportFiles/exportImages';
import { useEffect,useState,useCallback } from 'react';
import { SolarSystemLoading } from 'react-loadingg';
import {useSelector} from 'react-redux';
let images = new Images();
const ProductsRelated = ({curProd}) => {
    const [products,setProducts] = useState(useSelector((state => state.productList)));
    const [relatedProducts,setRelatedProducts] = useState(0);
    const [isLoaded, setisLoaded] = useState(false);
    const [curProduct,setcurProduct] = useState(0);

    const getProducts = useCallback(async function getProducts(){
        const response = await fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(json => json)
        setProducts(response)
        if(products){
            let relprod = products.filter(item => item.category == curProd.category)
            setRelatedProducts(relprod.map(item =>{ 
                return <BestSellerCard key={item.id} id={item.id} itemName={item.title} price={item.price.toFixed(2)} image={item.image} hotornot={"not"}/>
            }))
        }
        setisLoaded(true);
    })

    useEffect(()=>{
        let mounted = true;
        if(!isLoaded){
            getProducts();
        }

        return () => mounted = false;
    },[]);
    
    
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