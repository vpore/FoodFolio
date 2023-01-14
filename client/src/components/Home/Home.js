import React from "react";

import ExpiryTable from "../ExpiryTable/ExpiryTable";
import Inventory from "../Inventory/Inventory";

import styles from './Home.module.css';

const Home = () => {
    return(
        <>
            <div className={styles.main}>
                <div className={styles.expirytable}>
                    <ExpiryTable />
                </div>
                <div className={styles.inventory}>
                    <Inventory />
                </div>

            </div>
        </>
    );
}

export default Home;