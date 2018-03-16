import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  modalContainer: {
    height: 250,
    width: '100%',
    marginBottom: 300,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  dataContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dataContainerTitle: {
    fontFamily: 'OpenSans',
    fontSize: 23,
    marginTop: 30,
  },
  dataContainerText: {
    fontFamily: 'OpenSansLight',
    marginTop: 20,
  },
  sendButtonContainer: {
    height: 60,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '$green',
  },
  sendButtonText: {
    fontFamily: 'OpenSans',
    fontSize: 23,
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default styles;