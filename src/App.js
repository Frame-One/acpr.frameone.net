import React, {useState} from 'react';
import './App.css';
import { AppBar, Button, Typography, Box } from '@mui/material';
import { ReplayPage } from './Pages/ReplayPage/ReplayPage.tsx';
import { UploadPage } from './Pages/UploadPage/UploadPage.tsx';
import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
        <AppBar className='app-header-container' position="static" elevation={0}>
          <div className='app-bar-content'>
            <div className='app-bar-logo'>
              <Button
                onClick={() => {setRoute(Routes.REPLAY)}}
                sx={{
                  height: '100%',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'transparent'
                  }
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px'
                  }}
                >
                  ACPR Replays
                </Typography>
              </Button>
            </div>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <div className='app-bar-button'>
                <Button
                  onClick={() => {setRoute(Routes.REPLAY)}}
                  startIcon={<SearchIcon />}
                  variant={route === Routes.REPLAY ? 'contained' : 'text'}
                  sx={{
                    height: '100%',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    background: route === Routes.REPLAY
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'transparent',
                    color: route === Routes.REPLAY ? '#fff' : '#2d3748',
                    '&:hover': {
                      background: route === Routes.REPLAY
                        ? 'linear-gradient(135deg, #5568d3 0%, #6b4295 100%)'
                        : 'rgba(102, 126, 234, 0.1)'
                    }
                  }}
                >
                  Replays
                </Button>
              </div>
              <div className='app-bar-button'>
                <Button
                  onClick={() => {setRoute(Routes.UPLOAD)}}
                  startIcon={<UploadFileIcon />}
                  variant={route === Routes.UPLOAD ? 'contained' : 'text'}
                  sx={{
                    height: '100%',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    background: route === Routes.UPLOAD
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'transparent',
                    color: route === Routes.UPLOAD ? '#fff' : '#2d3748',
                    '&:hover': {
                      background: route === Routes.UPLOAD
                        ? 'linear-gradient(135deg, #5568d3 0%, #6b4295 100%)'
                        : 'rgba(102, 126, 234, 0.1)'
                    }
                  }}
                >
                  Upload
                </Button>
              </div>
              <div className='app-bar-button'>
                <Button
                  onClick={() => window.open('https://github.com/Frame-One/acpr.frameone.net/blob/main/README.md', '_blank')}
                  startIcon={<HelpOutlineIcon />}
                  variant="text"
                  sx={{
                    height: '100%',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    color: '#2d3748',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.1)'
                    }
                  }}
                >
                  FAQs
                </Button>
              </div>
            </Box>
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
