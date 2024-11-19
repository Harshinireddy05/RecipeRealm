import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import RecipeCard from '../components/RecipeCard';
import { FaSpinner } from 'react-icons/fa';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const { searchRecipes, recipes, loading, error, toggleFavorite, favoriteRecipes } = useContext(RecipeContext);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      searchRecipes(query, filters);
    }
  }, [searchParams, filters]);

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Recipes</h1>
        <SearchBar />
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="search-results">
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

export default SearchPage;