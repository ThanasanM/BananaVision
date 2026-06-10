import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, 
  SafeAreaView, StatusBar, ScrollView, Switch, Platform 
} from 'react-native';

const COLORS = {
  bg: '#FBF7E3',
  bg_white: '#FFFFFF',
  primary: '#4A3B32',
  text_dark: '#000000',
  text_gray: '#757575',
  border: '#EFECE0',
  red: '#E53935',
};

const backIcon = require('../assets/imge/back.png');

export default function SettingsScreen({ navigation }) {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const handleLogout = () => {
    // ล็อกเอาท์แล้วล้างคิวกลับไปหน้า Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SETTINGS</Text>
        <View style={{ width: 44 }} /> 
      </View>

      {/* Settings Options */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* กลุ่มตั้งค่าบัญชี */}
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Text style={styles.itemText}>Edit Profile</Text>
            <Text style={styles.arrowIcon}>＞</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Text style={styles.itemText}>Change Password</Text>
            <Text style={styles.arrowIcon}>＞</Text>
          </TouchableOpacity>
        </View>

        {/* กลุ่มตั้งค่าทั่วไป */}
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <View style={styles.cardContainer}>
          <View style={styles.settingItem}>
            <Text style={styles.itemText}>Notifications</Text>
            <Switch
              trackColor={{ false: '#D1D1D1', true: COLORS.primary }}
              thumbColor={isNotificationEnabled ? '#FFFFFF' : '#F4F3F4'}
              ios_backgroundColor="#D1D1D1"
              onValueChange={setIsNotificationEnabled}
              value={isNotificationEnabled}
            />
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Text style={styles.itemText}>Language</Text>
            <Text style={styles.subItemText}>English ＞</Text>
          </TouchableOpacity>
        </View>

        {/* กลุ่มเกี่ยวกับแอป */}
        <Text style={styles.sectionTitle}>ABOUT</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Text style={styles.itemText}>Privacy Policy</Text>
            <Text style={styles.arrowIcon}>＞</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <Text style={styles.itemText}>Terms of Service</Text>
            <Text style={styles.arrowIcon}>＞</Text>
          </TouchableOpacity>
        </View>

        {/* ปุ่ม Logout สีแดงเด่นชัด */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutButtonText}>LOG OUT</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, height: 60, marginTop: Platform.OS === 'ios' ? 5 : 10
  },
  backButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  backIcon: { width: 24, height: 24, tintColor: COLORS.primary },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.primary },
  
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.primary, marginTop: 25, marginBottom: 10, marginLeft: 5 },
  
  cardContainer: {
    backgroundColor: COLORS.bg_white, borderRadius: 20, paddingHorizontal: 15,
    borderWidth: 1, borderColor: COLORS.border,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 5 },
      android: { elevation: 2 }
    })
  },
  settingItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    height: 55, paddingVertical: 10
  },
  itemText: { fontSize: 16, fontWeight: '600', color: COLORS.text_dark },
  subItemText: { fontSize: 14, fontWeight: '600', color: COLORS.text_gray },
  arrowIcon: { fontSize: 16, fontWeight: 'bold', color: COLORS.text_gray },
  divider: { height: 1, backgroundColor: COLORS.border },
  
  logoutButton: {
    width: '100%', height: 50, backgroundColor: COLORS.red, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginTop: 40,
    shadowColor: COLORS.red, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, elevation: 4
  },
  logoutButtonText: { fontSize: 16, fontWeight: 'bold', color: COLORS.bg_white }
});