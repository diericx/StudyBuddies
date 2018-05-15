import React from "react";
import { View, Text, ScrollView } from "react-native";
import Meteor, { createContainer } from "react-native-meteor";
import { Card, Divider, ButtonGroup } from "react-native-elements";
import IconBadge from "react-native-icon-badge";

import { GetCostOfSession, IsCurrentUserTutor } from "../../../Helpers/Session";
import SessionList from "../components/SessionList/index";
import BGButton from "../components/BGButton/index";

import styles from "./styles";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: 0
    };

    // bind
    this.updateGroup = this.updateGroup.bind(this);
  }

  updateGroup(selectedGroup) {
    this.setState({ selectedGroup });
  }

  onItemPress(params) {
    this.props.navigation.navigate("Show", params);
  }

  // Sort sessions by date
  sortSessionsByDate(sessions) {
    // Sort the sessions
    const sortedSessions = sessions.sort(function(a, b) {
      if (a.startDate < b.startDate) {
        return 1;
      }
      if (a.startDate > b.startDate) {
        return -1;
      }
      return 0;
    });
    return sortedSessions;
  }

  // Map over all ended sessions and update it's data
  formatEndedSessions(sessions) {
    return sessions.map(session => {
      if (!session.endedAt) {
        session.subtitle1 = "Session Cancelled";
        return session;
      }
      let cost = GetCostOfSession(session);
      let prefix = IsCurrentUserTutor(session) ? "+" : "-";
      session.subtitle1 = `${prefix}${cost}`;
      return session;
    });
  }

  renderSessionListForSelectedGroup(sessions, sessionRequests, endedSessions) {
    const { selectedGroup } = this.state;
    if (selectedGroup == 0) {
      return (
        <SessionList
          sessions={this.sortSessionsByDate(sessions)}
          noneMessage="You don't have any active sessions."
          navigation={this.props.navigation}
        />
      );
    } else if (selectedGroup == 1) {
      return (
        <SessionList
          sessions={sessionRequests.reverse()}
          noneMessage="You don't have any requests. Try lowering your prices!"
          navigation={this.props.navigation}
        />
      );
    } else if (selectedGroup == 2) {
      return (
        <SessionList
          sessions={this.sortSessionsByDate(endedSessions)}
          noneMessage="You haven't had any sessions recently."
          navigation={this.props.navigation}
        />
      );
    }
  }

  render() {
    const { selectedGroup } = this.state;
    let {
      sessions,
      sessionRequests,
      endedSessions,
      notificationLocation,
      requestsWithNotifications
    } = this.props;
    endedSessions = this.formatEndedSessions(endedSessions);
    const { notifications } = this.props.screenProps;

    const groupButtons = [
      {
        element: () => (
          <BGButton
            text={"Sessions"}
            highlighted={notifications.Sessions.sessions > 0}
          />
        )
      },
      {
        element: () => (
          <BGButton
            text={"Requests"}
            highlighted={notifications.Sessions.requests > 0}
          />
        )
      },
      {
        element: () => (
          <BGButton
            text={"History"}
            highlighted={notifications.Sessions.history > 0}
          />
        )
      }
    ];

    if (sessionRequests == null || sessions == null) {
      return <View />;
    }
    return (
      <View style={styles.container}>
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            onPress={this.updateGroup}
            selectedIndex={selectedGroup}
            buttons={groupButtons}
            containerStyle={styles.buttonGroup}
            selectedButtonStyle={styles.selectedButton}
            buttonStyle={styles.button}
          />
        </View>

        <Divider style={styles.divider} />

        {this.renderSessionListForSelectedGroup(
          sessions,
          sessionRequests,
          endedSessions
        )}
      </View>
    );
  }
}

const container = createContainer(params => {
  // subscribe to myHelpSessions is in main index
  return {
    sessionRequests: Meteor.collection("helpSessions").find({
      tutorAccepted: false,
      tutorDenied: false
    }),
    sessions: Meteor.collection("helpSessions").find({
      tutorAccepted: true,
      endedAt: { $exists: false }
    }),
    endedSessions: Meteor.collection("helpSessions").find({
      $or: [{ endedAt: { $exists: true } }, { tutorDenied: true }]
    })
  };
}, Index);

export default container;
