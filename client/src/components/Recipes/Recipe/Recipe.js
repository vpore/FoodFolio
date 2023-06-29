import React from "react";

import { Card, CardHeader, CardMedia, CardContent, Typography, createTheme, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";


const Recipe = ({ recipe }) => {

  const theme = createTheme({
    components: {
      MuiCardHeader: {
        styleOverrides: {
          title: {
            fontSize:"1.2rem"
          },
        },
      },
    },
  });

  const missedIngredients = recipe.missedIngredients;
  let text = ""
  for(const eachIngr in missedIngredients) {
    text += `${missedIngredients[eachIngr].name}, `;
  }
  text = text.substring(0, text.length-2);
  
  return (
    <>
      <Link to={`/recipe/${recipe.id}`}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardHeader
              theme={theme}
              title={recipe.title}
              // subheader={recipe.title}
            />
            <CardMedia
              component="img"
              height="194"
              image={recipe.image}
              alt={recipe.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Missing Ingredients : {text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
};

export default Recipe;
