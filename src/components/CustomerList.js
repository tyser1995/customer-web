import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get('http://localhost:8000/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  };

  const handleDeleteClick = (id) => {
    setDeleteCustomerId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:8000/api/customers/${deleteCustomerId}`)
      .then(response => {
        console.log(response.data);
        fetchCustomers();
        setDeleteDialogOpen(false);
      })
      .catch(error => console.error(error));
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleEditClick = (id) => {
    navigate(`/edit-customer/${id}`);
  };

  return (
    <Container>
      <Card style={{ marginTop: 20 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>Customer List</Typography>
          <Button variant="contained" color="primary" component={Link} to="/add-customer">
            Add Customer
          </Button>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.first_name}</TableCell>
                    <TableCell>{customer.last_name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.contact_number}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(customer.id)}
                        style={{ marginRight: 10 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteClick(customer.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CustomerList;
