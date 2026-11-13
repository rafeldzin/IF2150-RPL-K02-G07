import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { PriceHistoryController, ChartDataPoint } from '../controllers/PriceHistoryController';
import { RootStackParamList } from '../navigation/types';

export default function PriceHistoryPage() {
  const route = useRoute<RouteProp<RootStackParamList, 'PriceHistoryPage'>>();
  const { idProduk, currentHargaJual, namaProduk } = route.params;

  const [rentangWaktu, setRentangWaktu] = useState<number>(30); // Default 30 hari
  const [dataGrafik, setDataGrafik] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    muatDataGrafik();
  }, [rentangWaktu]);

  const muatDataGrafik = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const controller = new PriceHistoryController(idProduk, currentHargaJual);
      const data = await controller.generateChartData(rentangWaktu);
      setDataGrafik(data);
    } catch (error: any) {
      setErrorMessage(error.message || 'Gagal memuat riwayat harga');
      setDataGrafik([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatChartData = () => {
    if (dataGrafik.length === 0) return null;

    return {
      labels: dataGrafik.map(titik => 
        titik.waktu.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
      ),
      datasets: [
        {
          data: dataGrafik.map(titik => titik.harga),
        }
      ]
    };
  };

  const chartData = formatChartData();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Harga Jual</Text>
      <Text style={styles.subtitle}>{namaProduk}</Text>

      {/* Filter Rentang Waktu */}
      <View style={styles.filterContainer}>
        {[7, 30, 90].map((hari) => (
          <TouchableOpacity 
            key={hari}
            style={[styles.filterButton, rentangWaktu === hari && styles.filterButtonActive]}
            onPress={() => setRentangWaktu(hari)}
          >
            <Text style={[styles.filterText, rentangWaktu === hari && styles.filterTextActive]}>
              {hari} Hari
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Area Konten (Loading / Error / Grafik) */}
      <View style={styles.contentArea}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : errorMessage !== '' ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : chartData ? (
          <View>
            <LineChart
              data={chartData}
              width={Dimensions.get('window').width - 40} // Lebar layar dikurangi padding
              height={220}
              yAxisLabel="Rp"
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: { r: '4', strokeWidth: '2', stroke: '#007bff' }
              }}
              bezier
              style={styles.chart}
            />
            <Text style={styles.currentPriceText}>
              Harga Saat Ini: Rp {currentHargaJual.toLocaleString('id-ID')}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  filterButton: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#007bff', borderRadius: 8, marginHorizontal: 5, alignItems: 'center' },
  filterButtonActive: { backgroundColor: '#007bff' },
  filterText: { color: '#007bff', fontWeight: 'bold' },
  filterTextActive: { color: '#fff' },
  contentArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorBox: { padding: 20, backgroundColor: '#ffe6e6', borderRadius: 8 },
  errorText: { color: '#d9534f', fontWeight: 'bold', textAlign: 'center' },
  chart: { marginVertical: 8, borderRadius: 16 },
  currentPriceText: { textAlign: 'center', marginTop: 15, fontSize: 16, fontWeight: 'bold', color: '#333' }
});