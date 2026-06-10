import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, 
  SafeAreaView, StatusBar, ScrollView, TextInput, Platform 
} from 'react-native';

const COLORS = {
  bg: '#FBF7E3',
  bg_white: '#FFFFFF',
  primary: '#4A3B32',
  text_dark: '#000000',
  text_gray: '#757575',
  border: '#EFECE0',
};

const backIcon = require('../assets/imge/back.png');
const bananaImg = require('../assets/imge/B1.jpg');

export default function HistoryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const historyData = [
    { id: '1', date: '31 พฤษภาคม 2569', status: 'สุก', confidence: '0.92', img: bananaImg },
    { id: '2', date: '30 พฤษภาคม 2569', status: 'ดิบ', confidence: '0.92', img: bananaImg },
  ];

  const filteredData = historyData.filter(item => 
    item.date.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HISTORY</Text>
        <View style={{ width: 44 }} /> 
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="SEARCH"
          placeholderTextColor={COLORS.text_gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {filteredData.map((item) => (
          <View key={item.id} style={styles.section}>
            <Text style={styles.dateHeader}>{item.date}</Text>
            <TouchableOpacity style={styles.historyCard} activeOpacity={0.9}>
              <Image source={item.img} style={styles.bananaImage} />
              <View style={styles.textContainer}>
                <Text style={styles.statusText}>ระดับ: <Text style={styles.boldText}>{item.status}</Text></Text>
                <Text style={styles.confidenceText}>ความมั่นใจ: {item.confidence}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
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
  
  searchContainer: { 
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 10,
    backgroundColor: COLORS.bg_white, borderRadius: 15, 
    borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 15,
    height: 55, ...Platform.select({ android: { elevation: 2 } })
  },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '700', color: COLORS.text_dark },
  searchIcon: { fontSize: 20 },

  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  section: { marginBottom: 5 },
  dateHeader: { fontSize: 16, fontWeight: '700', color: COLORS.text_dark, marginVertical: 10 },
  
  historyCard: { 
    flexDirection: 'row', backgroundColor: COLORS.bg_white, 
    padding: 12, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.border,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
      android: { elevation: 3 }
    })
  },
  bananaImage: { width: 80, height: 60, borderRadius: 12 },
  textContainer: { marginLeft: 15, justifyContent: 'center' },
  statusText: { fontSize: 16, color: COLORS.primary },
  boldText: { fontWeight: '800' },
  confidenceText: { fontSize: 14, color: COLORS.text_gray, marginTop: 4 }
});