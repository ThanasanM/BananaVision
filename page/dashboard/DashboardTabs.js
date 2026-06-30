import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native'; 

import HomeScreen from './HomeScreen';
import ManageDataScreen from './manage-data';
import ManageUsersScreen from './manage-users';
import ManageCommentsScreen from './manage-comments';
import ExportDataScreen from './export-data';

const Tab = createBottomTabNavigator();

export default function DashboardTabs({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      'ยืนยันการออกจากระบบ', 
      'คุณต้องการออกจากระบบโปรเจกต์ Banana Vision ใช่หรือไม่?', 
      [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'ออกจากระบบ', style: 'destructive', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) }
      ]
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ca8a04', 
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity onClick={handleLogout} style={styles.logoutButton} activeOpacity={0.7}>
            <Ionicons name="log-out" size={20} color="#ef4444" />
          </TouchableOpacity>
        )
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'หน้าแรก', tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "analytics" : "analytics-outline"} size={20} color={color} /> }} 
      />
      <Tab.Screen 
        name="ManageData" 
        component={ManageDataScreen} 
        options={{ title: 'คลังสายพันธุ์', tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "leaf" : "leaf-outline"} size={20} color={color} /> }} 
      />
      <Tab.Screen 
        name="ManageUsers" 
        component={ManageUsersScreen} 
        options={{ title: 'สมาชิก', tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "people" : "people-outline"} size={20} color={color} /> }} 
      />
      <Tab.Screen 
        name="ManageComments" 
        component={ManageCommentsScreen} 
        options={{ title: 'ความคิดเห็น', tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={20} color={color} /> }} 
      />
      <Tab.Screen 
        name="ExportData" 
        component={ExportDataScreen} 
        options={{ title: 'ส่งออกข้อมูล', tabBarIcon: ({color, focused}) => <Ionicons name={focused ? "cloud-download" : "cloud-download-outline"} size={20} color={color} /> }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: { backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#f1f5f9', height: 60, paddingBottom: 8, paddingTop: 8 },
  tabLabel: { fontSize: 11, fontWeight: '600' },
  header: { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontWeight: '700', fontSize: 15, color: '#0f172a' },
  logoutButton: { marginRight: 16, padding: 6, backgroundColor: '#fef2f2', borderRadius: 8 }
});