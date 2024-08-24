import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function UpdateCustomer({ phone }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setFile] = useState();

  const formData = new FormData();
  formData.append("file", file);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [customer, setCustomer] = useState({
    image: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const { image, name, email, address } = customer;

  const findByPhone = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/customers/phone/${phone}`
      );
      setCustomer(result.data);
    } catch (err) {
      console.log(err);
    }
    setShow(true);
  };

  const onInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      if (file == "" || file == null) {
        await axios.patch(
          `http://localhost:8080/api/v1/customers/${phone}`,
          customer
        );
      } else {
        const imageName = await axios.post(
          `http://localhost:8080/api/v1/files`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const customerDto = { ...customer, image: imageName.data.uri };
        await axios.patch(
          `http://localhost:8080/api/v1/customers/${phone}`,
          customerDto
        );
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setShow(false);
  };

  return (
    <>
      <Button variant="warning" onClick={findByPhone}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder=""
                name="file"
                autoFocus
                onChange={(e) => onFileChange(e)}
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                disable
                type="text"
                placeholder="phone"
                name="phone"
                value={phone}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@mail.com"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
                rows={3}
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

export default UpdateCustomer;
