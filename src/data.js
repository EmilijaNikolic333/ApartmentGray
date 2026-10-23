// Podaci preuzeti sa Booking.com stranice objekta Apartment Gray (oktobar 2026.)

export const apartment = {
  name: 'Apartment Gray',
  stars: 3,
  address: 'Vojvode Stepe 42, 18300 Pirot, Srbija',
  coords: { lat: 43.1539507, lng: 22.5816379 },
  bookingUrl: 'https://www.booking.com/hotel/rs/apartment-gray.sr.html',
  score: 9.5,
  scoreLabel: 'Izuzetan',
  reviewCount: 90,
  locationScore: 9.5,
  description: [
    'Objekat Apartment Gray u ponudi ima smeštaj sa balkonom i besplatnim WiFi internetom u Pirotu. Ovaj apartman ima vrt i besplatan privatni parking.',
    'Ovaj smeštaj ima dnevni boravak, potpuno opremljenu kuhinju sa frižiderom i kuvalom, kao i 1 kupatilo sa tušem i fenom za kosu. Broj spavaćih soba u ovom apartmanu je 2. U ovom apartmanu su obezbeđeni peškiri i posteljina.',
    'Objekat Apartment Gray nudi terasu, kao i igralište za decu.',
    'Aerodrom (Aerodrom Konstantin Veliki) je udaljen 76 km.',
  ],
}

export const highlights = [
  { icon: '🛏️', label: '2 spavaće sobe' },
  { icon: '🛋️', label: 'Dnevni boravak' },
  { icon: '🍳', label: 'Opremljena kuhinja' },
  { icon: '🚿', label: 'Kupatilo sa tušem' },
  { icon: '🌿', label: 'Balkon i terasa' },
  { icon: '🌳', label: 'Vrt i dvorište' },
]

export const facilities = [
  { icon: '🅿️', label: 'Besplatan privatni parking' },
  { icon: '📶', label: 'Besplatan WiFi' },
  { icon: '🚭', label: 'Sobe za nepušače' },
  { icon: '👨‍👩‍👧', label: 'Porodične sobe' },
  { icon: '🛝', label: 'Igralište za decu' },
  { icon: '📺', label: 'TV' },
  { icon: '🧊', label: 'Frižider i kuvalo' },
  { icon: '💨', label: 'Fen za kosu' },
  { icon: '🧺', label: 'Peškiri i posteljina' },
]

const photo = (id, alt) => ({ src: `/images/${id}.jpg`, alt })

export const photos = [
  photo('hero-lale', 'Prostor za sedenje'),
  photo('hero-vrt', 'Vrt u zalasku sunca'),
  photo('864163681', 'Kuhinja'),
  photo('864163679', 'Kuhinja'),
  photo('864163671', 'Prostor za sedenje'),
  photo('864167727', 'TV i multimedija'),
  photo('864167730', 'Prostor za sedenje'),
  photo('864167740', 'TV i multimedija'),
  photo('864163672', 'Spavaća soba'),
  photo('864163675', 'Spavaća soba'),
  photo('864166018', 'Nacrt objekta'),
  photo('864166023', 'Spavaća soba'),
  photo('864166470', 'Prostor za sedenje'),
  photo('864163680', 'Spavaća soba'),
  photo('614593385', 'Zgrada u kojoj se nalazi apartman'),
  photo('831996353', 'Zgrada u kojoj se nalazi apartman'),
  photo('903735300', 'Nacrt objekta'),
  photo('903735315', 'Vrt ispred objekta'),
  photo('903735298', 'Vrt ispred objekta'),
  photo('903735304', 'Vrt ispred objekta'),
  photo('903735308', 'Nacrt objekta'),
  photo('903735294', 'Popločano dvorište'),
  photo('614593401', 'Vrt ispred objekta'),
]

export const ratings = [
  { label: 'Osoblje', value: 9.6 },
  { label: 'Sadržaji', value: 9.5 },
  { label: 'Čistoća', value: 9.7 },
  { label: 'Udobnost', value: 9.4 },
  { label: 'Odnos cene i kvaliteta', value: 9.7 },
  { label: 'Lokacija', value: 9.5 },
  { label: 'Besplatan WiFi', value: 8.0 },
]

export const reviews = [
  { name: 'Aleksandra', country: 'Srbija', text: 'Sve je čisto, uredno. Veliko dvorište sa aktivnostima sa decu. Ljubazni domaćini.' },
  { name: 'Andrijana', country: 'Srbija', text: 'Mi smo isli porodicno, sa dvoje male dece. Bilo je dovoljno prostora, dve spavace sobe sa velikim, i jako udobnim krevetima. Jako uredno i cisto. Lokacija je na oko 5 min hodom do centra. Domacini su vrlo ljubazni.' },
  { name: 'Aleksandar', country: 'Srbija', text: 'Apartman je skroz korektan, veoma je čist i dobro je opremljen. Nalazi se na odličnoj mirnoj lokaciji, blizu centra (par minuta hoda). Kreveti su bili veoma udobni. Domaćin je izuzetno ljubazan. Moja preporuka' },
  { name: 'Mladen', country: 'Srbija', text: 'Sve preporuke, objekat je imao sve sto nam je potrebno za boravak, cista 10' },
  { name: 'Jasmina', country: 'Srbija', text: 'Smeštaj je sasvim ok. Čist. Domaćini ljubazni... Sve preporuke... Blizu centra..' },
  { name: 'Srđan', country: 'Srbija', text: 'Prostran i lep stan, udobni kreveti, cist nesprekorno. Gazde su jako ljubazne.' },
  { name: 'Biljana', country: 'Srbija', text: 'Sve nam se dopalo, od samog smeštaja do higijene, lokacije i ljubaznih domaćina... Za svaku preporuku...' },
  { name: 'Marina', country: 'Srbija', text: 'Lokacija i smestaj peefektni. Domacini ljubazni. Sve preporuke' },
]

export const houseRules = [
  { icon: '🔑', title: 'Prijavljivanje', text: 'Od 15:00 do 23:30. Potrebno je da unapred obavestite objekat o tome kada stižete.' },
  { icon: '🚪', title: 'Odjavljivanje', text: 'Od 00:00 do 10:00.' },
  { icon: '🧒', title: 'Deca', text: 'Deca bilo kog uzrasta su dobrodošla. Krevetac i dodatni kreveti nisu dostupni.' },
  { icon: '🚭', title: 'Pušenje', text: 'Pušenje nije dozvoljeno.' },
  { icon: '🎉', title: 'Zabave', text: 'Zabave i događaji nisu dozvoljeni.' },
  { icon: '🌙', title: 'Period tišine', text: 'Gosti treba da budu tihi između 23:00 i 07:00.' },
  { icon: '🐾', title: 'Kućni ljubimci', text: 'Kućni ljubimci nisu dozvoljeni.' },
]

export const nearby = [
  { group: 'Javni prevoz', items: [{ name: 'Železnička stanica Pirot', distance: '2,2 km' }] },
  {
    group: 'Najbliži aerodromi',
    items: [
      { name: 'Aerodrom Konstantin Veliki (Niš)', distance: '72 km' },
      { name: 'Aerodrom Sofija', distance: '92 km' },
    ],
  },
]
