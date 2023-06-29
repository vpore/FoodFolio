import React, { useEffect, useState } from "react";

import { getRecipes } from "../../actions/recipe";
import { getItems } from "../../actions/item";

import { Container, Grid, Typography, createTheme } from "@mui/material";
import { Masonry } from "@mui/lab";

import Recipe from "./Recipe/Recipe";

import { obj } from "../../dk";
import SearchBar from "../SearchBar/SearchBar";


const Recipes = () => {

  const [items, setItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);

  useEffect(() => {
    let ingredients = [];
    for (let x in items) {
      ingredients.push(items[x].itemName);
    }
    getRecipes(ingredients).then((data) => setRecipes(data));
  }, [items]);


  // const recipes = obj;

  // const theme = createTheme({
  //   components: {
  //     MuiGrid: {
  //       styleOverrides: {
  //         root: {
  //           marginLeft: "0px",
  //           marginTop: "0px",
  //           width: "100%"
  //         }
  //       }
  //     }
  //   }
  // });

  const theme = createTheme({
    components: {
      MuiMasonry: {
        styleOverrides: {
          root: {
            alignContent: "space-around",
            margin: "0px"
          }
        }
      }
    }
  })
  
  return (
    <>
      {/* <Container>
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid key={recipe.id} item xs={12} sm={6} md={4}>
              <Recipe recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      </Container> */}

      <Container>
        <SearchBar setRecipes={setRecipes} setSearchQuery={setSearchQuery} />

        {searchQuery ? (
          <Typography variant="h5">Recipes for {searchQuery}</Typography>
        ) : (
          <Typography variant="h5">Recommended Recipes</Typography>
        )}

        <Masonry theme={theme} columns={{ xs: 1, sm: 2, md: 3 }} spacing={3} sx={{mt: 3}}>
          {recipes.map((recipe) => (
            <Recipe key={recipe.id} recipe={recipe} />
          ))}
        </Masonry>
      </Container>
    </>
  );
};

export default Recipes;