import * as React from "react"
import { IonContent, IonItem, IonPage, IonLabel, IonCheckbox, IonChip } from "@ionic/react"
import styled from "styled-components"

import "./RecipeScreen.css"
import store from "store"
import { Modal } from "../components/common/Modal"
import { Tag } from "../components/common/Tag"
import { BackBar } from "../components/common/BackBar"
import { getRecipe } from "../services/contentful/getRecipe"

export interface IProps {
  className: string
  history: any
  match: any
}

const useRecipe = (recipeId) => {
  const [recipe, setRecipe] = React.useState({})

  React.useEffect(() => {
    getRecipe(recipeId).then((recipe) => {
      setRecipe(recipe)
      store.set(recipeId, recipe)
    })
  }, [])

  return recipe
}

export function RecipeScreen(props: IProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const { recipeId } = props.match.params
  const recipe: any = useRecipe(recipeId)

  const routeToFeaturedImages = (event: any) => {
    props.history.push(`/recipe/${recipeId}/featuredImages`)
  }

  return (
    <div data-testid='RecipeScreen' className='RecipeScreen'>
      <IonPage data-testid='RecipeScreenContainer'>
        <IonContent className='AppScreen'>
          <BackBar useWhiteLink />
          <RecipeFeaturedImageBox onClick={routeToFeaturedImages} {...recipe} />
          <div className='RecipeScreeIntroContainer'>
            <p className='RecipeViewTitleText'>{recipe.name}</p>
            <p className='Text RecipeScreenShortDescription'>{recipe.shortDescription}</p>
            <div className='MainButtonContainer'>
              <button className='MainButton'>Plan This Meal</button>
            </div>
          </div>
          <RecipeContent>
            <p className='SectionTitleText' style={{ marginBottom: 16 }}>
              Ingredients
            </p>
            <Ingredients>
              <Ingredient>
                <p>Sliced Bread (Whole Wheat)</p>
                <p>4 slices</p>
              </Ingredient>
              <Ingredient>
                <p>Granulated Sugar</p>
                <p>12 cups</p>
              </Ingredient>
              <Ingredient>
                <p>Ground Cinnamon</p>
                <p>4 teaspoons</p>
              </Ingredient>
              <Ingredient>
                <p>Margarine</p>
                <p>all of it</p>
              </Ingredient>
            </Ingredients>

            <p className='SectionTitleText' style={{ marginBottom: 16 }}>
              Directions
            </p>
            <Ingredients>
              <p className='Text' style={{ marginBottom: 16 }}>
                1. First we want to get all of the ingredients and tools we will need and put them
                in a big black cauldron.
              </p>

              <p className='Text' style={{ marginBottom: 16 }}>
                2. Next, we want to set the cauldron ablaze with the hottest fire you can summon.
              </p>
              <p className='Text' style={{ marginBottom: 16 }}>
                3. When you hear the cauldron beep, its time to get cookin’. 😎
              </p>
            </Ingredients>
          </RecipeContent>
          {/* <Modal isOpen={isModalOpen}>
            {() => (
              <>
                <p>This is modal content</p>
                <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
              </>
            )}
          </Modal> */}
        </IonContent>
      </IonPage>
    </div>
  )
}

const RecipeFeaturedImageBox = (props) => {
  const totalTime = props.prepTime + props.cookTime

  return !props.featuredImage ? null : (
    <div
      className='RecipeFeaturedImageBox'
      onClick={props.onClick}
      style={{ backgroundImage: `url(${props.featuredImage.file.url})` }}
    >
      <div className='RecipeFeaturedImageBoxOverlay'>
        <div className='RecipeFeaturedImageBoxTags'>
          {props.difficulty < 2 && <Tag>EASY</Tag>}
          {totalTime < 30 && <Tag>QUICK</Tag>}
          {props.isKetoFriendly && <Tag>KETO</Tag>}
          <p className='BoldText'>{props.featuredImages.length} images</p>
        </div>
      </div>
    </div>
  )
}

RecipeScreen.defaultProps = {
  className: ""
}

const RecipeContent = styled.div`
  padding: 0 32px;
  display: flex;
  flex-direction: column;
`
const Ingredients = styled.div`
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`

const Ingredient = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`
