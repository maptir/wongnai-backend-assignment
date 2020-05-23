import React, { useState } from 'react'
import './App.css'
import ReviewById from './components/ReviewById'
import SearchReview from './components/SearchReviews'
import EditReview from './components/EditReview'

const methods = [
  {
    id: 0,
    name: 'Get review by id',
    component: <ReviewById />,
  },
  {
    id: 1,
    name: 'Search reviews by food menu',
    component: <SearchReview />,
  },
  {
    id: 2,
    name: 'Edit review',
    component: <EditReview />,
  },
]

const App = () => {
  const [method, setMethod] = useState(methods[0])

  return (
    <div className="app">
      <div className="limit">
        <div className="button-container">
          {methods.map(({ id, name }) => (
            <button key={id} onClick={() => setMethod(methods[id])}>
              {name}
            </button>
          ))}
        </div>
        {method.component}
      </div>
    </div>
  )
}

export default App
