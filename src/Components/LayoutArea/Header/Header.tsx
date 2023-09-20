import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import './Header.css';

function Header(): JSX.Element {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Northwind-Traders
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
