import { Box, Button, Card, Paper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderCard from '../components/OrderCard'

const Orders = () => {

    const [orders, setOrders] = useState([
        {
            item: {
                "id": 4,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/hqFSEAAAQBAJ?fife=w256-h256",
                "name": "The Good Life: Lessons from the World's Longest Study on Happiness",
                "rating": "4.0",
                "price": "424.21",
                "priceOld": "732.78",
                "description": "Drawing from the Harvard Study of Adult Development, 'The Good Life' reveals insights into what truly makes life fulfilling, emphasizing the importance of relationships, community, and personal growth.",
                "author": "Robert Waldinger and Marc Schulz"
            },
            price: 424.21,
            status: "Requested"
        }
    ])

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
                                price={i.price}
                                status={i.status}
                            />
                        )
                    })
                }
            </Stack>
        </Paper>
    )
}

export default Orders