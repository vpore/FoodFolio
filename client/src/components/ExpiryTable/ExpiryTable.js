import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from './ExpiryTable.module.css';
import { getExpItems } from '../../actions/item';

const ExpiryTable = ({ newItem }) => {

    const [expItems, setExpItems] = useState([]);
    useEffect(() => {
        getExpItems().then(data => setExpItems(data));
    }, [newItem]);

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

    console.log(expItems);


    return(
        <>
            <React.Fragment>
                <h1>Expiry Table</h1>
                <hr/>
                <div className={styles.main}>
                    <TableContainer component={Paper} elevation={3} style={{ backgroundColor: "#f3faff", width: "fit-content" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Expiry Date</TableCell>
                                    <TableCell>Expiring In</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {expItems.map((row) => (
                                <TableRow
                                key={row.itemName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell style={{color: row.expIn<=0?"#8b0000":row.expIn<=3?"red":"#ffa700"}}>
                                        {row.itemName}
                                    </TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.expiryDate.substring(0, 10).replace(/T.*/,'').split('-').reverse().join('-')}</TableCell>
                                    <TableCell>{row.expIn<=0?"Expired":`${row.expIn} day(s)`}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </React.Fragment>
        </>
    );
}

export default ExpiryTable;