import './admin.css';
import {MdAccountCircle, RiDashboardLine, HiOutlineUsers, FaRegCalendarAlt, TiMessages, MdPayment, RiLogoutBoxLine} from 'react-icons/all'

const AdminNavigation = ()=>{
	return(
		<div className="adnav-con">
			<div className="adnav-info">
				<MdAccountCircle/>
				<span className="adnav-name">Vivian Dela Cruz</span>
				<span className="adnav-total">P 47,000</span>
			</div>
			<hr/>
			<nav>
				<ul className="adnav-ul">
					<li className="adnav-li"><RiDashboardLine/> Dashboard</li>
					<li className="adnav-li"><HiOutlineUsers/>Users manager</li>
					<li className="adnav-li"><FaRegCalendarAlt/>Calendar</li>
					<li className="adnav-li"><TiMessages/>Messages</li>
					<li className="adnav-li"><MdPayment/>Payments</li>
				</ul>
			</nav>
			<hr/>
			<div className="adnav-logout">
				<RiLogoutBoxLine/> Logout
			</div>
		</div>
	)
}
export default AdminNavigation;