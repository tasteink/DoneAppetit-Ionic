import React from "react"
import "./ExploreContainer.css"

interface ContainerProps {
  name: string
}

const DEV_RECIPES = [
  {
    title: "Great Gumbo Soup",
    featuredImage: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg"
  },
  {
    title: "Great Gumbo Soup",
    featuredImage: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg"
  },
  {
    title: "Great Gumbo Soup",
    featuredImage: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg"
  },
  {
    title: "Great Gumbo Soup",
    featuredImage: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg"
  },
  {
    title: "Great Gumbo Soup",
    featuredImage: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg"
  },
  {
    title: "Great Gumbo Soup",
    featuredImage: "https://pinchofyum.com/wp-content/uploads/Carrot-Soup-Recipe.jpg"
  }
]

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return <div className='ExploreContainer'></div>
}

export default ExploreContainer
