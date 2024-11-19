import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipeContext = createContext();

// Use environment variable for API key
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY || "75e39ce18a8744b4bfdbab5303f0d56f";
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/random?apiKey=${API_KEY}&number=8`
      );
      if (response.data && response.data.recipes) {
        setRecipes(response.data.recipes);
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async (query, filters = {}) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true`,
        { params: filters }
      );
      if (response.data && response.data.results) {
        setRecipes(response.data.results);
      }
    } catch (err) {
      setError('Failed to search recipes. Please try again later.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    setFavoriteRecipes(prev => {
      const exists = prev.find(r => r.id === recipe.id);
      if (exists) {
        return prev.filter(r => r.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  return (
    <RecipeContext.Provider 
      value={{ 
        recipes, 
        loading, 
        error, 
        favoriteRecipes,
        mealPlan,
        searchRecipes,
        toggleFavorite,
        setMealPlan 
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};