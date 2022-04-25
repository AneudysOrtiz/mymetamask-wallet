import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { TrxFormData } from '../../models/TrxFormData';
import './TrxForm.css';

export interface TrxFormProps {
  show: boolean;
  onClose: (data?: TrxFormData) => Promise<void>;
}

export const TrxForm = ({ show, onClose }: TrxFormProps) => {

  const [address, setAddress] = useState("");
  const [ammount, setAmmount] = useState("");


  const handleClose = () => {
    onClose({
      to: address,
      value: ammount
    });
    setAddress("");
    setAmmount("");
  }

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Funds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="eth-address">
              <Form.Label>Address Destination</Form.Label>
              <Form.Control type="text" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="eth-value">
              <Form.Label>ETH Value</Form.Label>
              <Form.Control step='any' type="number" placeholder="Enter value" onChange={(e) => setAmmount(e.target.value)} />
            </Form.Group>
            <div className="FormButtons">
              <Button variant="secondary" onClick={() => onClose()}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose} disabled={!address || !ammount}>
                Submit
              </Button>
            </div>
          </Form>

        </Modal.Body>

      </Modal>
    </>
  )
}
