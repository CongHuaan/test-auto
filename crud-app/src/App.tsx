import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'

export default function App(){
  return (
    <div>
      <nav style={{background:'#fff',padding:12,boxShadow:'0 1px 3px rgba(0,0,0,0.05)'}}>
        <div className="container row">
          <div style={{flex:1}}>
            <Link to="/">Home</Link>
            <span style={{marginLeft:12}}><Link to="/search">Search</Link></span>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage/>} />
      </Routes>
    </div>
  )
}
