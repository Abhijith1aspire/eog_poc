import { StyleSheet } from "react-native";
import { fontSize, moderateScale } from "../utils/metrics";
import { Themes } from "../utils/themes";

const PhotoUploadComponentStyles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
  },
  sectionTitle: {
    fontSize: fontSize.px16,
    fontWeight: '600',
    marginBottom: moderateScale(8),
    color: Themes.black,
  },
  grid: {
    marginBottom: moderateScale(24),
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginBottom: moderateScale(20),
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: fontSize.px14,
    marginBottom: moderateScale(6),
    color: Themes.black,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Themes.blue,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Themes.white,
    position: 'relative',
    aspectRatio: 1,
    width: '80%',
  },
  addPhotoText: {
    color: Themes.blue,
    fontSize: fontSize.px16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageBox: {
    aspectRatio: 1,
    position: 'relative',
    borderRadius: 8,
    marginBottom: moderateScale(16),
    width: '100%',
    padding:moderateScale(10)
  },
  removeButton: {
    position: 'absolute',
    top: moderateScale(15),
    right: moderateScale(15),
    backgroundColor: Themes.black,
    borderRadius: 12,
    width: moderateScale(24),
    height: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  removeText: {
    color: Themes.white,
    fontSize: fontSize.px16,
    fontWeight: 'bold',
  },
  addButton: {
    marginBottom: moderateScale(16),
    backgroundColor: Themes.blue,
    padding: moderateScale(12),
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: Themes.white,
    fontSize: fontSize.px16,
  },
});
export default PhotoUploadComponentStyles;
