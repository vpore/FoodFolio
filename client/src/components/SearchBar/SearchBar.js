
import React, { useState } from "react";

import { Container, InputAdornment, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { getRecipes } from "../../actions/recipe";

const SearchBar = ({ setRecipes, setSearchQuery, setStatus }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    }    
    
    const handleClick = () => {
        setSearchQuery(searchTerm);
        getRecipes(searchTerm).then((responseObj) => {setRecipes(responseObj.data); setStatus(responseObj.status)});
    }
    
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            handleClick();
        }
    }

    return (
      <Container sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <TextField
          id="search"
          type="search"
          label="Search for recipes"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          sx={{ width: 600 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon onClick={handleClick} sx={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
        />
      </Container>
    );
}

export default SearchBar;