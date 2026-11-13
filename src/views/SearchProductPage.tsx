import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import {
  productSearchController,
  type Product,
  type SearchFilter,
} from '../controllers/ProductSearchController';
import { COLORS, RADIUS, SHADOW, SPACING } from '../constants/theme';
import { formatRupiah } from '../utils/format';

/* -------------------------------------------------------------------------- */
/*  Hook: logika state pencarian (debounce, loading, error, anti race-condition) */
/* -------------------------------------------------------------------------- */
function useProductSearch(keyword: string, filter: SearchFilter) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false; // abaikan respons lama jika input sudah berubah
    setLoading(true);

    const timer = setTimeout(
      async () => {
        try {
          const result = await productSearchController.search({ keyword, filter });
          if (cancelled) return;
          setProducts(result);
          setError(null);
        } catch (e) {
          if (cancelled) return;
          setProducts([]);
          setError(e instanceof Error ? e.message : 'Terjadi kesalahan tak terduga.');
        } finally {
          if (!cancelled) setLoading(false);
        }
      },
      keyword.trim() ? 400 : 0, // debounce hanya saat mengetik
    );

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [keyword, filter, reloadKey]);

  const retry = useCallback(() => setReloadKey((k) => k + 1), []);

  return { products, loading, error, retry };
}

/* -------------------------------------------------------------------------- */
/*  Konfigurasi UI                                                             */
/* -------------------------------------------------------------------------- */
const FILTER_CHIPS: { key: Exclude<SearchFilter, 'semua'>; label: string; placeholder: string }[] = [
  { key: 'nama', label: 'Nama', placeholder: 'Cari nama produk…' },
  { key: 'tag', label: 'Tag', placeholder: 'Cari tag, mis. minuman' },
  { key: 'bahan_baku', label: 'Bahan Baku', placeholder: 'Cari bahan baku, mis. gula' },
];

