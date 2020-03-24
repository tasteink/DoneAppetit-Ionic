import contentful from "../../utilities/contentful"

export const getRecipe = async (id) => {
  const query = {
    content_type: "recipe",
    "sys.id": id
  }

  try {
    const response = await contentful.getEntries(query)
    return formatResponse(response)
  } catch (error) {
    return error
  }
}

const formatResponse = (response) => {
  const item = response.items[0]
  return formatItem(item)
}

const formatItem = (item) => {
  const id = item.sys.id
  const fields = cleanFields(item.fields)

  return {
    ...fields,
    id
  }
}

const cleanFields = (fields) => {
  const featuredImagesList = fields.featuredImages || []
  const ingredientsList = fields.ingredients || []

  if (fields.featuredImages) {
    fields.featuredImages = fields.featuredImages.map((featuredImage) => {
      return formatItem(featuredImage)
    })

    fields.featuredImage = fields.featuredImages[0]
  }

  if (fields.ingredients) {
    fields.ingredients = ingredientsList.map((ingredient) => {
      return formatItem(ingredient)
    })
  }

  return fields
}

const getContentId = (content) => {
  return content.sys.id
}
