import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <h1>Page Not found</h1>
        <Link to="/">Идти домой</Link>
    </div>
  )
}

export default NotFound