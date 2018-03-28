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
import AuthIndexScreen from '../scenes/Auth/index';
import AuthLoginScreen from '../scenes/Auth/login';
import AuthSignupScreen from '../scenes/Auth/signup';
// User Screens
import UsersShowScreen from '../scenes/Users/show';
import UsersProfileScreen from '../scenes/Users/profile';
// Tutor Screens
import TutorAvailabilityScreen from '../scenes/Tutor/availability';
import TutorCoursesScreen from '../scenes/Tutor/courses';
// Course Screens
import CoursesShowScreen from '../scenes/Courses/show';
// FAQ Screens
import FAQPageShowScreen from '../scenes/FAQPage/FAQindex';
// Help Session Request
import HelpSessionIndexScreen from '../scenes/HelpSession/index';
import HelpSessionShowScreen from '../scenes/HelpSession/show';
// Search Screens
import SearchPeopleIndex from '../scenes/Search/indexPeople';
import SearchCoursesIndex from '../scenes/Search/indexCourses';

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

const ShowCourseStack = StackNavigator(
  {
    Show: {
      screen: CoursesShowScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const ShowFAQStack = StackNavigator(
  {
    Show: {
      screen: FAQPageShowScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
)

const SearchPeopleStack = StackNavigator({
  Search: {
    screen: SearchPeopleIndex,
  },
  ShowUser: {
    screen: ShowUserStack,
  },
});

const SearchCoursesStack = StackNavigator({
  Search: {
    screen: SearchCoursesIndex,
  },
  ShowCourse: {
    screen: ShowCourseStack,
  },
});

const ProfileStack = StackNavigator({
  Profile: {
    screen: UsersProfileScreen,
  },
  Availability: {
    screen: TutorAvailabilityScreen,
  },
  Courses: {
    screen: TutorCoursesScreen,
  },
  FAQ: {
    screen: FAQPageShowScreen,
  }
});

const HelpSessionStack = StackNavigator({
  Index: {
    screen: HelpSessionIndexScreen,
  },
  Show: {
    screen: HelpSessionShowScreen,
  },
});

export const MainNavigation = TabNavigator(
  {
    GetHelp: {
      screen: SearchPeopleStack,
      navigationOptions: {
        tabBarLabel: 'Get Help',
      },
    },
    AnonymousChat: {
      screen: SearchCoursesStack,
      navigationOptions: {
        tabBarLabel: 'Anonymous Chat',
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
        if (routeName === 'GetHelp') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        } else if (routeName === 'AnonymousChat') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Sessions') {
          iconName = `ios-book${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <View style={styles.tabBarIconsContainer}>
            <StatusBar barStyle="light-content" />
            <Ionicons name={iconName} size={35} color={tintColor} />
          </View>
        );
      },
    }),
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export const AuthStack = StackNavigator({
  Index: {
    screen: AuthIndexScreen,
  },
  Login: {
    screen: AuthLoginScreen,
  },
  Signup: {
    screen: AuthSignupScreen,
  },
});
