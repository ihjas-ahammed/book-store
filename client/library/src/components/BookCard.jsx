import { Star } from '@mui/icons-material'
import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material'
import React from 'react'

const BookCard = ({ image, name, rating, price, priceOld }) => {
    return (
        <Stack className="p-3 w-80 flex gap-2">
            <Card className="rounded-lg shadow-md mb-auto h-100">
                <CardActionArea>
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </CardActionArea>
            </Card>

            <Typography className="text-sm font-medium text-gray-800 line-clamp-2">
                {name}
            </Typography>

            <Box className="flex items-center space-x-1">
                <Typography className="text-sm font-medium">
                    {rating}
                </Typography>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                <Box className="flex w-fit items-center ml-auto flex-wrap">
                    <Typography className="text-sm text-gray-500 line-through mr-1">
                        {priceOld != null ? "₹"+priceOld : ""}
                    </Typography>
                    &nbsp;
                    <Typography className="text-sm font-medium text-gray-900">
                        ₹{price}
                    </Typography>
                </Box>
            </Box>
        </Stack>
    )
}

export default BookCard