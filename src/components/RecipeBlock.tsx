import * as React from "react"
import { IonItem } from "@ionic/react"

import "./RecipeBlock.css"
import { useHistory } from "react-router"
import classcat from "classcat"

export interface IProps {
  className: string
  featuredImage: any
  title: string
  id: string
  onClick: any
  wide: boolean
  name: string
}

export function RecipeBlock(props: IProps) {
  const className = classcat(["RecipeBlock", props.className, props.wide && "wide"])
  const history = useHistory()

  const routeToRecipe = (event: any) => {
    history.push(`/recipe/${props.id}`)
  }

  return (
    <div onClick={routeToRecipe} data-testid='RecipeBlock' className={className}>
      <div
        className='RecipeBlockFeaturedImage'
        style={{ backgroundImage: `url(${props.featuredImage.file.url})` }}
      ></div>
      <p className='RecipeBlockTitleText'>{props.name}</p>
      <div className='RecipeBlockInfoBadges'>
        <small className='MiniText'>KETO</small>
        <small className='MiniText'>EASY</small>
        <small className='MiniText'>QUICK</small>
      </div>
    </div>
  )
}

RecipeBlock.defaultProps = {
  className: "",
  featuredImage: "",
  title: "",
  id: ""
}
