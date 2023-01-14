import React from "react";

import List from "../List/List";
import Form from "../Form/Form";

import styles from './Inventory.module.css';

const Inventory = () => {
    return(
        <>
            <React.Fragment>
                <h1>Inventory</h1>
                <hr/>
                <div className={styles.main}>
                    <List />
                    <Form />
                </div>
            </React.Fragment>
        </>
    );
}

export default Inventory;