import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Payment.css";

import CreateNewPayment from "./CreateNewPayment";
import UpdatePayment from "./UpdatePayment";
import DeletePayment from "./DeletePayment";

const Payment = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    laodPayments();
  }, []);

  const laodPayments = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/payments`);
      setPayments(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="payment-contain">
        <h1>Payment</h1>
        <CreateNewPayment />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pay Date</th>
            <th>Customer</th>
            <th>Staff</th>
            <th>Paid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {new Date(payment.payDate)
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ")}
                </td>
                <td>{payment.customer.name}</td>
                <td>{payment.staff.name}</td>
                <td>{payment.paidAmount}</td>
                <td>
                  <UpdatePayment uuid={payment.uuid} />
                  {"   "}
                  <DeletePayment uuid={payment.uuid} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Payment;
