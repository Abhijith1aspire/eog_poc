import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, FlatList, ScrollView, useWindowDimensions,
  SafeAreaView
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import PhotoUploadComponentStyles from './PhotoUploadComponentStyles';
import { Themes } from '../utils/themes';
import i18n from '../utils/i18n';
import ToastMessage from './ToastMessage';
import { useTheme } from '../utils/ThemeContext';

interface UploadItem {
  label: string;
  key: string;
}

type Mode = 'keyed' | 'multi' | 'both';

interface PhotoUploadProps {
  mode?: Mode;
  keyedData?: UploadItem[];
  multiImage?: boolean;
  imageLimit?: number;
  keyedNumColumns?: number;
  multiNumColumns?: number;
}

const PhotoUploadComponent: React.FC<PhotoUploadProps> = ({
  mode = 'keyed',
  keyedData = [],
  multiImage = true,
  imageLimit = 5,
  keyedNumColumns = 2,
  multiNumColumns = 2,
}) => {
  const [keyedImages, setKeyedImages] = useState<{ [key: string]: Asset | null }>({});
  const [multiImages, setMultiImages] = useState<Asset[]>([]);
  const [toast, setToast] = useState<any>({
    visible: false,
    message: '',
    status: "success",
    notClose: false,
  });

  const { width } = useWindowDimensions();
  const keyedItemWidth = (width - 32 - keyedNumColumns * 10) / keyedNumColumns;
  const multiItemWidth = (width - 32 - multiNumColumns * 10) / multiNumColumns;


  const { colors } = useTheme();

  const checkImageSize = async (fileSize: number): Promise<boolean> => {
    const fileSizeInMB = fileSize / (1024 * 1024);
    const maxAllowedSizeMB = 2;

    if (fileSizeInMB > maxAllowedSizeMB) {
      setToast({
        visible: true,
        message: `Image size exceeds limit: ${maxAllowedSizeMB} MB`,
        status: 'error',
        notClose: false,
      });
      return false;
    }
    return true;
  };

  const selectKeyedImage = async (key: string) => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    if (result.assets?.length) {
      const asset = result.assets[0];
      if (asset.fileSize && !(await checkImageSize(asset.fileSize))) return;
      setKeyedImages(prev => ({ ...prev, [key]: asset }));
    }
  };

  const removeKeyedImage = (key: string) => {
    setKeyedImages(prev => ({ ...prev, [key]: null }));
  };

  const selectMultiImages = async () => {
    const remaining = imageLimit - multiImages.length;
    if (remaining <= 0) return;

    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: multiImage ? remaining : 1 });
    const validAssets: Asset[] = [];

    for (const asset of result.assets || []) {
      if (asset.fileSize && await checkImageSize(asset.fileSize)) validAssets.push(asset);
    }

    setMultiImages(prev => [...prev, ...validAssets]);
  };

  const removeMultiImage = (index: number) => {
    setMultiImages(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const renderKeyedItem = ({ item }: { item: UploadItem }) => {
    const image = keyedImages[item.key];
    return (
      <View style={[PhotoUploadComponentStyles.itemContainer, { width: keyedItemWidth }]}>
        <Text style={[PhotoUploadComponentStyles.label,{color:colors.titleColor}]}>{item.label}</Text>
        <TouchableOpacity
          style={[PhotoUploadComponentStyles.uploadBox,{borderColor:colors.buttonBackgroundColor}]}
          onPress={() => selectKeyedImage(item.key)}
        >
          {image ? (
            <>
              <Image source={{ uri: image.uri }} style={PhotoUploadComponentStyles.image} />
              <TouchableOpacity
                style={PhotoUploadComponentStyles.removeButton}
                onPress={() => removeKeyedImage(item.key)}
              >
                <Text style={PhotoUploadComponentStyles.removeText}>×</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={[PhotoUploadComponentStyles.addPhotoText]}>+ Add photo</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderMultiImageItem = ({ item, index }: { item: Asset; index: number }) => (
    <View style={[PhotoUploadComponentStyles.imageBox, { width: multiItemWidth }]}>
      <Image source={{ uri: item.uri }} style={PhotoUploadComponentStyles.image} />
      <TouchableOpacity
        style={PhotoUploadComponentStyles.removeButton}
        onPress={() => removeMultiImage(index)}
      >
        <Text style={PhotoUploadComponentStyles.removeText}>×</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={PhotoUploadComponentStyles.container}>
      {(mode === 'keyed' || mode === 'both') && (
        <>
          <Text style={[PhotoUploadComponentStyles.sectionTitle,{color:colors.headerTextColor}]}>Labeled Photos</Text>
          <FlatList
            data={keyedData}
            renderItem={renderKeyedItem}
            keyExtractor={item => item.key}
            numColumns={keyedNumColumns}
            scrollEnabled={false}
            contentContainerStyle={PhotoUploadComponentStyles.grid}
          />
        </>
      )}

      {(mode === 'multi' || mode === 'both') && (
        <>
          <Text style={PhotoUploadComponentStyles.sectionTitle}>{i18n.t("generalPhotos")}</Text>
          <TouchableOpacity style={[PhotoUploadComponentStyles.addButton,{backgroundColor:colors.buttonBackgroundColor}]} onPress={selectMultiImages}>
            <Text style={[PhotoUploadComponentStyles.addButtonText,{color:colors.buttonTextColor}]}>{i18n.t("generalPhotos")}</Text>
          </TouchableOpacity>
          <FlatList
            data={multiImages}
            renderItem={renderMultiImageItem}
            keyExtractor={(item, index) => `${item.uri}-${index}`}
            numColumns={multiNumColumns}
            scrollEnabled={false}
            contentContainerStyle={PhotoUploadComponentStyles.grid}
          />
        </>
      )}

      <ToastMessage
        notClose={toast.notClose}
        toastData={toast}
        onHideToast={() => setToast({ ...toast, visible: false })}
      />
    </ScrollView>
    </SafeAreaView>
  );
};

export default PhotoUploadComponent;
