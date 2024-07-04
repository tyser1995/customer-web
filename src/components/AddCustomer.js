import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const AddCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/customers', {
      first_name: firstName,
      last_name: lastName,
      email:email,
      contact_number: contactNumber
    })
      .then(response => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setContactNumber('');
        alert('Customer added successfully!');
      })
      .catch(error => console.error(error));
  }

  return (
    <Container>
      <Card style={{ marginTop: 20 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>Add Customer</Typography>
          <Button variant="contained" color="primary" component={Link} to="/">
            Customer List
          </Button>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contact Number"
              fullWidth
              margin="normal"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
              required
            />
            <CardActions>
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>Add</Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AddCustomer;
