import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import CreateNewStaff from "./CreateNewStaff";
import UpdateStaff from "./UpdateStaff";
import DeleteStaff from "./DeleteStaff";

import "./Staff.css";

const Staff = () => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    loadStaffs();
  }, []);

  const loadStaffs = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/staffs`);
      setStaffs(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="staff-contain">
        <h1>Staff</h1>
        <CreateNewStaff />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={staff.image} style={{ width: "200px" }} />
                </td>
                <td>{staff.name}</td>
                <td>{staff.phone}</td>
                <td>{staff.email}</td>
                <td>{staff.position}</td>
                <td>
                  <UpdateStaff uuid={staff.uuid} />
                  {"   "}
                  <DeleteStaff uuid={staff.uuid} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Staff;
