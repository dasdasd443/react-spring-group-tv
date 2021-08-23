import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
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
            <Grid container spacing={2}>
                {(user.role!=="ADM" && user.role!=="SLR")? <Redirect to="/user/user"/>:null}
                <Grid item lg={12}>
                    <SalesStatistics/>
                </Grid>
                <Grid item lg={12}>
                    <DashBoardCalendar/>
                </Grid>
            </Grid>
        }
        />
    )
}

export default Dashboard;