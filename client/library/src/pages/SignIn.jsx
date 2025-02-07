import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import Cookies from 'js-cookie'

const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    

    const handleSignIn = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3001/user', {
            username: username,
            password: password
        }).then((response) => {
            if (response.data) {
                console.log('User found:', response.data)
                setUser(response.data)

                Cookies.set('User', JSON.stringify(response.data), { expires: 100 , path:"/"})
                
                navigate("/",{state:{user:response.data}})
                window.location.href = '/'
            } else {
                console.log('User not found')
                setError('Invalid username or password')
            }
        }).catch((err) => {
            console.error('Error signing in:', err)
            setError('An error occurred while signing in. Please try again.')

        }).finally(() => {
        })


    }

    return (
        <Stack className="flex items-center">
            <Card className="w-125 my-30 flex-row items-center justify-center py-20" elevation={10}>
                <Typography variant="h4" className="text-center">
                    LOGIN
                </Typography>
                <Stack
                    component="form"
                    onSubmit={handleSignIn}
                    className="gap-3 py-10 pb-2 max-w-90 m-auto flex-col"
                >
                    <TextField
                        id="username"
                        label="Username"
                        type="text"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" className="text-center">
                            {error}
                        </Typography>
                    )}
                    <Button sx={{ ml: 'auto', mr: 'auto' }} className="w-fit px-10" type="submit">
                        Sign In
                    </Button>
                    <Typography className="items-center text-center">
                        Don&apos;t have an account?{' '}
                        <Link to="/sign-up" underline="hover" className="text-blue-700">
                            Sign Up
                        </Link>
                    </Typography>
                </Stack>
            </Card>
        </Stack>
    )
}

export default SignIn
