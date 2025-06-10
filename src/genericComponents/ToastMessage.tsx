import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  fontScale,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/metrics';
import { Themes } from '../utils/themes';
import FastImage from 'react-native-fast-image';
import { images } from '../constants/image';

interface ToastMessageProps {
  toastData: {
    visible: boolean;
    message: string;
    status: 'success' | 'error' | string;
  };
  onHideToast: () => void;
  notClose?: boolean;
}

const ToastMessage = ({ toastData, onHideToast, notClose = false }: ToastMessageProps) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(toastData?.visible || false);

  useEffect(() => {
    if (toastData?.visible) {
      setIsVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (!notClose) {
          setTimeout(() => {
            handleHideToast();
          }, 3000);
        }
      });
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
  }, [toastData]);

  const handleHideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      onHideToast();
    });
  };

  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={handleHideToast}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View
          style={[
            styles.messageContainer,
            {
              minHeight:
                toastData?.message?.length > 40
                  ? moderateScale(toastData?.message.length + 10)
                  : moderateScale(40),
              backgroundColor:
                toastData?.status === 'success' ? Themes.green : Themes.red,
            },
          ]}
        >
          <Text style={styles.message}>{toastData?.message}</Text>
          <TouchableOpacity onPress={handleHideToast} style={styles.closeButton}>
           <FastImage source={images.removeIcon} style={styles.topLeftTag} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: verticalScale(0),
    left: 0,
    right: 0,
    zIndex: 2000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    marginHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(12),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '85%',
  },
  message: {
    fontSize: fontScale(14),
    color: Themes.white,
    flex: 1,
  },
  closeButton: {
    marginLeft: moderateScale(10),
  },
  topLeftTag: {
        width: horizontalScale(15),
        height: horizontalScale(15),
        marginLeft: moderateScale(5)
    },

});
