import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const CreateNewCustomerType = () => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState({
    type: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onInputChange = (e) => {
    setType({ ...type, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    await axios.post(`http://localhost:8080/api/v1/customer_type`, type);
    window.location.reload();
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="customer type..."
                name="type"
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

export default CreateNewCustomerType;
