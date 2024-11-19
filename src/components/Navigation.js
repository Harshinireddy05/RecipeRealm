import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/search" className="nav-link">Search Recipes</Link>
      <Link to="/meal-plan" className="nav-link">Meal Planner</Link>
    </nav>
  );
}

export default Navigation; 