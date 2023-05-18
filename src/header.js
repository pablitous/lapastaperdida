import React from 'react';
import { AppBar, Box, Typography,  } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="fixed" >
      <Box className="ToolbarHeader">
        <Typography variant="h6">La Pasta Perdida</Typography>
      </Box >
    </AppBar>
  );
};
export default Header;