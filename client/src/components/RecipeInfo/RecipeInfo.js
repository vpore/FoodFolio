
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRecipeInfo } from "../../actions/recipe";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
// import { obj } from "../../dk";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

import styles from './RecipeInfo.module.css';
import LoadingSpinner from "../../assets/LoadingSpinner";

const RecipeInfo = () => {

    const params = useParams();
    const { id } = params;

    const [recipe, setRecipe] = useState({});
    const [status, setStatus] = useState(null);

    useEffect(() => {
        getRecipeInfo(id).then((responseObj) => {setRecipe(responseObj.data); setStatus(responseObj.status)});
    }, [id]);

    // const recipe = obj[0];
    
    let ingredients = [];
    for(let ingr in recipe.extendedIngredients) {
      ingredients.push(<li key={ingr}>{recipe.extendedIngredients[ingr].original}</li>);
    }

    let instructions = [];
    if (Object.keys(recipe).length > 0) {
      for (let ins in recipe.analyzedInstructions[0].steps) {
        instructions.push(<li key={ins}>{recipe.analyzedInstructions[0].steps[ins].step}</li>);
      }
    }


    return (
      <>
        <div className={styles.main}>
          <div className={styles.recipe}>
            {
              status === null ?
              <LoadingSpinner />
              :
              <>
                <Typography variant="h4" mb={3}>
                  {recipe.title}
                </Typography>
                <Card variant="elevation" elevation={5} sx={{ width: "100%" }}>
                  <CardMedia
                    component="img"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                  <CardContent>
                    <div className={styles.cardContent}>
                      <div className={styles.cardContentItem}>
                        <AccessTimeRoundedIcon fontSize="large" />
                        {`${recipe.readyInMinutes} minutes`}
                      </div>
                      <div className={styles.cardContentItem}>
                        <PeopleOutlineRoundedIcon fontSize="large" />
                        {`${recipe.servings} servings`}
                      </div>
                    </div>
                    {/* <FavoriteBorderRoundedIcon fontSize="large" /> */}
                  </CardContent>
                </Card>

                <div className={styles.ingredients}>
                  <h2>Ingredients</h2>
                  {ingredients}
                </div>

                <div className={styles.instructions}>
                  <h2>Instructions</h2>
                  <ol>{instructions}</ol>
                </div>
              </>
            }
          </div>
        </div>
      </>
    );

}

export default RecipeInfo;