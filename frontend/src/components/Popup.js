import {React , useState} from 'react'

import { Modal, ModalBody} from 'reactstrap';


const Popup = (props) => {
  return (
    <div>
      <Modal
    size='lg'
    isOpen={'true'}
    toggle={props.toggle}
    >
      <ModalBody> 
      {props.children}
      </ModalBody>
    </Modal>
    </div>
  )
}

export default Popup
