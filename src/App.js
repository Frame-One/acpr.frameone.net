import React, {useState} from 'react';
import './App.css';
import { AppBar, MenuItem, Typography } from '@mui/material';
import { ReplayPage } from './Pages/ReplayPage/ReplayPage.tsx';
import { UploadPage } from './Pages/UploadPage/UploadPage.tsx';

const Routes = {
  REPLAY: 'REPLAY',
  UPLOAD: 'UPLOAD',
  FAQ: 'FAQ'
}

function App() {
  const [route, setRoute] = useState(Routes.REPLAY);

  const renderPage = () => {
    if (route === Routes.REPLAY) {
      return (
        <ReplayPage />
      );
    }

    if (route === Routes.UPLOAD) {
      return (
        <UploadPage />
      );
    }

    if (route === Routes.FAQ) {
      window.open('https://github.com/Frame-One/acpr.frameone.net/blob/main/README.md', '_blank');
    }

    return null;
  }

  return (
    <div className='app-container'>
      <div className='app-header-container'>
        <AppBar className='app-header-container'>
          <div className='app-bar-content'>
            <div className='app-bar-logo'>
              <MenuItem style={{height: '100%'}} key={Routes.REPLAY} onClick={() => {setRoute(Routes.REPLAY)}}>
                <Typography>
                  ACPR Replays
                </Typography>
              </MenuItem>
            </div>
            <div className='app-bar-button'>
              <MenuItem style={{height: '100%'}} key={Routes.REPLAY} onClick={() => {setRoute(Routes.REPLAY)}}>
                Replays
              </MenuItem>
            </div>
            <div className='app-bar-button'>
              <MenuItem style={{height: '100%'}} key={Routes.UPLOAD} onClick={() => {setRoute(Routes.UPLOAD)}}>
                Upload
              </MenuItem>
            </div>
            <div className='app-bar-button'>
              <MenuItem style={{height: '100%'}} key={Routes.FAQ} onClick={() => window.open('https://github.com/Frame-One/acpr.frameone.net/blob/main/README.md', '_blank')}>
                FAQs
              </MenuItem>
            </div>
          </div>
        </AppBar>
      </div>
      <div className='app-page-container'>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
