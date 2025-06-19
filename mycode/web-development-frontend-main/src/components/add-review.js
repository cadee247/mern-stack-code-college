import React, { useState } from 'react';
import MovieDataService from '../services/movies'; // Service to handle API calls
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const AddReview = props => {
   // Flag to check if we are editing an existing review
   let editing = false;
   let initialReviewState = '';

   // If review data is passed via props (from another page), enable edit mode
   if (props.location.state && props.location.state.currentReview) {
      editing = true;
      initialReviewState = props.location.state.currentReview.review;
   }

   // State to hold the review text
   const [review, setReview] = useState(initialReviewState);

   // State to track if the review has been submitted
   const [submitted, setSubmitted] = useState(false);

   // Update review state on input change
   const onChangeReview = e => {
      const review = e.target.value;
      setReview(review);
   };

   // Submit review to backend
   const saveReview = () => {
      // Build review object
      var data = {
         review: review,
         name: props.user.name,          // user's name
         user_id: props.user.id,         // user's ID
         movie_id: props.match.params.id // movie ID from URL
      };

      if (editing) {
         // Add review ID for update
         data.review_id = props.location.state.currentReview._id;

         // Call update API
         MovieDataService.updateReview(data)
            .then(response => {
               setSubmitted(true);
               console.log(response.data); // log success response
            })
            .catch(e => {
               console.log(e); // log error
            });
      } else {
         // Create new review
         MovieDataService.createReview(data)
            .then(response => {
               setSubmitted(true);
               console.log(response.data);
            })
            .catch(e => {
               console.log(e);
            });
      }
   };

   return (
      <div>
         {/* Conditional rendering: if submitted, show confirmation */}
         {submitted ? (
            <div>
               <h4>Review submitted successfully</h4>
               <Link to={'/movies/' + props.match.params.id}>
                  Back to Movie
               </Link>
            </div>
         ) : (
            // Form for entering or editing a review
            <Form>
               <Form.Group>
                  <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                  <Form.Control
                     type="text"
                     required
                     value={review}
                     onChange={onChangeReview}
                  />
               </Form.Group>
               <Button variant="primary" onClick={saveReview}>
                  Submit
               </Button>
            </Form>
         )}
      </div>
   );
};

export default AddReview;