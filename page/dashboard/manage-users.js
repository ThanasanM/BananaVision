import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SUPABASE_URL = 'https://ntkhwxhrlbqbjjvxgnup.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OYHekLHFT8lx51no551jiQ_fWi3X7Jk'; 

// 📝 ปรับปลายทางชี้ไปที่ตาราง profiles ตามฐานข้อมูลของคุณ
const BASE_URL = `${SUPABASE_URL}/rest/v1/profiles`;
const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

export default function ManageUsersScreen() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}?order=created_at.desc`, { method: 'GET', headers: HEADERS });
      const data = await response.json();
      if (response.ok) setUsers(data);
      else Alert.alert('ข้อผิดพลาด', data.message || 'ไม่สามารถโหลดข้อมูลได้');
    } catch (error) {
      Alert.alert('ข้อผิดพลาด', 'การเชื่อมต่อฐานข้อมูลล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    if (!username.trim() || !email.trim()) return Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    setLoading(true);
    try {
      // 📝 เปลี่ยนจาก username เป็น display_name ให้ตรงกับโครงสร้างบนฐานข้อมูล
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ 
          display_name: username.trim(), 
          email: email.trim(), 
          status: 'ปกติ' 
        })
      });
      if (response.ok) {
        setUsername('');
        setEmail('');
        fetchUsers();
      } else {
        const data = await response.json();
        Alert.alert('ข้อผิดพลาด', data.message || 'ไม่สามารถเพิ่มข้อมูลได้');
      }
    } catch (error) {
      Alert.alert('ข้อผิดพลาด', 'เกิดปัญหาเครือข่ายในการส่งข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'ปกติ' ? 'ระงับบัญชี' : 'ปกติ';
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({ status: nextStatus })
      });
      if (response.ok) fetchUsers();
      else Alert.alert('ข้อผิดพลาด', 'ไม่สามารถอัปเดตสถานะได้');
    } catch (error) {
      Alert.alert('ข้อผิดพลาด', 'การส่งข้อมูลล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Alert.alert('ยืนยันการลบ', 'คุณต้องการลบสมาชิกนี้ออกจากฐานข้อมูลใช่หรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ลบออก',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            const response = await fetch(`${BASE_URL}?id=eq.${id}`, { method: 'DELETE', headers: HEADERS });
            if (response.ok) fetchUsers();
            else Alert.alert('ข้อผิดพลาด', 'ไม่สามารถลบข้อมูลจากเซิร์ฟเวอร์ได้');
          } catch (error) {
            Alert.alert('ข้อผิดพลาด', 'ปัญหาเครือข่ายล้มเหลว');
          } finally {
            setLoading(false);
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.createCard}>
        <Text style={styles.boxTitle}>➕ บันทึกข้อมูลสมาชิกใหม่</Text>
        <TextInput style={styles.input} placeholder="ชื่อผู้ใช้งาน (Username)" value={username} onChangeText={setUsername} placeholderTextColor="#94a3b8" />
        <TextInput style={styles.input} placeholder="ที่อยู่อีเมล (Email Address)" value={email} keyboardType="email-address" onChangeText={setEmail} placeholderTextColor="#94a3b8" />
        <TouchableOpacity style={styles.submitBtn} onPress={addUser} activeOpacity={0.8}>
          <Text style={styles.submitBtnText}>สร้างและเปิดใช้งานบัญชี</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>สมาชิกในฐานข้อมูล ({users.length})</Text>
        {loading && <ActivityIndicator size="small" color="#ca8a04" />}
      </View>

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <View style={styles.userInfoBox}>
              <View style={[styles.avatar, { backgroundColor: item.status === 'ปกติ' ? '#eff6ff' : '#f1f5f9' }]}>
                {/* 📝 ใช้ item.display_name แทน item.username */}
                <Text style={styles.avatarText}>{item.display_name ? item.display_name.charAt(0).toUpperCase() : 'U'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.uName}>{item.display_name || 'ไม่ระบุชื่อ'}</Text>
                <Text style={styles.uEmail}>{item.email}</Text>
                <View style={[styles.badge, { backgroundColor: item.status === 'ปกติ' ? '#e6f4ea' : '#fef2f2' }]}>
                  <Text style={[styles.badgeText, { color: item.status === 'ปกติ' ? '#137333' : '#dc2626' }]}>{item.status || 'ปกติ'}</Text>
                </View>
              </View>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.circleBtn} onPress={() => toggleStatus(item.id, item.status)}>
                <Ionicons name={item.status === 'ปกติ' ? "lock-closed" : "lock-open"} size={15} color="#475569" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.circleBtn, { backgroundColor: '#fef2f2' }]} onPress={() => handleDelete(item.id)}>
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
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#334155' },
  userCard: { flexDirection: 'row', backgroundColor: '#fff', padding: 14, borderRadius: 16, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  userInfoBox: { flexDirection: 'row', gap: 12, alignItems: 'center', flex: 1 },
  avatar: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 15, fontWeight: '700', color: '#3b82f6' },
  uName: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  uEmail: { fontSize: 12, color: '#64748b', marginTop: 1 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 6 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  actionRow: { flexDirection: 'row', gap: 6 },
  circleBtn: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f9' }
});