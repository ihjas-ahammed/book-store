import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import Cookies from 'js-cookie'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:3001/user/add', {
                username,
                email,
                password,
            })
            Cookies.set('User', JSON.stringify(response.data), { expires: 100, path: "/" })

            navigate("/", { state: { user: response.data } })
            window.location.href = '/'
        } catch (error) {
            console.error('Error creating user:', error)
        }
    }

    return (
        <Stack className="flex items-center">
            <Card className="w-125 my-30 flex-row items-center justify-center py-20" elevation={10}>
                <Typography variant="h4" className="text-center">
                    SIGN UP
                </Typography>
                <Stack
                    component="form"
                    onSubmit={handleSignUp}
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
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button sx={{ ml: 'auto', mr: 'auto' }} className="w-fit px-10" type="submit">
                        Sign Up
                    </Button>
                    <Typography className="items-center text-center">
                        Already have an account?{' '}
                        <Link to="/sign-in" underline="hover" className="text-blue-700">
                            Sign In
                        </Link>
                    </Typography>
                </Stack>
            </Card>
        </Stack>
    )
}

export default SignUp
