import React from "react"
import { IonContent, IonItem, IonPage, IonLabel, IonCheckbox, IonChip } from "@ionic/react"

import { Chip } from "../components/common/Chip"
import { Input } from "../components/common/Input"

import "./SearchScreen.css"
import classcat from "classcat"
import setValue from "set-value"
import queryString from "query-string"
import { BackBar } from "../components/common/BackBar"
import { Slider } from "../components/common/Slider"
import { WhiteScreen } from "../components/common/WhiteScreen"

export function Checkbox(props: any) {
  return (
    <IonItem>
      <IonLabel>Checked: {JSON.stringify(props.checked)}</IonLabel>
      <IonCheckbox
        checked={props.checked}
        onIonChange={(event) => props.onChange(event.detail.checked)}
      />
    </IonItem>
  )
}

const CHIPS = {
  recipeTypeOptions: {
    title: "Recipe Types",
    options: {
      breakfast: false,
      lunch: false,
      dinner: false,
      desert: false,
      snack: false,
      beverage: false
    }
  },
  recipeDifficultyOptions: {
    title: "Recipe Difficulties",
    options: {
      beginner: false,
      intermediate: false,
      advanced: false
    }
  },
  recipeDietaryTypeOptions: {
    title: "Recipe Plans",
    options: {
      keto: false,
      aip: false,
      whole30: false
    }
  },
  recipeTimeOptions: {
    title: "Total Time (Minutes)",
    type: "range",
    value: [0, 60 * 8],
    step: 5
  }
}

const TimeRange = (props: any) => {
  return (
    <Slider
      minimum={0}
      maximum={60 * 8}
      step={5}
      displayValue={getTimeDisplayValue(props.value)}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

const DEFAULT_CHIP_VALUES = {
  breakfast: false,
  lunch: false,
  dinner: false,
  desert: false,
  snack: false,
  beverage: false,
  beginner: false,
  intermediate: false,
  advanced: false,
  keto: false,
  aip: false,
  whole30: false
}

const CHIP_SECTIONS = {
  "Meal Types": ["breakfast", "lunch", "dinner", "desert", "snack", "beverage"],
  Difficulties: ["beginner", "intermediate", "advanced"],
  "Meal Plans": ["keto", "aip", "whole30"]
}

const getEndTimeDisplayValue = (value: number) => {
  const timeKind = value < 60 ? "minutes" : value < 120 ? "hour" : "hours"
  const number = value > 59 ? Number.parseFloat(String(value / 60)).toFixed(2) : value
  return `${number} ${timeKind}`
}

const getTimeDisplayValue = (timeState) => {
  return `between ${timeState[0]} minutes and ${getEndTimeDisplayValue(timeState[1])}`
}

export function SearchScreen(props: any) {
  const [searchValue, setSearchValue] = React.useState("")
  const [chipState, setChipState] = React.useState({ ...DEFAULT_CHIP_VALUES })
  const [timeState, setTimeState] = React.useState([0, 60 * 8])

  const onTimeRangeChange = (newValue) => {
    setTimeState(newValue)
  }

  const toggleChip = (name) => (isActive: boolean, event: any) => {
    const newState = setValue(chipState, name, isActive)
    setChipState({ ...newState })
  }

  const resetFilters = () => {
    setTimeState(() => [0, 60 * 8])
    setChipState({ ...DEFAULT_CHIP_VALUES })
  }

  const routeToSearch = () => {
    const query = queryString.stringify({
      searchValue,
      tags: chipState,
      time: timeState
    })

    console.log(query)
    props.history.push(`/search/recipes?${query}`)
  }

  return (
    <WhiteScreen title='Search Recipes'>
      <div className='filters'>
        <Input isDark value={searchValue} onChange={setSearchValue} placeholder='search terms' />
        <div style={{ width: "100%", height: 32 }}></div>
        <div className='filtersTitleRow'>
          <p className='SectionTitleText' style={{ margin: 0 }}>
            Filters
          </p>
          <p className='LinkText resetFiltersLink' onClick={resetFilters}>
            reset
          </p>
        </div>

        {Object.entries(CHIP_SECTIONS).map(([title, keys], index) => (
          <div className={`SearchScreenSection n${index}`}>
            <p className='SectionSubTitleText'>{title}</p>
            <div className='ChipGroup'>
              {keys.map((name) => (
                <Chip isActive={chipState[name]} onClick={toggleChip(name)}>
                  {name}
                </Chip>
              ))}
            </div>
          </div>
        ))}
        <div className='SearchScreenSection'>
          <p className='SectionSubTitleText'>Total Time</p>
          <TimeRange onChange={onTimeRangeChange} value={timeState} />
        </div>
      </div>
      <div className='MainButtonContainer'>
        <button className='MainButton' onClick={routeToSearch}>
          Search
        </button>
      </div>
    </WhiteScreen>
  )
}
