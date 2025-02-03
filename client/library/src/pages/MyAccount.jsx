import { Box, Button, Card, Stack, Table, TableCell, TableRow, TextField, Typography } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import React, { useState } from 'react'

const MyAccount = () => {

    const [isEditing, setisEditing] = useState(false)


    return (
        <Stack className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <Card className="w-full max-w-3xl mx-4 py-18 px-20 rounded-lg shadow-xl bg-white" elevation={10}>
                <Typography variant="h4" className="text-center font-bold pb-10">
                    My Account
                </Typography>
                <div className="flex flex-col gap-8">
                    {/* Profile Icon */}
                    <Box className="flex justify-center items-center">
                        <AccountCircleOutlinedIcon color="disabled" sx={{ fontSize: 200 }} />
                    </Box>
                    {/* Account Details Table */}
                    <Table className="min-w-full">
                        <TableRow className="border-b">
                            <TableCell className="py-4 px-6 font-medium text-gray-700">Name</TableCell>
                            <TableCell className="py-4 px-6 text-gray-500">Ihjas</TableCell>
                        </TableRow>
                        <TableRow className="border-b">
                            <TableCell className="py-4 px-6 font-medium text-gray-700">Email</TableCell>
                            <TableCell className="py-4 px-6 text-gray-500">ihjaskallingal@gmail.com</TableCell>
                        </TableRow>
                        <TableRow className="border-b">
                            <TableCell className="py-4 px-6 font-medium text-gray-700">Password</TableCell>
                            <TableCell className="py-4 px-6 text-gray-500 w-100">
                                {isEditing ? (
                                    <Box className="flex gap-2">
                                        <TextField id="outlined-basic" label="New Password" type="password" variant="outlined" className="w-full" />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="bg-blue-600 w-50 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                            onClick={() => setisEditing(false)}
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        onClick={() => setisEditing(true)}
                                    >
                                        Change Password
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    </Table>

                    <Button>Sign Out</Button>
                </div>
            </Card>
        </Stack>

    )
}

export default MyAccount