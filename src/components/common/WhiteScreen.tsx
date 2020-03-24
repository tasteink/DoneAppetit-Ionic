import * as React from "react"
import {
  IonApp,
  IonContent,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react"

import "./WhiteScreen.css"
import classcat from "classcat"
import { BackBar } from "./BackBar"

export interface IProps {
  className: string
  title: string
  children: any
}

export function WhiteScreen(props: IProps) {
  const className = classcat(["WhiteScreen", props.className])

  return (
    <div data-testid='WhiteScreen' className={className}>
      <IonPage>
        <IonContent className='AppScreen'>
          <BackBar />
          <div className='screenHeader'>
            <div className='screenTitle'>{props.title}</div>
          </div>
          <div className='screenContent'>{props.children}</div>
        </IonContent>
      </IonPage>
    </div>
  )
}

WhiteScreen.defaultProps = {
  className: ""
}
