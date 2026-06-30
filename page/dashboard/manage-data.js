import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ManageDataScreen() {
  const [items, setItems] = useState([
    { id: '1', name: 'กล้วยหอมทอง' }, { id: '2', name: 'กล้วยน้ำว้า' },
    { id: '3', name: 'กล้วยไข่' }, { id: '4', name: 'กล้วยเล็บมือนาง' }
  ]);
  
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSave = () => {
    if (!name.trim()) return Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อสายพันธุ์กล้วย');
    if (editId) {
      setItems(items.map(item => item.id === editId ? { ...item, name: name.trim() } : item));
      setEditId(null);
      Alert.alert('สำเร็จ', 'อัปเดตข้อมูลเรียบร้อยแล้ว');
    } else {
      setItems([...items, { id: Date.now().toString(), name: name.trim() }]);
      Alert.alert('สำเร็จ', 'เพิ่มสายพันธุ์ใหม่เรียบร้อยแล้ว');
    }
    setName('');
  };

  const filteredItems = items.filter(item => item.name.includes(searchQuery));

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={18} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาชื่อสายพันธุ์กล้วยในระบบ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{editId ? "📝 แก้ไขข้อมูลสายพันธุ์" : "➕ เพิ่มฐานข้อมูลใหม่"}</Text>
        <View style={styles.formRow}>
          <TextInput style={styles.input} placeholder="เช่น กล้วยหอมแกรนด์เนน" value={name} onChangeText={setName} placeholderTextColor="#cbd5e1" />
          <TouchableOpacity style={[styles.submitBtn, { backgroundColor: editId ? '#3b82f6' : '#ca8a04' }]} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.submitBtnText}>{editId ? "อัปเดต" : "บันทึก"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>ฐานข้อมูลสายพันธุ์ทั้งหมด ({filteredItems.length})</Text>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <View style={styles.bananaIconBox}><Text style={{ fontSize: 16 }}>🍌</Text></View>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <View style={styles.btnGroup}>
              <TouchableOpacity onPress={() => { setName(item.name); setEditId(item.id); }} style={styles.editBtn}>
                <Ionicons name="pencil" size={15} color="#3b82f6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setItems(items.filter(i => i.id !== item.id))} style={styles.deleteBtn}>
                <Ionicons name="trash" size={15} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 14, borderRadius: 14, marginBottom: 14, height: 46, borderWidth: 1, borderColor: '#e2e8f0' },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#1e293b' },
  formCard: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  formTitle: { fontSize: 13, fontWeight: '700', marginBottom: 10, color: '#475569', textTransform: 'uppercase' },
  formRow: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: '#f1f5f9', paddingHorizontal: 14, borderRadius: 12, color: '#1e293b', height: 44, fontSize: 14 },
  submitBtn: { paddingHorizontal: 20, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  submitBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 12 },
  itemCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, backgroundColor: '#fff', marginBottom: 10, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  itemInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bananaIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#fef9c3', justifyContent: 'center', alignItems: 'center' },
  itemName: { fontSize: 15, fontWeight: '600', color: '#0f172a' },
  btnGroup: { flexDirection: 'row', gap: 8 },
  editBtn: { padding: 8, backgroundColor: '#eff6ff', borderRadius: 10 },
  deleteBtn: { padding: 8, backgroundColor: '#fef2f2', borderRadius: 10 }
});