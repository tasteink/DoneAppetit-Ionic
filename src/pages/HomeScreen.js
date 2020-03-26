import * as React from "react"

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { HorizontalRecipeList } from "../components/HorizontalRecipeList"
import { CSSGrid, layout } from "react-stonecutter"
import { SpringGrid, measureItems, makeResponsive } from "react-stonecutter"
import StackGrid from "react-stack-grid"
import "./HomeScreen.css"
import { RecipeBlock } from "../components/RecipeBlock"
import styled from "styled-components"
import { Spacer } from "../components/common/Spacer"
import Skeleton from "react-loading-skeleton"

import cookbook from "../cookbook.json"

const RecipesGrid = styled.div`
  margin: 0 16px;
  columns: 2;
  column-gap: 16px;
  column-fill: balance;
  height: fit-content;

  .recipesGridRecipe {
    break-inside: avoid;
    margin-bottom: 24px;
  }
`

const IntroSection = styled.section`
  width: 100%;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
`

const EMPTY_ARRAY_10 = Array(10).fill({})

const useCuratedRecipes = () => {
  const [recipes, setRecipes] = React.useState(EMPTY_ARRAY_10)

  React.useEffect(() => {
    setTimeout(() => {
      setRecipes(cookbook.recipes)
    }, 1750)
  }, [])

  return recipes
}

export const HomeScreen = (props) => {
  const recipes = useCuratedRecipes()

  return (
    <IonPage data-testid='HomeScreen' className='HomeScreen'>
      <IonContent className='AppScreen'>
        <IntroSection>
          <p className='welcomeName'>Feed</p>
          <Spacer size='4px' />
          <p className='welcomeText'>
            Curated recipes,
            <br />
            just for you.
          </p>
        </IntroSection>

        <RecipesGrid
          appearDelay={100}
          monitorImagesLoaded
          columnWidth='50%'
          gutterHeight={24}
          gutterWidth={16}
        >
          {recipes.map((recipe) => (
            <RecipeBlock
              {...recipe}
              className='recipesGridRecipe'
              key={recipe.title}
            />
          ))}
        </RecipesGrid>
        {/* <div className='featuredRecipes'>
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
        </div> */}
      </IonContent>
    </IonPage>
  )
}

HomeScreen.defaultProps = {
  className: ""
}
