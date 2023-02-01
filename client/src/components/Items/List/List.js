
import React from "react";


import styles from './List.module.css';
import ListItem from "./ListItem/ListItem";

const List = ({ items, allItems, selCategory, setUpdatedItem, setDelItem }) => {

    return (
        <>
            <div className={styles.list}>
                <h2>List</h2>
                <div>
                    {
                        selCategory === "all" ?
                        (
                            items.map(eachItem => { return(
                                <ListItem
                                    key={eachItem._id}
                                    eachItem={eachItem}
                                    setUpdatedItem={setUpdatedItem}
                                    setDelItem={setDelItem}
                                    allCategory={true}
                                />
                            )})
                        ) :
                        Object.keys(allItems).map(key => { return(
                            key === selCategory &&
                            allItems[key].map(eachItem =>
                                <ListItem
                                    key={eachItem._id} 
                                    eachItem={eachItem}
                                    setUpdatedItem={setUpdatedItem}
                                    setDelItem={setDelItem}
                                    allCategory={false}
                                />
                            )
                        )})
                    }
                </div>
            </div>
        </>
    )
}

export default List;