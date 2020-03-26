// const recipeScraper = require("recipe-scraper")
// const puppeteer = require("puppeteer")
// const fs = require("fs")

// const prepareProductsPage = async (context) => {
//   const selectors = {
//     productLinks: ".entry-featured-image-url"
//   }

//   const getProductLinkElements = async () => {
//     return await context.page.$$(selectors.productLinks)
//   }

//   const getProductHref = async (productLinkElement) => {
//     return await productLinkElement.evaluate((node) => node.getAttribute("href"))
//   }

//   const getProductsHrefs = async () => {
//     const productLinkElements = await getProductLinkElements()
//     return await Promise.all(productLinkElements.map(getProductHref))
//   }

//   return {
//     selectors,
//     getProductLinkElements,
//     getProductHref,
//     getProductsHrefs
//   }
// }

// // const prepareProductPage = async (context) => {
// //   const selectors = {
// //     tastyImage: ".et_pb_slide",
// //     productTitle: ".et_pb_slide_title",
// //     productImage: "body .et_pb_image_wrap:first-of-type img",
// //     nutritionFactsImage: "body .et_pb_image_wrap:last-of-type img",
// //     ingredientsText: ".et-last-child h4",
// //     productDescription: "body p:first-of-type"
// //   }

// //   const getProductTitle = async () => {
// //     const element = await context.page.$(selectors.productTitle)
// //     return await element.evaluate((node) => node.innerText)
// //   }

// //   const getTastyImage = async () => {
// //     const element = await context.page.$(selectors.tastyImage)

// //     return await element.evaluate((node) => {
// //       const computedStyle = window.getComputedStyle(node)
// //       const backgroundImageValue = computedStyle.getPropertyValue("background-image")
// //       return backgroundImageValue.replace('url("', "").replace('")', "")
// //     })
// //   }

// //   const getProductImage = async () => {
// //     const element = await context.page.$(selectors.productImage)
// //     return await element.evaluate((node) => node.getAttribute("src"))
// //   }

// //   const getNutritionFactsImage = async () => {
// //     const element = await context.page.$(selectors.nutritionFactsImage)
// //     return await element.evaluate((node) => node.getAttribute("src"))
// //   }

// //   const getIngredientsText = async () => {
// //     const element = await context.page.$(selectors.ingredientsText)
// //     return await element.evaluate((node) => node.innerText)
// //   }

// //   const getProductDescription = async () => {
// //     const element = await context.page.$(selectors.productDescription)
// //     return await element.evaluate((node) => node.innerText)
// //   }

// //   return {
// //     selectors,
// //     getProductTitle,
// //     getTastyImage,
// //     getProductImage,
// //     getNutritionFactsImage,
// //     getIngredientsText,
// //     getProductDescription
// //   }
// // }

// const STARTING_URL = "https://pedersonsfarms.com/products/"

// const main = async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()
//   const context = { browser, page }
//   await page.goto(STARTING_URL)

//   const productsPage = await prepareProductsPage(context)
//   const productHrefs = await productsPage.getProductsHrefs()

//   const products = []

//   for (const productHref of productHrefs) {
//     await page.goto(productHref)
//     // const context = { page, browser }

//     const productPage = await prepareProductPage(context)
//     const productTitle = await productPage.getProductTitle()
//     const tastyImage = await productPage.getTastyImage()
//     const productImage = await productPage.getProductImage()
//     const nutritionFactsImage = await productPage.getNutritionFactsImage()
//     const ingredientsText = await productPage.getIngredientsText()
//     const productDescription = await productPage.getProductDescription()

//     const product = {
//       productTitle,
//       tastyImage,
//       productImage,
//       nutritionFactsImage,
//       ingredientsText,
//       productDescription
//     }

//     console.log(product)
//     products.push(product)
//   }

//   fs.writeFileSync("./products.json", JSON.stringify({ products }, null, 2), "utf8")

//   await browser.close()
// }

// main()

// const asyncMap = async (target, handler) => {
//   return new Promise((resolve) => {
//     const final = target.map(handler)
//     resolve(Promise.all(final))
//   })
// }

