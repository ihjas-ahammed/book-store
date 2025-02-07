import { Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'
import BookCard from '../components/BookCard'
import axios from 'axios'


const SearchResults = () => {

    const location = useLocation()
    const { value } = location.state
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

            <Box className="my-10 w-[100%] px-10">
                <Stack className='items-center'>
                    <Typography variant='h4' className=' text-xl font-medium text-gray-900 tracking-tight'>Search Results for '{value}'</Typography>


                    <Box className="my-3 flex flex-wrap w-fit items-center justify-center">

                        {data.map((i, index) => {
                            return (
                                <>
                                    {
                                        i.items.map((j, int) => {
                                            return (
                                                j.name.toLowerCase().includes(value.toLowerCase()) ? (
                                                    <Link to='/product' key={j.name} state={{ productData: j }}>
                                                        <BookCard

                                                            image={j.image}
                                                            name={j.name}
                                                            rating={j.rating}
                                                            price={j.price}
                                                            priceOld={j.priceOld}
                                                        />
                                                    </Link>
                                                ) : (
                                                    <div key={j.name}>
                                                    </div>
                                                )
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

export default SearchResults