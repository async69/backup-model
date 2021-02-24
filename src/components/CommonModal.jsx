import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const CommonModals = (props) => {
  const { className } = props;

  return (
    <div className="modal">
      <Modal size={props.size} isOpen={props.openModal} className={className}>
        <ModalHeader
          toggle={() => props.toggle({ type: "CLOSE" }, props.dispatch)}
        >
          <h6 className="text-uppercase">{props.title}</h6>
        </ModalHeader>
        <ModalBody>
          {props.component}
          {/* <Col className="mt-2" align="right">
            <Button
              size="md"
              outline
              color="danger"
              onClick={() => props.toggle("CLOSE", props.dispatch)}
            >
              Close
            </Button>
          </Col> */}
        </ModalBody>
      </Modal>
    </div>
  );
};

CommonModals.defaultProps = {
  size: "xl",
};

export default CommonModals;
