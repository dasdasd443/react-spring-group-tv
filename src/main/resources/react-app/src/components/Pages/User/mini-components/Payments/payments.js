import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import CardTemplate from "../../components/card-template";
import ViewTemplate from "../../components/view-template";
import UserMenu from "../Menu/user-menu";

const Payments = () => {
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    const [payments,setPayments] = useState([]);
    const [products,setProducts] = useState(0);
    
    const GetProducts = useCallback(async function GetProducts(){
        const products = await fetch(`http://localhost:5000/product/get-seller-products/${user.id}`,{
            headers:{
                'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
            },
        }).then(res => res.json())
        .then(json => {
            setProducts(json);
            return json;
        });

        let arr=[]
        products.forEach(item => {
            async function GetOrderDetail(item){
                const response = await fetch(`http://localhost:5000/api/orders/get-order-details-by-product-id/${item.product_id}`,{
                headers:{
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                },
                }).then(res => res.json())
                .then(json => {
                    if(json.length!==0){
                        json.forEach(item => {
                            setPayments(payments => [...payments,item])
                        })
                    }
                })
            }
            GetOrderDetail(item)
        })
        
    });

    useEffect(() => {
        setPayments([])
        GetProducts();
    },[])

    const Row = ({orderDetail}) => {

        const [customer,setCustomer] = useState(0);
        const [order, setOrder] = useState(0);

        const GetOrder = useCallback(async function GetOrder(){
            await fetch(`http://localhost:5000/api/orders/get-order/${orderDetail.order_id}`,{
                headers:{
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                },
            }).then(res => res.json())
            .then(json => {
                setOrder(json)
                GetCustomer(json.customer_id)
            })
            //.then(res => console.log(res))
        });

        const GetCustomer = useCallback(async function GetCustomer(customer_id){
            await fetch(`http://localhost:5000/api/user/get-user/${customer_id}`,{
                headers:{
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                },
            }).then(res => res.json())
            .then(res => setCustomer(res))
        });

        useEffect(() => {
            GetOrder();
            console.log(payments)
        },[])
        
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        {orderDetail.order_id}
                    </TableCell>
                    <TableCell>
                        {products.find(product => product.product_id === orderDetail.product_id).product_name}
                    </TableCell>
                    <TableCell>
                        {customer.name}
                    </TableCell>
                    <TableCell>
                        {order.order_date}
                    </TableCell>
                    <TableCell>
                        {order.order_status}
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    return (
        <ViewTemplate
        active={"payments"}
        content={
            <CardTemplate
            title={<span>Paym<span style={{color:'#FD2E2E'}}>ents</span></span>}
            content={
                <React.Fragment>
                    {(user.role!=="ADM" && user.role!=="SLR")?<Redirect to="/user/user"/>:null}
                    <Table>
                        <TableContainer>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Order ID
                                    </TableCell>
                                    <TableCell>
                                        Product Name
                                    </TableCell>
                                    <TableCell>
                                        Customer Name
                                    </TableCell>
                                    <TableCell>
                                        Date
                                    </TableCell>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (payments.length!==0)?
                                    payments.map(payment => {
                                        return (
                                            <Row key={payment.id} orderDetail={payment}/>
                                        );
                                    }):null
                                }
                            </TableBody>
                        </TableContainer>
                    </Table>
                </React.Fragment>
            }
            />
        }
        />
    )
}

export default Payments;