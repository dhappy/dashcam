import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Button } from 'react-native'
import {  NodeCameraView } from 'react-native-nodemediaclient';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA,PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
      {
        title: "Cool Photo App Camera And Microphone Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

export default () => {
  // useEffect(() => { requestCameraPermission() }, [])

  return <>
    <NodeCameraView 
      style={{ height: 400 }}
      ref={(vb) => { this.vb = vb }}
      outputUrl = {"rtmp://global-live.mux.com:5222/app/ac436736-8f5c-a9f1-45d2-6e45c8bf0087"}
      camera={{ cameraId: 1, cameraFrontMirror: true }}
      audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
      video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
      autopreview={true}
    />

    <Button title="request permissions" onPress={requestCameraPermission} />
    <Button
      onPress={() => {
        if (this.state.isPublish) {
          this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
          this.vb.stop();
        } else {
          this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
          this.vb.start();
        }
      }}
      title={this.state.publishBtnTitle}
      color="#841584"
    />
  </>
}