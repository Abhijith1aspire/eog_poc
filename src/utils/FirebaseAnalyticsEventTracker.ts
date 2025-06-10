import analytics from '@react-native-firebase/analytics';

export enum FBAnalyticsSignInType {
  Email = 'email',
  Normal = 'normal',
  GoogleSignIn = 'googleSignIn',
  MobileNumber = 'Mobilenum'
}

export enum FBAnalyticsEvent {
  ScreenView = 'screen_view',
  AddToWishlist = 'add_to_wishlist',
  RemoveFromWishlist = 'remove_from_wishlist',
  RemoveFromCart = 'remove_from_cart',
  AddToCart = 'add_to_cart',
  Login = 'login',
  SignUp = 'sign_up',
  Purchase = 'purchase',
  ViewItem = 'view_item'
}

export interface FBAnalyticsViewItem {
  item_id: string;
  quantity: number;
  item_name: string;
  item_brand: string;
  item_category: string;
  price: string | number;
}

export interface FBAnalyticsScreenDetails {
  screen_name: string;
  screen_class: string;
}

export const trackScreenView = async (screenDetails: FBAnalyticsScreenDetails) => {
  await analytics().logScreenView({
    screen_name: screenDetails.screen_name,
    screen_class: screenDetails.screen_class,
  });
};

export const trackViewItem = async (itemDetails: FBAnalyticsViewItem) => {
  await analytics().logEvent(FBAnalyticsEvent.ViewItem, {
    item_id: itemDetails.item_id,
    item_name: itemDetails.item_name,
    item_brand: itemDetails.item_brand,
    item_category: itemDetails.item_category,
    quantity: itemDetails.quantity,
    price: itemDetails.price,
  });
};

export const trackCustomEvent = async (
  eventName: FBAnalyticsEvent, 
  payload: Record<string, any>
) => {
  await analytics().logEvent(eventName, payload);
};
