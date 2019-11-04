import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export default ProgressDot = ({
  index,
  userType
}) => {
  const width = userType ? '10%' : '20%';
  const showExtraDots = userType ? true : false;
  console.log(width);
  return (
    <View style={{ justifyContent: "center", flexDirection: "row", alignItems: 'center' }}>
    <Icon
        name="circle"
        type="font-awesome"
        color="black"
        size={50}
      />
      <View style={{ backgroundColor: 'white', width: width, height: 2 }}/>
      <Icon
        name="circle"
        type="font-awesome"
        color={index === '1' ? "white" : 'black'}
        size={50}
      />
      <View style={{ backgroundColor: 'white', width: width, height: 2 }}/>
      <Icon
        name="circle"
        type="font-awesome"
        color={index === '3' ? 'black' : 'white'}
        size={50}
      />
      <View style={{ backgroundColor: 'white', width: width, height: 2 }}/>
      <Icon
        name="circle"
        type="font-awesome"
        color={index === '4' ? 'black' : 'white'}
        size={50}
      />
      <View style={{ backgroundColor: 'white', width: width, height: 2 }}/>
      <Icon
        name="circle"
        type="font-awesome"
        color={index === '5' ? 'black' : 'white'}
        size={50}
      />
      </View>
  )
  };
