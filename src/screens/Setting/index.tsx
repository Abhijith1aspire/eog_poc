import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../utils/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingColorInput = ({ label, value, onChange }: any) => (
  <View style={styles.inputRow}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, { backgroundColor: value }]}
      value={value}
      onChangeText={onChange}
    />
  </View>
);

const SettingsScreen = () => {
  const { colors, setColors } = useTheme();
  const [tempColors, setTempColors] = useState(colors);

const updateColor = (key: keyof typeof colors, value: string) => {
  setTempColors(prev => {
    const updated = { ...prev, [key]: value };
    setColors(updated);
    return updated;
  });
};

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={styles.container}>
      <Text style={styles.section}>Main Page Colors</Text>
      <SettingColorInput label="Title Color" value={tempColors.titleColor} onChange={(color: string) => updateColor('titleColor', color)} />
      <SettingColorInput label="Text Color" value={tempColors.textColor} onChange={(color: string) => updateColor('textColor', color)} />
      <SettingColorInput label="Button Background Color" value={tempColors.buttonBackgroundColor} onChange={(v: string) => updateColor('buttonBackgroundColor', v)} />
      <SettingColorInput label="Button Text Color" value={tempColors.buttonTextColor} onChange={(color: string) => updateColor('buttonTextColor', color)} />
      <SettingColorInput label="Separator Color" value={tempColors.separatorColor} onChange={(color: string) => updateColor('separatorColor', color)} />

      <Text style={styles.section}>Header Colors</Text>
      <SettingColorInput label="Header Background" value={tempColors.headerBackgroundColor} onChange={(color: string) => updateColor('headerBackgroundColor', color)} />
      <SettingColorInput label="Header Text Color" value={tempColors.headerTextColor} onChange={(color: string) => updateColor('headerTextColor', color)} />
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  label: { flex: 1, fontSize: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SettingsScreen;
