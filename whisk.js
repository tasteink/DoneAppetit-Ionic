const fetch = require("node-fetch")

const WHISK_TOKEN =
  "0u9EXvThb0620XZZMrVEVucomEC5g6GEZnk5oWBxeHFJC71OANH5i8JOTwzgoP69"

const getWhiskToken = async () => {
  const request = await fetch("https://graph.whisk.com/auth/anonymous/create", {
    headers: {
      Accept: "application/json",
      ContentType: `application/json`
    }
  })

  const json = await request.json()
  console.log("token response", json)
  return json.access_token
}

const getRecipes = async () => {
  // const token = await getWhiskToken()
  const request = await fetch(
    "https://graph.whisk.com/v1/search?q=sandwich&type=recipe&includeIngredients=bread,meat",
    {
      headers: {
        Accept: "application/json",
        Authorization: `${WHISK_TOKEN}`
      }
    }
  )

  console.log(request)

  const json = await request.json()
  console.log(json)
}

;(async () => {
  try {
    const recipes = getRecipes()
  } catch (error) {
    console.log(error)
  }
})()