/* -------------------------------------------------------------------------- */
/*  Komponen kecil                                                             */
/* -------------------------------------------------------------------------- */
const ProductCard = memo(function ProductCard({
  item,
  onPress,
}: {
  item: Product;
  onPress?: (p: Product) => void;
}) {
  const margin =
    item.hargaJual !== null && item.hpp !== null ? item.hargaJual - item.hpp : null;

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Produk ${item.nama}`}
    >
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.nama}
      </Text>

      {item.tag.length > 0 && (
        <View style={styles.tagRow}>
          {item.tag.slice(0, 4).map((t) => (
            <View key={t} style={styles.tagPill}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.priceRow}>
        <View style={styles.priceCol}>
          <Text style={styles.priceLabel}>HPP</Text>
          <Text style={styles.priceValue}>{formatRupiah(item.hpp)}</Text>
        </View>
        <View style={styles.priceCol}>
          <Text style={styles.priceLabel}>Harga jual</Text>
          <Text style={styles.priceValue}>{formatRupiah(item.hargaJual)}</Text>
        </View>
        <View style={styles.priceCol}>
          <Text style={styles.priceLabel}>Margin</Text>
          <Text style={[styles.priceValue, margin !== null && margin >= 0 && styles.marginPositive]}>
            {formatRupiah(margin)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});

function StateMessage({
  icon,
  title,
  message,
  tone = 'neutral',
  actionLabel,
  onAction,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  message: string;
  tone?: 'neutral' | 'error';
  actionLabel?: string;
  onAction?: () => void;
}) {
  const isError = tone === 'error';
  return (
    <View style={styles.stateWrap}>
      <View style={[styles.stateIconCircle, isError && styles.stateIconCircleError]}>
        <Ionicons name={icon} size={44} color={isError ? COLORS.danger : COLORS.navy} />
      </View>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateMessage}>{message}</Text>
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*  Halaman                                                                    */
/* -------------------------------------------------------------------------- */
interface Props {
  /** Dipanggil saat card produk ditekan (mis. navigasi ke detail produk). */
  onPressProduct?: (product: Product) => void;
}

export default function SearchProductPage({ onPressProduct }: Props) {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState<SearchFilter>('semua');
  const { products, loading, error, retry } = useProductSearch(keyword, filter);

  const activeChip = FILTER_CHIPS.find((c) => c.key === filter);
  const hasKeyword = keyword.trim().length > 0;

  // Tekan chip aktif sekali lagi -> kembali ke pencarian nama + tag.
  const toggleChip = (key: SearchFilter) => setFilter((prev) => (prev === key ? 'semua' : key));

  const renderItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard item={item} onPress={onPressProduct} />,
    [onPressProduct],
  );

  let body: React.ReactNode;
  if (loading && products.length === 0) {
    body = (
      <View style={styles.centerWrap}>
        <ActivityIndicator size="large" color={COLORS.green} />
        <Text style={styles.loadingText}>Mencari produk…</Text>
      </View>
    );
  } else if (error) {
    body = (
      <StateMessage
        tone="error"
        icon="cloud-offline-outline"
        title="Gagal memuat produk"
        message={error}
        actionLabel="Coba lagi"
        onAction={retry}
      />
    );
  } else if (products.length === 0) {
    body = (
      <StateMessage
        icon="search-outline"
        title={hasKeyword ? 'Produk tidak ditemukan' : 'Belum ada produk'}
        message={
          hasKeyword
            ? 'Coba kata kunci lain atau ganti filter pencarian.'
            : 'Produk yang kamu tambahkan akan muncul di sini.'
        }
      />
    );
  } else {
    body = (
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            {products.length} produk{hasKeyword ? ' ditemukan' : ''}
          </Text>
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cari Produk</Text>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.muted} />
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder={activeChip?.placeholder ?? 'Cari nama produk atau tag…'}
            placeholderTextColor={COLORS.muted}
            style={styles.searchInput}
            returnKeyType="search"
            autoCorrect={false}
            onSubmitEditing={Keyboard.dismiss}
          />
          {hasKeyword && (
            <Pressable onPress={() => setKeyword('')} hitSlop={10} accessibilityLabel="Hapus pencarian">
              <Ionicons name="close-circle" size={20} color={COLORS.muted} />
            </Pressable>
          )}
        </View>

        {/* Filter chips */}
        <View style={styles.chipRow}>
          {FILTER_CHIPS.map((chip) => {
            const active = filter === chip.key;
            return (
              <Pressable
                key={chip.key}
                onPress={() => toggleChip(chip.key)}
                style={[styles.chip, active && styles.chipActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{chip.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.body}>{body}</View>
    </SafeAreaView>
  );
}

/* -------------------------------------------------------------------------- */
/*  Style                                                                      */
/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  headerTitle: { fontSize: 26, fontWeight: '800', color: COLORS.navy, marginBottom: SPACING.md },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.input,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    height: 50,
  },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.navy },

  chipRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.md },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.chip,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: { backgroundColor: COLORS.greenTint, borderColor: COLORS.green },
  chipText: { fontSize: 13, fontWeight: '600', color: COLORS.navySoft },
  chipTextActive: { color: COLORS.navy, fontWeight: '800' },

  body: { flex: 1 },
  listContent: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, gap: SPACING.md },
  resultCount: { fontSize: 13, color: COLORS.muted, marginBottom: SPACING.sm },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    ...SHADOW,
  },
  cardPressed: { opacity: 0.85 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: COLORS.navy },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: SPACING.sm },
  tagPill: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.chip,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagText: { fontSize: 12, color: COLORS.navySoft },
  priceRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  priceCol: { flex: 1 },
  priceLabel: { fontSize: 12, color: COLORS.muted },
  priceValue: { fontSize: 14, fontWeight: '700', color: COLORS.navy, marginTop: 2 },
  marginPositive: { color: COLORS.greenDark },

  centerWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  loadingText: { color: COLORS.navySoft, fontSize: 14 },

  stateWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: 60,
  },
  stateIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    ...SHADOW,
  },
  stateIconCircleError: { backgroundColor: COLORS.dangerTint },
  stateTitle: { fontSize: 18, fontWeight: '800', color: COLORS.navy, textAlign: 'center' },
  stateMessage: {
    fontSize: 14,
    color: COLORS.navySoft,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 20,
  },

  primaryButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.green,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: RADIUS.chip,
  },
  primaryButtonPressed: { backgroundColor: COLORS.greenDark },
  primaryButtonText: { color: COLORS.white, fontWeight: '800', fontSize: 15 },
});
