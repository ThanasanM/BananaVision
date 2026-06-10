import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const COLORS = {
  bg: '#FBF7E3',
  bg_white: '#FFFFFF',
  primary: '#4A3B32',
  text_dark: '#000000',
  text_gray: '#757575',
  border: '#EFECE0',
  green: '#27AE60',
};

const backIcon = require('../assets/imge/back.png');
const defaultProfile = require('../assets/imge/vision logo.png');

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  
  const pickImage = async () => {
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('ขออภัย', 'แอปต้องการสิทธิ์เข้าถึงคลังภาพเพื่อเปลี่ยนรูปโปรไฟล์');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [1, 1],      
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกชื่อและอีเมลให้เรียบร้อย");
      return;
    }

    // ตรวจสอบรูปแบบอีเมล
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("ข้อผิดพลาด", "รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }

    Alert.alert(
      "สำเร็จ",
      "อัปเดตข้อมูลโปรไฟล์เรียบร้อยแล้ว",
      [{ text: "ตกลง", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={backIcon} style={styles.backIconStyle} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>EDIT PROFILE</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileContainer}>
            <TouchableOpacity 
              activeOpacity={0.7} 
              style={styles.imageWrapper}
              onPress={pickImage} 
            >
              
              <Image 
                source={image ? { uri: image } : defaultProfile} 
                style={styles.profileImage} 
              />
              <View style={styles.editBadge}>
                <Text style={styles.editBadgeText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NAME</Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputText}
                  value={name}
                  onChangeText={setName}
                  placeholder="YOUR NAME"
                  placeholderTextColor="#BCBCBC"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL</Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputText}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="YOUR EMAIL"
                  placeholderTextColor="#BCBCBC"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.inputText}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="NEW PASSWORD"
                  placeholderTextColor="#BCBCBC"
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.9}
            >
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    marginTop: Platform.OS === 'ios' ? 5 : 10,
  },
  backButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  backIconStyle: { width: 24, height: 24, resizeMode: 'contain', tintColor: COLORS.primary },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.primary, letterSpacing: 0.5 },
  scrollContent: { paddingHorizontal: 40, paddingBottom: 40 },
  profileContainer: { alignItems: 'center', marginVertical: 30 },
  imageWrapper: { position: 'relative' },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.bg_white,
  },
  editBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.green,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.bg,
  },
  editBadgeText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: -2 },
  formContainer: { width: '100%' },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8, marginLeft: 5 },
  inputFieldContainer: {
    width: '100%',
    height: 55,
    backgroundColor: COLORS.bg_white,
    borderRadius: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  inputText: { fontSize: 16, color: COLORS.text_dark, fontWeight: 'bold' },
  buttonContainer: { alignItems: 'center', marginTop: 20 },
  saveButton: {
    width: '50%',
    height: 50,
    backgroundColor: COLORS.green,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  saveButtonText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
});