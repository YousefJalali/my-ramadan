import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Magnetometer } from 'expo-sensors'

export default function Compass() {
  const [magnetometer, setMagnetometer] = useState<number | null>(null)

  useEffect(() => {
    const subscription = Magnetometer.addListener((data) => {
      const { x, y } = data
      // let angle = Math.atan2(y, x) * (180 / Math.PI)
      // angle = angle >= 0 ? angle : angle + 360
      let angle = Math.atan2(y, x)
      angle = angle * (180 / Math.PI)
      angle = angle + 90
      angle = (angle + 360) % 360
      setMagnetometer(angle)
    })

    Magnetometer.setUpdateInterval(600)

    return () => subscription.remove()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Heading: {magnetometer?.toFixed(2)}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
})

// import React, { useState, useEffect } from 'react'
// import {
//   Image,
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
//   EventSubscription,
// } from 'react-native'
// import {
//   Magnetometer,
//   MagnetometerMeasurement,
//   MagnetometerUncalibrated,
// } from 'expo-sensors'
// import { Center } from './ui/center'
// import { HStack } from './ui/hstack'
// import { VStack } from './ui/vstack'

// const { height, width } = Dimensions.get('window')

// export default function Qibla() {
//   const [{ x, y, z }, setData] = useState({
//     x: 0,
//     y: 0,
//     z: 0,
//   })
//   const [subscription, setSubscription] = useState<EventSubscription | null>(
//     null
//   )
//   const [magnetometer, setMagnetometer] = useState<number>(0)

//   useEffect(() => {
//     _toggle()
//     return () => {
//       _unsubscribe()
//     }
//   }, [])

//   const _toggle = () => {
//     if (subscription) {
//       _unsubscribe()
//     } else {
//       _subscribe()
//     }
//   }

//   const _subscribe = () => {
//     setSubscription(
//       //@ts-ignore
//       Magnetometer.addListener((data) => {
//         setMagnetometer(_angle(data))
//       })
//     )
//     Magnetometer.setUpdateInterval(200)
//   }

//   const _unsubscribe = () => {
//     subscription && subscription.remove()
//     setSubscription(null)
//   }

//   const _angle = (magnetometer: MagnetometerMeasurement) => {
//     if (!magnetometer) return

//     let { x, y, z } = magnetometer

//     let angle = Math.atan2(y, x)
//     angle = angle * (180 / Math.PI)
//     angle = angle + 90
//     angle = (angle + 360) % 360

//     // let angle = 0
//     // if (magnetometer) {
//     //   let { x, y, z } = magnetometer
//     //   if (Math.atan2(y, x) >= 0) {
//     //     angle = Math.atan2(y, x) * (180 / Math.PI)
//     //   } else {
//     //     angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI)
//     //   }
//     // }
//     return Math.round(angle)
//   }

//   const _direction = (degree: number) => {
//     if (degree >= 22.5 && degree < 67.5) {
//       return 'NE'
//     } else if (degree >= 67.5 && degree < 112.5) {
//       return 'E'
//     } else if (degree >= 112.5 && degree < 157.5) {
//       return 'SE'
//     } else if (degree >= 157.5 && degree < 202.5) {
//       return 'S'
//     } else if (degree >= 202.5 && degree < 247.5) {
//       return 'SW'
//     } else if (degree >= 247.5 && degree < 292.5) {
//       return 'W'
//     } else if (degree >= 292.5 && degree < 337.5) {
//       return 'NW'
//     } else {
//       return 'N'
//     }
//   }

//   // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
//   const _degree = (magnetometer: number) => {
//     return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Magnetometer:</Text>
//       <Text style={styles.text}>x: {x}</Text>
//       <Text style={styles.text}>y: {y}</Text>
//       <Text style={styles.text}>z: {z}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={subscription ? _unsubscribe : _subscribe}
//           style={styles.button}
//         >
//           <Text>{subscription ? 'On' : 'Off'}</Text>
//         </TouchableOpacity>
//         {/* <TouchableOpacity
//           onPress={_slow}
//           style={[styles.button, styles.middleButton]}
//         >
//           <Text>Slow</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={_fast} style={styles.button}>
//           <Text>Fast</Text>
//         </TouchableOpacity> */}
//         {/* <Text>{_angle}</Text> */}
//       </View>

//       <Center style={{ backgroundColor: 'black' }}>
//         <HStack style={{ alignItems: 'center' }}>
//           <VStack style={{ alignItems: 'center' }}>
//             <Text
//               style={{
//                 color: '#fff',
//                 fontSize: height / 26,
//                 fontWeight: 'bold',
//               }}
//             >
//               {_direction(_degree(magnetometer))}
//             </Text>
//           </VStack>
//         </HStack>

//         <HStack style={{ alignItems: 'center' }}>
//           <VStack style={{ alignItems: 'center' }}>
//             <View
//               style={{
//                 position: 'absolute',
//                 width: width,
//                 alignItems: 'center',
//                 top: 0,
//               }}
//             >
//               <Image
//                 source={require('../assets/images/compass_pointer.png')}
//                 style={{
//                   height: height / 26,
//                   resizeMode: 'contain',
//                 }}
//               />
//             </View>
//           </VStack>
//         </HStack>

//         <HStack style={{ alignItems: 'center' }}>
//           <Text
//             style={{
//               color: '#fff',
//               fontSize: height / 27,
//               width: width,
//               position: 'absolute',
//               textAlign: 'center',
//             }}
//           >
//             {_degree(magnetometer)}°
//           </Text>

//           <VStack style={{ alignItems: 'center' }}>
//             <Image
//               source={require('../assets/images/compass_bg.png')}
//               style={{
//                 height: width - 80,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 resizeMode: 'contain',
//                 transform: [{ rotate: magnetometer + 'deg' }],
//               }}
//             />
//           </VStack>
//         </HStack>

//         <HStack style={{ alignItems: 'center' }}>
//           <VStack style={{ alignItems: 'center' }}>
//             <Text style={{ color: '#fff' }}>Copyright @RahulHaque</Text>
//           </VStack>
//         </HStack>
//       </Center>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   text: {
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'stretch',
//     marginTop: 15,
//   },
//   button: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     padding: 10,
//   },
//   middleButton: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: '#ccc',
//   },
// })
