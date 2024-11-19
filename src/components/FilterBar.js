import React from 'react';
import { FaFilter } from 'react-icons/fa';

function FilterBar({ filters, setFilters }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Cuisine:</label>
        <select 
          value={filters.cuisine || ''} 
          onChange={(e) => setFilters(prev => ({ ...prev, cuisine: e.target.value }))}
        >
          <option value="">All</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="indian">Indian</option>
          <option value="chinese">Chinese</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Diet:</label>
        <select 
          value={filters.diet || ''} 
          onChange={(e) => setFilters(prev => ({ ...prev, diet: e.target.value }))}
        >
          <option value="">Any</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten Free</option>
          <option value="keto">Keto</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Max Ready Time:</label>
        <select 
          value={filters.maxReadyTime || ''} 
          onChange={(e) => setFilters(prev => ({ ...prev, maxReadyTime: e.target.value }))}
        >
          <option value="">Any</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">1 hour</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar; 