import * as React from "react"
import { IonItem } from "@ionic/react"

import "./RecipeBlock.css"
import { useHistory } from "react-router"
import classcat from "classcat"
import Skeleton from "react-loading-skeleton"
import { Spacer } from "./common/Spacer"

export interface IProps {
  className: string
  featuredImage: any
  title: string
  id: string
  onClick: any
  wide: boolean
  name: string
  images: any
}

const LoadingTitle = () => {
  return (
    <>
      <Skeleton height={14} count={2} />
    </>
  )
}

const LoadingImage = () => {
  return (
    <>
      <Skeleton height={142} />
      <Spacer size='1px' />
    </>
  )
}

const LoadingTags = () => {
  return (
    <>
      <Skeleton width={30} height={12} />
      <Spacer size='8px' />
      <Skeleton width={30} height={12} />
      <Spacer size='8px' />
      <Skeleton width={30} height={12} />
    </>
  )
}

export function RecipeBlock(props: IProps) {
  const className = classcat(["RecipeBlock", props.className, props.wide && "wide"])
  const history = useHistory()
  const tags = props.title ? [1] : []

  const routeToRecipe = (event: any) => {
    history.push(`/recipe/${props.id}`)
  }

  return (
    <div onClick={routeToRecipe} data-testid='RecipeBlock' className={className}>
      {props.images.length ? (
        <div
          className='RecipeBlockFeaturedImage'
          data-url={`url(${props.images[0]})`}
          style={{ backgroundImage: `url("${props.images[0]}")` }}
        ></div>
      ) : (
        <LoadingImage />
      )}
      <p className='RecipeBlockTitleText'>{props.title || <LoadingTitle />}</p>
      <div className='RecipeBlockInfoBadges'>
        {tags.length ? (
          <>
            <small className='MiniText'>KETO</small>
            <small className='MiniText'>EASY</small>
            <small className='MiniText'>QUICK</small>
          </>
        ) : (
          <LoadingTags />
        )}
      </div>
    </div>
  )
}

RecipeBlock.defaultProps = {
  className: "",
  featuredImage: "",
  images: [],
  tags: [],
  title: "",
  id: ""
}
