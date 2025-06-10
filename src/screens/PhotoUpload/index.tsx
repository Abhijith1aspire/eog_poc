import React from 'react';
import { ScrollView } from 'react-native';
import PhotoUploadComponent from '../../genericComponents/PhotoUploadComponent';


const PhotoUpload: React.FC = () => {
  
const imageFields = [
  { label: 'Installed', key: 'installed' },
  { label: 'Front RV', key: 'frontRV' },
  { label: 'Back RV', key: 'backRV' },
  { label: 'Misc 1', key: 'misc1' },
  { label: 'Misc 2', key: 'misc2' },
  { label: 'Rear-View Mirror', key: 'rearView' },
];
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PhotoUploadComponent
        mode="both"
        keyedData={imageFields}
        imageLimit={5}
      />
     </ScrollView>
  );
};


export default PhotoUpload;
