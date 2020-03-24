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
import { IonReactRouter } from "@ionic/react-router"
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
import { home, person, search } from "ionicons/icons"
import React from "react"
import { Redirect, Route } from "react-router-dom"
import store from "store"
import "./App.css"
import { BackBar } from "./components/common/BackBar"
import { HomeScreen } from "./pages/HomeScreen"
import { RecipeScreen } from "./pages/RecipeScreen"
import { SearchScreen } from "./pages/SearchScreen"
import Tab3 from "./pages/Tab3"
import { getRecipes } from "./services/contentful/getRecipes"
import "./theme/variables.css"
import { WhiteScreen } from "./components/common/WhiteScreen"
import { RecipeImagesScreen } from "./pages/RecipeImagesScreen"
import { RecipeBlock } from "./components/RecipeBlock"

const useRecipesQuery = (query) => {
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(() => {
    getRecipes(query).then((recipes) => {
      setRecipes(recipes)
    })
  }, [])

  return recipes
}

export const RecipeSearchResultsScreen = (props) => {
  const recipes = useRecipesQuery(window.location.search.substr(1))

  return (
    <WhiteScreen title='Search Results'>
      <div className='RecipeSearchResultsScreenResults'>
        {recipes.map((recipe: any) => (
          <div className='RecipeSearchResultsScreenRecipe'>
            <RecipeBlock wide {...recipe} />
          </div>
        ))}
      </div>
    </WhiteScreen>
  )
}

export const BrowseRecipesScreen = (props) => {
  return (
    <WhiteScreen title='Browse Recipes'>
      <div className='RecipeSearchResultsScreenResults' style={{ padding: "0px 16px" }}>
        <p className='SectionTitleText'>TODO</p>
        {[].map((recipe: any) => (
          <div className='RecipeSearchResultsScreenRecipe'>
            <RecipeBlock wide {...recipe} />
          </div>
        ))}
      </div>
    </WhiteScreen>
  )
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path='/recipe/:recipeId' exact component={RecipeScreen} />
          <Route path='/recipe/:recipeId/featuredImages' exact component={RecipeImagesScreen} />
          <Route path='/search/recipes' component={RecipeSearchResultsScreen} />
          <Route path='/home' component={HomeScreen} exact={true} />
          <Route path='/browse/:category' component={BrowseRecipesScreen} exact={true} />
          <Route path='/search' component={SearchScreen} exact={true} />
          <Route path='/user' component={Tab3} />
          <Route path='/' render={() => <Redirect to='/home' />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon color='var(--colorBrandBlack) !important' icon={home} />
            {/* <IonLabel>home</IonLabel> */}
          </IonTabButton>
          <IonTabButton tab='search' href='/search'>
            <IonIcon icon={search} />
            {/* <IonLabel>search</IonLabel> */}
          </IonTabButton>
          <IonTabButton tab='user' href='/user'>
            <IonIcon icon={person} />
            {/* <IonLabel>user</IonLabel> */}
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)

export default App
