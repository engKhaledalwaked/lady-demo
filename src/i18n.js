import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('lady-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('lady-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لستوديو ليدي',
    brand: 'ستوديو ليدي', brandSub: 'للتصوير النسائي',
    nav: { services: 'خدماتنا', idphoto: 'صور الأحوال', studio: 'الاستوديو', reviews: 'آراء العميلات', visit: 'الموقع', book: 'احجزي' },
    hero: {
      kicker: 'استوديو تصوير نسائي · حي القدس، الرياض',
      title1: 'مساحتكِ الخاصة…',
      title2: 'بعدسة نسائية',
      lead: 'صور الأحوال والهوية والجواز خلال دقائق، وتصوير المناسبات والمنتجات، وطباعة وتأطير وألبومات — بطاقم نسائي بالكامل وخصوصية تامة.',
      cta1: 'احجزي عبر واتساب', cta2: 'شروط صورة الأحوال',
      badges: ['طاقم نسائي بالكامل', 'جاهزة خلال دقائق', 'نسخة رقمية على واتساب'],
      reviews: 'مراجعة على Google',
    },
    services: {
      kicker: 'خدماتنا',
      title: 'كل ما تحتاجينه من الصورة… حتى الإطار',
      items: [
        { k: 'id', t: 'صور الأحوال والجواز', d: 'صور رسمية مطابقة لاشتراطات الأحوال المدنية والجوازات، جاهزة خلال دقائق.', img: 'reception.jpg' },
        { k: 'events', t: 'المناسبات والزواج', d: 'الملكة والخطوبة والزفاف — تفاصيل اليوم الذي لا يتكرر.', img: 'wedding-hands.jpg' },
        { k: 'product', t: 'تصوير المنتجات', d: 'صور احترافية لمنتجاتكِ ومتجركِ الإلكتروني وحساباتكِ.', img: 'product-shot.jpg' },
        { k: 'print', t: 'طباعة وتأطير وألبومات', d: 'ألبومات فاخرة، إطارات بأحجام مختلفة، ولوحات جاهزة للتعليق.', img: 'albums.jpg' },
        { k: 'restore', t: 'ترميم الصور القديمة', d: 'نعيد الحياة لصور العائلة القديمة: تنظيف وإصلاح وطباعة جديدة.', img: null },
      ],
      book: 'احجزي هذه الخدمة',
    },
    idphoto: {
      kicker: 'صور الأحوال المدنية',
      title: 'قبل أن تأتي… هذه اشتراطات الصورة',
      sub: 'حسب اشتراطات الأحوال المدنية المعلّقة في الاستوديو. نحن غير مسؤولين عن رفض الصورة المخالفة لهذه الشروط.',
      rules: [
        { t: 'خلفية بيضاء', d: 'نجهّزها لكِ في الاستوديو.' },
        { t: 'بدون نظارات أو عدسات', d: 'يُرجى إزالة العدسات الملوّنة قبل التصوير.' },
        { t: 'صورة حديثة وملوّنة', d: 'تُلتقط في نفس اليوم.' },
        { t: 'تغطية شعر الرأس', d: 'مع ظهور الوجه كاملاً.' },
        { t: 'زينة خفيفة', d: 'مكياج بسيط وطبيعي.' },
      ],
      cta: 'اسألي عن صورة لجهة أخرى',
      ask: 'مرحباً، أحتاج صوراً رسمية لـ: ',
    },
    studio: {
      kicker: 'الاستوديو',
      title: 'هادئ، أنيق، ونسائي بالكامل',
      p: 'صالة انتظار مريحة بزجاج يفصل منطقة الاستقبال، ركن تصوير مجهّز بإضاءة احترافية، وركن عرض للألبومات والإطارات.',
      labels: { lounge: 'صالة الاستقبال', 'shooting-set': 'ركن التصوير', seating: 'جلسة الانتظار', albums: 'الألبومات والإطارات', storefront: 'الواجهة', reception: 'الاستقبال' },
    },
    reviews: {
      kicker: 'آراء العميلات',
      title: 'نوف… الاسم الذي تكرّره العميلات',
      count: 'مراجعة على Google',
      note: 'مقتطفات حقيقية من مراجعات الاستوديو على خرائط Google.',
    },
    book: {
      kicker: 'الحجز',
      title: 'احجزي موعدكِ',
      sub: 'املئي البيانات وسيفتح واتساب برسالة جاهزة للاستوديو.',
      name: 'الاسم', phone: 'رقم الجوال', service: 'الخدمة', date: 'اليوم المفضّل', people: 'عدد الأشخاص', note: 'ملاحظات',
      send: 'أرسلي الطلب عبر واتساب',
      required: 'الرجاء كتابة الاسم ورقم الجوال.',
      walkin: 'صور الأحوال والجواز لا تحتاج حجزاً — تفضّلي مباشرة خلال أوقات الدوام.',
      msg: { hello: 'مرحباً ستوديو ليدي، أرغب بحجز موعد', name: 'الاسم', phone: 'الجوال', service: 'الخدمة', date: 'اليوم', people: 'عدد الأشخاص', note: 'ملاحظات' },
    },
    visit: {
      kicker: 'الموقع والمواعيد',
      title: 'نستقبلكِ مساءً',
      addr: 'طريق الأمير سعود بن عبدالعزيز آل سعود الكبير، حي القدس، الرياض 13214',
      hours: [
        { d: 'السبت – الأربعاء', h: '٤:٠٠ – ١٠:٠٠ م' },
        { d: 'الخميس', h: '٤:٠٠ – ٩:٣٠ م' },
        { d: 'الجمعة', h: 'مغلق' },
      ],
      dir: 'الاتجاهات', call: 'اتصال',
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية' },
    sticky: { call: 'اتصال', book: 'احجزي عبر واتساب' },
    close: 'إغلاق',
  },
  en: {
    ribbon: 'Demo preview — prepared for Lady Studio',
    brand: 'Lady Studio', brandSub: 'Women’s photography',
    nav: { services: 'Services', idphoto: 'ID photos', studio: 'Studio', reviews: 'Reviews', visit: 'Visit', book: 'Book' },
    hero: {
      kicker: 'Women-only photo studio · Al Quds, Riyadh',
      title1: 'Your private space,',
      title2: 'through a woman’s lens',
      lead: 'Civil-ID, national-ID and passport photos in minutes, event and product photography, printing, framing and albums — with an all-female team and complete privacy.',
      cta1: 'Book on WhatsApp', cta2: 'ID photo requirements',
      badges: ['All-female team', 'Ready in minutes', 'Digital copy on WhatsApp'],
      reviews: 'Google reviews',
    },
    services: {
      kicker: 'Services',
      title: 'Everything from the photo to the frame',
      items: [
        { k: 'id', t: 'ID & passport photos', d: 'Official photos matching Civil Affairs and passport requirements, ready in minutes.', img: 'reception.jpg' },
        { k: 'events', t: 'Events & weddings', d: 'Milka, engagement and wedding — every detail of a once-in-a-lifetime day.', img: 'wedding-hands.jpg' },
        { k: 'product', t: 'Product photography', d: 'Professional shots for your products, online store and social accounts.', img: 'product-shot.jpg' },
        { k: 'print', t: 'Printing, framing & albums', d: 'Luxury albums, frames in many sizes and ready-to-hang prints.', img: 'albums.jpg' },
        { k: 'restore', t: 'Old photo restoration', d: 'We bring old family photos back to life: cleaned, repaired and reprinted.', img: null },
      ],
      book: 'Book this service',
    },
    idphoto: {
      kicker: 'Civil Affairs photos',
      title: 'Before you come — the photo requirements',
      sub: 'Per the Civil Affairs requirements posted in the studio. We are not responsible for photos rejected for not meeting them.',
      rules: [
        { t: 'White background', d: 'We set it up in the studio.' },
        { t: 'No glasses or lenses', d: 'Please remove coloured contact lenses.' },
        { t: 'Recent & in colour', d: 'Taken on the same day.' },
        { t: 'Hair covered', d: 'With the whole face visible.' },
        { t: 'Light make-up', d: 'Simple and natural.' },
      ],
      cta: 'Ask about another authority',
      ask: 'Hello, I need official photos for: ',
    },
    studio: {
      kicker: 'The studio',
      title: 'Calm, elegant — and women-only',
      p: 'A comfortable glass-screened lounge, a shooting corner with professional lighting, and a display of albums and frames.',
      labels: { lounge: 'Lounge', 'shooting-set': 'Shooting corner', seating: 'Waiting area', albums: 'Albums & frames', storefront: 'Storefront', reception: 'Reception' },
    },
    reviews: {
      kicker: 'Reviews',
      title: 'Nouf — the name our clients keep mentioning',
      count: 'Google reviews',
      note: 'Real excerpts from the studio’s Google Maps reviews (shown in Arabic).',
    },
    book: {
      kicker: 'Booking',
      title: 'Book your visit',
      sub: 'Fill in the details and WhatsApp opens with a ready message to the studio.',
      name: 'Name', phone: 'Mobile', service: 'Service', date: 'Preferred day', people: 'People', note: 'Notes',
      send: 'Send request on WhatsApp',
      required: 'Please enter your name and mobile number.',
      walkin: 'ID and passport photos need no booking — just walk in during opening hours.',
      msg: { hello: 'Hello Lady Studio, I would like to book', name: 'Name', phone: 'Mobile', service: 'Service', date: 'Day', people: 'People', note: 'Notes' },
    },
    visit: {
      kicker: 'Location & hours',
      title: 'We welcome you in the evening',
      addr: 'Prince Saud bin Abdulaziz Al Saud Al Kabir Rd., Al Quds, Riyadh 13214',
      hours: [
        { d: 'Saturday – Wednesday', h: '4:00 – 10:00 PM' },
        { d: 'Thursday', h: '4:00 – 9:30 PM' },
        { d: 'Friday', h: 'Closed' },
      ],
      dir: 'Directions', call: 'Call',
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview' },
    sticky: { call: 'Call', book: 'Book on WhatsApp' },
    close: 'Close',
  },
}
export const t = computed(() => dict[lang.value])

export const reviews = [
  { n: 'Asma', q: 'كل الشكر والتقدير للمصورة نوف، على احترافيتها وتعاونها وحرصها على أدق التفاصيل. ضبطت لي صورة الأحوال بشكل جميل، والنتيجة تستحق المشوار بكل تأكيد.' },
  { n: 'noura', q: 'كنت احتاج صورة للهوية رحت لهم مع نوف 📸 صراحة انها فاهمه شغلها والتعامل معها مريح وسريع، ما اخذنا ولا عشر دقايق الا وكل شي جاهز والمبلغ رمزي.' },
  { n: 'almaha9', q: 'خدمه مميزه وسرعه انجاز… وتعلمك وتعدل لك وتعطيك الصور وترسلها لك بعد، وكل هذا بروح حلوه وابتسامه، وتطلع وانت راضي.' },
]
