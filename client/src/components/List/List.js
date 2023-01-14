import React, { useEffect, useState } from "react";
import { getItems } from "../../actions/item";

import styles from './List.module.css';


const List = () => {

    const [items, setItems] = useState([]);
    
    useEffect(() => {
        getItems().then(data => setItems(data));
    }, []);

    return(
        <>
            <React.Fragment>
                <div className={styles.main}>
                    <div className={styles.category}>
                        <h2>Category</h2>
                            <div>
                                {
                                    items.map(eachItem => <p key={items.indexOf(eachItem)}>{eachItem.category}</p>)
                                }
                            </div>
                    </div>

                    <div className={styles.list}>
                        <h2>List</h2>
                            <div>
                                {
                                    items.map(eachItem => 
                                        <div key={items.indexOf(eachItem)}>
                                            <p>{eachItem.itemName}</p>
                                            <p>{eachItem.quantity}</p>
                                            <p>{eachItem.expiryDate}</p>
                                        </div>
                                    )
                                }
                            </div>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
}

export default List;