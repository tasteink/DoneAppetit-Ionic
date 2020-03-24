import * as React from "react"
import { IonModal, IonButton, IonContent } from "@ionic/react"

import "./Modal.css"

export interface IProps {
  className: string
  isOpen: boolean
  children: any
}

export function Modal(props: IProps) {
  return (
    <div data-testid='Modal' className='Modal'>
      {props.isOpen && <IonModal isOpen>{props.children()}</IonModal>}
    </div>
  )
}

Modal.defaultProps = {
  className: ""
}
