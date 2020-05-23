import { Router } from 'express'
import {
  searchReviewsByFoodMenu,
  getReviewById,
  editingReview,
} from '../controllers/ReviewsController'

const router = Router()

router.get('/', searchReviewsByFoodMenu)

router.get('/:id', getReviewById)

router.put('/:id', editingReview)

export default router
