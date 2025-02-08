import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React from 'react'

const OrderCard = ({name,author,price,status,onCancel}) => {
    return (
        <Card className='p-7 min-w-200'>
            <Stack>
                <Box className='flex w-[100%] gap-4'>
                    <Stack className='w-[100%]' spacing={1}>
                        <Typography variant='h5'>{name}</Typography>
                        <Typography>{author}</Typography>
                        <Typography>₹{price}</Typography>
                    </Stack>
                    <Stack className='w-[100%]' spacing={1}>
                        <Typography variant='h6'>Status</Typography>
                        <Typography>{status}</Typography>
                    </Stack>
                </Box>
                <Button color='error' onClick={onCancel}>Cancel Order</Button>
            </Stack>
        </Card>
    )
}

export default OrderCard