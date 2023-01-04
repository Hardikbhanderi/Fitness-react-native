import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from "react-native-vector-icons/FontAwesome5";

const styles = StyleSheet.create({
  leftArrow: {
    width: 20,
    height: 18,
    marginTop: 20,
    marginLeft: 30,
  },
  mainLogo: {
    width: 120,
    height: 120,
    alignItems: 'center',
  },
  Header: {
    color: 'rgb(118,118,118)',
    fontSize: 22,
    marginTop: 20,
  },
});

export const VerifyEmail = ({navigation}) => {
  const [confirmEmail, setConfirmEmail] = useState(false);

  useState(() => {
    setTimeout(() => {
      setConfirmEmail(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (confirmEmail)
      setTimeout(() => {
        navigation.navigate('CameraScreen');
      }, 3000);
  }, [confirmEmail]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{
          backgroundColor: 'rgb(20,20,20)',
          height: '100%',
          width: '100%',
        }}>
        <View></View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/Logo/LeftArrow.png')}
              style={styles.leftArrow}
            />
          </TouchableOpacity>

          <View style={{marginTop: 30, alignItems: 'center'}}>
            <Image
              source={require('../assets/Logo/Group933.png')}
              style={styles.mainLogo}
            />
            <Text style={styles.Header}>Sign Up</Text>
          </View>
          <View style={{marginHorizontal: 58, marginTop: 60}}>
            <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
              To Continue, please check your email for a confirmation link.
            </Text>
          </View>
        </View>
      </SafeAreaView>
      {confirmEmail && (
        <View
          style={{
            height: '100%',
            width: '100%',
            flex: 1,
            top: 0,
            position: 'absolute',
            zIndex: 10,
            backgroundColor: 'rgb(4,4,4)',
            opacity: 0.8,
            alignItems: 'center',
            elevation: 5,
          }}>
          <View
            style={{
              borderColor: '#3db2d0',
              borderWidth: 8,
              height: 100,
              width: 100,
              marginTop: 300,
              borderRadius: 50,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 16,
              }}>
              <FontAwesome5 name={'check'} solid color="#fff" size={50} />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
              Email Confirmed!
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
