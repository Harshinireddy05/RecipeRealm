import React, { useState, useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import MealPlanCard from '../components/MealPlanCard';
import { FaPlus, FaDownload, FaShare } from 'react-icons/fa';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'];

function MealPlanPage() {
  const { recipes, mealPlan, setMealPlan } = useContext(RecipeContext);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);

  const handleAddMeal = (recipe) => {
    if (selectedDay && selectedMealType) {
      setMealPlan(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [selectedMealType]: recipe
        }
      }));
      setShowRecipeSelector(false);
      setSelectedDay('');
      setSelectedMealType('');
    }
  };

  const handleRemoveMeal = (day, mealType) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: null
      }
    }));
  };

  const exportMealPlan = () => {
    const mealPlanText = DAYS_OF_WEEK.map(day => {
      return `${day}:\n${MEAL_TYPES.map(type => {
        const meal = mealPlan[day]?.[type];
        return meal ? `${type}: ${meal.title}` : `${type}: Not planned`;
      }).join('\n')}`;
    }).join('\n\n');

    const blob = new Blob([mealPlanText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meal-plan.txt';
    a.click();
  };

  return (
    <div className="meal-plan-page">
      <div className="meal-plan-header">
        <h1>Weekly Meal Plan</h1>
        <div className="meal-plan-actions">
          <button onClick={exportMealPlan} className="action-button">
            <FaDownload /> Export Plan
          </button>
        </div>
      </div>

      <div className="meal-plan-grid">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="day-column">
            <h2>{day}</h2>
            {MEAL_TYPES.map(type => (
              <div key={type} className="meal-slot">
                {mealPlan[day]?.[type] ? (
                  <MealPlanCard
                    meal={mealPlan[day][type]}
                    dayOfWeek={day}
                    mealType={type}
                    onRemove={handleRemoveMeal}
                  />
                ) : (
                  <button
                    className="add-meal-btn"
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedMealType(type);
                      setShowRecipeSelector(true);
                    }}
                  >
                    <FaPlus />
                    Add {type}
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {showRecipeSelector && (
        <div className="recipe-selector-modal">
          <div className="modal-content">
            <h2>Select Recipe for {selectedDay} {selectedMealType}</h2>
            <div className="recipe-grid">
              {recipes.map(recipe => (
                <div
                  key={recipe.id}
                  className="recipe-option"
                  onClick={() => handleAddMeal(recipe)}
                >
                  <img src={recipe.image} alt={recipe.title} />
                  <h3>{recipe.title}</h3>
                </div>
              ))}
            </div>
            <button
              className="close-modal"
              onClick={() => setShowRecipeSelector(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealPlanPage;