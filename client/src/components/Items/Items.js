
import React, { useEffect, useState } from "react";

import { getItems } from "../../actions/item";

import styles from './Items.module.css';
import nothing from '../../assets/nothing.svg';
import Category from "./Category/Category";
import List from "./List/List";


const Items = ({ newItem, updatedItem, setUpdatedItem, delItem, setDelItem }) => {

    const [selCategory, setSelCategory] = useState("all");
    const [items, setItems] = useState([]);
    const user = JSON.parse(localStorage.getItem('profile'));
    
    useEffect(() => {
        getItems().then(data => setItems(data));
    }, [newItem, delItem, updatedItem]);

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
                </div>                
                :
                <div className={styles.main}>
                    <Category allItems={allItems} selCategory={selCategory} setSelCategory={setSelCategory} />

                    <List items={items} allItems={allItems} selCategory={selCategory} setUpdatedItem={setUpdatedItem} setDelItem={setDelItem} />
                </div>
                
                }
            </React.Fragment>
        </>
    );
}

export default Items;