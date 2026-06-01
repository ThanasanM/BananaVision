import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Alert,
  StatusBar,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

const THEME = {
  bg: '#FBF7E3',
  bg_white: '#FFFFFF',
  primary: '#4A3B32',
  accent: '#EED97C',
  text_dark: '#000000',
  text_gray: '#757575',
  border: '#EFECE0',
  shadow: '#000000',
};

const myProfileImage = require('../assets/imge/vision logo.png');
const defaultBananaImage = require('../assets/imge/B1.jpg');
const scanIcon = require('../assets/imge/scanner.png');
const COMMENTSIcon = require('../assets/imge/chat.png');
const loginIcon = require('../assets/imge/login.png');
const galleryIcon = require('../assets/imge/gallery.png');

let flashOnIcon;
try {
  flashOnIcon = require('../assets/imge/flash-on.png');
} catch (e) {
  flashOnIcon = require('../assets/imge/flash.png');
}
const flashOffIcon = require('../assets/imge/flash.png');

export default function BananaVisionScreenGust({ navigation }) {
  const cameraRef = useRef(null);
  const [resultImage, setResultImage] = useState(defaultBananaImage);
  const [flashMode, setFlashMode] = useState('off');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const resHeight = useRef(new Animated.Value(190)).current;

  const [permission, requestPermission] = useCameraPermissions();

  const collapseSheet = () => {
    Animated.timing(resHeight, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setIsCollapsed(true));
  };

  const expandSheet = () => {
    Animated.timing(resHeight, {
      toValue: 190,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setIsCollapsed(false));
  };

  const toggleSheet = () => {
    if (isCollapsed) {
      expandSheet();
    } else {
      collapseSheet();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 20) {
          collapseSheet();
        } else if (gestureState.dy < -20) {
          expandSheet();
        } else {
          toggleSheet();
        }
      },
    })
  ).current;

  const toggleFlash = () => {
    setFlashMode((current) => (current === 'off' ? 'on' : 'off'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        Alert.alert("ควั้บ!", "จำลองการถ่ายรูปเรียบร้อย (ฟังก์ชันจริงพร้อมใช้งานในโค้ด)");
      } catch (e) {
        Alert.alert("ผิดพลาด", "ไม่สามารถถ่ายรูปได้");
      }
    }
  };

  const pickImageFromDevice = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("ต้องการสิทธิ์", "แอปพลิเคชันต้องการสิทธิ์การเข้าถึงคลังภาพของคุณ");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setResultImage({ uri: result.assets[0].uri });
    }
  };

  if (!permission) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={THEME.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.permissionCard}>
          <View style={[styles.focusIconBg, { marginBottom: 30 }]}>
            <Text style={styles.permissionEmoji}>📷</Text>
          </View>
          <Text style={styles.permissionTitle}>ตากล้องพร้อมหรือยัง?</Text>
          <Text style={styles.permissionText}>
            เราจำเป็นต้องขอสิทธิ์เข้าถึงกล้อง เพื่อใช้สแกนหาความสุกของกล้วยครับ
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <Text style={styles.permissionButtonText}>เปิดใช้งานกล้อง</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.bg} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={myProfileImage} style={styles.profileLogo} />
          <Text style={styles.headerTitle}>BANANA VISION</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <Text style={styles.notificationEmoji}>🔔</Text>
        </TouchableOpacity>
      </View>

      <CameraView
        ref={cameraRef}
        style={styles.cameraPreview}
        facing="back"
        enableTorch={flashMode === 'on'}
      >
        <View style={styles.scanFrameContainer}>
          <View style={styles.scanFrameCornerTopLeft} />
          <View style={styles.scanFrameCornerTopRight} />
          <View style={styles.scanFrameCornerBottomLeft} />
          <View style={styles.scanFrameCornerBottomRight} />
          <View style={styles.focusIconBg}>
          </View>
        </View>

        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={styles.dragHandleContainer}
            activeOpacity={1}
            {...panResponder.panHandlers}
          >
            <View style={styles.dragHandle} />
          </TouchableOpacity>

          <Animated.View style={{ height: resHeight, overflow: 'hidden', width: '100%' }}>
            <Text style={styles.sheetTitle}>ผลการสแกนล่าสุด</Text>

            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContentContainer}
              showsVerticalScrollIndicator={false}
            >
              
              <View style={[styles.resultContainer, { marginTop: 12 }]}>
                <Image source={resultImage} style={styles.resultImageCircle} />
                <View style={styles.textContainer}>
                  <Text style={styles.resultText}>
                    ประวัติการสแกน: <Text style={styles.resultValue}>ดิบ</Text>
                  </Text>
                  <Text style={styles.resultSubText}>สแกนเมื่อ 5 นาทีที่แล้ว</Text>
                </View>
              </View>
            </ScrollView>
          </Animated.View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleFlash} activeOpacity={0.7}>
              <Image
                source={flashMode === 'on' ? flashOnIcon : flashOffIcon}
                style={[
                  styles.actionImageIcon,
                  { tintColor: flashMode === 'on' ? THEME.primary : THEME.text_gray },
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.shutterButton} onPress={takePicture} activeOpacity={0.9}>
              <View style={styles.shutterInnerCircle}>
                <Text style={styles.shutterEmoji}></Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={pickImageFromDevice}
              activeOpacity={0.7}
            >
              <Image source={galleryIcon} style={styles.galleryImageIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={scanIcon} style={[styles.navImageIcon, styles.navImageIconActive]} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>SCAN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Image source={COMMENTSIcon} style={styles.navImageIcon} />
          <Text style={styles.navLabel}>COMMENTS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <Image source={loginIcon} style={styles.navImageIcon} />
          <Text style={styles.navLabel}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  permissionCard: {
    backgroundColor: THEME.bg_white,
    padding: 40,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: THEME.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  permissionEmoji: {
    fontSize: 50,
  },
  permissionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: THEME.text_dark,
    marginBottom: 15,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: THEME.text_gray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: THEME.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  permissionButtonText: {
    color: THEME.bg_white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    height: 70,
    backgroundColor: THEME.bg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: THEME.primary,
    marginRight: 12,
    backgroundColor: THEME.accent,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.primary,
    letterSpacing: 1,
  },
  notificationButton: {
    padding: 8,
    backgroundColor: THEME.bg_white,
    borderRadius: 20,
  },
  notificationEmoji: {
    fontSize: 20,
  },
  cameraPreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  scanFrameContainer: {
    width: 240,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 160,
  },
  focusIconBg: {
    backgroundColor: 'rgba(74, 59, 50, 0.4)',
    padding: 16,
    borderRadius: 22,
  },
  focusIcon: {
    fontSize: 26,
    color: THEME.bg_white,
  },
  scanFrameCornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: THEME.bg_white,
    borderTopLeftRadius: 15,
  },
  scanFrameCornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: THEME.bg_white,
    borderTopRightRadius: 15,
  },
  scanFrameCornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: THEME.bg_white,
    borderBottomLeftRadius: 15,
  },
  scanFrameCornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: THEME.bg_white,
    borderBottomRightRadius: 15,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.bg_white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 25 : 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: THEME.shadow,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  dragHandleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
  dragHandle: {
    width: 70,
    height: 6,
    backgroundColor: THEME.border,
    borderRadius: 3,
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
    marginVertical: 4,
  },
  scrollContentContainer: {
    paddingBottom: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text_dark,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  resultContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: THEME.bg,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  resultImageCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: THEME.bg_white,
    backgroundColor: '#eee',
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME.primary,
  },
  resultValue: {
    fontWeight: '800',
    color: THEME.text_dark,
  },
  resultSubText: {
    fontSize: 14,
    color: THEME.text_gray,
    marginTop: 4,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.border,
  },
  iconButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.bg,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  actionImageIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  galleryImageIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: THEME.primary,
  },
  shutterButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.bg_white,
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  shutterInnerCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterEmoji: {
    fontSize: 28,
  },
  bottomNav: {
    height: 80,
    backgroundColor: THEME.bg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: THEME.border,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  navImageIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginBottom: 6,
    tintColor: THEME.text_gray,
  },
  navImageIconActive: {
    tintColor: THEME.primary,
    width: 24,
    height: 24,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.text_gray,
  },
  navLabelActive: {
    color: THEME.primary,
    fontWeight: '800',
  },
});