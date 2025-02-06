import { Close, Delete } from '@mui/icons-material'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React from 'react'

const CartItem = ({ image, name, author, price, count, onChangeCount }) => {
    return (
        <Card className='flex p-4 gap-4 min-h-55' >
            <img className='w-30 h-fit' src={image}></img>
            <Stack >
                <Typography sx={{ fontSize: 17, fontWeight: 'bold' }}>{name}</Typography>
                <Typography sx={{ fontSize: 15, color: "grey" }}>{author}</Typography>
                <Typography>₹{price}</Typography>
                <Box display="flex" alignItems="center" mt="auto" width="100%">
                    <Button onClick={() => onChangeCount(-1)}>-</Button>
                    <Typography sx={{ px: 2 }}>{count}</Typography>
                    <Button onClick={() => onChangeCount(1)}>+</Button>
                    <Button sx={{ ml: 'auto' }} >
                        <Delete sx={{ fontSize: 20 }} />
                    </Button>
                </Box>
            </Stack>
        </Card>
    )
}

export default CartItem