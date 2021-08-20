import { faBell, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select,TextField, Dialog, DialogTitle, DialogContent, DialogActions, Collapse, Card, TableCell, TableContainer , TableHead, TableRow, TableBody, Paper, Table, makeStyles, CardContent, CardHeader, Button, withStyles, CardMedia, IconButton,CircularProgress, MenuItem} from "@material-ui/core";
import {AddCircleOutline, DeleteForever, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined} from '@material-ui/icons';
import { useCallback, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import UserMenu from "../Menu/user-menu";
import PlaceHolderImage from '../../../../../assets/placeholder-image.png';
import React from "react";
import ViewTemplate from "../../components/view-template";

const root = makeStyles({
    header:{
        width:'100%',
        height:'100%'
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

        

        const [deleted, setDeleted] = useState(false);
        const [deleteDialog, setDeleteDialog] = useState(false);
        const DeleteProduct = useCallback((id) => {
            fetch(`http://localhost:5000/product/delete/${id}`,{
                method:'DELETE',
                headers: {
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                }
            });
            setDeleted(true);
        });

        const [editDialog, setEditDialog] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState(product.category)
        const [imageInput, setImageInput] = useState(0)

        const [categories, setCategories] = useState(0);

        

        const GetCategories = useCallback(async function GetCategories(){
            await fetch('http://localhost:5000/api/category/').then(res => res.json())
                    .then(res => setCategories(res));
        });

        if(categories === 0){
            GetCategories();
        }

        const [productName, setProductName] = useState(product.product_name);
        const [weight, setWeight] = useState(product.weight);
        const [price, setPrice] = useState(product.price);
        const [description, setDescription] = useState(product.description);

        const EditProduct = useCallback(async function EditProduct(){
            let product_update = product;
            product_update.product_name = productName;
            product_update.weight = weight;
            product_update.price = price;
            product_update.description = description;
            product_update.category = selectedCategory;
            await fetch('http://localhost:5000/product/update',{
                method: 'PUT',
                headers: {
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                    "Content-type":"application/json"
                },
                body: JSON.stringify(product_update)
            }).then(res => {
                setEditDialog(false)
            })
        });
        
        return <React.Fragment>
                    {(deleted)? <Redirect to="/user/products"/>:null}
                    <TableRow checkboxSelection>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">{product.product_name}</TableCell>
                        <TableCell align="left">{product.created_date}</TableCell>
                        <TableCell align="left">
                            <IconButton aria-label="expand row" size="small" onClick={() => setDetailsDropdown(!detailsDropdown)}>
                                {detailsDropdown ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            <IconButton aria-label="expand row" size="small" onClick={() => setDeleteDialog(true)}>
                                <DeleteForever />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={5} style={{ paddingBottom: '5px', paddingTop: '5px' ,borderBottom: 0}} component="th" scope="row">
                            <Collapse in={detailsDropdown} timeout="auto" unmountOnExit>
                                <Card component={Paper}>
                                    <section>
                                        <CardMedia style={{width:'100%',height:'200px',}} component="img" image={`http://localhost:5000/product/get-image/${product.product_id}/${product.image}`}/>
                                        <CardContent style={{display:'flex',gap:'1rem',width:'100%'}}>
                                            <section style={{width:'100%'}}>
                                                <CardHeader style={{padding:0}} title={<div style={{display:'flex',alignItems:'center',gap:'1rem'}}>Product Information <IconButton aria-label="expand row" size="small" onClick={() => setEditDialog(true)}><EditOutlined/></IconButton></div>}/>
                                                <CardContent style={{padding:0, display:'flex',flexDirection:'column',gap:'.5rem',paddingTop:'20px'}}>
                                                    <span style={{fontSize:'17px'}}>Price: </span>
                                                    <span>P {product.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                                    <hr/>
                                                    <span style={{fontSize:'17px'}}>Category: </span>
                                                    <span >{product.category}</span>
                                                    <hr/>
                                                    <span style={{fontSize:'17px'}}>Quantity: </span>
                                                    <span>{product.quantity}</span>
                                                    <hr/>
                                                </CardContent>
                                            </section>
                                            <section style={{width:'100%',padding:0}}>
                                                <CardHeader style={{padding:0}} title={"Description"}/>
                                                <CardContent style={{padding:0, paddingTop:'20px'}}>
                                                {product.description}
                                                </CardContent>
                                            </section>
                                        </CardContent>
                                    </section>
                                </Card>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogContent>Continue to delete this product?</DialogContent>
                        <DialogActions>
                            <Button onClick={() => DeleteProduct(product.product_id)} color="secondary">
                                Yes
                            </Button>
                            <Button onClick={() => setDeleteDialog(false)} color="secondary">
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogContent>
                            <section style={{display:'flex',flexDirection:'column', gap:'1rem'}}>
                                <section style={{display:'flex',gap:'2rem'}}>
                                    <section style={{display:'flex', flexDirection:'column', gap:'2rem', width:'100%'}}>
                                        <div style={{display:'flex', flexDirection:'column',gap:'1rem'}}>
                                            <label htmlFor="product-name">Product Name</label>
                                            <TextField onChange={(event)=> setProductName(event.target.value)} value={productName} variant="outlined" required id="product-name" label="Product Name"/>
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
                                                <TextField onChange={(event)=> setWeight(event.target.value)} required value={weight} variant="outlined" id="weight" type="number" label="Weight"/>
                                            </div>
                                        </section>
                                        <div style={{display:'flex', flexDirection:'column',gap:'1rem'}}>
                                            <label htmlFor="price">Price</label>
                                            <TextField onChange={(event)=> setPrice(event.target.value)} required value={price} variant="outlined" id="price" type="number" label="Price"/>
                                        </div>
                                    </section>
                                    <section style={{width:'100%'}}>
                                        <img style={{height:'100%', maxWidth:'100%'}} src={`http://localhost:5000/product/get-image/${product.product_id}/${product.image}`}/>
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
                                        onChange={(event)=> setDescription(event.target.value)}
                                        value={description}
                                        required
                                        variant="outlined" 
                                        rows={10}
                                        style={{height:'100%',width:'100%'}}
                                        id="description" 
                                        multiline 
                                        label="Description"/>
                                    </div>
                                </section>
                            </section>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={EditProduct}>
                                Update
                            </Button>
                            <Button onClick={() => setEditDialog(false)} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
    }
    return (
        <ViewTemplate
        active="products"
        content={
            <Card className={styles.header}>
                {(user.role!=="ADM" && user.role!=="SLR")? <Redirect to="/user/user"/>:null}
                <CardHeader title={
                    <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <span>PROD<span style={{color:'#FD2E2E'}}>UCTS</span></span>
                            <SellProductButton>
                                <Link to="/user/sell" style={{color:'white',textDecoration:'none',display:'flex',alignItems:'center',gap:'.5rem'}}><AddCircleOutline/>Sell Product</Link>
                            </SellProductButton>
                        </div>
                        <hr/>
                    </div>
                }/>
                <CardContent>
                    <TableContainer style={{maxHeight:'550px'}}>
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
        }
        />
    )
}

export default SellerProducts;