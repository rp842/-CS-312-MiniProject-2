// Import modules 
import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();
const PORT = 3000;

// EJS templating
app.set('view engine', 'ejs');

// Static files from public accesible from root url
app.use(express.static('public'));

// Route to api
app.get('/', async (req, res) => {

    // declare variable url set to 
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
     // variable 
    const response = await axios.get(url);

    // variable that represents first element from array of random drinks
    const cocktail = response.data.drinks[0];

    // Extract specific query params (object) and set as variables
    const cocktailName = cocktail.strDrink;
    const cocktailImage = cocktail.strDrinkThumb;
    const howToMake = cocktail.strInstructions;
        
    // pass cocktail data to index.ejs for dynamic rendering
    res.render('index', { cocktailName, cocktailImage, howToMake });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
