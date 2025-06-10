import React, { useRef, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import { moderateScale } from '../utils/metrics';
import { Themes } from '../utils/themes';

interface SignaturePadProps {
  penColor?: string;
  backgroundColor?: string;
  onSave?: (signature: string | null) => void;
  style?: object;
  descriptionText?: string;
  clearText?: string;
  confirmText?: string;
  onBegin: () => void
  onEnd: () => void
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  penColor = 'black',
  backgroundColor = 'white',
  onSave,
  style,
  descriptionText = 'Sign here',
  clearText = 'Clear',
  confirmText = 'Save',
  onBegin,
  onEnd
}) => {
  const [signature, setSignature] = useState<string | null>(null);
  const ref = useRef<any>(null);

  const handleSignature = (sig: string) => {
    setSignature(sig);
    if (onSave) onSave(sig);
  };

  const handleEmpty = () => {
  };

  const handleClear = () => {
    setSignature(null);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.preview, { backgroundColor }]}>
        {signature ? (
          <Image
            resizeMode="contain"
            style={styles.signatureImage}
            source={{ uri: signature }}
          />
        ) : (
          <Text style={styles.placeholderText}>{descriptionText}</Text>
        )}
      </View>

      {!signature && (
        <View style={{  height: moderateScale(300),width:'100%' }}>
          <SignatureCanvas
            ref={ref}
            onOK={handleSignature}
            onEmpty={handleEmpty}
            onClear={handleClear}
            onBegin={onBegin}
            onEnd={onEnd}
            autoClear={true}
            descriptionText={descriptionText}
            clearText={clearText}
            confirmText={confirmText}
            penColor={penColor}
            backgroundColor={backgroundColor}
            webStyle={`
  .m-signature-pad--footer { display: none; }
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .m-signature-pad {
    box-shadow: none;
    border: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
    position: fixed;
    margin:auto; 
    top: 0; 
  }
  .m-signature-pad--body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
`}



            style={{ height: moderateScale(300), width: '100%', borderWidth: 1 }}
          />
        </View>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: moderateScale(10) }}>
        {!signature && (
          <TouchableOpacity
            style={[styles.clearButton, { flex: 1, marginRight: moderateScale(5) }]}
            onPress={() => {
              ref.current?.readSignature();
            }}
          >
            <Text style={{ color: penColor, textAlign: 'center' }}>{confirmText}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.clearButton, { flex: 1, marginLeft: moderateScale(5) }]}
          onPress={() => {
            ref.current?.clearSignature();
            setSignature(null);
          }}
        >
          <Text style={{ color: penColor, textAlign: 'center' }}>{clearText}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default SignaturePad;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    width: '100%',
  },
  preview: {
    width: '100%',
    height: moderateScale(150),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScale(10),
    borderColor: Themes.lightGray,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
  },
  signatureImage: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    color: Themes.darkGray,
  },
  clearButton: {
    marginTop: moderateScale(10),
    alignSelf: 'center',
    width: moderateScale(120),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(6),
    borderWidth: moderateScale(1),
    borderColor: Themes.lightGray,
  },
});

