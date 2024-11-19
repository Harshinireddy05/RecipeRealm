import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import { FaHeart, FaClock, FaUtensils, FaList, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

function RecipeDetailPage() {
  const { id } = useParams();
  const { toggleFavorite, favoriteRecipes } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY || "75e39ce18a8744b4bfdbab5303f0d56f"}`
        );
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="loading"><FaSpinner className="spinner" /></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!recipe) return <div className="error-message">Recipe not found</div>;

  const isFavorite = favoriteRecipes.some(r => r.id === recipe.id);

  return (
    <div className="recipe-detail-page">
      <div className="recipe-header">
        <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
        <div className="recipe-header-content">
          <h1>{recipe.title}</h1>
          <div className="recipe-meta">
            <span><FaClock /> {recipe.readyInMinutes} mins</span>
            <span><FaUtensils /> {recipe.servings} servings</span>
            <button 
              onClick={() => toggleFavorite(recipe)}
              className={`favorite-btn large ${isFavorite ? 'active' : ''}`}
            >
              <FaHeart /> {isFavorite ? 'Saved' : 'Save Recipe'}
            </button>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="recipe-ingredients">
          <h2><FaList /> Ingredients</h2>
          <ul>
            {recipe.extendedIngredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.analyzedInstructions[0]?.steps.map(step => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
        </div>

        {recipe.nutrition && (
          <div className="recipe-nutrition">
            <h2>Nutrition Facts</h2>
            <div className="nutrition-grid">
              {recipe.nutrition.nutrients.slice(0, 6).map(nutrient => (
                <div key={nutrient.name} className="nutrition-item">
                  <span className="nutrient-name">{nutrient.name}</span>
                  <span className="nutrient-amount">
                    {nutrient.amount}{nutrient.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetailPage;