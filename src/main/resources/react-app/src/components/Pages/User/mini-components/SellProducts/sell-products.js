import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserMenu from "../Menu/user-menu";
import PlaceHolderImage from '../../../../../assets/placeholder-image.png';
import './sell-products.css';
import { withStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { RetrieveProducts } from "../../../../../store/action/seller-products-action";

const root = makeStyles({
    header:{
        width:'68%'
    }
})

const SellProducts = () => {
    const dispatch = useDispatch();
    const styles= root();
    const [user, setUser] = useState((localStorage.getItem('user')!== null)? JSON.parse(localStorage.getItem('user')).details: false)
    const SellProductButton = withStyles({
        root:{
            backgroundColor: '#F53848',
            color:'white',
            borderRadius: 3,
            '&:hover': {
                background: '#da303e'
            }
        }
    })(Button)

    const [categories, setCategories] = useState(0);

    const GetCategories = useCallback(async function GetCategories(){
        await fetch('http://localhost:5000/api/category/').then(res => res.json())
                .then(res => setCategories(res));
    });

    useEffect(() =>{
        if(categories === 0){
            GetCategories();
        }
    },[categories]);

    const[sellDialog, setSellDialog] = useState(false)

    const [imageInput, setImageInput] = useState(0);

    const [selectedCategory, setSelectedCategory] = useState(0);

    const SubmitProduct = useCallback(async function SubmitProduct(){
        let product_name = document.querySelector("#product-name").value;
        let weight = document.querySelector("#weight").value;
        let price = document.querySelector("#price").value;
        let description = document.querySelector("#description").value;

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = `${mm}${dd}${yyyy}`;

        let formData = new FormData();
        formData.append('product_name',product_name);
        formData.append('brand',user.seller_name);
        formData.append('discount_price',0);
        formData.append('price',price);
        formData.append('description',description);
        formData.append('weight',weight);
        formData.append('thumbnail','');
        formData.append('image',imageInput);
        formData.append('category',selectedCategory);
        formData.append('seller_id',user.id);
        formData.append('quantity',50);
        formData.append('created_date',new Date());


        if(product_name!=='' && weight!='' && price!=='' && description!=='' && selectedCategory!== 0 ){
            const response = await fetch('http://localhost:5000/product/save',{
                mode:'cors',
                method:'POST',
                headers: new Headers({
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                    //'content-type':'multipart/form-data'
                }),
                body: formData
                // body: JSON.stringify({
                //     product_name,
                //     brand: user.seller_name,
                //     discount_price:0,
                //     price,
                //     description,
                //     weight,
                //     thumbnail:'',
                //     image:imageInput.name,
                //     category: selectedCategory,
                //     seller_id: user.id,
                //     quantity:50,
                //     created_date: new Date()
                // })
            }).then(res => console.log(res.text()))
        }
    })
    
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
                <UserMenu user={user} active="sell"/> 
                <Card className={styles.header}>
                    <CardHeader title={
                        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span>Sell Product</span>
                            </div>
                            <hr/>
                        </div>
                    }/>
                    <CardContent>
                        <form style={{display:'flex',flexDirection:'column', gap:'2rem'}}>
                            <section style={{display:'flex',gap:'1rem'}}>
                                <section style={{display:'flex', flexDirection:'column', gap:'2rem', width:'100%'}}>
                                    <div style={{display:'flex', flexDirection:'column',gap:'1rem'}}>
                                        <label htmlFor="product-name">Product Name</label>
                                        <TextField variant="outlined" required id="product-name" label="Product Name"/>
                                    </div>
                                    <section style={{display:'flex',gap:'1rem'}}>
                                        <div style={{display:'flex', flexDirection:'column',gap:'1rem',width:'100%'}}>
                                            <label htmlFor="category">Category</label>
                                            <Select value={selectedCategory} defaultValue="" onChange={(event) => setSelectedCategory(event.target.value)}>
                                                <MenuItem value={0}>N/A</MenuItem>
                                                {(categories!== 0)? 
                                                    categories.map(category => {
                                                        return <MenuItem key={category.id} value={category.category_name}>{category.category_name}</MenuItem>
                                                    }):
                                                    <MenuItem value={'...'}>...</MenuItem>
                                                }
                                            </Select>
                                        </div>
                                        <div style={{display:'flex', flexDirection:'column',gap:'1rem',width:'100%'}}>
                                            <label htmlFor="weight">Weight</label>
                                            <TextField required variant="outlined" id="weight" type="number" label="Weight"/>
                                        </div>
                                    </section>
                                    <div style={{display:'flex', flexDirection:'column',gap:'1rem'}}>
                                        <label htmlFor="price">Price</label>
                                        <TextField required variant="outlined" id="price" type="number" label="Price"/>
                                    </div>
                                </section>
                                <section style={{width:'100%'}}>
                                    <img style={{height:'100%', maxWidth:'100%'}} src={PlaceHolderImage}/>
                                    <Button onChange={event => setImageInput(event.target.files[0])} variant="outline" color="primary" component="label">
                                        Upload Image
                                        <input type="file" hidden/>
                                    </Button>
                                </section>
                            </section>
                            <section>
                                <div style={{display:'flex', flexDirection:'column',gap:'1rem'}}>
                                    <label htmlFor="description">Description</label>
                                    <TextField
                                    required
                                    variant="outlined" 
                                    rows={10}
                                    style={{height:'100%',width:'100%'}}
                                    id="description" 
                                    multiline 
                                    label="Description"/>
                                </div>
                            </section>
                            <section style={{display:'flex',justifyContent:'center'}}>
                                <SellProductButton onClick={() => setSellDialog(true)}>
                                    Sell Product
                                </SellProductButton>
                                <Dialog open={sellDialog} onClose={() => setSellDialog(false)}>
                                    <DialogTitle>Sell Product</DialogTitle>
                                    <DialogContent>Continue to sell this product?</DialogContent>
                                    <DialogActions>
                                        <Button onClick={SubmitProduct} color="secondary">
                                            Yes
                                        </Button>
                                        <Button onClick={() => setSellDialog(false)} color="secondary">
                                            No
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </section>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default SellProducts;