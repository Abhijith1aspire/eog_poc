import React, { useState } from 'react';
import SignaturePad from '../../genericComponents/SignaturePad';
import { ScrollView } from 'react-native';
import { Themes } from '../../utils/themes';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home: React.FC = () => {
  const [editing, setEditing] = React.useState(false);

  const onSaveSignature = (sig: string | null) => {
    //
  };

  const onBegin = React.useCallback(() => {
    setEditing(true);
  }, []);

  const onEnd = React.useCallback(() => {
    setEditing(false);
  }, []);


  return (
    <SafeAreaView style={{ flex: 1,width:'100%' }}>
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


export default Home;
