import { Box, Button, Card, Stack, Typography } from '@mui/material'
import React from 'react'

const CartItem = ({image,name,author,price,count,onChangeCount}) => {
    return (
        <Card className='flex p-4 gap-4 min-h-55' >
            <img className='w-30 h-fit' src={image}></img>
            <Stack >
                <Typography sx={{fontSize:17,fontWeight:'bold'}}>{name}</Typography>
                <Typography sx={{fontSize:15, color:"grey"}}>{author}</Typography>
                <Typography>₹{price}</Typography>
                <Box className="flex items-center mt-auto w-fit">
                    <Button onClick={(e)=>onChangeCount(-1,e)}>-</Button>
                    <Typography className='px-4'>{count}</Typography>
                    <Button onClick={(e)=>onChangeCount(1,e)}>+</Button>
                </Box>
            </Stack>
        </Card>
    )
}

export default CartItem