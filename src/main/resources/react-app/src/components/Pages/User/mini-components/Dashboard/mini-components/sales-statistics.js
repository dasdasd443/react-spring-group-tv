import { Card, CardHeader } from "@material-ui/core";
import CardTemplate from "../../../components/card-template";
import {Bar, Chart} from 'react-chartjs-2';
import { useCallback, useEffect, useRef, useState } from "react";

const SalesStatistics = ({style}) => {

    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    const [sales,setSales] = useState([5,10,13,14,20,16,3,0,0,0,0,0])
    const [loaded, setLoaded] = useState(false)
    const [data,setData] = useState(0);

    

    const GetProducts = useCallback(async function GetProducts(){
        const products = await fetch(`http://localhost:5000/product/get-seller-products/${user.id}`,{
            headers:{
                'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
            },
        }).then(res => res.json())
        .then(json => {
            return json;
        });
        products.forEach(item => {
            async function GetOrderDetail(item){
                const response = await fetch(`http://localhost:5000/api/orders/get-order-details-by-product-id/${item.product_id}`,{
                headers:{
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                },
                }).then(res => res.json())
                .then(json => json)

                if(response.length!==0){
                    response.forEach((item,index) => {
                        async function GetOrder(item){
                            await fetch(`http://localhost:5000/api/orders/get-order/${item.order_id}`,{
                                headers:{
                                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                                },
                            }).then(res => res.json())
                            .then(order => {
                                let array = sales;
                                array[new Date(order.order_date).getMonth()] +=item.quantity;
                                setSales(array)
                            }).then(res => {
                                setData(genData())
                            })
                        } 
                        GetOrder(item)
                    })
                }
            }
            GetOrderDetail(item)
        })
    });

    
    useEffect(() => { 
        GetProducts();
    },[])

    const genData = () => ({
        labels:['January','Febuary','March','April','May','June', 'July', 'August', 'September', 'October', 'November','December'],
        datasets:[
            {
                type:'line',
                label: '# of Sales',
                data: sales,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: '#FD2E2E',
            },
            {
                type:'bar',
                label: '# of Sales',
                data: sales,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
        ]
    });

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      
    
    return (
        <CardTemplate
        title={<span>Sales Statis<span style={{color:'#FD2E2E'}}>tics</span></span>}
        content={
            <section style={{width:'100%',height:'100%'}}>
                {(data)?
                    <Bar data={data} options={options} height={150} width={300}/>
                    :null
                }
            </section>
        }
        />
    )
}

export default SalesStatistics;