import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignaturePad from '../../genericComponents/SignaturePad';
import { Themes } from '../../utils/themes';

const Home: React.FC = () => {
  const [editing, setEditing] = useState(false);

  const onSaveSignature = (sig: string | null) => {
    // handle saved signature here
  };

  const onBegin = useCallback(() => {
    setEditing(true);
  }, []);

  const onEnd = useCallback(() => {
    setEditing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={!editing}>
        <SignaturePad
          penColor="blue"
          backgroundColor={Themes.white}
          onSave={onSaveSignature}
          descriptionText="Please sign below"
          clearText="Clear"
          confirmText="Save"
          onBegin={onBegin}
          onEnd={onEnd}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:1
  },
});

export default Home;
