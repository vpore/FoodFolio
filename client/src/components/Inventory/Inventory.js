import React, { useState } from "react";

import List from "../List/List";
import Form from "../Form/Form";

import styles from './Inventory.module.css';

const Inventory = () => {
    const [newItem, setNewItem] = useState("");

    return(
        <>
            <React.Fragment>
                <h1>Inventory</h1>
                <hr/>
                <div className={styles.main}>
                    <List newItem={newItem}/>
                    <Form setNewItem={setNewItem}/>
                </div>
            </React.Fragment>
        </>
    );
}

export default Inventory;