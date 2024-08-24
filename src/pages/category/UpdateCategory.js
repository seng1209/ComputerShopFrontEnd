import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function UpdateCategory({ uuid }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState({
    name: "",
  });

  const { name } = category;

  const findByUuid = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/categories/${uuid}`
      );
      setCategory(result.data);
    } catch (err) {
      console.log(err);
    }
    setShow(true);
  };

  const onInputChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/categories/${uuid}`,
        category
      );
      window.location.reload();
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
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="category name"
                autoFocus
                name="name"
                value={name}
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
}

export default UpdateCategory;
