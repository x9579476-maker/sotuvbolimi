/**
 * ==========================================================================
 * 🏢 MAKON UY-JOY — ZAMONAVIY KO'CHMAS MULK PLATFORMASI
 * Master JavaScript Controller
 * To'liq mukammallashtirilgan JavaScript Controller
 * Narxlar, Fotogalereya, Aniq Joylashuv, Ipoteka Kalkulyatori & Filtrlash
 * ==========================================================================
 */

// ==================== 1. GLOBAL ILOVA HOLATI (STATE) ====================
const appState = {
    theme: localStorage.getItem('makon_theme') || 'light',
    dealType: 'sale', // 'sale' yoki 'rent'
    dealType: 'sale', // 'sale' (sotib olish) yoki 'rent' (ijara)
    activeCategory: 'all',
    currentDistrict: 'all',
    currentType: 'all',
    currentRooms: 'all',
    maxPrice: 'all',
    sortBy: 'newest',
    favorites: JSON.parse(localStorage.getItem('makon_favorites') || '[]'),
    properties: []
};

// ==================== 2. REAL UYLAR VA KVARTIRALAR BAZASI ====================
const INITIAL_PROPERTIES = [
    // --- SOTUV (SALE) ---
    {
        id: 'prop-1',
        title: 'Tashkent City Gardens Residence — 3 xonali premium xonadon',
        priceUsd: 155000,
        priceUzs: '1 984 000 000 so‘m',
        pricePerM2: '1 630 $/m²',
        dealType: 'sale',
        category: 'apartment',
        district: 'Shayxontohur',
        address: 'Toshkent sh., Shayxontohur tumani, Navoiy ko‘chasi, Tashkent City',
        rooms: 3,
        area: 95,
        floor: '7/16',
        repair: 'Mualliflik neoklassik dizayn',
        builtYear: 2024,
        metro: 'Alisher Navoiy metrosi (300 m)',
        badges: [{ text: 'Yangi Bino', class: 'tag-new' }, { text: 'Toshkent City', class: 'tag-vip' }],
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Shovqinsiz tezyurar lift', 'Yerosti 2 qavatli parkovka', 'Bolalar xiyoboni', '24/7 Qo‘riqlash xizmati', 'Smart Home (aqlli uy)', 'Panorama derazalar'],
        agent: {
            name: 'Akmal Zokirov',
            phone: '+998 (90) 812-40-50',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            deals: '42 ta bitim'
        },
        desc: 'Toshkent City parkining qoq markazida joylashgan premium darajadagi xonadon. Uy to‘liq italyan mebellari va nemis maishiy texnikalari bilan jihozlangan. Katta terassa va favvorali ko‘rinish.'
    },
    {
        id: 'prop-2',
        title: 'Mirzo Ulug‘bek tumani — 2 xonali shinam kvartira (Novostroyka)',
        priceUsd: 68000,
        priceUzs: '870 400 000 so‘m',
        pricePerM2: '1 046 $/m²',
        dealType: 'sale',
        category: 'apartment',
        district: 'Mirzo Ulug‘bek',
        address: 'Toshkent sh., Mirzo Ulug‘bek tumani, Sayram ko‘chasi, 42-uy',
        rooms: 2,
        area: 65,
        floor: '4/9',
        repair: 'Yevro ta’mir',
        builtYear: 2023,
        metro: 'Buyuk Ipak Yo‘li metrosi (7 daqiqa)',
        badges: [{ text: 'Super Narx', class: 'tag-deal' }],
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Zamonaviy lift', 'Qo‘riqlanadigan hovli', 'Individual isitish qozoni (kotyol)', 'Internet Wi-Fi', 'Domofon'],
        agent: {
            name: 'Nodira Qodirova',
            phone: '+998 (97) 400-33-22',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
            deals: '28 ta bitim'
        },
        desc: 'Tinch va yashil hududda joylashgan yangi g‘ishtli bino. Xonalar alohida-alohida, keng oshxona va sanuzel. Uy atrofida maktab, bog‘cha va supermarketlar mavjud.'
    },
    {
        id: 'prop-3',
        title: 'Chilonzor 9-mavze — 3 xonali hamyonbop xonadon',
        priceUsd: 58000,
        priceUzs: '742 400 000 so‘m',
        pricePerM2: '828 $/m²',
        dealType: 'sale',
        category: 'budget',
        district: 'Chilonzor',
        address: 'Toshkent sh., Chilonzor tumani, 9-mavze, Katta Qa’ni ko‘chasi',
        rooms: 3,
        area: 70,
        floor: '3/5',
        repair: 'Toza kosmetik ta’mir',
        builtYear: 2018,
        metro: 'Chilonzor metrosi (piyoda 8 daqiqa)',
        badges: [{ text: 'Arzon Narx', class: 'tag-deal' }],
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Balkon 2x6m', 'Konditsioner', 'Oshxona mebeli', 'Plastik derazalar', 'Kabel TV'],
        agent: {
            name: 'Bobur Mirzayev',
            phone: '+998 (93) 515-20-10',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            deals: '35 ta bitim'
        },
        desc: 'Chilonzor markazidagi qulay 3 xonali xonadon. Fransuz rejali, xonalar yorug‘ va qulay. Ipotekaga beriladi!'
    },
    {
        id: 'prop-4',
        title: 'Qibray / Do‘rmon — 6 xonali hashamatli Hovli Kottedj',
        priceUsd: 280000,
        priceUzs: '3 584 000 000 so‘m',
        pricePerM2: '777 $/m²',
        dealType: 'sale',
        category: 'house',
        district: 'Mirzo Ulug‘bek',
        address: 'Toshkent vil., Qibray tumani, Do‘rmon xiyoboni',
        rooms: 6,
        area: 360,
        floor: '2 qavatli hovli (6 sotix)',
        repair: 'Eksklyuziv klassik uslub',
        builtYear: 2023,
        metro: 'Toshkent shahridan 10 daqiqa',
        badges: [{ text: 'VIP Hovli', class: 'tag-vip' }, { text: '6 Sotix', class: 'tag-new' }],
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Yozgi va qishki basseyn', 'Fin saunasi & turk hammomi', 'Avtomobil uchun 4 o‘rinli avtoturargoh', 'Lashkara chorbog‘', 'Avtomatik sug‘orish'],
        agent: {
            name: 'Akmal Zokirov',
            phone: '+998 (90) 812-40-50',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            deals: '42 ta bitim'
        },
        desc: 'Sof tog‘ havosi bilan uyg‘unlashgan ajoyib kottedj. Katta yashil maysa, dekorativ archalar va sharshara. Butun oilangiz uchun tengi yo‘q osoyishta maskan.'
    },
    {
        id: 'prop-5',
        title: 'Mirobod tumani — 4 xonali Lyuks Pentxaus (Oybek metrosi)',
        priceUsd: 240000,
        priceUzs: '3 072 000 000 so‘m',
        pricePerM2: '1 600 $/m²',
        dealType: 'sale',
        category: 'villa',
        district: 'Mirobod',
        address: 'Toshkent sh., Mirobod tumani, Nukus ko‘chasi, 89-uy',
        rooms: 4,
        area: 150,
        floor: '12/12 (Penthouse)',
        repair: 'High-Tech dizayn',
        builtYear: 2024,
        metro: 'Oybek metrosi (400 metr)',
        badges: [{ text: 'Pentxaus', class: 'tag-vip' }, { text: 'Panoramik', class: 'tag-new' }],
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Shaxsiy tom terassasi (60 m²)', 'Jakuzi va barbekyu zonasi', 'Konsyerj xizmati', 'Yuqori tezlikdagi lift', 'Konditsioner tizimi'],
        agent: {
            name: 'Nodira Qodirova',
            phone: '+998 (97) 400-33-22',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
            deals: '28 ta bitim'
        },
        desc: 'Toshkent shahriga 360 daraja panoramik ko‘rinishga ega betakror pentxaus. Tomda dam olish uchun qulay ayvon va shaxsiy dam olish maydoni.'
    },
    {
        id: 'prop-6',
        title: 'Yunusobod 19-mavze — 1 xonali ixcham kvartira (Studia)',
        priceUsd: 38500,
        priceUzs: '492 800 000 so‘m',
        pricePerM2: '962 $/m²',
        dealType: 'sale',
        category: 'budget',
        district: 'Yunusobod',
        address: 'Toshkent sh., Yunusobod tumani, 19-mavze, Yangi bino',
        rooms: 1,
        area: 40,
        floor: '5/10',
        repair: 'Yangi sifatli ta’mir',
        builtYear: 2024,
        metro: 'Turkiston metrosi (piyoda 6 daqiqa)',
        badges: [{ text: 'Ipoteka 17%', class: 'tag-deal' }],
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Oshxona mebeli', 'Kir yuvish mashinasi o‘rni', 'Keng vitrina deraza', 'Kamera nazorati'],
        agent: {
            name: 'Bobur Mirzayev',
            phone: '+998 (93) 515-20-10',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            deals: '35 ta bitim'
        },
        desc: 'Yosh oilalar yoki ijaraga berish uchun ajoyib investitsiya. Barcha mebel va santexnika yangi o‘rnatilgan. Hujjatlari to‘liq tayyor.'
    },
    {
        id: 'prop-7',
        title: 'Yakkasaroy tumani — 3 xonali shahar markazidagi xonadon',
        priceUsd: 92000,
        priceUzs: '1 177 600 000 so‘m',
        pricePerM2: '1 120 $/m²',
        dealType: 'sale',
        category: 'apartment',
        district: 'Yakkasaroy',
        address: 'Toshkent sh., Yakkasaroy tumani, Shota Rustaveli ko‘chasi, 65',
        rooms: 3,
        area: 82,
        floor: '6/8',
        repair: 'Yevro ta’mir',
        builtYear: 2022,
        metro: 'Kosmonavtlar metrosi (8 daqiqa)',
        badges: [{ text: 'Markaz', class: 'tag-new' }],
        images: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Yerosti parkovka', 'Lift', 'Qo‘riqlash 24/7', 'Kabel internet', 'Oshxona texnikalari'],
        agent: {
            name: 'Akmal Zokirov',
            phone: '+998 (90) 812-40-50',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            deals: '42 ta bitim'
        },
        desc: 'Shota Rustaveli ko‘chasidagi nufuzli uy. Yashil xiyobonlar va restoranlar yonginasida joylashgan.'
    },
    {
        id: 'prop-8',
        title: 'Yashnobod — 2 xonali zamonaviy kvartira (Parkent bozori)',
        priceUsd: 54000,
        priceUzs: '691 200 000 so‘m',
        pricePerM2: '931 $/m²',
        dealType: 'sale',
        category: 'budget',
        district: 'Yashnobod',
        address: 'Toshkent sh., Yashnobod tumani, Parkent ko‘chasi',
        rooms: 2,
        area: 58,
        floor: '2/9',
        repair: 'Yangi topshirilgan',
        builtYear: 2024,
        metro: 'Do‘stlik metrosi (10 daqiqa)',
        badges: [{ text: 'Novostroyka', class: 'tag-new' }],
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Lift', 'Avtoturargoh', 'Bolalar o‘yingohi', 'Gaz va suv doimiy'],
        agent: {
            name: 'Bobur Mirzayev',
            phone: '+998 (93) 515-20-10',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            deals: '35 ta bitim'
        },
        desc: 'Parkent bozori va Korzinka yaqinidagi ajoyib lokatsiya. Barcha transport tarmoqlariga juda qulay.'
    },
    {
        id: 'prop-9',
        title: 'Samarqand shahri — Registon yaqinida 4 xonali Kottedj',
        priceUsd: 135000,
        priceUzs: '1 728 000 000 so‘m',
        pricePerM2: '675 $/m²',
        dealType: 'sale',
        category: 'house',
        district: 'Samarqand',
        address: 'Samarqand sh., Dahbed ko‘chasi, Registonga 1.5 km',
        rooms: 4,
        area: 200,
        floor: '1 qavatli hovli (4 sotix)',
        repair: 'Sharqona milliy va zamonaviy uslub',
        builtYear: 2021,
        metro: 'Shahar markazi',
        badges: [{ text: 'Samarqand', class: 'tag-deal' }],
        images: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Milliy ayvon', 'Bodom va uzumzor bog‘', 'Garaj', 'Isitish poyondoz tizimi (tyoply pol)'],
        agent: {
            name: 'Nodira Qodirova',
            phone: '+998 (97) 400-33-22',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
            deals: '28 ta bitim'
        },
        desc: 'Tarixiy va go‘zal Samarqand shahrida joylashgan fayzli hovli. Turizm yoki xususiy mehmonxona sifatida ishlatish uchun ham ayni muddao.'
    },

    // --- IJARA (RENT) ---
    {
        id: 'prop-10',
        title: 'Toshkent City — 2 xonali Lyuks Ijara Xonadoni (Oyiga)',
        priceUsd: 1200,
        priceUzs: '15 360 000 so‘m/oy',
        pricePerM2: 'Ijara',
        dealType: 'rent',
        category: 'apartment',
        district: 'Shayxontohur',
        address: 'Toshkent sh., Shayxontohur tumani, Tashkent City Boulevard',
        rooms: 2,
        area: 60,
        floor: '9/14',
        repair: 'To‘liq to‘ldirilgan lyuks',
        builtYear: 2024,
        metro: 'O‘zbekiston metrosi (5 daqiqa)',
        badges: [{ text: 'Oylik Ijara', class: 'tag-vip' }],
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Idish yuvish mashinasi', 'Televizor 65 OLED', 'Barcha uy-ro‘zg‘or buyumlari', 'Tozalash xizmati', 'Yerosti parkovka'],
        agent: {
            name: 'Akmal Zokirov',
            phone: '+998 (90) 812-40-50',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            deals: '42 ta bitim'
        },
        desc: 'Uzoq muddatga ijaraga beriladi. Barcha qulayliklar bor, faqat kiyim-kechak bilan kirib yashash mumkin.'
    },
    {
        id: 'prop-11',
        title: 'Mirzo Ulug‘bek tumani — 2 xonali shinam ijara kvartirasi',
        priceUsd: 650,
        priceUzs: '8 320 000 so‘m/oy',
        pricePerM2: 'Ijara',
        dealType: 'rent',
        category: 'apartment',
        district: 'Mirzo Ulug‘bek',
        address: 'Toshkent sh., Mirzo Ulug‘bek tumani, Maksim Gorkiy (Buyuk Ipak Yo‘li)',
        rooms: 2,
        area: 62,
        floor: '5/9',
        repair: 'Yevro ta’mir',
        builtYear: 2023,
        metro: 'Buyuk Ipak Yo‘li metrosi (3 daqiqa)',
        badges: [{ text: 'Oylik Ijara', class: 'tag-deal' }],
        images: [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Mebel to‘liq', 'Konditsioner', 'Mikroto‘lqinli pech', 'Wi-Fi internet'],
        agent: {
            name: 'Nodira Qodirova',
            phone: '+998 (97) 400-33-22',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
            deals: '28 ta bitim'
        },
        desc: 'Metro bekatining ro‘parasidagi toza, barcha sharoitlari bor qulay xonadon.'
    },
    {
        id: 'prop-12',
        title: 'Chilonzor tumani — 1 xonali shinam ijara uyi',
        priceUsd: 400,
        priceUzs: '5 120 000 so‘m/oy',
        pricePerM2: 'Ijara',
        dealType: 'rent',
        category: 'budget',
        district: 'Chilonzor',
        address: 'Toshkent sh., Chilonzor tumani, Mirzo Ulug‘bek metrosi yaqinida',
        rooms: 1,
        area: 42,
        floor: '4/5',
        repair: 'Yaxshi ta’mir',
        builtYear: 2019,
        metro: 'Mirzo Ulug‘bek metrosi (5 daqiqa)',
        badges: [{ text: 'Hamyonbop', class: 'tag-deal' }],
        images: [
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Muzlatgich', 'Kir yuvish mashinasi', 'Televizor', 'Balkon'],
        agent: {
            name: 'Bobur Mirzayev',
            phone: '+998 (93) 515-20-10',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            deals: '35 ta bitim'
        },
        desc: 'Talabalar yoki yosh oilalar uchun tinch va qulay xonadon.'
    }
];

// ==================== 3. DOM TAYYOR BO'LGANDA ISHGA TUSHIRISH ====================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    appState.properties = [...INITIAL_PROPERTIES];
    renderProperties();
    updateFavoritesBadge();
    calculateMortgage();
    setupEventListeners();
});

