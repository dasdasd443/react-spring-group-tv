import './user-menu.css';
import TempProfile from '../../../../../assets/temp_profile_picture.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import {Avatar, Card} from '@material-ui/core';
import { faAddressCard, faBox, faCalendar, faCreditCard, faDollyFlatbed, faIndustry, faList, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
const UserMenu = ({user, active}) => {
    const LogoutUser = useCallback(() => {
        localStorage.removeItem('user')
        window.location.href = "/";
    })
    return (
            <Card className="user-menu-container">
                <div className="user-info">
                    <div className="user-thumbnail">
                        <Avatar image={TempProfile}/>
                        <span className="info-span">{user.name}</span>
                    </div>
                    <span className="user-info__sold-amount">P 1234567</span>
                </div>
                <hr/>
                <div className="user-menu">
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/dashboard"><div className={(active==='dashboard')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faIndustry}/><span>Dashboard</span></div></Link>:null
                    }
                    <Link to="/user/user"><div className={(active==='account')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faUser}/><span>  Account</span></div></Link>
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/calendar"><div className={(active==='calendar')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faCalendar}/><span>Calendar</span></div></Link>:null
                    }
                    <Link to="/user/address"><div className={(active==='address')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faAddressCard}/><span>Address</span></div></Link>
                    <Link to="/user/message"><div className={`${(active==='message')? "active":"inactive"} messages`}> <section style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faUser}/><span >   Messages</span></section> <span>8</span></div></Link>
                    {(user.role === "ADM")?
                    <Link to="/user/manage"><div className={(active==='manage')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faBox}/><span>   Manage Users</span></div></Link>:null
                    }
                    {(user.role === "ADM")?
                    <Link to="/user/category"><div className={(active==='category')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faList}/><span> Category</span></div></Link>:null
                    }
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/products"><div className={(active==='products')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faBox}/><span>   Products</span></div></Link>:null
                    }
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/payments"><div className={(active==='payments')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faCreditCard}/><span>   Payments</span></div></Link>:null
                    }
                    <hr/>
                    <Link to="" onClick={LogoutUser}><div className={"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center'}}><FontAwesomeIcon style={{color:'#FD2E2E'}} icon={faSignOutAlt} /><span>   Logout</span></div></Link>
                </div>
            </Card>
    )
}

export default UserMenu;