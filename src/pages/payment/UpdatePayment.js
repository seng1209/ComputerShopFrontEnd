import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function UpdatePayment({ uuid }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [paymentRequest, setPaymentRequest] = useState({
    customerPhone: "",
    staffUuid: "",
    paidAmount: "",
  });

  const { customerPhone, staffUuid, paidAmount } = paymentRequest;

  const findByUuid = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/v1/payments/${uuid}`
      );
      setPaymentRequest({
        ...paymentRequest,
        customerPhone: result.data.customer.phone,
        staffUuid: result.data.staff.uuid,
        paidAmount: result.data.paidAmount,
      });
    } catch (err) {
      console.log(err);
    }
    setShow(true);
  };

  const onInputChange = (e) => {
    setPaymentRequest({ ...paymentRequest, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/payments/${uuid}`,
        paymentRequest
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
          <Modal.Title>Update Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Customer Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="customer phone"
                name="customerPhone"
                // value={customer.phone}
                value={customerPhone}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Staff UUID</Form.Label>
              <Form.Control
                type="text"
                placeholder="staff uuid"
                name="staffUuid"
                // value={staff.uuid}
                value={staffUuid}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Paid Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="paid amount"
                name="paidAmount"
                value={paidAmount}
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

export default UpdatePayment;