// Matnlarni solishtirish uchun normallashtirish (apostrof belgilarini to'g'rilash)
function normalizeText(str) {
    return (str || '')
        .toLowerCase()
        .replace(/[\u2018\u2019`']/g, '')
        .trim();
}

// ==================== 4. TEMA (DARK / LIGHT) BOSHQARUVI ====================
function initTheme() {
    document.body.setAttribute('data-theme', appState.theme);
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
        btn.innerHTML = appState.theme === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
}

function toggleTheme() {
    appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', appState.theme);
    localStorage.setItem('makon_theme', appState.theme);

    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
        btn.innerHTML = appState.theme === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }

    showToast(appState.theme === 'dark' ? 'Tun rejimi faollashdi 🌙' : 'Kun rejimi faollashdi ☀️', 'info');
}

// ==================== 5. UYLAR KATALOGINI CHIQARISH (RENDER) ====================
function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    const countDisplay = document.getElementById('resultsCount');
    if (!grid) return;

    let list = [...appState.properties];

    // Bitim turi (Sotuv / Ijara)
    // 1. Bitim turi (Sotuv / Ijara)
    list = list.filter(p => p.dealType === appState.dealType);

    // Kategoriya filtri
    // 2. Kategoriya filtri
    if (appState.activeCategory !== 'all') {
        if (appState.activeCategory === 'budget') {
            list = list.filter(p => p.category === 'budget' || p.priceUsd <= 60000);
        } else {
            list = list.filter(p => p.category === appState.activeCategory);
        }
    }

    // Tuman filtri
    // 3. Tuman filtri
    if (appState.currentDistrict !== 'all') {
        list = list.filter(p => p.district.toLowerCase().includes(appState.currentDistrict.toLowerCase()));
        const targetDist = normalizeText(appState.currentDistrict);
        list = list.filter(p => normalizeText(p.district).includes(targetDist) || normalizeText(p.address).includes(targetDist));
    }

    // Mulk turi filtri
    // 4. Mulk turi filtri
    if (appState.currentType !== 'all') {
        list = list.filter(p => p.category === appState.currentType);
    }

    // Xonalar soni
    // 5. Xonalar soni
    if (appState.currentRooms !== 'all') {
        if (appState.currentRooms === '5+') {
            list = list.filter(p => p.rooms >= 5);
        } else {
            list = list.filter(p => p.rooms === parseInt(appState.currentRooms));
        }
    }

    // Maksimal narx
    // 6. Maksimal narx
    if (appState.maxPrice !== 'all') {
        list = list.filter(p => p.priceUsd <= parseInt(appState.maxPrice));
    }

    // Saralash (Sort)
    // 7. Saralash (Sort)
    if (appState.sortBy === 'price-asc') {
        list.sort((a, b) => a.priceUsd - b.priceUsd);
    } else if (appState.sortBy === 'price-desc') {
        list.sort((a, b) => b.priceUsd - a.priceUsd);
    } else if (appState.sortBy === 'area-desc') {
        list.sort((a, b) => b.area - a.area);
    }

    if (countDisplay) {
        countDisplay.innerText = `${list.length} ta xonadon`;
    }

    if (list.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
                <i class="fa-solid fa-house-circle-xmark" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 16px; display: block;"></i>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--text-main); margin-bottom: 8px;">Ushbu parametrlar bo‘yicha uy topilmadi</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">Iltimos, tuman yoki narx filtrlash parametrlarini o‘zgartirib ko‘ring.</p>
                <button class="btn btn-primary btn-sm" onclick="resetFilters()">
                    <i class="fa-solid fa-rotate-right"></i> Filtrlarni Tozalash
                </button>
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(item => {
        const isFav = appState.favorites.some(f => f.id === item.id);
        const formattedPriceUsd = formatMoney(item.priceUsd) + (item.dealType === 'rent' ? ' $/oy' : ' $');

        return `
            <div class="prop-card">
                <!-- RASM VA BADJLAR -->
                <div class="prop-image-wrap">
                    <img src="${item.images[0]}" alt="${item.title}" loading="lazy">
                    <div class="prop-badges">
                        ${item.badges.map(b => `<span class="badge-tag ${b.class}">${b.text}</span>`).join('')}
                    </div>
                    <button class="prop-fav-trigger ${isFav ? 'active' : ''}" onclick="toggleFavorite('${item.id}')" title="Tanlanganlarga qo‘shish">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <div class="prop-price-tag">
                        <span class="p-usd">${formattedPriceUsd}</span>
                        <span class="p-sqm">(${item.pricePerM2})</span>
                    </div>
                </div>

                <!-- MA'LUMOTLAR -->
                <div class="prop-body">
                    <h3 class="prop-title">${item.title}</h3>
                    <div class="prop-location">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${item.address}</span>
                    </div>

                    <!-- XONALAR, MAYDON VA QAVAT -->
                    <div class="prop-specs-row">
                        <div class="spec-item">
                            <i class="fa-solid fa-door-open"></i>
                            <div>
                                <small style="font-size: 0.7rem; color: var(--text-dim);">Xonalar</small>
                                <strong>${item.rooms} xona</strong>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-ruler-combined"></i>
                            <div>
                                <small style="font-size: 0.7rem; color: var(--text-dim);">Maydoni</small>
                                <strong>${item.area} m²</strong>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-stairs"></i>
                            <div>
                                <small style="font-size: 0.7rem; color: var(--text-dim);">Qavati</small>
                                <strong>${item.floor}</strong>
                            </div>
                        </div>
                    </div>

                    <!-- FOOTER VA AGENT -->
                    <div class="prop-card-footer">
                        <div class="agent-mini">
                            <img src="${item.agent.avatar}" alt="${item.agent.name}" class="agent-avatar">
                            <div class="agent-meta">
                                <span>${item.agent.name}</span>
                                <small>${item.agent.deals}</small>
                            </div>
                        </div>
                        <button class="btn btn-outline btn-sm" onclick="openPropertyModal('${item.id}')">
                            <i class="fa-solid fa-eye"></i> Batafsil
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== 6. BITIM TURI VA FILTRLARNI BOSHQARISH ====================
function setDealType(type) {
    appState.dealType = type;
    document.querySelectorAll('.deal-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-deal') === type);
    });
    renderProperties();
    showToast(type === 'sale' ? 'Sotuvdagi xonadonlar ko‘rsatilmoqda' : 'Ijaradagi xonadonlar ko‘rsatilmoqda', 'info');
}

