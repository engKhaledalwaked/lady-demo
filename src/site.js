// البيانات من صفحة الاستوديو على خرائط Google
export const site = {
  whatsapp: '966570187888',
  phone: { tel: '+966570187888', label: '057 018 7888' },
  rating: '4.4',
  reviews: '344',
  maps: 'https://www.google.com/maps/search/?api=1&query=24.7602585,46.759333',
  mapEmbed: 'https://www.google.com/maps?q=24.7602585,46.759333&z=17&output=embed',
}
export const img = (p) => `/img/${p}`
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
