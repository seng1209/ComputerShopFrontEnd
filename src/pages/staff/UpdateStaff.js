import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const UpdateStaff = ({ uuid }) => {
  //   console.log(uuid);
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

  const {
    image,
    name,
    gender,
    birthDate,
    phone,
    email,
    address,
    position,
    salary,
  } = staff;

  const findStaffByUuid = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/staffs/${uuid}`
      );
      setStaff(result.data);
    } catch (err) {
      console.log(err);
    }
    setShow(true);
  };

  const onInputChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      if (file == "") {
        await axios.patch(`http://localhost:8080/api/v1/staffs/${uuid}`, staff);
      } else {
        // await axios.delete(`http://localhost:8080/api/v1/files/${staff.image}`);
        const imageName = await axios.post(
          "http://localhost:8080/api/v1/files",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const staffDto = { ...staff, image: imageName.data.uri };
        await axios.patch(
          `http://localhost:8080/api/v1/staffs/${uuid}`,
          staffDto
        );
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
    setShow(false);
  };

  return (
    <>
      <Button variant="warning" onClick={findStaffByUuid}>
        Edit
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
                value={name}
                autoFocus
                onChange={(e) => onInputChange(e)}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              name="gender"
              value={gender}
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
                value={birthDate}
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
                value={phone}
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
                value={email}
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
                value={address}
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
                value={position}
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
                value={salary}
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

export default UpdateStaff;
