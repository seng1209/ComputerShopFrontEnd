import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Category.css";

import CreateNewCategory from "./CreateNewCategory";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/categories`);
      setCategories(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="category-contain">
        <h1>Category</h1>
        <CreateNewCategory />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <UpdateCategory uuid={category.uuid} />
                  {"   "}
                  <DeleteCategory uuid={category.uuid} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Category;
