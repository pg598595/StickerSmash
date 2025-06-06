import { Text, View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Buttons";
import * as ImagePicker from "expo-image-picker"
import { useState } from "react";
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import { type ImageSource } from 'expo-image';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const PlaceholderImage = require("../../assets/images/background-image.png")

export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert("You did not select any image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <GestureHandlerRootView style={styles.container}>

   
    <View style={styles.container}
    >
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={selectedImage || PlaceholderImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {
        showAppOptions ? (
          <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
        ) : (
          <View style={styles.footerContainer}>
          <Button
            onPress={pickImageAsync}
            label="Choose a photo" theme="primary" />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
        </View>
        )
      }
       <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
       <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      
      </View>
      </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 0.33,
    alignItems: "center",
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});