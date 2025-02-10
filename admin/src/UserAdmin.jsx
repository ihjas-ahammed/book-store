import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardActions, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Slider, Chip, } from '@mui/material';
import {
  Delete as DeleteIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import OrderCard from './components/OrderCard';

const orderStatuses = [
  { value: 0, label: 'Requested' },
  { value: 2, label: 'Processing' },
  { value: 4, label: 'Shipped' },
  { value: 6, label: '7 Days to Arrival' },
  { value: 8, label: 'Out for Delivery' },
  { value: 10, label: 'Delivered' },
];

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.post('http://localhost:3001/users', { adminPass: 'supersecret' })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleDeleteUser = (username) => {
    axios.delete('http://localhost:3001/user/remove', {
      data: { username, adminPass: 'supersecret' }
    })
      .then(() => {
        fetchUsers();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const fetchUserOrders = (username) => {
    axios.get(`http://localhost:3001/order/${username}`)
      .then(response => {
        setUserOrders(response.data.orders || []);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const handleUpdateOrderStatus = (username, itemName, status) => {
    axios.put('http://localhost:3001/order/update', { username, itemName, status })
      .then(() => {
        fetchUserOrders(username);
      })
      .catch(error => {
        console.error('Error updating order status:', error);
      });
  };

  const handleSliderChange = (username, itemName) => (event, newValue) => {
    const status = orderStatuses.find(s => s.value === newValue)?.label || 'Requested';
    handleUpdateOrderStatus(username, itemName, status);
  };

  const handleOpenOrders = (user) => {
    setSelectedUser(user);
    fetchUserOrders(user.username);
    setOpenDialog(true);
  };

  

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Administration
      </Typography>

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.username}>
            <Card>
              <CardContent>
                <Typography variant="h6">{user.username}</Typography>
                <Typography color="text.secondary">{user.email}</Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => handleOpenOrders(user)}
                  color="primary"
                  title="View Orders"
                >
                  <ShippingIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteUser(user.username)}
                  color="error"
                  title="Delete User"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedUser?.username}'s Orders
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {userOrders.map((order) => (
              <OrderCard
                key={order.item.id}
                order={order}
                orderStatuses={orderStatuses}
                onStatusChange={handleSliderChange(
                  selectedUser.username,
                  order.item.name
                )}
              />
            ))}
            {userOrders.length === 0 && (
              <Typography color="text.secondary">No orders found</Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserAdmin;