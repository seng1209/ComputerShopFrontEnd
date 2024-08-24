import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CreateNewSupplier from "./CreateNewSupplier";
import UpdateSupplier from "./UpdateSupplier";
import DeleteSupplier from "./DeleteSupplier";
import "./Supplier.css";

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    loadSupliers();
  }, []);

  const loadSupliers = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/suppliers`);
      setSuppliers(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="supplier-contain">
        <h1>Supplier</h1>
        <CreateNewSupplier />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{supplier.name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td>
                  <UpdateSupplier uuid={supplier.uuid} />
                  {"   "}
                  <DeleteSupplier uuid={supplier.uuid} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Supplier;
