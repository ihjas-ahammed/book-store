import {  AppBar, Button, InputBase, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'
import { styled, alpha } from '@mui/material/styles'
const SearchInput = styled('div')(({ theme }) => ({
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
      paddingLeft: calc(1em + ${theme.spacing(4)}),
      transition: theme.transitions.create('width'),
      width: '12ch',
      '&:focus': {
          width: '20ch',
      },
  },
}));


function Navbar () 
 {
  return (
    <div>
     <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' marginRight={"auto"}> LOVE AT FIRST CRY</Typography>
            <Link to="/">
                <Button style={{color:"white"}}></Button>
            </Link>
            
        </Toolbar>
    </AppBar>
    </div>
  )
}

export default Navbar