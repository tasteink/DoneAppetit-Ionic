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
import "@ionic/react/css/core.css"
import "@ionic/react/css/display.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/padding.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/typography.css"
import store from "store"
import { BackBar } from "../components/common/BackBar"
import "../theme/variables.css"
import "./RecipeImagesScreen.css"
import { WhiteScreen } from "../components/common/WhiteScreen"

export interface IProps {
  className: string
}

export const RecipeImagesScreen = (props) => {
  const { recipeId } = props.match.params
  const recipe = store.get(recipeId)
  return (
    <WhiteScreen title='Recipe Images'>
      <div className='RecipeImagesScreen'>
        {/*  */}
        {recipe.featuredImages.map((featuredImage) => (
          <img src={featuredImage.file.url} className='recipeImage' />
        ))}
        <p className='SmallMutedText noMoreImagesText'>No more images to show. :(</p>
      </div>
    </WhiteScreen>
  )
}

RecipeImagesScreen.defaultProps = {
  className: ""
}
