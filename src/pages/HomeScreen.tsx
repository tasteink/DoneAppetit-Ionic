import * as React from "react"

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { HorizontalRecipeList } from "../components/HorizontalRecipeList"
import "./HomeScreen.css"

const DEV_RECIPES = [
  {
    name: "Prolly the tastiest looking french in the world by far",
    uid: 0,
    id: "3MspMp3Xry4Hy43NMXn4ZD",
    featuredImage: {
      file: { url: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg" }
    }
  },
  {
    name: "Super-duper grreat beef stew kabobs by Martha Stewart",
    uid: 1,
    id: "3MspMp3Xry4Hy43NMXn4ZD",
    featuredImage: {
      file: { url: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg" }
    }
  },
  {
    name: "Home made Burger King hamburger with a twist",
    uid: 2,
    id: "3MspMp3Xry4Hy43NMXn4ZD",
    featuredImage: {
      file: { url: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg" }
    }
  },
  {
    name: "Great Gumbo Soup",
    uid: 3,
    id: "3MspMp3Xry4Hy43NMXn4ZD",
    featuredImage: {
      file: { url: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg" }
    }
  },
  {
    name: "Great Gumbo Soup",
    uid: 4,
    id: "3MspMp3Xry4Hy43NMXn4ZD",
    featuredImage: {
      file: { url: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg" }
    }
  },
  {
    name: "Great Gumbo Soup",
    uid: 5,
    id: "3MspMp3Xry4Hy43NMXn4ZD",
    featuredImage: {
      file: { url: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg" }
    }
  }
]

export interface IProps {
  className: string
  history: any
}

export function HomeScreen(props: IProps) {
  return (
    <IonPage data-testid='HomeScreen' className='HomeScreen'>
      <IonContent className='AppScreen'>
        {/* <div className='search'></div> */}
        <div className='intro'>
          <p className='welcomeText'>Welcome back,</p>
          <p className='welcomeName'>Andy Dufresne</p>
        </div>
        <div className='featuredRecipes'>
          <HorizontalRecipeList
            history={props.history}
            title='🔥 Popular Recipes'
            recipes={DEV_RECIPES}
          />
          <HorizontalRecipeList
            history={props.history}
            title='🍖 Back Yard BBQ'
            recipes={DEV_RECIPES}
          />
          <HorizontalRecipeList
            history={props.history}
            title='💞 Leftover Love'
            recipes={DEV_RECIPES}
          />
          <HorizontalRecipeList
            history={props.history}
            title='🦐 Cook With Shrimp'
            recipes={DEV_RECIPES}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

HomeScreen.defaultProps = {
  className: ""
}
