import { withStyles,InputLabel, Input,FormControl, Select, TextField, CircularProgress, Grid, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, IconButton, Button, InputAdornment, MenuItem, FormHelperText } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { DeleteForever, Edit, Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import ActionDialog from "../../components/action-dialog";
import CardTemplate from "../../components/card-template";
import TextFieldWithError from "../../components/textfield-with-error";
import ViewTemplate from "../../components/view-template";

const Manage = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    // this is to set for useEffect, which is set with a random number everytime a user performs an action
    const [actions,setActions] = useState(0)

    const [userList,setUserList] = useState(0)
    const GetUsers = useCallback(async function GetUsers(){
        await fetch('http://localhost:5000/api/user/users',{
            headers: {
                'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
            },
        }).then(res => res.json())
        .then(json => {
            setUserList(json);
        })
    })

    useEffect(() => {
        GetUsers();
    },[actions])

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

    const Row = ({userCell}) => {
        const [deleteDialog, setDeleteDialog] = useState(false);

        const DeleteUser = useCallback(async function DeleteUser(){
            await fetch(`http://localhost:5000/api/user/delete-user/${userCell.id}`,{
                method:'DELETE',
                headers: {
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                },
            }).then(res => {
                setDeleteDialog(false)
                setActions(Math.random())
            })
        })

        const [updateDialog, setUpdateDialog] = useState(false);
        const [selectedRole, setSelectedRole] = useState(userCell.role)

        const UpdateUser = useCallback(async function UpdateUser(){
            let updateUser = userCell;
            updateUser.role = selectedRole;

            await fetch('http://localhost:5000/api/user/update-user',{
                method:'PUT',
                headers: {
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                    "Content-type":"application/json"
                },
                body: JSON.stringify(updateUser)
            }).then(res => {
                setUpdateDialog(false)
                setActions(Math.random())
            })
        });

        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>{userCell.id}</TableCell>
                    <TableCell>{userCell.name}</TableCell>
                    <TableCell>{userCell.email}</TableCell>
                    <TableCell>{userCell.role}</TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={()=>setUpdateDialog(true)}>
                            <Edit/>
                        </IconButton>
                        <ActionDialog
                        open={updateDialog}
                        title="Update User role"
                        content={
                            <FormControl style={{width:'100%'}}>
                                <InputLabel>Select User Role</InputLabel>
                                <Select value={selectedRole} onChange={(event)=> setSelectedRole(event.target.value)}>
                                    <MenuItem value={"ADM"}>Admin</MenuItem>
                                    <MenuItem value={"SLR"}>Seller</MenuItem>
                                    <MenuItem value={"CUS"}>Customer</MenuItem>
                                </Select>
                            </FormControl>
                        }
                        ok={'Update'}
                        cancel={'Cancel'}
                        okAction={UpdateUser}
                        cancelAction={() => setUpdateDialog(false)}
                        />
                    </TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={()=>setDeleteDialog(true)}>
                            <DeleteForever />
                        </IconButton>
                        <ActionDialog
                        open={deleteDialog}
                        title="Delete User"
                        content={`Delete user ${userCell.id}?`}
                        ok={'Delete'}
                        cancel={'Cancel'}
                        okAction={DeleteUser}
                        cancelAction={() => setDeleteDialog(false)}
                        />
                    </TableCell>
                </TableRow>    
            </React.Fragment>
        )
    }

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [sellerName,setSellerName] = useState('');
    const [shippingAddress,setShippingAddress] = useState('');
    const [billingAddress,setBillingAddress] = useState('');

    const [addUserDialog,setAddUserDialog] = useState(false);

    const [submit,setSubmit] = useState(false)
    const [nameError,setNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const CheckInput = ({name,email,password}, submitUser) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setNameError(
            (name==="")?"Please input the full name":
            (name.split(" ").length < 2)?"Please fill the first name and last name (middle optional)":
            false
        )
        setPasswordError(
            (password==="")?"Please enter the user's password":
            (password.length < 9)?"The password must be greater than 8 characters":
            false
        )
        setEmailError(
            (email==="")?"Please enter the user's email":
            (!re.test(email))? "Please enter a valid email":
            false
        )
    }

    //this is to check the inputs for name, email, password, and role for every change
    useEffect(() => {
        CheckInput({name,email,password,role});
    },[name,email,password,role])

    const AddUser = useCallback(async function AddUser(){
        let newUser = {
            name,
            email,
            role,
            password,
            phone,
            seller_name:sellerName,
            shipping_address: shippingAddress,
            billing_address: billingAddress
        }
        
        if(!nameError && !emailError && !passwordError && role!==""){
            await fetch('http://localhost:5000/api/user/register',{
                mode:'cors',
                method:'POST',
                headers: new Headers({'content-type':'application/json'}),
                body: JSON.stringify(newUser)
            }).then(res => {
                setSubmit(false);
                setAddUserDialog(false);
                setActions(Math.random());
            })
        }
        setSubmit(true)
    });
    return (
        <ViewTemplate
        active="manage"
        content={
            <section>
                <Grid container spacing={2}>
                    <Grid item lg={8}>
                        <CardTemplate
                        title={<span>Users L<span style={{color:'#FD2E2E'}}>ist</span></span>}
                        content={
                            <TableContainer style={{maxHeight:'400px'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Full Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Role</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(userList!==0)?
                                            userList.map(userCell => {
                                                return <Row key={userCell.id} userCell={userCell}/>
                                            })
                                            :<CircularProgress/>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                        />
                    </Grid>
                    <Grid item lg={4}>
                        <CardTemplate
                        title={<span>Users D<span style={{color:'#FD2E2E'}}>ata</span></span>}
                        content={
                            <Grid container spacing={2}>
                                <Grid item lg={12}>
                                <span>Admins: {(userList!==0)?userList.filter(singleUser => singleUser.role==="ADM").length:null}</span>
                                </Grid>
                                <Grid item lg={12}>
                                <span>Seller: {(userList!==0)?userList.filter(singleUser => singleUser.role==="SLR").length:null}</span>
                                </Grid>
                                <Grid item lg={12}>
                                <span>Customer: {(userList!==0)?userList.filter(singleUser => singleUser.role==="CUS").length:null}</span>
                                </Grid>
                            </Grid>
                        }
                        />
                    </Grid>
                    <Grid item lg={12}>
                        <CardTemplate
                        title={<span>Add U<span style={{color:'#FD2E2E'}}>ser</span></span>}
                        content={
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item lg={5} >
                                        <TextField 
                                        value={name} 
                                        onChange={(event) => setName(event.target.value)} 
                                        required 
                                        error={nameError && submit}
                                        helperText={(nameError && submit)?nameError:null}
                                        label={"Full Name"}
                                        style={{width:'100%'}} />
                                    </Grid>
                                    <Grid item lg={5} >
                                        <TextField 
                                        required 
                                        value={email} 
                                        onChange={(event) => setEmail(event.target.value)} 
                                        error={emailError && submit}
                                        helperText={(emailError && submit)? emailError:null}
                                        label="Email Address" 
                                        style={{width:'100%'}} />
                                    </Grid>
                                    <Grid item lg={2} style={{}}>
                                        <FormControl style={{width:'100%'}}>
                                            <InputLabel 
                                            required 
                                            error={role==="" && submit}
                                            helperText={(role==="" && submit)? "Please select the user's role":null}
                                            htmlFor="role">Role</InputLabel>
                                            <Select 
                                            error={role==="" && submit}
                                            label="Role" id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                                                <MenuItem value={"ADM"}>Admin</MenuItem>
                                                <MenuItem value={"SLR"}>Seller</MenuItem>
                                                <MenuItem value={"CUS"}>Customer</MenuItem>
                                            </Select>
                                            {(role==="" && submit)?<FormHelperText error>Please select the user's role</FormHelperText>:null}
                                            
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} >
                                        <FormControl>
                                            <InputLabel 
                                            error={passwordError && submit}
                                            required htmlFor="standard-adornment-password">Password</InputLabel>
                                            <Input
                                                value={password} 
                                                error={passwordError && submit}
                                                onChange={(event) => setPassword(event.target.value)}
                                                id="standard-adornment-password"
                                                type={'password'}
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    >
                                                    <Visibility />
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                            />
                                            {(passwordError && submit)?<FormHelperText error>{passwordError}</FormHelperText>:null}
                                        </FormControl>
                                    </Grid>
                                    <Grid item lg={4} >
                                        <TextField value={phone} onChange={(event) => setPhone(event.target.value)} label="Contact Number" style={{width:'100%'}} />
                                    </Grid>
                                    <Grid item lg={4} >
                                    <TextField value={sellerName} onChange={(event) => setSellerName(event.target.value)} label="Seller Name" style={{width:'100%'}} />
                                    </Grid>
                                    <Grid item lg={12} >
                                        <TextField value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} label="Shipping Address" style={{width:'100%'}} />
                                    </Grid>
                                    <Grid item lg={12} >
                                        <TextField value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} label="Billing Address" style={{width:'100%'}} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <UpdateProfileButton color="primary" onClick={()=> setAddUserDialog(true)}>
                                            Add User
                                        </UpdateProfileButton>
                                        <ActionDialog
                                        title="Add User"
                                        open={addUserDialog}
                                        content={`Add this user and register this user as ${(role==="ADM")? `an admin`:(role==="SLR")? `a seller`: `a customer`}?`}
                                        ok="Add User"
                                        cancel="Cancel"
                                        okAction={AddUser}
                                        cancelAction={()=>setAddUserDialog(false)}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        }
                        />
                    </Grid>
                </Grid>
            </section>
        }
        />
    )
}

export default Manage;