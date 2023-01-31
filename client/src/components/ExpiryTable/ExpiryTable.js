import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import styles from './ExpiryTable.module.css';

import { getExpItems } from '../../actions/item';

import TableItem from './TableItem/TableItem';

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
                                <TableItem  key={row._id} row={row} setUpdatedItem={setUpdatedItem} setDelItem={setDelItem} />
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