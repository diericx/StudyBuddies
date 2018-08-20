import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import EStyleSheet from 'react-native-extended-stylesheet';
import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux';

import { Button, Icon } from 'react-native-elements';
import GroupList from '../components/groups/GroupList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "$turquoise",
  },
  sendAgainContainer: {
    width: '90%',
    marginBottom: 10
  },
  sendAgainBtn: {
    height: 60,
    backgroundColor: '$lightblue'
  },
  buttons: {
    flexDirection: 'row',
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  italicWhiteTxt: {
    fontSize: 30,
    fontWeight: '600',
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
  },
  header: {
    marginBottom: 15,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 40
  },
  subHeaderTxt: {
    marginTop: 10
  }
});

@compose(
  firebaseConnect(),
  connect(({ firebase: { profile, auth } }) => ({
    auth
  }))
)
class WaitingForEmail extends React.Component {

  state = {
    resentEmail: false
  }

  constructor() {
    super();

    // bind
    this.resendEmail = this.resendEmail.bind(this);
  }

  checkIfEmailIsVerified() {
    const { auth } = this.props;
    if (auth.emailVerified) {
      this.props.navigation.navigate('App');
    }
  }

  // Subscribe to auth events on mount
  componentDidMount() {
    this.checkIfEmailIsVerified();
  }

  componentWillReceiveProps() {
    this.checkIfEmailIsVerified();
  }

  // // End the subscription when the component unmounts
  // componentWillUnmount() {
  //   this.authSubscription();
  // }

  resendEmail() {
    const { firebase, auth } = this.props;

    this.setState({
      resentEmail: true
    })
    
    firebase.auth().currentUser.sendEmailVerification()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.italicWhiteTxt]}>Almost Done!</Text>
          <Text style={[styles.italicWhiteTxt, styles.subHeaderTxt, {fontSize: 20}]}>
            We just sent you an email.{'\n'}
            hit the link and you'll be signed in automatically.
          </Text>
        </View>

        <View>
          <Animatable.View 
            animation="swing" 
            iterationCount='infinite' 
            iterationDelay={1000}
            useNativeDriver={true}
          >
            <Icon name='email' type='entypo' color='white' size={200} />
          </Animatable.View>
        </View>

        <View style={styles.sendAgainContainer}>
          <Text style={[styles.headerText, styles.italicWhiteTxt, {fontSize: 20, opacity: 0.8}]}> Didn't get the email?</Text>

          <Button
            title="Resend"
            buttonStyle={[styles.sendAgainBtn, {
              marginTop: 5
            }]}
            disabled={this.state.resentEmail}
            onPress={this.resendEmail}
          />
        </View>
      </View>
    );
  }
}

export default WaitingForEmail;