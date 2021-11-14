import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  Platform,
} from 'react-native';

import Animated from 'react-native-reanimated';

import {Icon} from 'react-native-elements';

const images = [
  {id: 1, uri: require('./assets/img/pexels-andy-vu-3244513.jpg')},
  {id: 2, uri: require('./assets/img/pexels-frans-van-heerden-624015.jpg')},
  {id: 3, uri: require('./assets/img/pexels-ian-beckley-2440061.jpg')},
  {id: 4, uri: require('./assets/img/pexels-jeremy-bishop-3464632.jpg')},
  {id: 5, uri: require('./assets/img/pexels-s-migaj-1402850.jpg')},
  {id: 6, uri: require('./assets/img/pexels-sam-kolder-2387873.jpg')},
];

const HEADER_HEIGHT = Platform.OS == 'ios' ? 100 : 70 + StatusBar.currentHeight;
const scrollY = new Animated.Value(0);
const diffClampScrollHeight = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
const headerY = Animated.interpolateNode(diffClampScrollHeight, {
  inputRange: [0, HEADER_HEIGHT],
  outputRange: [0, -HEADER_HEIGHT],
});

class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            height: HEADER_HEIGHT,
            backgroundColor: '#4B5320',
            zIndex: 1000,
            elevation: 1000,
            transform: [{translateY: headerY}],
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingTop: 25,
            flexDirection: 'row',
          }}>
          <Icon
            name={'arrow-back'}
            type="ionicon"
            fontSize={24}
            color={'white'}
          />
          <Text style={{fontSize: 22, color: 'white'}}>Nature Photos</Text>

          <Icon
            name={'ellipsis-vertical'}
            type="ionicon"
            fontSize={24}
            color={'white'}
          />
        </Animated.View>
        <Animated.ScrollView
          bounces={false}
          scrollEventThrottle={16}
          style={{paddingTop: HEADER_HEIGHT - 30}}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollY}}},
          ])}>
          {images.map(image => (
            <View
              key={image.id}
              style={{height: 400, margin: 20, borderRadius: 20}}>
              <Image
                source={image.uri}
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  borderRadius: 20,
                }}></Image>
            </View>
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
