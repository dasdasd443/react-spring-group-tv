import Header from '../../Header/header.js';
import Footer from '../../Footer/footer.js';
import Title from '../../Header/Title/title';
import Links from '../../Header/Links/links';
import Banner from '../../Content/Banner/banner';
import BestSellers from '../../Content/BestSeller/bestSellers';
import Newsletter from '../../Content/Newsletter/newsletter';
import Banner2 from '../../Content/Banner2/banner-2';
import Categories from '../../Footer/Categories/categories';
import { useSelector } from 'react-redux';

const User = () => {
    const newsletterDisplay = useSelector( state => state.newsletter);
    const newsletterelem = (newsletterDisplay === 1)?"":<Newsletter classsName="newsletter"/>;
    
    fetch('http://localhost:5000/',{
        headers:{
            'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: ""
        }
    }).then(res => console.log(res.text()));
    return (
            <div className = "container">
                {newsletterelem}
                <div className="App">
                <Header/>
                <span className="line-title"></span>
                </div>
                <div className = "App">
                    <Footer/>
                </div>
            </div>
    );
}

export default User;
