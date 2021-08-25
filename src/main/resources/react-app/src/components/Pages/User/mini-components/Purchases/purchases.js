import { Collapse, CardHeader, Card, CardContent, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, CardMedia } from "@material-ui/core";
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@material-ui/icons";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import ViewTemplate from "../../components/view-template";

const Purchases = () => {

    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    const [orders,setOrders] = useState(0);

    const GetPurchases = useCallback(async function GetPurchases(){
        await fetch(`http://localhost:5000/api/orders/get-purchases/${user.id}`,{
            headers:{
                'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
            }
        }).then(res => res.json())
        .then(json => setOrders(json))
        .then(res => console.log(orders))
    });

    useEffect(() => {
        GetPurchases();
    },[]);

    const ProductRow = ({orderDetail, order}) => {
        const [product,setProduct] = useState(0);
        const GetProduct = useCallback(async function GetProduct(){
            await fetch(`http://localhost:5000/product/get-product/${orderDetail.product_id}`,{
                headers: {
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                },
            }).then(res => res.json())
            .then(json => setProduct(json))
        });

        useEffect(() => {
            GetProduct();
        },[]);

        return (
            <TableRow style={{width:'100%'}}>
                <TableCell style={{width:'10%'}}>
                    {orderDetail.id}
                </TableCell>
                <TableCell style={{width:'30%'}}>
                    <CardMedia style={{maxWidth:'200px',maxHeight:'200px'}} component="img" image={`http://localhost:5000/product/get-image/${product.product_id}/${product.image}`}/>
                </TableCell>
                <TableCell style={{width:'10%'}}>
                    {product.product_name}
                </TableCell>
                <TableCell style={{width:'10%'}}>
                    {orderDetail.quantity}
                </TableCell>
                <TableCell style={{width:'20%'}}>
                    {order.order_date.split("T")[0]}
                </TableCell>
                <TableCell style={{width:'10%'}}>
                    {order.order_status}
                </TableCell>
            </TableRow>
        )
    }

    const Row = ({order}) => {
            const [orderDetails,setOrderDetails] = useState(0);
            const [orderDetailsDropdown, setOrderDetailsDropdown] = useState(false)

            const GetOrderDetails = useCallback(async function GetOrderDetails(){
                await fetch(`http://localhost:5000/api/orders/get-order-details/${order.id}`,{
                    headers: {
                        'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                    },
                }).then(res => res.json())
                .then(json => setOrderDetails(json))

            });

            useEffect(() => {
                GetOrderDetails();
            },[])

        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        {order.id}
                    </TableCell>
                    <TableCell>
                        {(order.order_date).split("T")[0]}
                    </TableCell>
                    <TableCell>
                        {order.order_status}
                    </TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOrderDetailsDropdown(!orderDetailsDropdown)}>
                            {orderDetailsDropdown ? <KeyboardArrowUpOutlined style={{color:'#FD2E2E'}} /> : <KeyboardArrowDownOutlined style={{color:'#FD2E2E'}} />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4} style={{ paddingBottom: '5px', paddingTop: '5px' ,borderBottom: 0}} component="th" scope="row">
                        <Collapse in={orderDetailsDropdown} timeout="auto" unmountOnExit>
                            <Table>
                                <TableContainer>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Product</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Order Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(orderDetails!==0)?
                                            orderDetails.map(orderDetail => {
                                                
                                                return (
                                                    <ProductRow order={order} orderDetail={orderDetail}/>
                                                )
                                            }):null
                                        }
                                    </TableBody>
                                </TableContainer>
                            </Table>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    return (
        <ViewTemplate
        active="purchases"
        content={
            <Card>
                <CardHeader title={
                    <CardHeader title={<div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span>Purchase O<span style={{color:'#FD2E2E'}}>rders</span></span>
                    </div>
                    <hr/>
                </div>}/>
                }/>
                <CardContent>
                    <Table >
                        <TableContainer>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width:'20%'}}>
                                        Order ID
                                    </TableCell>
                                    <TableCell style={{width:'50%'}}>
                                        Date
                                    </TableCell>
                                    <TableCell style={{width:'20%'}}>
                                        Status
                                    </TableCell>
                                    <TableCell style={{width:'10%'}}>
                                        Details
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(orders!==0)?
                                orders.map(order => {
                                    return (
                                        <Row order={order}/>
                                    )
                                }):null
                                }
                            </TableBody>
                        </TableContainer>
                    </Table>
                </CardContent>
            </Card>
        }
        />
    );
}

export default Purchases;