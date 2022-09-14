import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div id="home">
      <button onClick={() => navigate('/step/1')}>Start</button>
    </div>
  )
}

export default Home