import React, { useCallback, useState } from 'react'
import { editingReview } from '../api'

const EditReview = () => {
  const [reviewId, setReviewId] = useState(null)
  const [editReview, setEditReview] = useState(null)

  const setNewReview = useCallback(async () => {
    if (!reviewId || !editReview) return
    await editingReview(reviewId, editReview)
  }, [reviewId, editReview])

  return (
    <div>
      <input
        type="number"
        className="input"
        onChange={(e) => setReviewId(e.target.value)}
        placeholder="Review Id"
      />
      <textarea
        className="text-area"
        onChange={(e) => setEditReview(e.target.value)}
        placeholder="New review"
      />
      <button className="width" onClick={setNewReview}>
        EDIT
      </button>
    </div>
  )
}

export default EditReview
