import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import ViewTemplate from "../../components/view-template";
import UserMenu from "../Menu/user-menu";
import DashBoardCalendar from "./mini-components/dashboard-calendar";
import SalesStatistics from "./mini-components/sales-statistics";

const Dashboard = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    return (
        <ViewTemplate
        active="dashboard"
        content={
            // {/* total width 68% gap 3% */}
            <div style={{width:'68%',gap:'1rem',display:'flex',flexWrap:'wrap'}}>
                {(user.role!=="ADM" && user.role!=="SLR")? <Redirect to="/user/user"/>:null}
                <SalesStatistics style={{width:'55%'}}/>
                <DashBoardCalendar style={{width:'42%'}}/>
            </div>
        }
        />
    )
}

export default Dashboard;