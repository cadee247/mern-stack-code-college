import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
  // Handle POST /api/v1/movies/review
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        userInfo,
        review,
        date
      );

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Handle PUT /api/v1/movies/review
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const date = new Date();

      const ReviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        review,
        date
      );

      const { error } = ReviewResponse;
      if (error) {
        return res.status(400).json({ error });
      }

      if (ReviewResponse.modifiedCount === 0) {
        throw new Error('Unable to update review. User may not be original poster.');
      }

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Handle DELETE /api/v1/movies/review
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;

      console.log(`Deleting review with review_id: ${reviewId} and user_id: ${userId}`);

      const ReviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);

      console.log('Review deletion response:', ReviewResponse);

      res.json({ status: 'success' });
    } catch (e) {
      console.error(`Error deleting review: ${e.message}`);
      res.status(500).json({ error: e.message });
    }
  }
}