import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ManageCommentsScreen() {
  const [comments, setComments] = useState([
    { id: '1', user: 'somchai_k', text: 'ระบบวิเคราะห์กล้วยหอมทองแม่นยำดีมากครับ สุกกำลังพอดีเลย 🍌', ripeness: 'สุก', date: 'วันนี้ 10:30' },
    { id: '2', user: 'somsri_d', text: 'อยากให้เพิ่มการสแกนใบของต้นกล้วยเพิ่มด้วยค่ะ', ripeness: 'ห่าม', date: 'เมื่อวานนี้' },
    { id: '3', user: 'hacker_99', text: 'แจกโค้ดโกงคลิกเลย www.spam.com', ripeness: 'งอม', date: '3 วันที่แล้ว' }
  ]);

  const getRipenessColor = (status) => {
    switch(status) {
      case 'ดิบ': return { bg: '#e6f4ea', text: '#137333', stroke: '#10b981' };
      case 'ห่าม': return { bg: '#fff7ed', text: '#c2410c', stroke: '#f97316' };
      case 'สุก': return { bg: '#fef9c3', text: '#a16207', stroke: '#eab308' };
      case 'งอม': return { bg: '#fef2f2', text: '#991b1b', stroke: '#ef4444' };
      default: return { bg: '#f1f5f9', text: '#475569', stroke: '#cbd5e1' };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>กล่องข้อความควบคุมความปลอดภัยระบบ ({comments.length})</Text>
      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const config = getRipenessColor(item.ripeness);
          return (
            <View style={[styles.commentCard, { borderLeftColor: config.stroke }]}>
              <View style={styles.cardHeader}>
                <View style={styles.userSection}>
                  <Text style={styles.userName}>{item.user}</Text>
                  <View style={[styles.ripenessBadge, { backgroundColor: config.bg }]}>
                    <Text style={[styles.ripenessText, { color: config.text }]}>กล้วย{item.ripeness}</Text>
                  </View>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <Text style={styles.commentBody}>“{item.text}”</Text>
              <View style={styles.footerRow}>
                <TouchableOpacity style={styles.delContainer} onPress={() => setComments(comments.filter(c => c.id !== item.id))} activeOpacity={0.6}>
                  <Ionicons name="trash-outline" size={14} color="#ef4444" />
                  <Text style={styles.delText}>ลบรายการนี้</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  headerTitle: { fontSize: 14, fontWeight: '700', color: '#64748b', marginBottom: 14 },
  commentCard: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, borderLeftWidth: 4, borderWidth: 1, borderColor: '#e2e8f0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  userSection: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  userName: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  ripenessBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  ripenessText: { fontSize: 11, fontWeight: '700' },
  dateText: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
  commentBody: { fontSize: 14, color: '#475569', lineHeight: 22 },
  footerRow: { borderTopWidth: 1, borderTopColor: '#f1f5f9', marginTop: 12, paddingTop: 8, alignItems: 'flex-end' },
  delContainer: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 2 },
  delText: { color: '#ef4444', fontSize: 12, fontWeight: '600' }
});