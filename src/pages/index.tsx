import React from 'react';

import { Paper } from '@components/atoms';
import { FeedbackForm } from '@components/organisms/feedbackForm/FeedbackForm';

const HomePage = () => (
  <div className="container">
    <div className="page home-page">
      <Paper>
        <div className="feedback-form">
          <h2 className="feedback-form__title">Feedback Form</h2>
          <FeedbackForm />
        </div>
      </Paper>
    </div>
  </div>
);
export default HomePage;
