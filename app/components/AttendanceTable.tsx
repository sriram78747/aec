import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AttendanceRow = {
  subject: string;
  held: string;
  attend: string;
  percent: string;
};

export default function AttendanceTable({ table }: { table: AttendanceRow[] | null }) {
  if (!table || table.length === 0) {
    return <Text style={styles.noData}>No Attendance Data Available</Text>;
  }

  return (
    <View style={styles.table}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Subject</Text>
        <Text style={styles.headerCell}>Held</Text>
        <Text style={styles.headerCell}>Attend</Text>
        <Text style={styles.headerCell}>%</Text>
      </View>

      {table.map((row, index) => (
        <View key={index} style={styles.dataRow}>
          <Text style={styles.dataCell}>{row.subject || 'NA'}</Text>
          <Text style={styles.dataCell}>{row.held || 'NA'}</Text>
          <Text style={styles.dataCell}>{row.attend || 'NA'}</Text>
          <Text style={styles.dataCell}>{row.percent || 'NA'}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  dataRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  dataCell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  noData: {
    marginTop: 10,
    fontStyle: 'italic',
    color: 'gray',
  },
});