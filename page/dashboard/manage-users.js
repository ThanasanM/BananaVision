import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ManageUsersScreen() {
  const [users, setUsers] = useState([
    { id: '1', username: 'somchai_k', email: 'somchai@mail.com', status: 'ปกติ' },
    { id: '2', username: 'somsri_d', email: 'somsri@mail.com', status: 'ระงับบัญชี' }
  ]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const addUser = () => {
    if (!username.trim() || !email.trim()) return Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    setUsers([...users, { id: Date.now().toString(), username, email, status: 'ปกติ' }]);
    setUsername(''); setEmail('');
  };

  const toggleStatus = (id, current) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: current === 'ปกติ' ? 'ระงับบัญชี' : 'ปกติ' } : u));
  };

  return (
    <View style={styles.container}>
      <View style={styles.createCard}>
        <Text style={styles.boxTitle}>➕ บันทึกข้อมูลสมาชิกใหม่</Text>
        <TextInput style={styles.input} placeholder="ชื่อผู้ใช้งาน (Username)" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="ที่อยู่อีเมล (Email Address)" value={email} keyboardType="email-address" onChangeText={setEmail} />
        <TouchableOpacity style={styles.submitBtn} onPress={addUser} activeOpacity={0.8}>
          <Text style={styles.submitBtnText}>สร้างและเปิดใช้งานบัญชี</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>สมาชิกในฐานข้อมูล ({users.length})</Text>

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.userInfoBox}>
              <View style={[styles.avatar, { backgroundColor: item.status === 'ปกติ' ? '#eff6ff' : '#f1f5f9' }]}>
                <Text style={styles.avatarText}>{item.username.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.uName}>{item.username}</Text>
                <Text style={styles.uEmail}>{item.email}</Text>
                <View style={[styles.badge, { backgroundColor: item.status === 'ปกติ' ? '#e6f4ea' : '#fef2f2' }]}>
                  <Text style={[styles.badgeText, { color: item.status === 'ปกติ' ? '#137333' : '#dc2626' }]}>{item.status}</Text>
                </View>
              </View>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.circleBtn} onPress={() => toggleStatus(item.id, item.status)}>
                <Ionicons name={item.status === 'ปกติ' ? "lock-closed" : "lock-open"} size={15} color="#475569" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.circleBtn, { backgroundColor: '#fef2f2' }]} onPress={() => setUsers(users.filter(u => u.id !== item.id))}>
                <Ionicons name="trash" size={15} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  createCard: { backgroundColor: '#fff', padding: 18, borderRadius: 16, marginBottom: 20, gap: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  boxTitle: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 2, textTransform: 'uppercase' },
  input: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 12, color: '#1e293b', fontSize: 14 },
  submitBtn: { backgroundColor: '#3b82f6', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  submitBtnText: { color: '#fff', fontWeight: '700' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 12 },
  userCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 14, borderRadius: 16, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  userInfoBox: { flexDirection: 'row', gap: 12, alignItems: 'center', flex: 1 },
  avatar: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 15, fontWeight: '700', color: '#3b82f6' },
  uName: { fontSize: 15, fontWeight: '700', color: '#1e293b' },
  uEmail: { fontSize: 12, color: '#64748b', marginTop: 1 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 6 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  actionRow: { flexDirection: 'row', gap: 6 },
  circleBtn: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f9' }
});