export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: { mode?: 'request' | 'recovery' | 'change' } | undefined;
  Home: undefined;
  Profile: undefined;
  AddProduct: undefined;
  Notifikasi: undefined;
  IzinNotifikasi: undefined;
  ProductDetail: { idProduk: string };
};
