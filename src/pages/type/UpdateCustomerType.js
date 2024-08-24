import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const UpdateCustomerType = ({ uuid }) => {
  const [customerType, setCustomerType] = useState({
    uuid: "",
    type: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onInputChange = (e) => {
    setCustomerType({ ...customerType, [e.target.name]: e.target.value });
  };

  const findByUuid = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/v1/customer_type/uuid/${uuid}`
    );
    setCustomerType(result.data);
    setShow(true);
  };

  const onSubmit = async () => {
    await axios.post(
      `http://localhost:8080/api/v1/customer_type`,
      customerType
    );
    window.location.reload();
    setShow(false);
  };
  return (
    <>
      <Button variant="warning" onClick={findByUuid}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="customer type..."
                name="type"
                value={customerType.type}
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
};

export default UpdateCustomerType;
