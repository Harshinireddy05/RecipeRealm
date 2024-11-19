import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

function MealPlanCard({ meal, onRemove, dayOfWeek, mealType }) {
  return (
    <div className="meal-plan-card">
      <img 
        src={meal.image} 
        alt={meal.title} 
        className="meal-image"
      />
      <div className="meal-content">
        <h3>{meal.title}</h3>
        <div className="meal-info">
          <span>{dayOfWeek}</span>
          <span>{mealType}</span>
        </div>
        <div className="meal-actions">
          <Link to={`/recipe/${meal.id}`} className="view-recipe">
            View Recipe
          </Link>
          <button 
            onClick={() => onRemove(dayOfWeek, mealType)} 
            className="remove-btn"
            aria-label="Remove meal"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealPlanCard; 