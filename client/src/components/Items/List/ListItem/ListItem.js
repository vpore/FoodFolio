
import React, { useState } from "react";

import { Paper, TextField, Button, Tooltip } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { updateItem, deleteItem } from "../../../../actions/item";

import styles from './ListItem.module.css';

const ListItem = ({ eachItem, setUpdatedItem, setDelItem, allCategory }) => {

    const [clicked, setClicked] = useState(false);
    const [itemClicked, setItemClicked] = useState("");
    const [changedQuantity, setChangedQuantity] = useState("");

    return (
        <>
            <Paper className={styles.itemList} variant="outlined" key={eachItem.itemName}>
                <p>{eachItem.itemName}</p>
                {clicked ?
                    itemClicked===eachItem._id ?
                    <React.Fragment>
                        <TextField
                            label="Update Quantity"
                            value={changedQuantity}
                            type="number"
                            inputProps={{
                                min: 1
                            }}
                            onChange={(e) =>
                                setChangedQuantity(e.target.value)
                            }
                        />
                        <Button onClick={() => {setClicked(!clicked); updateItem(eachItem._id, changedQuantity); setUpdatedItem({id: eachItem._id})}}>OK</Button>
                    </React.Fragment> :
                    <p className={styles.pointer} onClick={() => {setChangedQuantity(eachItem.quantity); setClicked(!clicked); setItemClicked(eachItem._id)}}>{eachItem.quantity}</p>
                    :
                    <p className={styles.pointer} onClick={() => {setChangedQuantity(eachItem.quantity); setClicked(!clicked); setItemClicked(eachItem._id)}}>{eachItem.quantity}</p>
                }
                <p>{allCategory ? eachItem.expiryDate.replace(/T.*/,'').split('-').reverse().join('-') : eachItem.expiryDate}</p>
                <Tooltip title='Wanna delete?' placement="right"><RemoveCircleOutlineIcon className={styles.pointer} fontSize="small" onClick={() => {deleteItem(eachItem._id); setDelItem(eachItem._id)}}/></Tooltip>
            </Paper>
        </>
    )
}

export default ListItem;