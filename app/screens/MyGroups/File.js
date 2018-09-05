import React from 'react';
import { View } from 'react-native';
import Document from '../../components/MyGroups/Document';
import EStyleSheet from 'react-native-extended-stylesheet';

import FileList from '../../components/MyGroups/FileList';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  white: {
    backgroundColor: 'white'
  }
});

class File extends React.Component {
  static navigationOptions = (props) => ({
    title: props.navigation.getParam("title", null),
  });

  render() {
    const fileId = this.props.navigation.getParam("fileId", null);
    const fileType = this.props.navigation.getParam("fileType", null);
    
    if (fileType == 'folder') {
      return (
        <View style={[styles.container]}>
          <FileList parentId={fileId} />
        </View>
      )
    } else if (fileType == 'document') {
      return (
        <View style={[styles.container, styles.white]}>
          <Document fileId={fileId} />
        </View>
      )
    }
    
    return null;
  }
}

export default File;