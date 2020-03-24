import firebase from "firebase"

import "firebase/firestore"
import "firebase/auth"

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAwbVSiJZmTltU1K0tC4J-XWP-niSmp8dU",
  authDomain: "rar-meal-planner.firebaseapp.com",
  databaseURL: "https://rar-meal-planner.firebaseio.com",
  projectId: "rar-meal-planner",
  storageBucket: "rar-meal-planner.appspot.com",
  messagingSenderId: "824290385368",
  appId: "1:824290385368:web:be52aa1bfbaaaa2bb166ad",
  measurementId: "G-65PN90J32W"
}

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export const BLANK_USER_DATA = {
  emailAddress: "",
  firstName: "",
  lastName: "",
  createdDate: "",
  updatedDate: "",
  bookmarkedRecipes: ""
}

export const auth = firebase.auth()
export const db = firebase.firestore()

export const collections = {
  users: db.collection("users")
}

const getDoc = (collection) => async (id) => {
  const doc = await collection.doc(id).get()
  return doc.exists ? doc.data() : undefined
}

const createDoc = (collection) => (data) => {
  return collection.add(data)
}

const updateDoc = (collection) => async (id, data) => {
  try {
    await collection.doc(id).set(data)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const subscribeToAll = (collection) => (options) => {
  collection.where(...options.query).onSnapshot((snapshot) => {
    const updatedData = snapshot.map((doc) => {
      const _id = doc.id
      const data = doc.data()
      return { _id, ...data }
    })

    options.handler(updatedData)
  })
}

const subscribeToOne = (collection) => (id, handler) => {
  collection.doc(id).onSnapshot((snapshot) => {
    handler(snapshot.data())
  })
}

export const createUser = createDoc(collections.users)
export const getUser = getDoc(collections.users)
export const updateUser = updateDoc(collections.users)
export const subscribeToUser = subscribeToOne(collections.users)
export const subscribeToUsers = subscribeToAll(collections.users)
