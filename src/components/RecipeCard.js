import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaClock, FaUtensils } from 'react-icons/fa';

function RecipeCard({ recipe, onFavorite, isFavorite }) {
  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="recipe-image"
        />
        <button 
          onClick={() => onFavorite(recipe)} 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FaHeart />
        </button>
      </div>
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <div className="recipe-info">
          <span><FaClock /> {recipe.readyInMinutes || '30'} mins</span>
          <span><FaUtensils /> {recipe.servings || '4'} servings</span>
        </div>
        <Link to={`/recipe/${recipe.id}`} className="view-recipe">
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard; 