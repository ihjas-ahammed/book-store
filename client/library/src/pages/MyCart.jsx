import { Card, Paper, Stack, Typography, Box, Button, ButtonBase, TableCell, Table, TableRow } from '@mui/material'

import React, { useState } from 'react'
import CartItem from '../components/CartItem'

const MyCart = () => {

    const [cartItems, setCartItems] = useState([
        {
            item: {
                id: 1,
                image: "https://books.google.com/books/publisher/content/images/frontcover/v44WEQAAQBAJ?fife=w256-h256",
                name: "Trading Psychology Mastery With Ease: A step by step guide to achieve mastery",
                rating: "4.1",
                price: "9.00",
                priceOld: "99.00",
                description: "In 'Trading Psychology Mastery With Ease,' Vikash Kumar offers practical insights and effective techniques to help traders develop a resilient and disciplined mindset, manage emotions, and achieve lasting success in the financial markets.",
                author: "Vikash Kumar"
            },
            count: 1
        },
        {
            item: {
                "id": 2,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/2Pe-EAAAQBAJ?fife=w256-h256",
                "name": "The List of Suspicious Things: The No.1 Sunday Times Bestseller",
                "rating": "4.9",
                "price": "385.86",
                "priceOld": "578.79",
                "description": "Set in 1979 Yorkshire, 'The List of Suspicious Things' follows 12-year-old Miv and her best friend Sharon as they compile a list of suspicious activities in their neighborhood, aiming to catch the Yorkshire Ripper. Their investigation uncovers deeper truths closer to home.",
                "author": "Jennie Godfrey"
            },
            count: 2
        }
    ])

    const handleChangeCount = (index, newCount) => {
        if(newCount < 0) return
        setCartItems((prevCartItems) =>
          prevCartItems.map((cartItem, i) =>
            i === index ? { ...cartItem, count: newCount } : cartItem
          )
        );
      };

    const getCartTotal = () => {
        let t = 0
        cartItems.map((i) => t += i.item.price*i.count)
        return t
    }

    const getTotalCount = () => {
        let t = 0
        cartItems.map((i) => t += i.count)
        return t
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
                            cartItems.map((i,index) => {
                                return (
                                    <CartItem
                                        image={i.item.image}
                                        name={i.item.name}
                                        author={i.item.author}
                                        price={i.item.price}
                                        count={i.count}
                                        onChangeCount={(a,e)=>{
                                            handleChangeCount(index,i.count+a)

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
                                <TableCell>₹ {parseInt(getCartTotal()*0.18)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>₹ {parseInt(getCartTotal())+parseInt(getCartTotal()*0.18)}</TableCell>
                            </TableRow>
                        </Table>
                        <Button sx={{ mt: 'auto' }} className='w-[100%]'>Check Out</Button>
                    </Stack>
                </Stack>
            </Card>
        </Paper>
    )
}

export default MyCart