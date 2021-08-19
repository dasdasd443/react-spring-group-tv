import ViewTemplate from "../../components/view-template";
import {Button,withStyles,CircularProgress, TextField, TableCell, Grid, Table, TableBody, TableContainer, TableHead, TableRow, IconButton } from "@material-ui/core";
import CardTemplate from "../../components/card-template";
import { useCallback, useEffect, useState } from "react";
import { red } from "@material-ui/core/colors";
import ActionDialog from "../../components/action-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Delete, Edit } from "@material-ui/icons";
import React from "react";


const Category = () => {
    const [categoryList, setCategoryList] = useState(0);
    const [category,setCategory] = useState('');
    const [categoryDescription,setCategoryDescription] = useState('');
    const [addDialog,setAddDialog] = useState(false);
    const [num,setNum] = useState(0)
    
    
    const GetCategories = useCallback(async function GetCategories(){
        await fetch('http://localhost:5000/api/category/').then(res => res.json())
        .then(json => setCategoryList(json));
    })

    const [submit,setSubmit] = useState(false);

    const AddCategory = useCallback(async function AddCategory(){
        if(category!=="" && categoryDescription!==""){
            await fetch('http://localhost:5000/api/category/add-category',{
                method:"POST",
                headers: {
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                    "Content-type":"application/json"
                },
                body: JSON.stringify({
                    category_name:category,
                    category_description:categoryDescription
                })
            }).then(res => {
                setAddDialog(false);
                setCategory('');
                setCategoryDescription('');
                setNum(Math.random());
            })
        }
        setSubmit(true);
    })

    useEffect(() => {
        GetCategories();
    },[num]);

    const AddCategoryButton = withStyles(theme => ({
        root:{
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
            padding:'10px',
            '&:hover': {
                backgroundColor: red[700],
              },
        }
    }))(Button);

    const Row = ({categoryItem}) => {
        const [categoryUpdate,setCategoryUpdate] = useState(categoryItem.category_name);
        const [categoryDescriptionUpdate,setCategoryDescriptionUpdate] = useState(categoryItem.category_description);
        

        const UpdateCategory = useCallback(async function UpdateCategory(){
            let newCategory = categoryItem;
            newCategory.category_name = categoryUpdate;
            newCategory.category_description = categoryDescriptionUpdate;
            await fetch(`http://localhost:5000/api/category/update-category`,{
                method:"PUT",
                headers: {
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                    'Content-type':'application/json'
                },
                body:JSON.stringify(newCategory)
            }).then(res => {
                setUpdateDialog(false)
                setNum(Math.random());
            })
        })
    
        const DeleteCategory = useCallback(async function DeleteCategory(){
            await fetch(`http://localhost:5000/api/category/delete-category/${categoryItem.id}`,{
                method:"DELETE",
                headers: {
                    'Authorization': (JSON.parse(localStorage.getItem('user')) !== null)? JSON.parse(localStorage.getItem('user')).token: "",
                },
            }).then(res => {
                setDeleteDialog(false)
                setNum(Math.random());
            })
        })
        const [deleteDialog,setDeleteDialog] = useState(false);
        const [updateDialog,setUpdateDialog] = useState(false);
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>{categoryItem.id}</TableCell>
                    <TableCell>{categoryItem.category_name}</TableCell>
                    <TableCell>{categoryItem.category_description}</TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={()=>setUpdateDialog(true)}>
                            <Edit/>
                        </IconButton>
                        <ActionDialog
                            open={updateDialog}
                            title="Update Category"
                            content={
                                <form>
                                    <Grid container>
                                        <Grid item lg={12}>
                                            <TextField 
                                            onChange={(event)=>setCategoryUpdate(event.target.value)} 
                                            value={categoryUpdate} 
                                            style={{width:'100%'}} 
                                            label="Category Name"
                                            error={categoryUpdate==="" && submit}
                                            />
                                        </Grid>
                                        <Grid item lg={12}>
                                            <TextField 
                                            onChange={(event)=>setCategoryDescriptionUpdate(event.target.value)} 
                                            value={categoryDescriptionUpdate} style={{width:'100%'}} 
                                            multiline 
                                            rows={4} 
                                            label="Category Description"/>
                                        </Grid>
                                    </Grid>
                                </form>
                            }
                            ok="Update Category"
                            cancel="Cancel"
                            okAction={UpdateCategory}
                            cancelAction={()=>setUpdateDialog(false)}
                        />
                    </TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={()=>setDeleteDialog(true)}>
                            <Delete/>
                        </IconButton>
                        <ActionDialog
                            open={deleteDialog}
                            title="Delete Category"
                            content={`Delete ${categoryItem.category_name}?`}
                            ok="Delete Category"
                            cancel="Cancel"
                            okAction={DeleteCategory}
                            cancelAction={()=>setDeleteDialog(false)}
                        />
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    return (
        <ViewTemplate
        active="category"
        content={
            <section>
                <Grid container spacing={2}>
                    <Grid item lg={8}>
                        <CardTemplate
                        title={<span>Categories L<span style={{color:'#FD2E2E'}}>ist</span></span>}
                        content={
                            <TableContainer style={{maxHeight:'350px'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Category Name</TableCell>
                                            <TableCell>Category Description</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(categoryList!==0)?
                                        categoryList.map(categoryItem => {
                                            return <Row key={categoryItem.id} categoryItem={categoryItem}/>
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
                        title={<span>Add Cate<span style={{color:'#FD2E2E'}}>gory</span></span>}
                        content={
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item lg={12}>
                                        <TextField 
                                        style={{width:'100%'}} 
                                        label="Category Name" 
                                        value={category} 
                                        error={(category==="" && submit)}
                                        helperText={(category==="" && submit)?"Please input a category name":null}
                                        onChange={(event) => setCategory(event.target.value)}/>
                                    </Grid>
                                    <Grid item lg={12}>
                                        <TextField 
                                        style={{width:'100%'}} 
                                        rows={4} 
                                        multiline 
                                        variant="outlined" 
                                        label="Category Description" 
                                        value={categoryDescription} 
                                        error={categoryDescription==="" && submit}
                                        helperText={(categoryDescription==="" && submit)?"Please input the category description":null}
                                        onChange={(event) => setCategoryDescription(event.target.value)}/>
                                    </Grid>
                                    <Grid item lg={12}>
                                        <AddCategoryButton onClick={()=> setAddDialog(true)}>
                                            Add Category
                                        </AddCategoryButton>
                                    </Grid>
                                </Grid>
                                <ActionDialog
                                    title={"Add Category"}
                                    content={`Continue add ${category} as a new category?`}
                                    ok={"Add Category"}
                                    cancel={"Cancel"}
                                    open={addDialog}
                                    okAction={AddCategory}
                                    cancelAction={() => setAddDialog(false)}
                                    />
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

export default Category;