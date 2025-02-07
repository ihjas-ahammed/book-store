import { Box, Button, Card, Paper, Rating, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import axios from 'axios'


const ProductInfo = () => {
    
    const location = useLocation()
    const {productData} = location.state
    const navigate = useNavigate()
    
    const user = Cookies.get("User")
    const User = user != null ? JSON.parse(user) : null
    

    const onAddCart = () =>{
        if(User == null) navigate('/sign-in')
        const username = User.username
        addCartItem(username,productData)
    }

    const addCartItem = (username,item) => {
        axios
          .post(`http://localhost:3001/cart/add`, { username, item })
          .then((res) => {
            navigate("/my-cart")
            window.location.href = "/my-cart"
          })
          .catch((error) => {
            console.error('Error adding cart item:', error);
          });
      };

    return (
    <Paper className='h-[95vh] flex'>
        <Card elevation={4} className='max-w-300 mx-auto my-auto'>
            <Stack className='p-20'>
                <Box className='flex gap-10 mb-10'>
                    <Card className='min-w-100 flex' elevation={20}>
                        <img width="100%" src={productData.image}></img>
                    </Card>
                    <Stack className='mt-15 h-{100%} flex flex-row pb-5 gap-1'>
                        <Typography variant="h3">{productData.name}</Typography>
                        <Typography variant='h6' className='text-blue-600'>{productData.author}</Typography>
                        <Rating name="half-rating-read" defaultValue={parseInt(productData.rating)} precision={0.5} readOnly />
                        <Typography sx={{fontSize:20}}>$ {productData.price}</Typography>
                        <Button color='primary' onClick={onAddCart} sx={{mt:'auto'}}>Add to my cart</Button>
                    </Stack>
                </Box>
                <Stack>
                    <Typography variant="h4">Description</Typography>
                    <Typography variant="p" sx={{fontSize:19,mt:4}}>{productData.description}</Typography>
                </Stack>
            </Stack>
        </Card>
    </Paper>
  )
}

export default ProductInfo