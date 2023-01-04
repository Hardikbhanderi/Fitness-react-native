import {StatusBar, StyleSheet} from 'react-native';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
  Header: {
    color: 'rgb(118,118,118)',
    fontSize: 25,
    marginTop: 10,
  },
  mainScreen: {
    backgroundColor: 'pink',
  },
  linkText: {
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  buttonTitle: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'red',
    borderStyle: 'solid',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
