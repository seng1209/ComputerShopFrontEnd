import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./CustomerType.css";

import CreateNewCustomerType from "./CreateNewCustomerType";
import UpdateCustomerType from "./UpdateCustomerType";
import DeleteCustomerType from "./DeleteCustomerType";

const CustomerType = () => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState();

  useEffect(() => {
    loadCustomerTypes();
  }, []);

  const loadCustomerTypes = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/customer_type`
      );
      setTypes(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="customer-type-contain">
        <h1>Customer Type</h1>
        <CreateNewCustomerType />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>UUID</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{type.uuid}</td>
                <td>{type.type}</td>
                <td>
                  <UpdateCustomerType uuid={type.uuid} />
                  {"  "}
                  <DeleteCustomerType type={type.type} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerType;
