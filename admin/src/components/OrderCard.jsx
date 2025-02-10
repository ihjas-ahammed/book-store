import React from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Slider, Typography } from "@mui/material";

const OrderCard = ({ order, onStatusChange, orderStatuses }) => (
    <Card sx={{ mb:2, p:1 }}>
      <CardContent>
        <Typography variant="h6">{order.item.name}</Typography>
        <Typography color="text.secondary" gutterBottom>
          Quantity: {order.count}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Price: ${order.item.price}
        </Typography>
        <Box sx={{ mt: 2 , mx:10}}>
          {order.status !== 'Denied' ? (
            <>
              <Slider
                value={orderStatuses.find(s => s.label === order.status)?.value || 0}
                step={2}
                marks={orderStatuses}
                min={0}
                max={10}
                onChange={onStatusChange}
                sx={{ mt: 2 }}
              />
            </>
          ) : (
            <Chip label="Order Denied" color="error" />
          )}
        </Box>
      </CardContent>
      <CardActions>
        {order.status !== 'Denied' && (
          <Button
            color="error"
            onClick={() => onStatusChange(null, 0, 'Denied')}
          >
            Deny Order
          </Button>
        )}
      </CardActions>
    </Card>
  );

  export default OrderCard