import React, { useState } from "react";

import ExpiryTable from "../ExpiryTable/ExpiryTable";
import Inventory from "../Inventory/Inventory";

import styles from './Home.module.css';

const Home = () => {

    const [newItem, setNewItem] = useState("");
    const [delItem, setDelItem] = useState("");

    return(
        <>
            <div className={styles.main}>
                <div className={styles.expirytable}>
                    <ExpiryTable newItem={newItem} delItem={delItem} setDelItem={setDelItem} />
                </div>
                <div className={styles.inventory}>
                    <Inventory newItem={newItem} setNewItem={setNewItem} delItem={delItem} setDelItem={setDelItem} />
                </div>

            </div>
        </>
    );
}

export default Home;