import React from 'react';
import Meteor from 'react-native-meteor';
import { View } from 'react-native';
import { ListItem, Rating } from 'react-native-elements';

import { GetAverageRating } from '../../../../Helpers/User';

import styles from './styles';

const defaultAvatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    // bind
    this.onPress = this.onPress.bind(this);
  }

  // on press, go to course show
  onPress(params) {
    this.props.navigation.navigate('ShowUser', params);
  }

  userHasCompletedOneOfTheFilteredCourses(user) {
    console.log(user.profile);
    const completedCourseIds = user.profile.completedCourses;
    for (let i = 0; i < this.props.courses.length; i++) {
      const course = this.props.courses[i];
      if (completedCourseIds[course._id]) {
        return true;
      }
    }
    return false;
  }

  filterUsers() {
    return this.props.users.filter((user) => {
      const filter = this.props.filter.toLowerCase();
      const name = user.profile.name.toLowerCase();
      if (name.indexOf(filter) != -1 || this.userHasCompletedOneOfTheFilteredCourses(user)) {
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <View>
        {this.filterUsers().map((u, i) => {
          const ratingsForUser = Meteor.collection('ratings').find({ userId: u._id });
          const avgRating = GetAverageRating(ratingsForUser, ratingsForUser.length, 0);

          return (
            <ListItem
              key={i}
              roundAvatar
              title={u.profile.name}
              subtitle={
                <View style={styles.ratingContainer}>
                  <Rating imageSize={20} readonly startingValue={avgRating} />
                </View>
              }
              avatar={{ uri: defaultAvatar }}
              containerStyle={styles.listItemContainer}
              onPress={() => this.onPress({ user: u })}
            />
          );
        })}
      </View>
    );
  }
}