function filterByCategory(category) {
    appState.activeCategory = category;
    appState.currentType = 'all'; // to'qnashuvni oldini olish
    const typeSelect = document.getElementById('filterType');
    if (typeSelect) typeSelect.value = 'all';

    document.querySelectorAll('#categoryTabs .cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === category);
    });
    renderProperties();
}

function applyMainFilter() {
    appState.currentDistrict = document.getElementById('filterDistrict').value;
    appState.currentType = document.getElementById('filterType').value;
    appState.currentRooms = document.getElementById('filterRooms').value;
    appState.maxPrice = document.getElementById('filterPriceMax').value;

    // Kategoriya tablarini 'all' ga o'tkazish
    appState.activeCategory = 'all';
    document.querySelectorAll('#categoryTabs .cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === 'all');
    });

    renderProperties();

    // Scroll qilish
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    showToast('Filtr bo‘yicha qidiruv natijalari yangilandi!', 'success');
}

function quickFilterDistrict(districtName) {
    appState.currentDistrict = districtName;
    const select = document.getElementById('filterDistrict');
    if (select) select.value = districtName;
    appState.activeCategory = 'all';
    appState.currentType = 'all';
    appState.maxPrice = 'all';

    const distSelect = document.getElementById('filterDistrict');
    if (distSelect) distSelect.value = districtName;

    const typeSelect = document.getElementById('filterType');
    if (typeSelect) typeSelect.value = 'all';

    const priceSelect = document.getElementById('filterPriceMax');
    if (priceSelect) priceSelect.value = 'all';

    document.querySelectorAll('#categoryTabs .cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === 'all');
    });

    renderProperties();
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`${districtName} tumanidagi uylar tanlandi`, 'info');
}

