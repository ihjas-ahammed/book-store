import { Stack, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import BookCard from './components/BookCard'




const Products = () => {
    const [data, setData] = useState([])

    axios.get("http://localhost:3001/products")
        .then(r=>{
            setData(r.data)
        })
        .catch(e => {
            console.log(e)
        })
    return (
        <Stack>

            <Box className="my-10 w-[100%] px-10">
                <Stack className='items-center'>
                    <Typography variant='h4' className=' text-xl font-medium text-gray-900 tracking-tight'>Products</Typography>


                    <Box className="my-3 flex flex-wrap w-fit items-center justify-center">

                        {data.map((i, index) => {
                            return (
                                <>
                                    {
                                        i.items.map((j, int) => {
                                            return (
                                                <>
                                                    <BookCard
                                                        
                                                    />
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )
                        })}

                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Products