const recipeScraper = require("recipe-scraper")
const puppeteer = require("puppeteer")
const fs = require("fs")

const prepareRecipePage = async (context) => {
  const selectors = {
    title: ".recipe-title > h1",
    image: ".recipe-media .recipe-image__img",
    directionsStep: ".recipe-directions__step",
    ingredient: ".recipe-ingredients__ingredient",
    note: ".recipe-contributor__note"
  }

  const getImageSrc = async (image) => {
    return await image.evaluate((node) => node.getAttribute("src"))
  }

  const getInnerText = (element) => {
    return element.innerText
  }

  const getIngredient = async (node) => {
    return await node.evaluate((div) => {
      const quantitySelector = ".recipe-ingredients__ingredient-quantity"
      const partsSelector = "span.recipe-ingredients__ingredient-part"
      const quantity = div.querySelector(quantitySelector).innerText
      const parts = Array.from(div.querySelectorAll(partsSelector)).map((x) =>
        x.innerText.trim().replace(/^, /, "")
      )

      const ingredient = { quantity }

      if (parts.length === 1) {
        // ingredient.measurement = parts[0]
        ingredient.ingredient = parts[0]
      }

      if (parts.length === 2) {
        ingredient.measurement = parts[0]
        ingredient.ingredient = parts[1]
      }

      if (parts.length === 3) {
        ingredient.measurement = parts[0]
        ingredient.ingredient = parts[1]
        ingredient.note = parts[2]
      }

      return ingredient
    })
  }

  const getTitle = async () => {
    return await context.page.$eval(selectors.title, getInnerText)
  }

  const getImages = async () => {
    const images = await context.page.$$(selectors.image)
    return await Promise.all(
      images.map((image) => image.evaluate((node) => node.getAttribute("data-src")))
    )
  }

  const getDirections = async () => {
    const steps = await context.page.$$(selectors.directionsStep)
    return await Promise.all(
      steps.map((step) => step.evaluate((node) => node.innerText))
    )
  }

  const getIngredients = async () => {
    const elements = await context.page.$$(selectors.ingredient)
    return await Promise.all(elements.map(getIngredient))
  }

  const getNote = async () => {
    return await context.page.$eval(selectors.note, getInnerText)
  }

  return {
    selectors,
    getTitle,
    getImages,
    getDirections,
    getIngredients,
    getNote
  }
}

const scrapeRecipe = async (browser, page, url) => {
  await page.goto(url)
  await page.mainFrame()
  await page.waitFor(500)
  await page.waitFor(".recipe-layout__show-more-link")
  const showFullRecipeButton = await page.$(".recipe-layout__show-more-link")
  await showFullRecipeButton.click()
  const context = { browser, page }
  const recipePage = await prepareRecipePage(context)
  await page.waitForSelector(recipePage.selectors.image)

  // console.log(recipePage)
  // await browser.close()
  // return null

  const title = await recipePage.getTitle()
  const images = await recipePage.getImages()
  const directions = await recipePage.getDirections()
  const ingredients = await recipePage.getIngredients()
  const note = await recipePage.getNote()

  const recipe = {
    title,
    images,
    directions,
    ingredients,
    note
  }

  // const cookbook = fs.readFileSync('./recipes.json', 'utf8')
  const cookbook = require("./cookbook.json")
  cookbook.recipes.push(recipe)
  fs.writeFileSync("./cookbook.json", JSON.stringify(cookbook, null, 2), "utf8")
}

;(async () => {
  const browser = await puppeteer.launch({ headless: true })

  const urls = [
    // "https://www.food.com/recipe/wendys-frosty-67566"
    // "https://www.food.com/recipe/simply-sour-cream-chicken-enchiladas-129926"
    // "https://www.food.com/recipe/butterfinger-pie-29478",
    // "https://www.food.com/recipe/paula-deen-crock-pot-macaroni-and-cheese-257276"
  ]

  for (const url of urls) {
    const page = await browser.newPage()
    await page.goto(url)

    await scrapeRecipe(browser, page, url)
  }

  await browser.close()
})()
