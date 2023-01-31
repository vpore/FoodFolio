
import React, { useState } from 'react';

import { TableRow, TableCell } from '@mui/material';
import { Button, TextField, Tooltip } from '@mui/material';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { deleteItem, updateItem } from '../../../actions/item';

import styles from './TableItem.module.css'

const TableItem = ({ row, setUpdatedItem, setDelItem }) => {
    
    const [clicked, setClicked] = useState(false);
    const [itemClicked, setItemClicked] = useState("");
    const [changedQuantity, setChangedQuantity] = useState("");

    return (
        <>
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'height': '75px' }}
            >
                <TableCell style={{color: row.expIn<=0?"#8b0000":row.expIn<=3?"red":"#ffa500"}}>
                    {row.itemName}
                </TableCell>
                <TableCell>
                {clicked ?
                    itemClicked===row._id &&
                    <React.Fragment>
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
                        <Button onClick={() => {setClicked(!clicked); updateItem(row._id, changedQuantity); setUpdatedItem({id: row._id})}}>OK</Button>
                    </React.Fragment>
                    :
                    <Tooltip title='Wanna update?' placement="bottom">
                        <p className={styles.pointer} onClick={() => {setChangedQuantity(row.quantity); setClicked(!clicked); setItemClicked(row._id)}}>
                            {row.quantity}
                        </p>
                    </Tooltip>
                }    
                </TableCell>
                <TableCell>{row.expiryDate.substring(0, 10).replace(/T.*/,'').split('-').reverse().join('-')}</TableCell>
                <TableCell>{row.expIn<=0?"Expired":`${row.expIn} day(s)`}</TableCell>
                <TableCell>
                    <Tooltip
                        title='Wanna delete?'
                        placement="right"
                    >
                        <RemoveCircleOutlineIcon
                            className={styles.pointer}
                            fontSize='small'
                            onClick={() => {deleteItem(row._id); setDelItem(row._id)}}
                        />
                    </Tooltip>
                </TableCell>
            </TableRow>
        </>
    )
}

export default TableItem;