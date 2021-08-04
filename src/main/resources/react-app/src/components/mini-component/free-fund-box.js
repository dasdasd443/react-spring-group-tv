
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const FreeFundBox = ({icon, text}) => {
    return (
        <div className="others-category-freefundsupport--box">
            <FontAwesomeIcon icon={icon} className="others-category-freefundsupport--box--i"/>
            <h3 className="others-category-freefundsupport--box--h3">{text}</h3>
            <p  className="others-category-freefundsupport--box--p">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Non dolore accusamus libero accusantium, totam ipsum, natus quasi aliquid,
                mollitia maiores alias adipisci ipsa aperiam.
            </p>
        </div>
    );
}

export default FreeFundBox;