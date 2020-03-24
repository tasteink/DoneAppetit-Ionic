import * as React from "react"
import { IonRouterLink } from "@ionic/react"
import { useHistory } from "react-router"

import "./BackBar.css"
import classcat from "classcat"

export interface IProps {
  className: string
}

export function BackBar(props: any) {
  const history = useHistory()
  const linkClassName = classcat(["LinkText", props.useWhiteLink && "whiteLink"])

  return (
    <div className='BackBar' data-testid='BackBar'>
      <IonRouterLink routerDirection='back'>
        <p className={linkClassName} onClick={history.goBack}>
          {"<"} back
        </p>
      </IonRouterLink>
    </div>
  )
}

BackBar.defaultProps = {
  className: ""
}
