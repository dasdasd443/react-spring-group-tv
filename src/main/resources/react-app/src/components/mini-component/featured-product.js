import {faStar} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const FeaturedProduct = ({image, product_name}) => {
    return (
        <div className="others-category-latestnews--box">
            <img src={image} alt="" className="others-category-latestnews--box--featured1Img"/>
            <div className="others-category-latestnews--box--content">
            <h5 className="others-category-latestnews--box--content--h5">{product_name}</h5>
            <div className="bs-category-gallery--one--box--stars">
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar}/>
                <FontAwesomeIcon icon={faStar} className="bs-category-gallery--one--box--stars--last"/>
            </div>
            <div className="bs-category-gallery--one--box--price">
                <p className="bs-category-gallery--one--box--price--enabled" >$499</p>
                <p className="bs-category-gallery--one--box--price--disabled">$599</p>
            </div>
            </div>
        </div>
    );
}

export default FeaturedProduct;