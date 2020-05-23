import React, { useState } from 'react'

const Input = ({ name, onClick }) => {
  const [input, setInput] = useState('')

  return (
    <div className="input-container">
      <input
        type={name === 'id' ? 'number' : 'text'}
        className="input"
        placeholder={`search by ${name}`}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onClick(input)}
      />
      <button onClick={() => onClick(input)}>search</button>
    </div>
  )
}

export default Input
