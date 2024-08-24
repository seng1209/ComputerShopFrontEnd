import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function UpdateProduct({ uuid }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("file", file);

  const [product, setProduct] = useState({
    image: "",
    name: "",
    description: "",
    stockQuantity: "",
    unitPrice: "",
    saleUnitPrice: "",
    discount: "",
    categoryUuid: "",
  });

  const {
    image,
    name,
    description,
    stockQuantity,
    unitPrice,
    saleUnitPrice,
    discount,
    categoryUuid,
  } = product;

  const findByUuid = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/products/${uuid}`
      );
      setProduct({
        ...product,
        image: result.data.image,
        name: result.data.name,
        description: result.data.description,
        stockQuantity: result.data.stockQuantity,
        unitPrice: result.data.unitPrice,
        saleUnitPrice: result.data.saleUnitPrice,
        discount: result.data.discount,
        categoryUuid: result.data.category.uuid,
      });
    } catch (err) {
      console.log(err);
    }
    setShow(true);
  };

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      if (file == "" || file == null) {
        await axios.patch(
          `http://localhost:8080/api/v1/products/${uuid}`,
          product
        );
        window.location.reload();
      } else {
        const imageName = await axios.post(
          `http://localhost:8080/api/v1/files`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const productDto = { ...product, image: imageName.data.uri };
        await axios.patch(
          `http://localhost:8080/api/v1/products/${uuid}`,
          productDto
        );
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
    setShow(false);
  };

  return (
    <>
      <Button variant="warning" onClick={findByUuid}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image File</Form.Label>
              <Form.Control
                type="file"
                placeholder=""
                name="image"
                onChange={(e) => handleFileChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Stock Quantity"
                name="stockQuantity"
                value={stockQuantity}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unit Price"
                name="unitPrice"
                value={unitPrice}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Sale Unit Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Sale Unit Price"
                name="saleUnitPrice"
                value={saleUnitPrice}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Discount"
                name="discount"
                value={discount}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category UUID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category UUID"
                name="categoryUuid"
                value={categoryUuid}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateProduct;
