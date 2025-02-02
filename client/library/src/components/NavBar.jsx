import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Tooltip, InputBase, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Menu as MenuIcon, Search as SearchIcon, Bookmarks as LibraryIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    '&:focus': {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LibraryIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit'
            }}
          >
            LIBRARY
          </Typography>
          <Box className="mr-auto ml-5"> 
            <Link to="/">
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/products">
              <Button color="inherit">Products</Button>
            </Link>
          </Box>
          <Search sx={{ mr: 3 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box>
            <Tooltip title="Open user menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={()=>{navigate("/sign-in");handleCloseUserMenu()}}>
                Sign In
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                My Cart
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}