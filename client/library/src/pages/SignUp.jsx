import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

const SignUp = () => {
    return (
        <>

            <Stack className="flex items-center" >
                <Card className="w-125 my-30 flex-row items-center justify-center py-20" elevation={10}>
                    <Typography variant="h4" className='text-center'>SIGN UP</Typography>
                    <Stack className="gap-3 py-10 pb-2 max-w-90 m-auto flex-row" >
                        <TextField id="outlined-basic" label="Username" type="username" variant="outlined" />
                        <TextField id="outlined-basic" label="Email" type="email" variant="outlined" />

                        <TextField id="outlined-basic" label="Password" type="password" variant="outlined" />

                        <Button sx={{ml:'auto',mr:'auto'}} className='w-fit px-10' >Sign Up</Button>
                        <Typography className="items-center text-center">
                            Already have an account? <Link to="/sign-in" underline='hover' className='text-blue-700'>Sign In</Link>
                        </Typography>
                    </Stack>
                </Card>
            </Stack>
        </>
    )
}

export default SignUp