function handleSortChange(sortValue) {
    appState.sortBy = sortValue;
    renderProperties();
}

function resetFilters() {
    appState.activeCategory = 'all';
    appState.currentDistrict = 'all';
    appState.currentType = 'all';
    appState.currentRooms = 'all';
    appState.maxPrice = 'all';
    appState.sortBy = 'newest';

    const distSelect = document.getElementById('filterDistrict');
    const typeSelect = document.getElementById('filterType');
    const roomsSelect = document.getElementById('filterRooms');
    const priceSelect = document.getElementById('filterPriceMax');
    const sortSelect = document.getElementById('sortSelect');

    if (distSelect) distSelect.value = 'all';
    if (typeSelect) typeSelect.value = 'all';
    if (roomsSelect) roomsSelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'newest';

    document.querySelectorAll('#categoryTabs .cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === 'all');
    });

    renderProperties();
    showToast('Barcha filtrlar bekor qilindi', 'info');
}

// ==================== 7. UY DETALLARI MODALI (PROPERTY MODAL) ====================
function openPropertyModal(id) {
    const item = appState.properties.find(p => p.id === id);
    if (!item) return;

    const modal = document.getElementById('propertyModal');
    const content = document.getElementById('propertyModalContent');
    if (!modal || !content) return;

    const formattedPriceUsd = formatMoney(item.priceUsd) + (item.dealType === 'rent' ? ' $/oyiga' : ' $');

    content.innerHTML = `
        <div class="prop-modal-gallery">
            <img src="${item.images[0]}" alt="${item.title}" class="gallery-main-img" id="modalMainImage">
            <div class="gallery-thumbs-row">
                ${item.images.map((imgUrl, idx) => `
                    <img src="${imgUrl}" alt="Thumbnail ${idx + 1}" class="gallery-thumb ${idx === 0 ? 'active' : ''}"
                        onclick="switchModalImage(this, '${imgUrl}')">
                `).join('')}
            </div>
        </div>

        <div class="prop-modal-header-row">
            <div>
                <h2 class="prop-modal-title">${item.title}</h2>
                <div style="font-size: 0.95rem; color: var(--text-muted); margin-top: 4px;">
                    <i class="fa-solid fa-location-dot" style="color: var(--primary);"></i> ${item.address}
                </div>
            </div>
            <div style="text-align: right;">
                <div class="prop-modal-price">${formattedPriceUsd}</div>
                <div style="font-size: 0.85rem; color: var(--success); font-weight: 700;">${item.priceUzs}</div>
            </div>
        </div>

        <div class="prop-modal-specs-grid">
            <div class="modal-spec-box">
                <small>Xonalar soni:</small>
                <strong>${item.rooms} xona</strong>
            </div>
            <div class="modal-spec-box">
                <small>Umumiy maydon:</small>
                <strong>${item.area} m²</strong>
            </div>
            <div class="modal-spec-box">
                <small>Qavati:</small>
                <strong>${item.floor}</strong>
            </div>
            <div class="modal-spec-box">
                <small>Ta’mir turi:</small>
                <strong>${item.repair}</strong>
            </div>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 8px; color: var(--text-main);">Tavsif:</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${item.desc}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 10px; color: var(--text-main);">Qulayliklar va Infratuzilma:</h4>
            <div class="prop-amenities-tags">
                ${item.amenities.map(a => `<span class="amenity-pill"><i class="fa-solid fa-check" style="color: var(--success);"></i> ${a}</span>`).join('')}
                <span class="amenity-pill"><i class="fa-solid fa-train-subway" style="color: var(--primary);"></i> ${item.metro}</span>
            </div>
        </div>

        <div class="prop-modal-actions">
            <a href="tel:${item.agent.phone}" class="btn btn-primary btn-lg">
                <i class="fa-solid fa-phone"></i> Agentga Qo‘ng‘iroq Qilish (${item.agent.phone})
            </a>
            <button class="btn btn-outline btn-lg" onclick="bookTour('${item.title}')">
                <i class="fa-solid fa-calendar-check"></i> Uyni Borib Ko‘rishga Yozilish
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePropertyModal() {
    document.getElementById('propertyModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

function switchModalImage(thumbElem, imgUrl) {
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) {
        mainImg.src = imgUrl;
    }
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    thumbElem.classList.add('active');
}

function bookTour(propertyTitle) {
    closePropertyModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`"${propertyTitle}" bo‘yicha ariza qoldiring, mutaxassisimiz tezda bog‘lanadi!`, 'info');
    }
}

// ==================== 8. TANLANGANLAR (FAVORITES) ====================
function toggleFavorite(id) {
    const property = appState.properties.find(p => p.id === id);
    if (!property) return;

    const index = appState.favorites.findIndex(f => f.id === id);
    if (index > -1) {
        appState.favorites.splice(index, 1);
        showToast(`"${property.title.substring(0, 30)}..." tanlanganlardan olib tashlandi`, 'warning');
    } else {
        appState.favorites.push(property);
        showToast(`"${property.title.substring(0, 30)}..." tanlanganlarga saqlandi! ❤️`, 'success');
    }

    localStorage.setItem('makon_favorites', JSON.stringify(appState.favorites));
    updateFavoritesBadge();
    renderProperties();
}

function updateFavoritesBadge() {
    const badge = document.getElementById('favCount');
    const drawerBadge = document.getElementById('favDrawerCount');
    const count = appState.favorites.length;

    if (badge) badge.innerText = count;
    if (drawerBadge) drawerBadge.innerText = count;
}

function openFavDrawer() {
    renderFavorites();
    document.getElementById('favDrawer')?.classList.add('active');
    document.getElementById('favOverlay')?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFavDrawer() {
    document.getElementById('favDrawer')?.classList.remove('active');
    document.getElementById('favOverlay')?.classList.remove('active');
    document.body.style.overflow = '';
}

function renderFavorites() {
    const listContainer = document.getElementById('favItemsList');
    if (!listContainer) return;

    if (appState.favorites.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 10px; color: var(--text-dim);">
                <i class="fa-regular fa-heart" style="font-size: 2.5rem; margin-bottom: 12px; display: block; opacity: 0.5;"></i>
                Sizda hali tanlangan uylar yo‘q. Kartochkalardagi yurakcha belgisini bosing!
            </div>
        `;
        return;
    }

    listContainer.innerHTML = appState.favorites.map(item => `
        <div class="fav-item-card">
        <div class="fav-item-card" onclick="openPropertyModal('${item.id}'); closeFavDrawer();" style="cursor: pointer;">
            <img src="${item.images[0]}" alt="${item.title}" class="fav-item-img">
            <div class="fav-item-info">
                <span class="fav-item-title">${item.title}</span>
                <span class="fav-item-price">${formatMoney(item.priceUsd)} $</span>
                <small style="color: var(--text-muted); font-size: 0.75rem;">${item.district} • ${item.rooms} xona</small>
            </div>
            <button class="fav-remove-btn" onclick="toggleFavorite('${item.id}'); renderFavorites();" title="O‘chirish">
            <button class="fav-remove-btn" onclick="event.stopPropagation(); toggleFavorite('${item.id}'); renderFavorites();" title="O‘chirish">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');
}

function contactAgentAboutFavorites() {
    if (appState.favorites.length === 0) {
        showToast('Tanlangan uylar mavjud emas!', 'warning');
        return;
    }
    closeFavDrawer();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    showToast('Mutaxassisimiz siz tanlagan uylar bo‘yicha to‘liq ma’lumot beradi 📞', 'success');
}

// ==================== 9. IPOTEKA KALKULYATORI HISOB-KITOBI ====================
function calculateMortgage() {
    const priceInput = document.getElementById('calcHomePrice');
    const initialPctInput = document.getElementById('calcInitialPct');
    const yearsInput = document.getElementById('calcPeriodYears');
    const rateInput = document.getElementById('calcRatePct');

    if (!priceInput || !initialPctInput || !yearsInput || !rateInput) return;

    const price = parseFloat(priceInput.value) || 70000;
    const initialPct = parseFloat(initialPctInput.value) || 25;
    const years = parseFloat(yearsInput.value) || 15;
    const annualRate = parseFloat(rateInput.value) || 17.5;

    // Qolgan hisoblash kodlaringiz shu yerdan davom etadi.
} 
    const setElText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    // Ekranda ko'rsatish
    document.getElementById('calcPriceDisplay').innerText = formatMoney(price) + ' $';
    setElText('calcPriceDisplay', formatMoney(price) + ' $');
    const initialSum = Math.round(price * (initialPct / 100));
    document.getElementById('calcInitialDisplay').innerText = `${initialPct}% (${formatMoney(initialSum)} $)`;
    document.getElementById('calcPeriodDisplay').innerText = `${years} yil (${years * 12} oy)`;
    document.getElementById('calcRateDisplay').innerText = `${annualRate}%`;
    setElText('calcInitialDisplay', `${initialPct}% (${formatMoney(initialSum)} $)`);
    setElText('calcPeriodDisplay', `${years} yil (${years * 12} oy)`);
    setElText('calcRateDisplay', `${annualRate}%`);

    // Kredit summasi
    const loanAmount = price - initialSum;
    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = years * 12;

    // Annuitet oylik to'lov formulasi
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
        monthlyPayment = loanAmount / totalMonths;
    }

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    // USD dan so'mga (taxminiy 1$ = 12 800 so'm)
    const monthlyPaymentUzs = Math.round(monthlyPayment * 12800);

    document.getElementById('calcMonthlyUsd').innerText = formatMoney(Math.round(monthlyPayment)) + ' $ / oyiga';
    document.getElementById('calcMonthlyUzs').innerText = `≈ ${formatMoney(monthlyPaymentUzs)} so‘m / oyiga`;
    document.getElementById('calcLoanAmount').innerText = formatMoney(Math.round(loanAmount)) + ' $';
    document.getElementById('calcInitialSum').innerText = formatMoney(Math.round(initialSum)) + ' $';
    document.getElementById('calcTotalInterest').innerText = formatMoney(Math.round(totalInterest)) + ' $';
    document.getElementById('calcTotalPayment').innerText = formatMoney(Math.round(totalPayment)) + ' $';
    setElText('calcMonthlyUsd', formatMoney(Math.round(monthlyPayment)) + ' $ / oyiga');
    setElText('calcMonthlyUzs', `≈ ${formatMoney(monthlyPaymentUzs)} so‘m / oyiga`);
    setElText('calcLoanAmount', formatMoney(Math.round(loanAmount)) + ' $');
    setElText('calcInitialSum', formatMoney(Math.round(initialSum)) + ' $');
    setElText('calcTotalInterest', formatMoney(Math.round(totalInterest)) + ' $');
    setElText('calcTotalPayment', formatMoney(Math.round(totalPayment)) + ' $');


function requestMortgageConsultation() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    const select = document.getElementById('cInterest');
    if (select) select.value = 'mortgage';
    showToast('Ipoteka arizasi uchun ma’lumotlaringizni to‘ldiring!', 'info');
}

// ==================== 10. E'LON BERISH (ADD PROPERTY MODAL) ====================
function openAddPropertyModal() {
    const modal = document.getElementById('addPropertyModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAddPropertyModal() {
    const modal = document.getElementById('addPropertyModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleAddPropertySubmit(event) {
    event.preventDefault();

   const title = document.getElementById('newPropTitle').value;
const district = document.getElementById('newPropDistrict').value;
const category = document.getElementById('newPropType').value;

const rooms = parseInt(document.getElementById('newPropRooms').value, 10) || 2;
const area = parseFloat(document.getElementById('newPropArea').value) || 60;
const priceUsd = parseFloat(document.getElementById('newPropPrice').value) || 50000;

const floor = document.getElementById('newPropFloor').value || '1/9';

const address = document.getElementById('newPropAddress').value;
const phone = document.getElementById('newPropPhone').value;

    const newProperty = {
        id: 'prop-user-' + Date.now(),
        title: title,
        priceUsd: priceUsd,
        priceUzs: formatMoney(priceUsd * 12800) + ' so‘m',
        pricePerM2: Math.round(priceUsd / area) + ' $/m²',
        dealType: 'sale',
        category: category,
        district: district,
        address: address,
        rooms: rooms,
        area: area,
        floor: floor,
        repair: 'Yaxshi ta’mir',
        builtYear: 2024,
        metro: 'Yaqin metro bekatiga qulay yo‘l',
        badges: [{ text: 'Yangi E’lon', class: 'tag-new' }],
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
        ],
        amenities: ['Gaz', 'Elektr', 'Suv', 'Internet', 'Avtoturargoh'],
        agent: {
            name: 'Mulk Egasi',
            phone: phone,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            deals: '1-e’lon'
        },
        desc: `Mulk egasi tomonidan sotuvga qo‘yilgan xonadon. Manzil: ${address}. Telefon: ${phone}`
    };

    appState.properties.unshift(newProperty);
    renderProperties();
    resetFilters();
    closeAddPropertyModal();
    document.getElementById('addPropertyForm').reset();

    showToast('E’loningiz muvaffaqiyatli qabul qilindi va saytga joylandi! 🎉', 'success');
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
}

// ==================== 11. XARITA VA PINLARNI KO'RSATISH ====================
function previewPinHome(name, price) {
    const detailBox = document.getElementById('mapPinDetailBox');
    if (detailBox) {
        detailBox.innerHTML = `
            <strong><i class="fa-solid fa-building" style="color: #38bdf8;"></i> ${name}</strong> — Narxi: <span style="color: #f59e0b; font-weight: 800;">${price}</span>
            <button class="btn btn-outline btn-sm" style="margin-left: 10px; padding: 2px 8px; font-size: 0.75rem;" onclick="document.getElementById('properties').scrollIntoView({behavior: 'smooth'})">Uyni Ko‘rish</button>
            <button class="btn btn-primary btn-sm" style="margin-left: 10px; padding: 4px 12px; font-size: 0.78rem;" onclick="viewPinDetails('${name}')">
                <i class="fa-solid fa-eye"></i> Uyni Ko‘rish
            </button>
        `;
    }
}

function viewPinDetails(name) {
    const normalized = normalizeText(name);
    const found = appState.properties.find(p => normalizeText(p.title).includes(normalized) || normalized.includes(normalizeText(p.district)));
    if (found) {
        openPropertyModal(found.id);
    } else {
        document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    }
}

function showProjectDetails(projectName) {
    showToast(`"${projectName}" bo‘yicha batafsil loyiha hujjati va rejalari ochilmoqda...`, 'info');
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('cName');
    if (nameInput) nameInput.focus();
}

// ==================== 12. BOG'LANISH VA KONSULTATSIYA FORMASI ====================
function handleConsultationSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('cName').value;
    const phone = document.getElementById('cPhone').value;

    showToast(`Rahmat, ${name}! Telefoningiz (${phone}) qabul qilindi. 5 daqiqa ichida qo‘ng‘iroq qilamiz! 📞`, 'success');
    document.getElementById('consultationForm').reset();
}

// ==================== 13. HODISALAR (EVENT LISTENERS) ====================
function setupEventListeners() {
    // Tanlanganlar tugmasi
    document.getElementById('favToggleBtn')?.addEventListener('click', openFavDrawer);

    // Mobil menyu
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Tema o'zgartirish
    document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

    // Modal tashqarisiga bosganda yopish
    document.getElementById('propertyModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'propertyModal') closePropertyModal();
    });

    document.getElementById('addPropertyModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'addPropertyModal') closeAddPropertyModal();
    });

    // ESC tugmasi orqali yopish
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePropertyModal();
            closeFavDrawer();
            closeAddPropertyModal();
        }
    });
}

// ==================== 14. RAQAMLARNI FORMATLASH ====================
function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return (amount || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// ==================== 15. TOAST BILDIRISHNOMALARI ====================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = '<i class="fa-solid fa-circle-check" style="color: var(--success); font-size: 1.15rem;"></i>';
    if (type === 'warning') {
        icon = '<i class="fa-solid fa-triangle-exclamation" style="color: var(--accent); font-size: 1.15rem;"></i>';
    } else if (type === 'danger') {
        icon = '<i class="fa-solid fa-circle-xmark" style="color: var(--danger); font-size: 1.15rem;"></i>';
    } else if (type === 'info') {
        icon = '<i class="fa-solid fa-circle-info" style="color: var(--primary); font-size: 1.15rem;"></i>';
    }

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.35s ease';
        setTimeout(() => toast.remove(), 350);
    }, 3800);
}

// ==================== 16. WINDOW GLOBAL BOG'LASH ====================
window.setDealType = setDealType;
window.applyMainFilter = applyMainFilter;
window.filterByCategory = filterByCategory;
window.quickFilterDistrict = quickFilterDistrict;
window.handleSortChange = handleSortChange;
window.resetFilters = resetFilters;
window.openPropertyModal = openPropertyModal;
window.closePropertyModal = closePropertyModal;
window.switchModalImage = switchModalImage;
window.bookTour = bookTour;
window.toggleFavorite = toggleFavorite;
window.openFavDrawer = openFavDrawer;
window.closeFavDrawer = closeFavDrawer;
window.contactAgentAboutFavorites = contactAgentAboutFavorites;
window.calculateMortgage = calculateMortgage;
window.requestMortgageConsultation = requestMortgageConsultation;
window.openAddPropertyModal = openAddPropertyModal;
window.closeAddPropertyModal = closeAddPropertyModal;
window.handleAddPropertySubmit = handleAddPropertySubmit;
window.previewPinHome = previewPinHome;
window.viewPinDetails = viewPinDetails;
window.showProjectDetails = showProjectDetails;
window.handleConsultationSubmit = handleConsultationSubmit;
window.toggleTheme = toggleTheme;
