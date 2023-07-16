const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;
const k = process.env.REACT_APP_API_KEY;
const API_KEY = `apiKey=${k}`;

export const getRecipes = async (ingredients) => {
    try {
        const response = await fetch(
          `${API_DOMAIN}/recipes/findByIngredients?ingredients=${ingredients}&number=15&limitLicense=true&ranking=1&ignorePantry=false&${API_KEY}`
        );
        const status = response.status;
        const data = await response.json();
        const responseObj = {data, status};
        return responseObj;
    }
    catch(err) {console.log(err);}
}

export const getRecipeInfo = async (recipeid) => {
    try{
        const response = await fetch(
          `${API_DOMAIN}/recipes/${recipeid}/information?includeNutrition=false&${API_KEY}`
        );
        const status = response.status;
        const data = await response.json();
        const responseObj = {data, status};
        return responseObj;
    }
    catch(err) {console.log(err);}
}