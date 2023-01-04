import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingViewBase,
  KeyboardAvoidingViewComponent,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './style.js';
import {ScrollView} from 'react-native-gesture-handler';

const Home = ({navigation, scroll}) => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  function validateEmail(emailAddress) {
    var re = /\S+@\S+\.\S+/;
    return re.test(emailAddress);
  }

  const handleEmail = text => {
    setEmail(text);
    if (text) {
      if (validateEmail(text)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    }
  };
  const verifyEmail = () => {
    if (validEmail) navigation.navigate('VerifyEmail');
  };

  const goToFit = () => {
    navigation.navigate('FitnessScreen');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
      }}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <SafeAreaView
        style={{
          backgroundColor: 'rgb(20,20,20)',
          width: '100%',
          height: '100%',
        }}>
        <Image
          source={require('../assets/Logo/LeftArrow.png')}
          style={{width: 20, height: 18, marginTop: 20, marginLeft: 50}}
        />
        <TouchableOpacity onPress={goToFit}>
          <View
            style={{
              marginLeft: 310,
              marginTop: -15,
              width: 100,
            }}>
            <Text style={{color: 'white'}}>Go to Fit</Text>
          </View>
        </TouchableOpacity>

        <View style={{alignItems: 'center', marginTop: 80}}>
          <View>
            <Image
              style={styles.logo}
              source={require('../assets/Logo/Group933.png')}
            />
          </View>
          <View>
            <Text style={styles.Header}>Sign Up</Text>
          </View>
        </View>
        <View style={{marginTop: 50}}>
          <View style={{marginHorizontal: 30}}>
            {/* <TextInput
            style={{borderBottomColor: 'white', borderBottomWidth: 2}}
            placeholder="Enter Email"
          /> */}
            <TextInput
              label="Email"
              activeUnderlineColor="white"
              underlineColor="grey"
              value={email}
              placeholderTextColor="green"
              labelColor="white"
              onChangeText={text => handleEmail(text)}
              theme={{
                colors: {
                  placeholder: 'white',
                  text: 'white',
                },
              }}
              style={{
                height: 50,
                width: '100%',
                backgroundColor: 'rgb(20,20,20)',
              }}
            />
            <View
              style={{
                alignItems: 'center',
                paddingTop: 10,
                marginHorizontal: 2,
              }}>
              <Text style={{color: 'white', fontWeight: '400', fontSize: 16}}>
                By Continuing, you agree to DeepTruth's{' '}
                <Text style={styles.linkText}>Terms of Service</Text> and
                confirm that you have reed DeepTruth's{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <TouchableOpacity
                onPress={verifyEmail}
                style={{
                  height: 50,
                  borderColor: 'white',
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: validEmail ? 'blue' : 'transparent',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '800',
                  }}>
                  Send Mail
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
