import React from 'react';
import { Box,Typography, Link } from '@mui/material';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box component="footer" className='footer'>
            <Typography variant="body2" component="span">
                &copy; {currentYear} <Link href='https://pablosantamaria.com.ar' target='_blank'>Pablo Santamaria</Link>. All rights reserved.
            </Typography>
        </Box>    
    );
  };

export default Footer;