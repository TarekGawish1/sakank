import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyEmail: undefined;
  ResetPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  PropertyDetails: undefined;
  StayRequest: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
};

export type FavoritesStackParamList = {
  Favorites: undefined;
};

export type RequestsStackParamList = {
  MyRequests: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};

export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  SearchStack: NavigatorScreenParams<SearchStackParamList>;
  FavoritesStack: NavigatorScreenParams<FavoritesStackParamList>;
  RequestsStack: NavigatorScreenParams<RequestsStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<BottomTabParamList>;
};
