import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { FaSpinner } from 'react-icons/fa';

function HomePage() {
  const { recipes, loading, error, toggleFavorite, favoriteRecipes } = useContext(RecipeContext);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Recipe Realm</h1>
        <p>Discover, Cook, and Share Amazing Recipes</p>
        <SearchBar />
      </div>

      <div className="featured-recipes">
        <h2>Featured Recipes</h2>
        {loading ? (
          <div className="loading">
            <FaSpinner className="spinner" />
          </div>
        ) : (
          <div className="recipe-grid">
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onFavorite={toggleFavorite}
                isFavorite={favoriteRecipes.some(r => r.id === recipe.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;