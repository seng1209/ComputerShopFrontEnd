import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Product.css";

import CreateNewProduct from "./CreateNewProduct";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/v1/products`);
      setProducts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="product-contain">
        <h1>Product</h1>
        <CreateNewProduct />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Sale Unit Price</th>
            <th>Discount</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={product.image} style={{ width: "150px" }} />
                </td>
                <td>{product.name}</td>
                <td style={{ width: "20%" }}>{product.description}</td>
                <td>{product.stockQuantity}</td>
                <td>{product.unitPrice}</td>
                <td>{product.saleUnitPrice}</td>
                <td>{product.discount}</td>
                <td>{product.category.name}</td>
                <td>
                  <UpdateProduct uuid={product.uuid} />
                  {"   "}
                  <DeleteProduct uuid={product.uuid} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Product;
