import React from 'react';
import Meteor from 'react-native-meteor';
import { View, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// styles
import styles from './styles';

// import AuthIndexContainer from '../containers/Auth';
// Auth Screens
import AuthHomeScreen from '../scenes/Auth/index';
import AuthLoginScreen from '../scenes/Auth/login';
import AuthSignupScreen from '../scenes/Auth/signup';
// Profile screens
import ProfileHomeScreen from '../scenes/Profile/Home/index';
import ProfileCoursesScreen from '../scenes/Profile/Courses/index';
import ProfileAvailabilityScreen from '../scenes/Profile/Availability/index';
// User Screens
import UsersShowScreen from '../scenes/People/Show/index';
// Tutor Screens

// Course Screens
import CoursesShowScreen from '../scenes/Courses/Show/index';
import CoursesHomeScreen from '../scenes/Courses/Home/index';
// Help Session Request
import HelpSessionHomeScreen from '../scenes/HelpSession/Home/index';
import HelpSessionShowScreen from '../scenes/HelpSession/Show/index';
// People Screen
import PeopleHomeScreen from '../scenes/People/Home/index';

// the default settings for the header of each stack
const defaultNavigationOptions = {
  title: 'StudyBuddies',
  headerBackTitle: 'Back',
  headerStyle: {
    backgroundColor: '#F7F7F7',
    height: 50,
  },

  headerTintColor: '#2b2b2b',
  headerTitleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
};

const ShowUserStack = StackNavigator(
  {
    Show: {
      screen: UsersShowScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const SearchPeopleStack = StackNavigator(
  {
    Search: {
      screen: PeopleHomeScreen,
    },
    ShowUser: {
      screen: ShowUserStack,
    },
  },
  {
    navigationOptions: defaultNavigationOptions,
  },
);

const CoursesStack = StackNavigator(
  {
    Search: {
      screen: CoursesHomeScreen,
    },
    ShowCourse: {
      screen: CoursesShowScreen,
    },
  },
  {
    navigationOptions: {
      ...defaultNavigationOptions,
      headerTitle: 'Anonymous Chat',
    },
  },
);

const ProfileStack = StackNavigator(
  {
    Profile: {
      screen: ProfileHomeScreen,
    },
    Availability: {
      screen: ProfileAvailabilityScreen,
    },
    Courses: {
      screen: ProfileCoursesScreen,
    },
  },
  {
    navigationOptions: {
      ...defaultNavigationOptions,
      headerTitle: 'Profile',
    },
  },
);

const HelpSessionStack = StackNavigator(
  {
    Home: {
      screen: HelpSessionHomeScreen,
    },
    Show: {
      screen: HelpSessionShowScreen,
    },
  },
  {
    navigationOptions: {
      ...defaultNavigationOptions,
      headerTitle: 'My Sessions',
    },
  },
);

const TabNavigation = TabNavigator(
  {
    GetHelp: {
      screen: SearchPeopleStack,
      navigationOptions: {
        tabBarLabel: 'Help',
      },
    },
    AnonymousChat: {
      screen: CoursesStack,
      navigationOptions: {
        tabBarLabel: 'Anonymous',
      },
    },
    Sessions: {
      screen: HelpSessionStack,
      navigationOptions: {
        tabBarLabel: 'Sessions',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        const requestsRecieved = Meteor.collection('helpSessions').find({
          tutorAccepted: false,
          tutorId: Meteor.userId(),
        });
        if (routeName === 'AnonymousChat') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Sessions') {
          iconName = `ios-book${focused ? '' : '-outline'}`;
        } else if (routeName === 'GetHelp') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <View style={styles.tabBarIconsContainer}>
            <Ionicons name={iconName} size={35} color={tintColor} />
          </View>
        );
      },
    }),
    tabBarOptions: {
      showLabel: true,
      style: {
        height: 55,
      },
    },
  },
);

export const MainNavigation = StackNavigator(
  {
    Index: {
      screen: TabNavigation,
    },
  },
  {
    headerMode: 'none',
  },
);

export const AuthNavigation = StackNavigator({
  Index: {
    screen: AuthHomeScreen,
  },
  Login: {
    screen: AuthLoginScreen,
  },
  Signup: {
    screen: AuthSignupScreen,
  },
});
