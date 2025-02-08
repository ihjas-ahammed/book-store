import React from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Tooltip, InputBase, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router';

const NavBar = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontWeight: 700,
                                color: 'inherit'
                            }}
                        >
                            Admin
                        </Typography>
                        <Box className="ml-auto mr-5">
                            <Link to="/">
                                <Button color="inherit">Products</Button>
                            </Link>
                            <Link to="/users">
                                <Button color="inherit">Users</Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default NavBar