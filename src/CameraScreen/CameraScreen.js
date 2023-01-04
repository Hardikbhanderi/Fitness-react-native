import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraBgImg from '../assets/Logo/cameraBgImg.png';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CompassHeading from 'react-native-compass-heading';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import RBSheet from 'react-native-raw-bottom-sheet';
import {verticalScale} from '../utils/helper';

const styles = StyleSheet.create({
  iconText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 15,
    marginTop: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  iconBg: {
    height: 40,
    width: 40,
    backgroundColor: 'rgba(0, 0, 0, .3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  activeIconBg: {
    height: 40,
    width: 40,
    backgroundColor: '#ccf3f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  allImg: {
    height: 50,
    width: 50,
  },
});

const degree_update_rate = 3;

export const CameraScreen = () => {
  const ref = useRef();
  const [flashMode, setFlashMode] = useState(false);
  const [compassRotation, setCompassRotation] = useState(0);
  const [selectedMediaMode, setSelectedMediaMode] = useState('photo');
  const [locationData, setLocationData] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(`Turn on Location Services to determine your location.`, '', [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ]);
    }

    return false;
  };

  const hasLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  }, []);

  const getLocation = useCallback(async () => {
    const hasPermission = await hasLocationPermission();
    console.log(`hasPermission`, hasPermission);
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        console.log(`position`, position);
        setLocationData(position);
      },
      () => {
        setLocationData(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        // enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
      },
    );
  }, [hasLocationPermission]);

  useEffect(() => {
    getLocation();

    CompassHeading.start(degree_update_rate, ({heading}) => {
      setCompassRotation(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, [getLocation]);

  const changeMediaMode = mode => {
    setSelectedMediaMode(mode);
  };

  const openMenu = () => {
    ref.current.open();
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground source={CameraBgImg} style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: verticalScale(80),
            backgroundColor: 'black',
            opacity: 0.8,
          }}>
          <View
            style={{
              marginTop:verticalScale(40),
              marginHorizontal: 25,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => setFlashMode(!flashMode)}>
              <MaterialIcon
                name={flashMode ? 'flash-off' : 'flash-on'}
                type="material"
                color="#fff"
                size={30}
                solid
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{marginHorizontal: 15}}>
                <MaterialCommunityIcon
                  name="rotate-3d-variant"
                  type="material-community"
                  color="#fff"
                  size={30}
                  solid
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal: 10}}>
                <MaterialIcon
                  name={'image'}
                  type="material"
                  color="#fff"
                  size={30}
                />
                <View
                  style={{
                    height: 25,
                    width: 25,
                    backgroundColor: 'red',
                    position: 'absolute',
                    right: -8,
                    top: -8,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#fff', fontWeight: '900'}}>1</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'flex-end', marginRight: 12}}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity style={styles.iconBg}>
              <Ionicons
                name="md-checkmark-circle"
                color="rgb(113,209,133)"
                size={40}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>Protection</Text>
            <TouchableOpacity
              style={activeIcon === 1 ? styles.activeIconBg : styles.iconBg}
              onPress={() => setActiveIcon(1)}>
              <SimpleLineIcon
                name="lock"
                color="white"
                height="50"
                width="50"
                size={21}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>Location</Text>
            <TouchableOpacity
              style={activeIcon === 2 ? styles.activeIconBg : styles.iconBg}
              onPress={() => setActiveIcon(2)}>
              <SimpleLineIcon
                name="location-pin"
                color="white"
                height="50"
                width="50"
                size={21}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>Time</Text>
            <TouchableOpacity
              style={activeIcon === 3 ? styles.activeIconBg : styles.iconBg}
              onPress={() => setActiveIcon(3)}>
              <MaterialIcons
                name="access-time"
                color="white"
                height="50"
                width="50"
                size={21}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>Phone</Text>
            <TouchableOpacity
              style={activeIcon === 4 ? styles.activeIconBg : styles.iconBg}
              onPress={() => setActiveIcon(4)}>
              <MaterialIcons
                name="access-time"
                color="white"
                height="50"
                width="50"
                size={21}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>Sound</Text>
            <TouchableOpacity
              style={activeIcon === 5 ? styles.activeIconBg : styles.iconBg}
              onPress={() => setActiveIcon(5)}>
              <MaterialIcons
                name="phone-android"
                color="white"
                height="50"
                width="50"
                size={21}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>Network</Text>
            <TouchableOpacity
              style={activeIcon === 6 ? styles.activeIconBg : styles.iconBg}
              onPress={() => setActiveIcon(6)}>
              <EntypoIcon
                name="network"
                color="white"
                height="50"
                width="50"
                size={21}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>Blockchain</Text>
            <TouchableOpacity
              style={activeIcon === 7 ? styles.activeIconBg : styles.iconBg}
              onPress={() => setActiveIcon(7)}>
              <MaterialCommunityIcons
                name="spider-web"
                color="white"
                height="50"
                width="50"
                size={21}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              maxWidth: '100%',
              marginLeft: 130,
              marginRight: 50,
            }}>
            <View>
              <TouchableOpacity onPress={() => changeMediaMode('photo')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: selectedMediaMode === 'photo' ? '800' : '400',
                  }}>
                  Photo
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => changeMediaMode('video')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: selectedMediaMode === 'video' ? '800' : '400',
                  }}>
                  Video
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
              marginHorizontal: 20,
            }}>
            <View>
              <TouchableOpacity onPress={() => openMenu()}>
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../assets/Logo/Thumbnail.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}></View>
              </TouchableOpacity>
            </View>
            <View>
              <Image
                style={{width: 60, height: 60, opacity: 0.5}}
                source={require('../assets/Logo/AppHalfLogo.png')}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'red',
            width: '100%',
          }}>
          <View
            style={{
              minHeight: '15%',
              backgroundColor: 'black',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginTop: 15,
              }}>
              <View>
                <Image
                  style={[
                    styles.allImg,
                    {transform: [{rotate: `${360 - compassRotation}deg`}]},
                  ]}
                  source={require('../assets/Logo/Compass.png')}
                />
              </View>
              <View>
                <Image
                  style={styles.allImg}
                  source={require('../assets/Logo/Globe.png')}
                />
              </View>
              <View>
                <Image
                  style={styles.allImg}
                  source={require('../assets/Logo/Clock.png')}
                />
              </View>
              <View>
                <Image
                  style={styles.allImg}
                  source={require('../assets/Logo/FlipCamera.png')}
                />
              </View>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
              <Image
                style={{
                  width: 350,
                  height: 25,
                  resizeMode: 'stretch',
                }}
                source={require('../assets/Logo/BottomWave.png')}
              />
            </View>
          </View>
        </View>

        <RBSheet
          ref={ref}
          animationType="slide"
          closeOnPressBack={true}
          height={700}
          customStyles={{
            container: styles.rbSheetContainer,
            draggableIcon: styles.iconStyle,
          }}>
          <View style={styles.bottomContainerView}>
            <View style={styles.topLine} />
            <View style={styles.headerView}>
              <View style={styles.detailWrapper}>
                <Text style={styles.headerText}>Untitled</Text>
                <Text style={styles.linkText}>
                  {'http://www.deeptruth.com/johnjjohnson/un'}
                </Text>
              </View>
            </View>

            {/* <BottomSheetDialog /> */}
          </View>
        </RBSheet>
      </ImageBackground>
    </View>
  );
};
