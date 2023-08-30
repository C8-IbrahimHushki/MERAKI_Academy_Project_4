import React from 'react'
import { Link } from 'react-router-dom' 

const Home = () => {
  return (
    <div>
        <Link to="/recipes">Recipes</Link>
        <Link to="/calculator">Calculator</Link>
        <Link to="/tracker">Tracker</Link>
    </div>
  )
}

export default Home