import React from "react";

import Items from "../Items/Items";
import Form from "../Form/Form";

import styles from './Inventory.module.css';

const Inventory = ({ newItem, setNewItem, updatedItem, setUpdatedItem, delItem, setDelItem }) => {

    return(
        <>
            <React.Fragment>
                <h1>Inventory</h1>
                <hr/>
                <div className={styles.main}>
                    <Items
                        newItem={newItem}
                        updatedItem={updatedItem}
                        setUpdatedItem={setUpdatedItem}
                        delItem={delItem}
                        setDelItem={setDelItem}
                    />
                    
                    <Form setNewItem={setNewItem}/>
                </div>
            </React.Fragment>
        </>
    );
}

export default Inventory;