import './user-menu.css';
import TempProfile from '../../../../../assets/temp_profile_picture.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import {Card} from '@material-ui/core';
import { faAddressCard, faBox, faDollyFlatbed, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
const UserMenu = ({user, active}) => {
    const LogoutUser = useCallback(() => {
        localStorage.removeItem('user')
        window.location.href = "/";
    })
    return (
            <Card className="user-menu-container">
                <div className="user-info">
                    <div className="user-thumbnail">
                        <img className="profile-pic" src={TempProfile}/>
                        <span className="info-span">{user.name}</span>
                    </div>
                    <span className="user-info__sold-amount">P 1234567</span>
                </div>
                <hr/>
                <div className="user-menu">
                    <Link to="/user"><div className={(active==='account')? "active":null}><span> <FontAwesomeIcon icon={faUser}/> Account</span></div></Link>
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/dashboard"><div className={(active==='dashboard')? "active":null}><span> <FontAwesomeIcon icon={faBox}/> Dashboard</span></div></Link>:null
                    }
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/calendar"><div className={(active==='calendar')? "active":null}><span> <FontAwesomeIcon icon={faBox}/> Calendar</span></div></Link>:null
                    }
                    <Link to="/user/address"><div className={(active==='address')? "active":null}><span> <FontAwesomeIcon icon={faAddressCard}/> Address</span></div></Link>
                    <Link to="/user/message"><div className={`${(active==='message')? "active":null} messages`}><span > <FontAwesomeIcon icon={faUser}/> Messages</span> <span>8</span></div></Link>
                    {(user.role === "ADM")?
                    <Link to="/user/manage"><div className={(active==='manage')? "active":null}><span> <FontAwesomeIcon icon={faBox}/> Manage Users</span></div></Link>:null
                    }
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/products"><div className={(active==='products')? "active":null}><span> <FontAwesomeIcon icon={faBox}/> Products</span></div></Link>:null
                    }
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/payments"><div className={(active==='payments')? "active":null}><span> <FontAwesomeIcon icon={faBox}/> Payments</span></div></Link>:null
                    }
                    <hr/>
                    <Link to="" onClick={LogoutUser}><div><span> <FontAwesomeIcon icon={faSignOutAlt} /> Logout</span></div></Link>
                </div>
            </Card>
    )
}

export default UserMenu;