import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import MealPlanPage from './pages/MealPlanPage';
import './App.css';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/meal-plan" element={<MealPlanPage />} />
          </Routes>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;