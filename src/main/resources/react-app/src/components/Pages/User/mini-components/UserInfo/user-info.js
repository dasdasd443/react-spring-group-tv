import Title from "../../../../Header/Title/title"
import { useCallback, useState } from "react"
import { Redirect } from "react-router-dom"
import UserMenu from "../Menu/user-menu"
import TempProfile from '../../../../../assets/temp_profile_picture.png';
import './user-info.css'
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, withStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ViewTemplate from "../../components/view-template";

const UserInfo = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    const [fullName, setFullName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState((user.phone!=='null')?user.phone:"");
    const [sellerName, setSellerName] = useState((user.seller_name!=='null')?user.seller_name:"");
    const [shippingAddress, setShippingAddress] = useState((user.shipping_address!=='null')?user.shipping_address:"");
    const [billingAddress, setBillingAddress] = useState((user.billing_address!=='null')?user.billing_address:"");
    const [updateDialog, setUpdateDialog] = useState(false)

    const UpdateProfileButton = withStyles(theme => ({
        root:{
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
            padding:'10px',
            '&:hover': {
                backgroundColor: red[700],
              },
        }
    }))(Button);

    const UpdateProfile = useCallback(async function UpdateProfile(){
        let updateUser = user;
        updateUser.name = fullName;
        updateUser.email = email;
        updateUser.phone = (phone!=="")?phone:"null";
        updateUser.seller_name = (sellerName!=="")?sellerName:"null";
        updateUser.billing_address = (billingAddress!=="")?billingAddress:"null";
        updateUser.shipping_address = (shippingAddress!=="")?shippingAddress:"null";
        
        await fetch('http://localhost:5000/api/user/update-user',{
            method:'PUT',
            headers: new Headers({
                'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                'content-type':'application/json'
            }),
            body: JSON.stringify(updateUser)
        }).then(res => {
            setUpdateDialog(false)
            let currentUser = JSON.parse(localStorage.getItem('user'));
            currentUser.details = updateUser;
            localStorage.setItem('user',JSON.stringify(currentUser));
        })
    });
    return (
        <ViewTemplate
            active="account"
            content={
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={5}>
                        <Card style={{width:'100%'}}>
                            <CardHeader title={<div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <span>USER PRO<span style={{color:'#FD2E2E'}}>FILE</span></span>
                                    </div>
                                    <hr/>
                                </div>}/>
                            <CardContent style={{width:'100%',display:'flex',gap:'1rem'}}>
                                <section style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <Avatar style={{width:'100px',height:'100px'}} image={TempProfile}/>
                                    <CardHeader title={user.name}/>
                                </section>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={7}>
                        <Card style={{width:'100%'}}>
                            <CardHeader title={<div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <span>INFORMA<span style={{color:'#FD2E2E'}}>TION</span></span>
                                    </div>
                                    <hr/>
                                </div>}/>
                            <CardContent profile style={{display:'flex',flexDirection:'column', gap:'1rem'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField value={user.name} style={{pointerEvents:'none'}} label="Full Name"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField value={user.email} style={{pointerEvents:'none'}} label="Email Address"/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField value={(user.phone!== 'null')? user.phone:"N/A"} style={{pointerEvents:'none'}} label="Contact Number"/>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField style={{pointerEvents:'none'}} value={(user.seller_name!== 'null')? user.seller_name:"N/A"} label="Seller Name"/>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField  style={{width:"100%",pointerEvents:'none'}} value={(user.shipping_address!== 'null')? user.shipping_address:"N/A"} label="Shipping Address"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField value={(user.billing_address!== 'null')? user.billing_address:"N/A"} style={{width:"100%",pointerEvents:'none'}} label="Billing Address"/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={12}>
                        <Card>
                            <CardHeader title={<div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                                <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <span>EDIT PRO<span style={{color:'#FD2E2E'}}>FILE</span></span>
                                </div>
                                <hr/>
                            </div>}/>
                            <CardContent >
                                <form >
                                    <Grid container spacing={3}>
                                        <Grid item lg={6} >
                                            <TextField value={fullName} onChange={(event) => setFullName(event.target.value)} label="Full Name" style={{width:'100%'}} />
                                        </Grid>
                                        <Grid item lg={6} >
                                            <TextField value={email} onChange={(event) => setEmail(event.target.value)} label="Email Address" style={{width:'100%'}} />
                                        </Grid>
                                        <Grid item lg={4} >
                                            <TextField value={phone} onChange={(event) => setPhone(event.target.value)} label="Contact Number" style={{width:'100%'}} />
                                        </Grid>
                                        <Grid item lg={8} >
                                            {(user.role==="CUS")? 
                                            <TextField disabled label="Seller Name" style={{width:'100%'}} />:
                                            <TextField value={sellerName} onChange={(event) => setSellerName(event.target.value)} label="Seller Name" style={{width:'100%'}} />}
                                        </Grid>
                                        <Grid item lg={12} >
                                            <TextField value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} label="Shipping Address" style={{width:'100%'}} />
                                        </Grid>
                                        <Grid item lg={12} >
                                            <TextField value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} label="Billing Address" style={{width:'100%'}} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <UpdateProfileButton onClick={() => setUpdateDialog(true)} color="primary">
                                                Update Profile
                                            </UpdateProfileButton>
                                        </Grid>
                                    </Grid>
                                    <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
                                        <DialogTitle>Update Profile</DialogTitle>
                                        <DialogContent>Continue updating profile?</DialogContent>
                                        <DialogActions>
                                            <Button color="secondary" onClick={UpdateProfile}>
                                                Update Profile
                                            </Button>
                                            <Button color="secondary" onClick={() => setUpdateDialog(false)}>
                                                Cancel
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            }
        />
    )
}

export default UserInfo;