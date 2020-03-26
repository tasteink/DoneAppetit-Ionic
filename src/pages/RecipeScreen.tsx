import * as React from "react"
import {
  IonContent,
  IonItem,
  IonPage,
  IonLabel,
  IonCheckbox,
  IonChip
} from "@ionic/react"
import styled from "styled-components"

import "./RecipeScreen.css"
import store from "store"
import { Modal } from "../components/common/Modal"
import { Tag } from "../components/common/Tag"
import { BackBar } from "../components/common/BackBar"
import { getRecipe } from "../services/contentful/getRecipe"
import cookbook from "../cookbook.json"

export interface IProps {
  className: string
  history: any
  match: any
}

const useRecipe = (recipeId) => {
  const [recipe, setRecipe] = React.useState({})

  React.useEffect(() => {
    const recipe = cookbook.recipes.find((recipe) => recipe.id === recipeId)
    setRecipe({ ...recipe })
    store.set(recipeId, recipe)
    return

    getRecipe(recipeId).then((_recipe) => {
      // const recipe = cookbook.recipes.find((recipe) => recipe.id === recipeId)
      // setRecipe({ ...recipe })
      // store.set(recipeId, recipe)
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
            <p className='RecipeViewTitleText'>{recipe.title}</p>
            <p className='Text RecipeScreenShortDescription'>{recipe.note}</p>
            <div className='MainButtonContainer'>
              <button className='MainButton'>Plan This Meal</button>
            </div>
          </div>
          <RecipeContent>
            {recipe.ingredients && (
              <>
                <p className='SectionTitleText' style={{ marginBottom: 16 }}>
                  Ingredients
                </p>
                <Ingredients>
                  {recipe.ingredients.map((ingredient) => (
                    <Ingredient>
                      {ingredient.quantity} {ingredient.measurement}{" "}
                      {ingredient.ingredient} {ingredient.note}
                    </Ingredient>
                  ))}
                </Ingredients>
              </>
            )}

            {recipe.ingredients && (
              <>
                <p className='SectionTitleText' style={{ marginBottom: 16 }}>
                  Directions
                </p>
                <Ingredients>
                  {recipe.directions.map((step) => (
                    <p
                      className='Text'
                      style={{ textAlign: "left", marginBottom: 16 }}
                    >
                      {step}
                    </p>
                  ))}
                </Ingredients>
              </>
            )}
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
  // const totalTime = props.prepTime + props.cookTime

  return (
    <div
      className='RecipeFeaturedImageBox'
      onClick={props.onClick}
      style={{ backgroundImage: `url("${props.images[0]}")` }}
    >
      <div className='RecipeFeaturedImageBoxOverlay'>
        <div className='RecipeFeaturedImageBoxTags'>
          {props.difficulty < 2 && <Tag>EASY</Tag>}
          {/* {totalTime < 30 && <Tag>QUICK</Tag>} */}
          {props.isKetoFriendly && <Tag>KETO</Tag>}
          <p className='BoldText'>{props.images.length} images</p>
        </div>
      </div>
    </div>
  )
}

RecipeFeaturedImageBox.defaultProps = {
  images: []
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
