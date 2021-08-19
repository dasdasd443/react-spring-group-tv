import './user-menu.css';
import TempProfile from '../../../../../assets/temp_profile_picture.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import {Avatar, Button, Card, Typography} from '@material-ui/core';
import { faAddressCard, faBox, faCalendar, faCreditCard, faDollyFlatbed, faIndustry, faList, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AccountCircle, CalendarToday, Category, CreditCard, Dashboard, ExitToApp, Home, Message, PeopleAlt, Storage } from '@material-ui/icons';
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
                    <Link to="/user/dashboard"><Button className={(active==='dashboard')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center',justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><Dashboard style={{color:'#FD2E2E'}}/> Dashboard</Typography></Button></Link>:null
                    }
                    <Link to="/user/user"><Button className={(active==='account')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center',justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><AccountCircle style={{color:'#FD2E2E'}}/>  Account</Typography></Button></Link>
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/calendar"><Button className={(active==='calendar')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center',justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><CalendarToday style={{color:'#FD2E2E'}}/> Calendar</Typography></Button></Link>:null
                    }
                    <Link to="/user/address"><Button className={(active==='address')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center',justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><Home style={{color:'#FD2E2E'}}/> Address</Typography></Button></Link>
                    <Link to="/user/message"><Button className={`${(active==='message')? "active":"inactive"} messages`}> <Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><Message style={{color:'#FD2E2E'}}/> Messages</Typography> <span>8</span></Button></Link>
                    {(user.role === "ADM")?
                    <Link to="/user/manage"><Button className={(active==='manage')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center',justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><PeopleAlt style={{color:'#FD2E2E'}}/> Manage Users</Typography></Button></Link>:null
                    }
                    {(user.role === "ADM")?
                    <Link to="/user/category"><Button className={(active==='category')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center',justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><Category style={{color:'#FD2E2E'}}/> Category</Typography></Button></Link>:null
                    }
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/products"><Button className={(active==='products')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center',justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><Storage style={{color:'#FD2E2E'}}/>   Products</Typography></Button></Link>:null
                    }
                    {(user.role === "SLR" || user.role === "ADM")?
                    <Link to="/user/payments"><Button className={(active==='payments')? "active":"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center',justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><CreditCard style={{color:'#FD2E2E'}}/> Payments</Typography></Button></Link>:null
                    }
                    <hr/>
                    <Link to="" onClick={LogoutUser}><Button className={"inactive"} style={{display:'flex',gap:'1rem',alignItems:'center', justifyContent:'flex-start'}}><Typography style={{display:'flex',alignItems:'center',gap:'.5rem',textTransform:'capitalize'}}><ExitToApp style={{color:'#FD2E2E'}}/> Logout</Typography></Button></Link>
                </div>
            </Card>
    )
}

export default UserMenu;