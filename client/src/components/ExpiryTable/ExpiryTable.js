import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import styles from './ExpiryTable.module.css';
import { deleteItem, getExpItems, updateItem } from '../../actions/item';
import { Button, TextField } from '@mui/material';

const ExpiryTable = ({ newItem, updatedItem, setUpdatedItem, delItem, setDelItem }) => {

    const [expItems, setExpItems] = useState([]);

    useEffect(() => {
        getExpItems().then(data => setExpItems(data));
    }, [newItem, delItem, updatedItem]);

    const daysRem = (d) => {
        const t = new Date().toISOString();
        const d1 = new Date(d);
        const d2 = new Date(t);
        const diffTime = (d1 - d2);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    expItems.forEach(eachItem => {
        eachItem.expIn = daysRem(eachItem.expiryDate);
    });

    const [clicked, setClicked] = useState(false);
    const [itemClicked, setItemClicked] = useState("");
    const [changedQuantity, setChangedQuantity] = useState("");

    return(
        <>
            <React.Fragment>
                <h1>Expiry Table</h1>
                <hr/>
                {!expItems.length ?
                <div>
                    <br/><p className={styles.nothingText}>No items are expiring recently... #winning</p>
                </div> :

                <div className={styles.main}>
                    <TableContainer component={Paper} elevation={3} style={{ backgroundColor: "#f3faff", width: "fit-content" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Expiry Date</TableCell>
                                    <TableCell>Expiring In</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {expItems.map((row) => (
                                <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell style={{color: row.expIn<=0?"#8b0000":row.expIn<=3?"red":"#ffa700"}}>
                                        {row.itemName}
                                    </TableCell>
                                    <TableCell>
                                    {clicked ?
                                        itemClicked===row._id ?
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
                                            <Button onClick={() => {setClicked(!clicked); updateItem(row._id, changedQuantity); setUpdatedItem({id: row._id})}}>OK</Button>
                                        </React.Fragment> :
                                        <p className={styles.pointer} onClick={() => {setChangedQuantity(row.quantity); setClicked(!clicked); setItemClicked(row._id)}}>{row.quantity}</p>
                                        :
                                        <p className={styles.pointer} onClick={() => {setChangedQuantity(row.quantity); setClicked(!clicked); setItemClicked(row._id)}}>{row.quantity}</p>
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
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                }
            </React.Fragment>
        </>
    );
}

export default ExpiryTable;