import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { Box, Button, Card, Stack, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const MyAccount = () => {
    const userCookie = Cookies.get('User');
    let user = userCookie ? JSON.parse(userCookie) : null;

    const navigate = useNavigate();
    if (!user) {
        navigate('/');
        return null;
    }

    const [isEditing, setIsEditing] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const handleSignOut = () => {
        Cookies.remove('User');
        navigate('/');
        window.location.href = '/'
    };

    const handlePasswordUpdate = async () => {
        axios.post('http://localhost:3001/user/setpassword', {
            username: user.username,
            email: user.email,
            oldPassword: user.password,
            newPassword: newPassword,
        }).then((response) => {

            const updatedUser = { ...user, password: newPassword };
            Cookies.set('User', JSON.stringify(updatedUser));
            alert('Password updated successfully');
            user = updatedUser
            setIsEditing(false)
        }
        ).catch((error) => {
            console.log(error)
            alert('Error updating password')
        });


    };

    return (
        <Stack className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <Card
                className="w-full max-w-3xl mx-4 py-18 px-20 rounded-lg shadow-xl bg-white"
                elevation={10}
            >
                <Typography variant="h4" className="text-center font-bold pb-10">
                    My Account
                </Typography>
                <div className="flex flex-col gap-8">
                    <Box className="flex justify-center items-center">
                        <AccountCircleOutlinedIcon color="disabled" sx={{ fontSize: 200 }} />
                    </Box>
                    <Table className="min-w-full">
                        <TableBody>
                            <TableRow className="border-b">
                                <TableCell className="py-4 px-6 font-medium text-gray-700">Name</TableCell>
                                <TableCell className="py-4 px-6 text-gray-500">{user.username}</TableCell>
                            </TableRow>
                            <TableRow className="border-b">
                                <TableCell className="py-4 px-6 font-medium text-gray-700">Email</TableCell>
                                <TableCell className="py-4 px-6 text-gray-500">{user.email}</TableCell>
                            </TableRow>
                            <TableRow className="border-b">
                                <TableCell className="py-4 px-6 font-medium text-gray-700">Password</TableCell>
                                <TableCell className="py-4 px-6 text-gray-500 w-100">
                                    {isEditing ? (
                                        <Box className="flex gap-2">
                                            <TextField
                                                id="new-password"
                                                label="New Password"
                                                type="password"
                                                variant="outlined"
                                                className="w-full"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="bg-blue-600 w-50 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                                onClick={handlePasswordUpdate}
                                            >
                                                Update
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Change Password
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Button>
                </div>
            </Card>
        </Stack>
    );
};

export default MyAccount;
