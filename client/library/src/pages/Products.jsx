import { Stack, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import BookCard from '../components/BookCard'
import { Link } from 'react-router'
import axios from 'axios'




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
                    <Typography variant='h4' className=' text-xl font-medium text-gray-900 tracking-tight'>All Books</Typography>


                    <Box className="my-3 flex flex-wrap w-fit items-center justify-center">

                        {data.map((i, index) => {
                            return (
                                <>
                                    {
                                        i.items.map((j, int) => {
                                            return (
                                                <Link to='/product' key={j.name} state={{productData:j}}>
                                                    <BookCard
                                                        
                                                        image={j.image}
                                                        name={j.name}
                                                        rating={j.rating}
                                                        price={j.price}
                                                        priceOld={j.priceOld}
                                                    />
                                                </Link>
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