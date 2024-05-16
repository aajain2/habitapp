import { View, Text } from 'react-native'
import React from 'react'
import HabitCard from './HabitCard'

const HabitSelector = ({
  selected,
  setSelected,
  habitOptions
}) => {
  const renderCards = (options) => options.map((option) => {
    return (
      <View key={option.id}>
        <HabitCard
          title={option.title}
          subtitle={option.subtitle}
          imageSource={option.imageSource}
          name={option.name}
          selected={selected}
          setSelected={setSelected}
          key={option.id}
        />
      </View>
    )
  })

  return (
    <View className="flex flex-col space-y-4">
      {renderCards(habitOptions)}
    </View>
  )
}

export default HabitSelector