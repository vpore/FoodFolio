import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

import { createItem } from '../../actions/item';

import styles from './Form.module.css';

const Form = ({setNewItem}) => {
  
  const user = JSON.parse(localStorage.getItem('profile'));
  const [itemData, setItemData] = useState({ itemName:'', quantity:'', expiryDate:'', category:'' });
  
  const allCategories = ["Vegetable", "Fruit", "Beverage", "Dairy", "Packaged Food", "Misc"];

  const handleSubmit = (event) => {
    event.preventDefault();
    if(itemData.category === "") alert("Please choose the category");
    else {
      createItem({...itemData, name: user.data.result.name});
      setNewItem(itemData.itemName);
      clear();
    }
  }

  const clear = () => {
    setItemData({ itemName:'', quantity:'', expiryDate:Date.now(), category:'' });
  }

  return (
    <React.Fragment>
      <Paper className={styles.main} elevation={3} style={{ backgroundColor: "#f3faff" }}>
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            style={{ fontWeight: "bolder" }}
          >
            Add Food Item
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="Name"
                name="Name"
                label="Name"
                fullWidth
                value={itemData.itemName}
                onChange={(e) =>
                  setItemData({ ...itemData, itemName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="quantity"
                name="quantity"
                label="Quantity"
                fullWidth
                type="number"
                value={itemData.quantity}
                onChange={(e) =>
                  setItemData({ ...itemData, quantity: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                id="quantity"
                name="expitydate"
                label="Expiry Date"
                fullWidth
                type="date"
                value={itemData.expiryDate}
                inputProps={{
                  min: new Date().toISOString().slice(0, 10)
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  setItemData({ ...itemData, expiryDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <label style={{"color": "#616466"}}>Choose Category</label><br/>
              {
                allCategories.map((categ) =>
                  <Chip
                    key={allCategories.indexOf(categ)}
                    label={categ}
                    variant={itemData.category===categ ? "" : "outlined"}
                    onClick={() => setItemData({ ...itemData, category: categ })}
                    style={{"margin":"5px 5px 0px 0px", "fontSize":"0.9em"}}
                  />
                )
              }
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained">
                Add Foood
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
}

export default Form;