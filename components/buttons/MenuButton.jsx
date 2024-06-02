import { View, Text, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const MenuButton = ({
  disabled,
  size,
  containerStyles,
  handleClick
}) => {
  return (
    <View className="items-end">
      <TouchableOpacity className={`justify-center ${containerStyles}`} onPress={handleClick} disabled={disabled}>
        <Entypo name="dots-three-horizontal" size={size} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default MenuButton