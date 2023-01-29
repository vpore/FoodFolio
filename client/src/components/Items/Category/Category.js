import React from "react";

import { Paper } from "@mui/material";

import styles from './Category.module.css';


const Category = ({ allItems, selCategory, setSelCategory }) => {
    return(
        <>
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
        </>
    )
}

export default Category;