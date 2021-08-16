import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Card, TableCell, TableContainer , TableHead, TableRow, TableBody, Paper, Table, makeStyles, CardContent, CardHeader, Button, withStyles, CardMedia, IconButton,CircularProgress} from "@material-ui/core";
import {AddCircleOutline, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined} from '@material-ui/icons';
import { useCallback, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import UserMenu from "../Menu/user-menu";
import PlaceHolderImage from '../../../../../assets/placeholder-image.png';
import React from "react";

const root = makeStyles({
    header:{
        width:'68%'
    }
})

const SellerProducts = () => {
    const styles = root();
    const SellProductButton = withStyles({
        root:{
            backgroundColor: '#F53848',
            borderRadius: 3,
            '&:hover': {
                background: '#da303e'
            }
        }
    })(Button)
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)

    

    const [products,setProducts] = useState(0)

    const getProducts = useCallback(async function getProducts(){
        await fetch(`http://localhost:5000/product/get-seller-products/${user.id}`,{
            headers: {
                'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
            }
        })
        .then(res => res.json())
        .then(res => {
            setProducts(res)
            console.log(products)
        })
    });



    useEffect(() => {
        if(products === 0){
            getProducts();
        }
    },[products])

    const Row = ({product}) => {
        const [detailsDropdown, setDetailsDropdown] = useState(false);
        let image=0;
        const res = fetch(`http://localhost:5000/product/get-image/${product.product_name}/${product.image}`,{
            headers: {
                'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
            }
        }).then(res => res.blob())
        .then(res => {
            image=res
        })
        
        return <React.Fragment>
                    <TableRow checkboxSelection>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">{product.product_name}</TableCell>
                        <TableCell align="left">{product.created_date}</TableCell>
                        <TableCell align="left">
                            <IconButton aria-label="expand row" size="small" onClick={() => setDetailsDropdown(!detailsDropdown)}>
                                {detailsDropdown ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                            </IconButton>
                        </TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={5} style={{ paddingBottom: '5px', paddingTop: '5px' ,borderBottom: 0}} component="th" scope="row">
                            <Collapse in={detailsDropdown} timeout="auto" unmountOnExit>
                                <Card component={Paper}>
                                    <section>
                                        <CardMedia style={{width:'100%',height:'200px',}} component="img" image={`http://localhost:5000/product/get-image/${product.product_name}/${product.image}`}/>
                                        <CardContent style={{display:'flex',gap:'1rem',width:'100%'}}>
                                            <section style={{display:'flex',flexDirection:'column',gap:'1rem',width:'100%'}}>
                                                <span>Price: P {product.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                                <span>Category: {product.category}</span>
                                                <span>Quantity: {product.quantity}</span>
                                            </section>
                                            <section style={{width:'100%',padding:0}}>
                                                <span>
                                                {product.description}
                                                </span>
                                            </section>
                                        </CardContent>
                                    </section>
                                </Card>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
    }
    return (
        <section>
            {(user === false)? <Redirect to="/login"/>:null}
            <div className="content-header">
                <div><span>RAKU</span><span style={{color: "#FD2E2E"}}>TECH</span><span> {(user.role==='SLR')?"SELLER":(user.role==='ADM')?"ADMIN":"USER"}</span></div>
                <div className="content-header__icons">
                    <div><FontAwesomeIcon icon={faSearch}/></div>
                    <div><FontAwesomeIcon icon={faBell}/></div>
                    <div><FontAwesomeIcon icon={faUser}/></div>
                </div>
            </div>
            <div className="content-container">
                <UserMenu user={user} active="products"/> 
                <Card className={styles.header}>
                    <CardHeader title={
                        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span>Products</span>
                                <SellProductButton>
                                    <Link to="/user/sell" style={{color:'white',textDecoration:'none',display:'flex',alignItems:'center',gap:'.5rem'}}><AddCircleOutline/>Sell Product</Link>
                                </SellProductButton>
                            </div>
                            <hr/>
                        </div>
                    }/>
                    <CardContent>
                        <TableContainer >
                            <Table aria-label="sticky table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Date Created</TableCell>
                                    <TableCell align="left">Details</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(products !== 0)? 
                                        (products.length!== 0)?
                                            products.map( product => {
                                                return <Row key={product.product_id} product={product}/>
                                            })
                                        :null
                                        :null
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default SellerProducts;