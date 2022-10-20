import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

import { SCREEN } from '../constants';
import { Icon } from '@rneui/themed';
import { connect } from 'react-redux';
import { changeTaskStatus } from '../redux/action';

function MyCamera(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImageUri(data.uri);
    }
  };

  const changeStatus = () => {
    var myBody = props.route.params.body
    var body = {
      "date": myBody.date,
      "sl": myBody.sl,
      "time": myBody.time,
      "staf_image": imageUri
    }
    if (props.route.params.type === 'CompleteRequest') {
      body['activities'] = props.route.params.activities
    }
    props.changeTaskStatus(props.route.params.type, JSON.stringify(body), props.route.params.staf_sl)
  }

  return (
    <View style={styles.container}>
      {
        imageUri !== null ?
          <Image source={{ uri: imageUri }} style={{ height: "94%", width: SCREEN.WIDTH * 1.5, transform: type === CameraType.back ? [{ scaleX: 1 }] : [{ scaleX: -1 }] }} /> :
          <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)} >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{ ...styles.button, marginBottom: 20 }}
                onPress={() => {
                  setType(type === CameraType.back ? CameraType.front : CameraType.back);
                }}>
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 23 }}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Icon
                  name='circle'
                  type='entypo'
                  color="#fff"
                  size={80}
                />
              </TouchableOpacity>

            </View>
          </Camera>

      }

      {
        imageUri == null ?
          <></>
          :
          <TouchableOpacity style={{ backgroundColor: "#3b407a", height: 50, justifyContent: "center" }}
            onPress={changeStatus}>
            <Text style={{ textAlign: "center", fontWeight: "900", color: "#fff" }}> SUBMIT </Text>
          </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: SCREEN.WIDTH
  },
  camera: {
    height: "100%",
    width: SCREEN.WIDTH * 1.5
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export const mapStateToProps = (store) => {
  return {
  };
}

export const mapDispatchToProps = (dispatch) => {
  return {
    changeTaskStatus: (type, body, staf_sl) => dispatch(changeTaskStatus(type, body, staf_sl))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCamera);
