import React from 'react'
import Banner from './components/Banner'
import { Box, Stack, Typography } from '@mui/material'
import BookCard from './components/BookCard'
import { Link, useNavigate } from 'react-router'

const data = [
    {
        "name": "Recent Price Drops",
        "items": [
            {
                "id": 1,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/v44WEQAAQBAJ?fife=w256-h256",
                "name": "Trading Psychology Mastery With Ease: A step by step guide to achieve mastery",
                "rating": "4.1",
                "price": "9.00",
                "priceOld": "99.00",
                "description": "In 'Trading Psychology Mastery With Ease,' Vikash Kumar offers practical insights and effective techniques to help traders develop a resilient and disciplined mindset, manage emotions, and achieve lasting success in the financial markets.",
                "author": "Vikash Kumar"
            },
            {
                "id": 2,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/2Pe-EAAAQBAJ?fife=w256-h256",
                "name": "The List of Suspicious Things: The No.1 Sunday Times Bestseller",
                "rating": "4.9",
                "price": "385.86",
                "priceOld": "578.79",
                "description": "Set in 1979 Yorkshire, 'The List of Suspicious Things' follows 12-year-old Miv and her best friend Sharon as they compile a list of suspicious activities in their neighborhood, aiming to catch the Yorkshire Ripper. Their investigation uncovers deeper truths closer to home.",
                "author": "Jennie Godfrey"
            },
            {
                "id": 3,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/MddBEQAAQBAJ?fife=w256-h256",
                "name": "Taste Of Tradition: 20 Must-Try South Indian Recipes",
                "rating": "4.7",
                "price": "10.00",
                "priceOld": "349.80",
                "description": "Explore the rich culinary heritage of South India with 'Taste Of Tradition,' featuring 20 essential recipes that capture the authentic flavors and techniques of the region's cuisine.",
                "author": "Anita Nair"
            },
            {
                "id": 4,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/hqFSEAAAQBAJ?fife=w256-h256",
                "name": "The Good Life: Lessons from the World's Longest Study on Happiness",
                "rating": "4.0",
                "price": "424.21",
                "priceOld": "732.78",
                "description": "Drawing from the Harvard Study of Adult Development, 'The Good Life' reveals insights into what truly makes life fulfilling, emphasizing the importance of relationships, community, and personal growth.",
                "author": "Robert Waldinger and Marc Schulz"
            },
            {
                "id": 5,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/jLOkDwAAQBAJ?fife=w256-h256",
                "name": "The Book of Five Rings by Miyamoto Musashi Book 6",
                "rating": "4.3",
                "price": "100.28",
                "priceOld": "252.42",
                "description": "A classic text on kenjutsu and the martial arts in general, 'The Book of Five Rings' provides insights into strategy, tactics, and philosophy, written by the undefeated samurai Miyamoto Musashi.",
                "author": "Miyamoto Musashi"
            }
        ]
    },
    {
        "name": "New releases",
        "items": [
            {
                "id": 6,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/K3MzEQAAQBAJ?fife=w256-h256",
                "name": "Building Self-Trust for Personal Growth: How to Cultivate Confidence in Your Abilities and Decisions",
                "rating": "4.0",
                "price": "10.62",
                "priceOld": null,
                "description": "This guide offers strategies to help readers develop self-trust, enhance personal growth, and build confidence in their abilities and decision-making processes.",
                "author": "Sarah Johnson"
            },
            {
                "id": 7,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/L-AyEQAAQBAJ?fife=w256-h256",
                "name": "Understanding the Importance of Networking - Building Connections for Personal and Professional Growth",
                "rating": "4.6",
                "price": "10.62",
                "priceOld": null,
                "description": "An insightful exploration into the significance of networking, providing practical tips on building meaningful connections for both personal and professional development.",
                "author": "David Thompson"
            },
            {
                "id": 8,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/-d8yEQAAQBAJ?fife=w256-h256",
                "name": "Building Trust in Professional Relationships - Techniques for Establishing and Maintaining Trust with Colleagues",
                "rating": "4.2",
                "price": "10.62",
                "priceOld": null,
                "description": "This book delves into methods for establishing and maintaining trust in professional settings, offering techniques to enhance collaboration and workplace harmony.",
                "author": "Emily Davis"
            },
            {
                "id": 9,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/7-AyEQAAQBAJ?fife=w256-h256",
                "name": "Understanding the Importance of Non-Verbal Communication",
                "rating": "3.2",
                "price": "10.62",
                "priceOld": null,
                "description": "A comprehensive guide to non-verbal communication, highlighting its impact on interactions and providing tips to improve body language and interpret others' cues.",
                "author": "Michael Lee"
            },
            {
                "id": 10,
                "image": "https://books.google.com/books/publisher/content/images/frontcover/G50wEQAAQBAJ?fife=w256-h256",
                "name": "Making Yourself a Prosperity Magnet",
                "rating": "4.0",
                "price": "10.62",
                "priceOld": null,
                "description": "Focusing on the principles of attraction and mindset, this book guides readers on how to become a magnet for prosperity in various aspects of life.",
                "author": "Laura Harris"
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
                                        <Link to='/product' state={{ productData: j }}>
                                            <BookCard
                                                key={int}
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
