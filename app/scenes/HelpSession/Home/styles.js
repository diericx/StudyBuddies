import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  cardTitleContainer: {
    paddingVertical: 5,
    paddingLeft: 5,
    backgroundColor: '$lightgray',
  },
});

export default styles;