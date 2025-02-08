import { Card, Paper, Stack, Typography, Box, Button, ButtonBase, TableCell, Table, TableRow } from '@mui/material'

import React, { useState } from 'react'
import CartItem from '../components/CartItem'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import axios from 'axios'


import { Link, useNavigate } from 'react-router'


const MyCart = () => {

    const [cartItems, setCartItems] = useState([])
    
    
    const navigate = useNavigate()
    
    const user = Cookies.get("User")
    const User = user != null ? JSON.parse(user) : null
    if (User == null) navigate('/sign-in')
    const username = User.username
        
    useEffect(() => {
        axios
          .get(`http://localhost:3001/cart/${username}`)
          .then((res) => {
            setCartItems(res.data.cartItems);
          })
          .catch((error) => {
            console.error('Error fetching cart:', error);
          });
      }, []);


      const removeCartItem = (itemName) => {
        axios
          .delete(`http://localhost:3001/cart/remove`, {
            data: { username, itemName },
          })
          .then((res) => {
            setCartItems(res.data.cartItems);
          })
          .catch((error) => {
            console.error('Error removing cart item:', error);
          });
      };

      
    
      const updateCount = (itemName, newCount) => {
        if (newCount < 0) return
        axios
          .put(`http://localhost:3001/cart/update`, { username, itemName, newCount })
          .then((res) => {
            setCartItems(res.data.cartItems);
          })
          .catch((error) => {
            console.error('Error updating cart item count:', error);
          });
      };

    const getCartTotal = () => {
        let t = 0
        cartItems.map((i) => t += i.item.price * i.count)
        return t
    }

    const getTotalCount = () => {
        let t = 0
        cartItems.map((i) => t += i.count)
        return t
    }

    const onCheckout = () =>{
        cartItems.map(i => {
            axios.post('http://localhost:3001/order/add', {
                username,
                item: i.item,
                count: i.count,
            }).then((r)=>{
                console.log(r.data)
                removeCartItem(i.item.name)
            })
        })

        navigate('/orders')
        window.location.href = '/orders'
    }

    return (
        <Paper className='h-[95vh] flex'>
            <Card elevation={4} className='max-w-300 mx-auto my-auto p-10 flex gap-10'>
                <Stack className='w-[100%]'>
                    <Box className='flex gap-5 items-center'>
                        <Typography sx={{ fontSize: 29, textWrap: 'nowrap', fontWeight: 'bold' }}>Your Cart</Typography>
                        <Typography sx={{ fontSize: 20, textWrap: 'nowrap', color: "grey" }}>{getTotalCount()} Items</Typography>
                        <Typography sx={{ fontSize: 20, textWrap: 'nowrap', color: "grey" }}>| &nbsp;₹ {parseInt(getCartTotal())} </Typography>
                    </Box>
                    <Stack className='pt-2 gap-2 max-h-200 overflow-y-scroll no-scrollbar'>
                        {
                            cartItems.map((i, index) => {
                                return (
                                    <CartItem
                                        kay={index}
                                        image={i.item.image}
                                        name={i.item.name}
                                        author={i.item.author}
                                        price={i.item.price}
                                        count={i.count}
                                        onChangeCount={(a, e) => {
                                            updateCount(i.item.name, i.count + a)
                                        }}
                                        onDelete = {(e)=>{
                                            removeCartItem(i.item.name)
                                        }}
                                    />
                                )
                            })
                        }
                    </Stack>
                </Stack>
                <Stack className='w-[100%] flex flex-row gap-2'>
                    <Typography sx={{ fontSize: 29, textWrap: 'nowrap', fontWeight: 'bold' }}>Summary</Typography>
                    <Stack className='w-[100%] h-[100%]'>
                        <Table>
                            <TableRow>
                                <TableCell>Cart Total</TableCell>
                                <TableCell>₹ {parseInt(getCartTotal())}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Shipping</TableCell>
                                <TableCell sx={{ color: "green" }}>FREE</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>GST</TableCell>
                                <TableCell>₹ {parseInt(getCartTotal() * 0.18)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>₹ {parseInt(getCartTotal()) + parseInt(getCartTotal() * 0.18)}</TableCell>
                            </TableRow>
                        </Table>
                        <Button sx={{ mt: 'auto' }} className='w-[100%]' onClick={onCheckout}>Check Out</Button>
                    </Stack>
                </Stack>
            </Card>
        </Paper>
    )
}

export default MyCart