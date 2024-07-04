import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { useParams, Link } from "react-router-dom";

const UpdateCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/customers/${id}`)
        .then((response) => {
          const { first_name, last_name, email, contact_number } =
            response.data;
          setCustomer({ first_name, last_name, email, contact_number });
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/customers/${id}`, customer)
      .then((response) => {
        console.log(response.data);
        alert("Customer updated successfully!");
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Card style={{ marginTop: 20 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Edit Customer
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              name="first_name"
              value={customer.first_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              name="last_name"
              value={customer.last_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Contact Number"
              fullWidth
              margin="normal"
              name="contact_number"
              value={customer.contact_number}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: 20,
                marginRight: 10,
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/"
              style={{ marginTop: 20 }}
            >
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateCustomer;
