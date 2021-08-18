import AdminNavigation from './admin-navigation';
import './admin.css';
import {IoSearchOutline, IoIosNotificationsOutline, IoPersonOutline} from 'react-icons/all';
import Calendar from './calendar';
import LatestTicket from './latestTicket';
import SaleStatic from './saleStatic';
import Traffic from './traffic';
import TrafficSources from './trafficSources';

const Admin = () =>{
	return(
		<div className="admin">
		<div className="admin-top">
		<h2>RAKU<span className="admin-tech">TECH</span> ADMIN</h2>
		<div className="admin-i">
			<IoSearchOutline/>
			<IoIosNotificationsOutline/>
			<IoPersonOutline/>
		</div>
		</div>
		<div className="ad-con">
		<AdminNavigation/>
		<div>
			<SaleStatic/>
			<div className="ad-con">
				<Traffic/>
				<LatestTicket/>
			</div>
		</div>
		<div>
		<Calendar/>
		<TrafficSources/>
		</div>
		</div>
		
		</div>
	)
}
export default Admin;