import { Outlet, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';


const MainLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.token;
    if(!token){
      navigate('/login');
    }
  }, [navigate])


  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <Header open={open} toggleDrawer={toggleDrawer}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      
    </>
  )
}

export default MainLayout;
