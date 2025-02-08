import { Box, Button, Card, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import axios from 'axios'
import Cookies from 'js-cookie'

import { Link, useNavigate } from 'react-router'


const Orders = () => {

    const [orders, setOrders] = useState([])
    
    const navigate = useNavigate()

    useEffect(() => {
        const user = Cookies.get("User")
        const User = user != null ? JSON.parse(user) : null
        if (User == null) navigate('/sign-in')
        const username = User.username

        axios
          .get(`http://localhost:3001/order/${username}`)
          .then((res) => {
            setOrders(res.data.orders);
          })
          .catch((error) => {
            console.error('Error fetching orders:', error);
          });
    }, [])

    const cancelOrder = (itemName) => {
        
        const user = Cookies.get("User")
        const User = user != null ? JSON.parse(user) : null
        if (User == null) navigate('/sign-in')
        const username = User.username
        axios
          .delete(`http://localhost:3001/order/remove`, {
            data: { username, itemName },
          })
          .then((res) => {
            setOrders(res.data.orders);
          })
          .catch((error) => {
            console.error('Error removing order:', error);
          });
      };

    return (
        <Paper className='h-[95vh] flex flex-col'>
            <Typography variant='h3' sx={{ p: 4, mx: 'auto' }} >My Orders</Typography>
            <Stack className='flex flex-row gap-4 items-center'>
                {
                    orders.map((i) => {
                        return (
                            <OrderCard
                                name={i.item.name}
                                author={i.item.author}
                                price={i.item.price * i.count}
                                status={i.status}
                                onCancel={()=>{cancelOrder(i.item.name)}}
                            />
                        )
                    })
                }
            </Stack>
        </Paper>
    )
}

export default Orders