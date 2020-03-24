import React from "react"
import { IonList } from "@ionic/react"
import { camelCase } from "camel-case"
import { useHistory } from "react-router"
import { RecipeBlock } from "./RecipeBlock"

import "./HorizontalRecipeList.css"

interface IProps {
  title: string
  recipes: any[]
  history: any
}

export function HorizontalRecipeList(props: IProps) {
  const history = useHistory()

  const goToBrowse = () => {
    history.push(`/browse/${camelCase(props.title)}`)
  }

  return (
    <div className='HorizontalRecipeList'>
      <div className='listTitleRow'>
        <p className='SectionTitleText'>{props.title}</p>
        <a className='LinkText seeMoreLink' onClick={goToBrowse}>
          see more
        </a>
      </div>
      <div className='list'>
        {props.recipes.map((recipe) => (
          <RecipeBlock {...recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  )
}
