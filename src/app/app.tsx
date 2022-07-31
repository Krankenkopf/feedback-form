import React from 'react';

import Routes from '@routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <>
    <div className="wrapper light">
      {/* {status === 'failed' && <ErrorSnackbar />} */}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  </>
);

export default App;
