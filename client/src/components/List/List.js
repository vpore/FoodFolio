import React, { useEffect, useState } from "react";
import { getItems } from "../../actions/item";

import styles from './List.module.css';


const List = ({newItem}) => {

    const [selCategory, setSelCategory] = useState("all");
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        getItems().then(data => setItems(data));
    }, [newItem]);

    let allItems = {};
    for(let eachItem of items) {
        if(allItems[eachItem.category]) {
            allItems[eachItem.category].push({
                "itemName": eachItem.itemName,
                "quantity": eachItem.quantity,
                "expiryDate": eachItem.expiryDate
            });
        }
        else {
            allItems[eachItem.category] = new Array();
            allItems[eachItem.category].push({
                "itemName": eachItem.itemName,
                "quantity": eachItem.quantity,
                "expiryDate": eachItem.expiryDate
            });
        }
    } //dairy: milk,cheese,butter  fruits:apples,oranges
    
    return(
        <>
            <React.Fragment>
                <div className={styles.main}>
                    <div className={styles.category}>
                        <h2>Category</h2>
                            <div>
                                <p onClick={() => setSelCategory("all")}>All</p>
                                {
                                    Object.keys(allItems).map(key =>
                                        <p key={key} onClick={() => setSelCategory(key)}>{key}</p>
                                    )
                                }
                            </div>
                    </div>

                    <div className={styles.list}>
                        <h2>List</h2>
                            <div>
                                {
                                    Object.keys(allItems).map(key => {
                                        return(
                                            selCategory === "all" ?
                                            (
                                                allItems[key].map(eachItem =>
                                                    <div key={eachItem.itemName}>
                                                        <p>{eachItem.itemName}</p>
                                                        <p>{eachItem.quantity}</p>
                                                        <p>{eachItem.expiryDate}</p>
                                                    </div>
                                                )
                                                
                                            ) :
                                            (
                                                key === selCategory && 
                                                allItems[key].map(eachItem =>
                                                    <div key={eachItem.itemName}>
                                                        <p>{eachItem.itemName}</p>
                                                        <p>{eachItem.quantity}</p>
                                                        <p>{eachItem.expiryDate}</p>
                                                    </div>
                                                )
                                            )
                                        )
                                    })
                                }
                            </div>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
}

export default List;