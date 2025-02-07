import React, { useState } from 'react'
import Banner from './components/Banner'
import { Box, Stack, Typography } from '@mui/material'
import BookCard from './components/BookCard'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'


const Home = () => {
    const [data, setData] = useState([])
    
    axios.get("http://localhost:3001/products")
        .then(r => {
            setData(r.data)
        })
        .catch(e => {
            console.log(e)
        })
    return (
        <Stack>
            <Banner />
            <Box className="my-10 w-[100%] px-10">
                {data.map((i, index) => {
                    return (
                        <Stack key={i.name} className='items-center'>

                            <Typography variant='h4' className='text-xl font-medium text-gray-900 tracking-tight'>{i.name}</Typography>
                            <Box className="my-3 flex flex-wrap w-fit items-center justify-center">

                                {i.items.map((j, int) => {
                                    return (
                                        <Link
                                            key={j.name} to='/product' state={{ productData: j }}>
                                            <BookCard
                                                image={j.image}
                                                name={j.name}
                                                rating={j.rating}
                                                price={j.price}
                                                priceOld={j.priceOld}
                                            />
                                        </Link>

                                    )
                                })}
                            </Box>
                        </Stack>
                    )
                })}
            </Box>
        </Stack>
    )
}

export default Home
