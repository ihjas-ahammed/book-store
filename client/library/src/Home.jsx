import React from 'react'
import Banner from './components/Banner'
import { Box, Stack, Typography } from '@mui/material'
import BookCard from './components/BookCard'

const data = [
    {
        name: "Recent Price Drops",
        items: [
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/v44WEQAAQBAJ?fife=w256-h256",
                name: "Trading Psychology Mastery With Ease: A step by step guide to achieve mastery",
                rating: "4.1",
                price: "9.00",
                priceOld: "99.00"
            },
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/2Pe-EAAAQBAJ?fife=w256-h256",
                name: "The List of Suspicious Things: The No.1 Sunday Times Bestseller",
                rating: "4.9",
                price: "385.86",
                priceOld: "578.79"
            },
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/MddBEQAAQBAJ?fife=w256-h256",
                name: "Taste Of Tradition: 20 Must-Try South Indian Recipes",
                rating: "4.7",
                price: "10.00",
                priceOld: "349.80"
            },
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/hqFSEAAAQBAJ?fife=w256-h256[URL placeholder]",
                name: "The Good Life: Lessons from the World's Longest Study on Happiness",
                rating: "4.0",
                price: "424.21",
                priceOld: "732.78"
            },
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/jLOkDwAAQBAJ?fife=w256-h256",
                name: "The Book of Five Rings by Miyamoto Musashi Book 6",
                rating: "4.3",
                price: "100.28",
                priceOld: "252.42"
            }
        ]
    },
    {
        name: "New releases",
        items: [
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/K3MzEQAAQBAJ?fife=w256-h256",
                name: "Building Self-Trust for Personal Growth: How to Cultivate Confidence in Your Abilities and Decisions",
                rating: "4.0",
                price: "10.62",
                priceOld: null
            },
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/L-AyEQAAQBAJ?fife=w256-h256",
                name: "Understanding the Importance of Networking - Building Connections for Personal and Professional Growth",
                rating: "4.6",
                price: "10.62",
                priceOld: null
            },
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/-d8yEQAAQBAJ?fife=w256-h256",
                name: "Building Trust in Professional Relationships - Techniques for Establishing and Maintaining Trust with Colleagues",
                rating: "4.2",
                price: "10.62",
                priceOld: null
            },
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/7-AyEQAAQBAJ?fife=w256-h256",
                name: "Understanding the Importance of Non-Verbal Communication",
                rating: "3.2",
                price: "10.62",
                priceOld: null
            },
            {
                image: "https://books.google.com/books/publisher/content/images/frontcover/G50wEQAAQBAJ?fife=w256-h256",
                name: "Making Yourself a Prosperity Magnet",
                rating: "4.0",
                price: "10.62",
                priceOld: null
            }
        ]
    }
]

const Home = () => {
    return (
        <Stack>
            <Banner />
            <Box className="my-10 w-[100%] px-10">
                {data.map((i, index) => {
                    return (
                        <Stack key={index} className='items-center'>

                            <Typography variant='h4' className='text-xl font-medium text-gray-900 tracking-tight'>{i.name}</Typography>
                            <Box className="my-3 flex flex-wrap w-fit items-center justify-center">

                                {i.items.map((j, int) => {
                                    return (
                                        <BookCard
                                            key={int}
                                            image={j.image}
                                            name={j.name}
                                            rating={j.rating}
                                            price={j.price}
                                            priceOld={j.priceOld}
                                        />
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