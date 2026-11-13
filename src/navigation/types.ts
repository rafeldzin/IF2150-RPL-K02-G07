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
  
// nuha menambahkan editproduct dan pricehistorypage
  EditProduct: { idProduk: string; produkData: any }; 
  PriceHistoryPage: { idProduk: string; currentHargaJual: number; namaProduk: string };
};