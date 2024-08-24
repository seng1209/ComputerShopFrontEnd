import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Customer.css";

import CreateNewCustomer from "./CreateNewCustomer";
import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";

function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/customers`);
      setCustomers(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="customer-contain">
        <h1>Customer</h1>
        <CreateNewCustomer />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Customer Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={customer.image} style={{ width: "200px" }} />
                </td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.customerType.type}</td>
                <td>
                  <UpdateCustomer phone={customer.phone} />
                  {"   "}
                  <DeleteCustomer phone={customer.phone} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Customer;
