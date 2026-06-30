import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

export default function ExportDataScreen() {
  const [loading, setLoading] = useState(false);

  const dbData = [
    { username: 'somchai_k', email: 'somchai@mail.com', comment: 'แอปนี้ตรวจจับแม่นยำดีมากครับ', result: 'สุก' },
    { username: 'somsri_d', email: 'somsri@mail.com', comment: 'อยากให้เพิ่มฟีเจอร์ตรวจใบกล้วยด้วยค่ะ', result: 'ห่าม' }
  ];

  const handleExportPDF = async () => {
    setLoading(true);
    let rowsHtml = dbData.map(item => `
      <tr><td>${item.username}</td><td>${item.email}</td><td>${item.comment}</td><td style="text-align: center; font-weight: bold; color: #b45309;">${item.result}</td></tr>
    `).join('');

    const htmlContent = `
      <html><head><meta charset="utf-8"><style>body { font-family: 'Helvetica Neue', sans-serif; padding: 20px; } h2 { text-align: center; color: #1e293b; } table { width: 100%; border-collapse: collapse; margin-top: 15px; } th { background-color: #f8fafc; padding: 12px; border: 1px solid #cbd5e1; } td { padding: 12px; border: 1px solid #e2e8f0; font-size: 14px; }</style></head>
      <body><h2>รายงานข้อมูลประเมินและวิเคราะห์ Banana Vision</h2><table><thead><tr><th>ผู้ใช้งาน</th><th>อีเมล</th><th>ความคิดเห็น</th><th>ผลการตรวจจับ</th></tr></thead><tbody>${rowsHtml}</tbody></table></body></html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (e) {
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถดึงข้อมูลออกเป็น PDF ได้');
    } finally { setLoading(false); }
  };

  const handleExportExcel = async () => {
    setLoading(true);
    let csvContent = '\uFEFFผู้ใช้งาน,อีเมล,ความคิดเห็น,ผลการตรวจจับ\n'; 
    dbData.forEach(item => { csvContent += `${item.username},${item.email},${item.comment},${item.result}\n`; });
    const fileUri = `${FileSystem.documentDirectory}BananaVision_Report.csv`;
    try {
      await FileSystem.writeAsStringAsync(fileUri, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
      await Sharing.shareAsync(fileUri);
    } catch (e) {
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถดึงข้อมูลออกเป็น Excel ได้');
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerIcon}>
        <View style={styles.iconCircle}><Ionicons name="cloud-download" size={26} color="#ca8a04" /></View>
        <Text style={styles.title}>ศูนย์บริหารการจัดการข้อมูล</Text>
        <Text style={styles.subtitle}>ดาวน์โหลดรายงานสถิติของแอปพลิเคชันรูปแบบไฟล์เอกสารภายนอก</Text>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>📋 โครงสร้างคอลัมน์ข้อมูลที่จะจัดส่งออก:</Text>
        <Text style={styles.previewItem}>• ข้อมูลสมาชิก (Username / Email)</Text>
        <Text style={styles.previewItem}>• ประวัติข้อความประเมินและคำติชมระบบ</Text>
        <Text style={styles.previewItem}>• ผลลัพธ์ระดับความสุกกล้วย (ดิบ / ห่าม / สุก / งอม)</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ca8a04" />
      ) : (
        <View style={styles.btnLayout}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#ef4444' }]} onPress={handleExportPDF} activeOpacity={0.8}>
            <Ionicons name="document-text-outline" size={18} color="#fff" />
            <Text style={styles.btnText}>ส่งออกเอกสารสรุปผล PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#16a34a' }]} onPress={handleExportExcel} activeOpacity={0.8}>
            <Ionicons name="grid-outline" size={18} color="#fff" />
            <Text style={styles.btnText}>ส่งออกฐานข้อมูลสด Excel (.CSV)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f8fafc', justifyContent: 'center' },
  centerIcon: { alignItems: 'center', marginBottom: 30 },
  iconCircle: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginTop: 16 },
  subtitle: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 6, lineHeight: 20, paddingHorizontal: 15 },
  previewCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 16, marginBottom: 30, borderWidth: 1, borderColor: '#e2e8f0' },
  previewTitle: { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 8 },
  previewItem: { fontSize: 13, color: '#64748b', marginBottom: 4, paddingLeft: 4 },
  btnLayout: { gap: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, borderRadius: 12 },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '700' }
});