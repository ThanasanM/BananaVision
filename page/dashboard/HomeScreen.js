import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 64; 
const CHART_HEIGHT = 140;

const THEME = {
  bg: '#f8fafc',          
  surface: '#ffffff',     
  border: '#f1f5f9',      
  textMain: '#0f172a',    
  textMuted: '#64748b',   
  accent: '#ca8a04',      
  accentLight: '#fef9c3', 
  indicatorGreen: '#10b981' 
};

export default function HomeScreen({ navigation }) {
  const monthlyData = [
    { month: 'ม.ค.', accuracy: '82%' },
    { month: 'ก.พ.', accuracy: '85%' },
    { month: 'มี.ค.', accuracy: '84%' },
    { month: 'เม.ย.', accuracy: '89%' },
    { month: 'พ.ค.', accuracy: '91%' },
    { month: 'มิ.ย.', accuracy: '95%' },
    { month: 'ก.ค.', accuracy: '93%' },
  ];

  const recentComments = [
    { id: '1', user: 'somchai_k', text: 'ระบบวิเคราะห์กล้วยหอมทองแม่นยำดีมากครับ สุกกำลังพอดีเลย 🍌', ripeness: 'สุก', time: '10 นาทีที่แล้ว' },
    { id: '2', user: 'somsri_d', text: 'ลองเทสกับกล้วยดิบแล้ว ระบบจำแนกได้ถูกต้องดีค่ะ', ripeness: 'ดิบ', time: '1 ชั่วโมงที่แล้ว' },
  ];

  const getRipenessStyle = (status) => {
    switch(status) {
      case 'ดิบ': return { bg: '#e6f4ea', text: '#137333' }; 
      case 'ห่าม': return { bg: '#fff7ed', text: '#c2410c' };
      case 'สุก': return { bg: THEME.accentLight, text: THEME.accent };
      case 'งอม': return { bg: '#fef2f2', text: '#991b1b' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appTitle}>BANANA VISION</Text>
          <Text style={styles.appSubtitle}>ระบบตรวจสอบและวิเคราะห์โมเดลภายใน</Text>
        </View>
        <View style={styles.statusIndicator}>
          <View style={styles.greenDot} />
          <Text style={styles.statusIndicatorText}>ระบบออนไลน์</Text>
        </View>
      </View>

      <View style={styles.matrixContainer}>
        <View style={[styles.matrixCard, { borderRightWidth: 1, borderColor: THEME.border }]}>
          <View style={styles.matrixHeaderRow}>
            <Text style={styles.matrixLabel}>ผู้ใช้งานทั้งหมด</Text>
            <View style={[styles.iconMiniBox, { backgroundColor: '#eff6ff' }]}>
              <Ionicons name="people" size={12} color="#3b82f6" />
            </View>
          </View>
          <Text style={styles.matrixValue}>1,250 <Text style={styles.matrixUnit}>คน</Text></Text>
        </View>
        
        <View style={styles.matrixCard}>
          <View style={styles.matrixHeaderRow}>
            <Text style={styles.matrixLabel}>ความคิดเห็นระบบ</Text>
            <View style={[styles.iconMiniBox, { backgroundColor: '#e6f4ea' }]}>
              <Ionicons name="chatbubbles" size={12} color="#10b981" />
            </View>
          </View>
          <Text style={styles.matrixValue}>342 <Text style={styles.matrixUnit}>ข้อความ</Text></Text>
        </View>
      </View>

      <View style={styles.chartWrapper}>
        <View style={styles.chartMetaHeader}>
          <View>
            <Text style={styles.sectionHeading}>แนวโน้มความถูกต้องของโมเดล</Text>
            <Text style={styles.sectionSubheading}>เปอร์เซ็นต์ความถูกต้องเฉลี่ยของระบบ AI รายเดือน</Text>
          </View>
          <Text style={styles.percentageMetric}>93.4%</Text>
        </View>

        <View style={styles.svgContainer}>
          <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
            <Defs>
              <LinearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={THEME.accent} stopOpacity="0.15" />
                <Stop offset="100%" stopColor={THEME.accent} stopOpacity="0.00" />
              </LinearGradient>
            </Defs>
            <Line x1="0" y1="35" x2={CHART_WIDTH} y2="35" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
            <Line x1="0" y1="70" x2={CHART_WIDTH} y2="70" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
            <Line x1="0" y1="105" x2={CHART_WIDTH} y2="105" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
            <Path d="M 10 130 L 10 70 L 55 60 L 100 63 L 145 45 L 190 35 L 235 20 L 280 28 L 280 130 Z" fill="url(#lineGrad)" />
            <Path d="M 10 70 L 55 60 L 100 63 L 145 45 L 190 35 L 235 20 L 280 28" fill="none" stroke={THEME.accent} strokeWidth="2.5" strokeLinecap="round" />
            {[10, 55, 100, 145, 190, 235, 280].map((cx, i) => (
              <Circle key={i} cx={cx} cy={[70, 60, 63, 45, 35, 20, 28][i]} r="4" fill={THEME.surface} stroke={THEME.accent} strokeWidth="2" />
            ))}
          </Svg>
        </View>

        <View style={styles.xAxis}>
          {monthlyData.map((data, idx) => (
            <View key={idx} style={styles.xNode}>
              <Text style={styles.xLabel}>{data.month}</Text>
              <Text style={styles.xValue}>{data.accuracy}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.feedHeader}>
        <Text style={styles.sectionHeading}>ความคิดเห็นล่าสุด</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ManageComments')} activeOpacity={0.5}>
          <Text style={styles.linkText}>ดูประวัติทั้งหมด →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logContainer}>
        {recentComments.map((item) => {
          const badgeStyle = getRipenessStyle(item.ripeness);
          return (
            <View key={item.id} style={styles.logCard}>
              <View style={styles.logMeta}>
                <Text style={styles.logUser}>@{item.user}</Text>
                <View style={[styles.miniBadge, { backgroundColor: badgeStyle.bg }]}>
                  <Text style={[styles.miniBadgeText, { color: badgeStyle.text }]}>กล้วย{item.ripeness}</Text>
                </View>
              </View>
              <Text style={styles.logText}>“{item.text}”</Text>
              <Text style={styles.logTime}>{item.time}</Text>
            </View>
          );
        })}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },
  contentContainer: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderColor: '#e2e8f0', paddingBottom: 14 },
  appTitle: { fontSize: 16, fontWeight: '900', color: THEME.textMain, letterSpacing: 1.2 },
  appSubtitle: { fontSize: 11, fontWeight: '600', color: THEME.textMuted, marginTop: 2 },
  statusIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ffffff', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: THEME.indicatorGreen },
  statusIndicatorText: { fontSize: 11, fontWeight: '700', color: THEME.textMain },
  matrixContainer: { flexDirection: 'row', backgroundColor: THEME.surface, borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden', marginBottom: 20 },
  matrixCard: { flex: 1, padding: 16 },
  matrixHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconMiniBox: { width: 22, height: 22, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  matrixLabel: { fontSize: 11, fontWeight: '700', color: THEME.textMuted },
  matrixValue: { fontSize: 20, fontWeight: '800', color: THEME.textMain, marginTop: 6, letterSpacing: -0.5 },
  matrixUnit: { fontSize: 12, fontWeight: '500', color: THEME.textMuted },
  chartWrapper: { backgroundColor: THEME.surface, borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', padding: 16, marginBottom: 20 },
  chartMetaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionHeading: { fontSize: 13, fontWeight: '800', color: THEME.textMain, letterSpacing: 0.2 },
  sectionSubheading: { fontSize: 11, color: THEME.textMuted, marginTop: 3 },
  percentageMetric: { fontSize: 22, fontWeight: '900', color: THEME.textMain, letterSpacing: -0.5 },
  svgContainer: { alignItems: 'center', marginTop: 5 },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 2 },
  xNode: { alignItems: 'center', width: 38 },
  xLabel: { fontSize: 11, color: THEME.textMuted, fontWeight: '700' },
  xValue: { fontSize: 10, color: '#10b981', fontWeight: '800', marginTop: 2 },
  feedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  linkText: { fontSize: 12, color: '#3b82f6', fontWeight: '700' },
  logContainer: { gap: 10 },
  logCard: { backgroundColor: THEME.surface, borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', padding: 14 },
  logMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  logUser: { fontSize: 13, fontWeight: '700', color: THEME.textMain },
  miniBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  miniBadgeText: { fontSize: 10, fontWeight: '700' },
  logText: { fontSize: 14, color: '#334155', lineHeight: 20, fontWeight: '500' },
  logTime: { fontSize: 10, fontWeight: '600', color: THEME.textMuted, marginTop: 8 }
});