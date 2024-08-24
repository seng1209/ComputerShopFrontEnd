import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const CreateNewStaff = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setFile] = useState([]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("file", file);

  const [staff, setStaff] = useState({
    image: "",
    name: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    address: "",
    position: "",
    salary: "",
  });

  const onInputChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      if (file == "") {
        alert("Image is required!");
      } else {
        const imageName = await axios.post(
          "http://localhost:8080/api/v1/files",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const staffDto = { ...staff, image: imageName.data.uri };
        await axios.post("http://localhost:8080/api/v1/staffs", staffDto);
      }
    } catch (err) {
      console.log(err);
    }
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="image"
                name="image"
                autoFocus
                onChange={(e) => handleFile(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                name="name"
                autoFocus
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              name="gender"
              onChange={(e) => onInputChange(e)}
            >
              <option>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="birthDate"
                name="birthDate"
                autoFocus
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="phone"
                name="phone"
                autoFocus
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="email@gmail.com"
                name="email"
                autoFocus
                onChange={(e) => onInputChange(e)}
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
                rows={3}
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="position"
                name="position"
                autoFocus
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                placeholder="salary"
                name="salary"
                autoFocus
                onChange={(e) => onInputChange(e)}
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

export default CreateNewStaff;
