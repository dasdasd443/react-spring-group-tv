import Header from '../../Header/header.js';
import Footer from '../../Footer/footer.js';
import Title from '../../Header/Title/title';
import Links from '../../Header/Links/links';
import Banner from '../../Content/Banner/banner';
import BestSellers from '../../Content/BestSeller/bestSellers';
import Newsletter from '../../Content/Newsletter/newsletter';
import Banner2 from '../../Content/Banner2/banner-2';
import { useSelector } from 'react-redux';
import UserInfo from './mini-components/UserInfo/user-info.js';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Address from './mini-components/Address/address.js';
import SellerProducts from './mini-components/SellerProducts/seller-products.js';
import SellProducts from './mini-components/SellProducts/sell-products.js';
import Messages from './mini-components/Message/messages.js';
import Dashboard from './mini-components/Dashboard/dashboard.js';
import Manage from './mini-components/Manage/manage-users.js';
import Payments from './mini-components/Payments/payments.js';
import Calendar from './mini-components/Calendar/calendar.js';
import Category from './mini-components/Category/category.js';
import Purchases from './mini-components/Purchases/purchases.js';

const User = () => {
    
    fetch('http://localhost:5000/',{
        headers:{
            'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: ""
        }
    }).then(res => console.log(res.text()));
    return (
            <div className = "container">
                <div className="App">
                <Header/>
                <span className="line-title"></span>
                <Title/>
                <Route path="/user/user" exact component={UserInfo}/>
                <Route path="/user/dashboard" component={Dashboard}/>
                <Route path="/user/category" component={Category}/>
                <Route path="/user/manage" component={Manage}/>
                <Route path="/user/payments" component={Payments}/>
                <Route path="/user/calendar" component={Calendar}/>
                <Route path="/user/address" component={Address}/>
                <Route path="/user/products" component={SellerProducts}/>
                <Route path="/user/sell" component={SellProducts}/>
                <Route path="/user/message" component={Messages}/>
                <Route path="/user/purchases" component={Purchases}/>
                </div>
                <div className = "App">
                    <Footer/>
                </div>
            </div>
    );
}

export default User;
