import React from 'react';

import HomePage from '@pages/index';
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<HomePage />} />
  </Routes>
);

export default AppRoutes;
