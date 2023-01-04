import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GoogleFit, {Scopes} from 'react-native-google-fit';

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
    Scopes.FITNESS_HEART_RATE_READ,
    Scopes.FITNESS_HEART_RATE_WRITE,
    Scopes.FITNESS_BLOOD_PRESSURE_READ,
    Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
    Scopes.FITNESS_BLOOD_GLUCOSE_READ,
    Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
  ],
};

var today = new Date();
var lastWeekDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 6,
);
const opt = {
  startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
  endDate: today.toISOString(),
  unit: 'kg', // required; default 'kg'
  bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 1, // optional - default 1.
  ascending: false, // optional; default false
};

const heightOpt = {
  startDate: '2017-01-01T00:00:17.971Z', // required
  endDate: new Date().toISOString(), // required
};

const heartOpt = {
  startDate: '2017-01-01T00:00:17.971Z', // required
  endDate: new Date().toISOString(), // required
  bucketUnit: 'MINUTE', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 15, // optional - default 1.
};

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
  step: {
    backgroundColor: 'blue',
    borderRadius: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const FitnessScreen = ({navigation}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPres, setBloodPres] = useState(0);
  const [weightApi, setWeightApi] = useState();
  const [heightApi, setHeightApi] = useState();
  const [heartRateApi, setHeartRateApi] = useState();
  const [bloodPresApi, setBloodPresApi] = useState();
  function toFeet(n) {
    var realFeet = (n * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + ' feet ' + inches + ' inch';
  }

  useEffect(() => {
    GoogleFit.checkIsAuthorized().then(() => {
      // console.log('Check auth=>', GoogleFit.isAuthorized); // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
    });

    // GoogleFit.onAuthorize(() => {
    //   // dispatch('AUTH SUCCESS')
    //   console.log(`AUTH SUCCESS==>>`);
    //   getWeight();
    //   setIsAuth(true);
    // });

    // GoogleFit.onAuthorizeFailure(() => {
    //   // dispatch('AUTH ERROR')
    //   console.log('AUTH ERROR ==>>');
    // });

    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      // console.log(authorized);
      if (authorized) {
        setIsAuth(true);
        getWeight();
      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              // console.log('AUTH_SUCCESS');
              setIsAuth(true);
              getWeight();
              // if successfully authorized, fetch data
            } else {
              // console.log('AUTH_DENIED ' + authResult.message);
            }
          })
          .catch(() => {
            dispatch('AUTH_ERROR');
          });
      }
    });
  }, []);

  const authGoogleHandler = () => {
    GoogleFit.authorize(options)
      .then(authResult => {
        // console.log(`authResult`, authResult);
        if (authResult.success) {
          // dispatch('AUTH_SUCCESS');
          // console.log('success auth for fit');
          setIsAuth(true);
        } else {
          // dispatch('AUTH_DENIED', authResult.message);
          // console.log('denied access for fit');
        }
      })
      .catch(() => {
        dispatch('AUTH_ERROR');
      });
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      console.log(authorized);
      if (authorized) {
        // if already authorized, fetch data
      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log('AUTH_SUCCESS');
              getWeight();
              // if successfully authorized, fetch data
            } else {
              console.log('AUTH_DENIED ' + authResult.message);
            }
          })
          .catch(() => {
            dispatch('AUTH_ERROR');
          });
      }
    });
  };

  // useEffect(() => {
  //   if (isAuth) {
  //     getWeight();
  //   }
  // }, [isAuth]);

  const getWeight = async () => {
    //Weight
    const res = await GoogleFit.getWeightSamples(opt);
    let data = res.reverse();
    setWeightApi(data);
    setWeight(Math.round(data[0].value * 100) / 100);

    //Height
    const res2 = await GoogleFit.getHeightSamples(heightOpt);
    // console.log(`res2`, res2[0].value);
    setHeightApi(res2);
    setHeight(res2[0].value.toFixed(2) * 100);

    const res3 = await GoogleFit.getHeartRateSamples(heartOpt);
    // console.log(`heart rate`, res3);
    setHeartRateApi(res3);
    setHeartRate(res3[0].value);
    const res4 = await GoogleFit.getBloodPressureSamples(opt);
    // console.log(`blood Pressure`, res4);
    setBloodPres(res4[0].diastolic);
    setBloodPresApi(res4);
    //count steps

    const res5 = await GoogleFit.getDailyStepCountSamples(opt);
    // console.log(`count step`, res5[2].steps);

    const res6 = await GoogleFit.getDailyCalorieSamples({
      startDate: '2022-01-12T00:00:17.971Z', // required
      endDate: new Date().toISOString(), // required
      basalCalculation: false, // optional, to calculate or not basalAVG over the week
      bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    });
    console.log(`calories wrong calculation`, res6);

    const res7 = await GoogleFit.getDailyDistanceSamples(opt);
    // console.log(`daily distance`, res7);
  };
  const disconnectFit = () => {
    GoogleFit.disconnect();
    setIsAuth(false);
    setWeight(0);
    setHeight(0);
    setBloodPres(0);
    setHeartRate();
    // navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{
          backgroundColor: 'rgb(20,20,20)',
          height: '100%',
          width: '100%',
        }}>
        <View></View>
        {!isAuth && (
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
              <Text style={styles.Header}></Text>
            </View>
            <View style={{marginHorizontal: 58, marginTop: 60}}>
              <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
                <TouchableOpacity
                  style={styles.step}
                  onPress={authGoogleHandler}>
                  <Text style={{color: 'white'}}>Auth Google</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        )}
        {isAuth && (
          <View>
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 25, marginVertical: 10}}>
                Weight : {weight}
              </Text>
              <Text style={{color: 'white', fontSize: 25, marginVertical: 10}}>
                Height : {toFeet(height)}
              </Text>
              <Text style={{color: 'white', fontSize: 25, marginVertical: 10}}>
                HeartRate : {heartRate || 0} Bpm
              </Text>
              <Text style={{color: 'white', fontSize: 25, marginVertical: 10}}>
                bloodPressor : {bloodPres || 0}
              </Text>
              <View style={{marginHorizontal: 50}}>
                <Text
                  style={{color: 'white', fontSize: 10, marginVertical: 10}}>
                  weightApi Response : {JSON.stringify(weightApi)}
                </Text>
                <Text
                  style={{color: 'white', fontSize: 10, marginVertical: 10}}>
                  heightApi Response : {JSON.stringify(heightApi)}
                </Text>
                <Text
                  style={{color: 'white', fontSize: 10, marginVertical: 10}}>
                  heartRateApi Response : {JSON.stringify(heartRateApi)}
                </Text>
                <Text
                  style={{color: 'white', fontSize: 10, marginVertical: 10}}>
                  bloodPresApi Response : {JSON.stringify(bloodPresApi)}
                </Text>
              </View>

              <TouchableOpacity
                style={{marginVertical: 10}}
                onPress={disconnectFit}>
                <Text style={{color: 'white', fontSize: 20}}>disconnect</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};
