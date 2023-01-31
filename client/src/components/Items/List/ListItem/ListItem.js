
import React, { useState } from "react";

import { Paper, TextField, Button, Tooltip, Grid } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { updateItem, deleteItem } from "../../../../actions/item";

import styles from './ListItem.module.css';

const ListItem = ({ eachItem, setUpdatedItem, setDelItem, allCategory }) => {

    const [clicked, setClicked] = useState(false);
    const [itemClicked, setItemClicked] = useState("");
    const [changedQuantity, setChangedQuantity] = useState("");

    return (
        <>
            <Paper className={styles.main} variant="outlined">
                <Grid container justifyContent="space-around" alignItems="center">
                    <Grid item>{eachItem.itemName}</Grid>
                    {clicked ?
                        itemClicked===eachItem._id &&
                        <React.Fragment>
                            <Grid item>
                                <TextField
                                    className={styles.text}
                                    label="Update Quantity"
                                    value={changedQuantity}
                                    type="number"
                                    inputProps={{
                                        min: 1,
                                        style: { textAlign: 'center' }
                                    }}
                                    onChange={(e) =>
                                        setChangedQuantity(e.target.value)
                                    }
                                />
                                <Button onClick={() => {setClicked(!clicked); updateItem(eachItem._id, changedQuantity); setUpdatedItem({id: eachItem._id})}}>OK</Button>
                            </Grid>
                        </React.Fragment>
                        :
                        <Grid item>
                            <Tooltip title='Wanna update?' placement="right">
                                <p className={styles.pointer} onClick={() => {setChangedQuantity(eachItem.quantity); setClicked(!clicked); setItemClicked(eachItem._id)}}>
                                    {eachItem.quantity}
                                </p>
                            </Tooltip>
                        </Grid>
                    }
                    <Grid item>{allCategory ? eachItem.expiryDate.replace(/T.*/,'').split('-').reverse().join('-') : eachItem.expiryDate}</Grid>
                    <Grid item>
                        <Tooltip title='Wanna delete?' placement="right">
                            <RemoveCircleOutlineIcon className={styles.pointer} fontSize="small" onClick={() => {deleteItem(eachItem._id); setDelItem(eachItem._id)}}/>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default ListItem;