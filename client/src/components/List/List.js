import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { getItems, deleteItem } from "../../actions/item";

import styles from './List.module.css';
import nothing from '../../assets/nothing.svg';


const List = ({ newItem, delItem, setDelItem }) => {

    const [selCategory, setSelCategory] = useState("all");
    const [items, setItems] = useState([]);
    const user = JSON.parse(localStorage.getItem('profile'));
    
    useEffect(() => {
        getItems().then(data => setItems(data));
    }, [newItem]);

    useEffect(() => {
        setItems(items.filter(eachItem => eachItem._id !== delItem));
    }, [delItem]);

    let allItems = {};
    for(let eachItem of items) {
        allItems[eachItem.category] ? "" : allItems[eachItem.category] = new Array();
        allItems[eachItem.category].push({
            "_id": eachItem._id,
            "itemName": eachItem.itemName,
            "quantity": eachItem.quantity,
            "expiryDate": eachItem.expiryDate.replace(/T.*/,'').split('-').reverse().join('-')
        });
    } //dairy: milk,cheese,butter  fruits:apples,oranges
    
    return(
        <>
            <React.Fragment>
                {!items.length ? 
                <div className={styles.nothingImg}>
                    <p>Hey {user.data.result.name}!</p><br/><p>Try adding some items --&gt;</p><br/>
                    <img src={nothing} height="360"/>
                </div> :

                <div className={styles.main}>
                    <div className={styles.category}>
                        <h2>Category</h2>
                            <div>
                                <Paper className={styles.categoryList} variant="outlined" onClick={() => setSelCategory("all")}  sx={{"backgroundColor": selCategory==='all'?"lightBlue":""}}>All</Paper>
                                {
                                    Object.keys(allItems).map(key =>
                                        <Paper className={styles.categoryList} variant="outlined" key={key} onClick={() => setSelCategory(key)} sx={{"backgroundColor": selCategory===key?"lightBlue":""}}>{key}</Paper>
                                    )
                                }
                            </div>
                    </div>

                    <div className={styles.list}>
                        <h2>List</h2>
                            <div>
                                {
                                    selCategory === "all" ?
                                    (
                                        items.map(eachItem => {
                                            return(
                                                <Paper className={styles.itemList} variant="outlined" key={eachItem.itemName}>
                                                    <p>{eachItem.itemName}</p>
                                                    <p>{eachItem.quantity}</p>
                                                    <p>{eachItem.expiryDate.replace(/T.*/,'').split('-').reverse().join('-')}</p>
                                                    <Tooltip title='Wanna delete?' placement="right"><RemoveCircleOutlineIcon className={styles.delBtn} fontSize="small" onClick={() => {deleteItem(eachItem._id); setDelItem(eachItem._id)}}/></Tooltip>
                                                </Paper>
                                            )
                                        })                                                
                                    ) :
                                    Object.keys(allItems).map(key => {
                                        return(
                                            key === selCategory &&
                                            allItems[key].map(eachItem =>
                                                <Paper className={styles.itemList} variant="outlined" key={eachItem.itemName}>
                                                    <p>{eachItem.itemName}</p>
                                                    <p>{eachItem.quantity}</p>
                                                    <p>{eachItem.expiryDate}</p>
                                                    <Tooltip title='Wanna delete?' placement="right"><RemoveCircleOutlineIcon className={styles.delBtn} fontSize="small" onClick={() => {deleteItem(eachItem._id); setDelItem(eachItem._id)}}/></Tooltip>
                                                </Paper>
                                            )
                                        )
                                    })
                                }
                            </div>
                    </div>
                </div>
                }
            </React.Fragment>
        </>
    );
}

export default List;