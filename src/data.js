// Podaci preuzeti sa Booking.com stranice objekta Apartment Gray (oktobar 2026.)
// Tekstovi su u obliku { sr, en } – App bira jezik

export const apartment = {
  name: 'Apartment Gray',
  stars: 3,
  address: { sr: 'Vojvode Stepe 42, 18300 Pirot, Srbija', en: 'Vojvode Stepe 42, 18300 Pirot, Serbia' },
  coords: { lat: 43.1539507, lng: 22.5816379 },
  bookingUrl: 'https://www.booking.com/hotel/rs/apartment-gray.sr.html',
  score: 9.5,
  scoreLabel: { sr: 'Izuzetan', en: 'Exceptional' },
  reviewCount: 90,
  locationScore: 9.5,
  description: [
    {
      sr: 'Objekat Apartment Gray u ponudi ima smeštaj sa balkonom i besplatnim WiFi internetom u Pirotu. Ovaj apartman ima vrt i besplatan privatni parking.',
      en: 'Apartment Gray offers accommodation with a balcony and free WiFi in Pirot. The apartment has a garden and free private parking.',
    },
    {
      sr: 'Ovaj smeštaj ima dnevni boravak, potpuno opremljenu kuhinju sa frižiderom i kuvalom, kao i 1 kupatilo sa tušem i fenom za kosu. Broj spavaćih soba u ovom apartmanu je 2. U ovom apartmanu su obezbeđeni peškiri i posteljina.',
      en: 'It features a living room, a fully equipped kitchen with a fridge and kettle, and 1 bathroom with a shower and hairdryer. The apartment has 2 bedrooms. Towels and bed linen are provided.',
    },
    {
      sr: 'Objekat Apartment Gray nudi terasu, kao i igralište za decu.',
      en: 'Apartment Gray also offers a terrace and a children’s playground.',
    },
    {
      sr: 'Aerodrom (Aerodrom Konstantin Veliki) je udaljen 76 km.',
      en: 'The nearest airport is Niš Constantine the Great Airport, 76 km away.',
    },
  ],
}

export const highlights = [
  { icon: '🛏️', label: { sr: '2 spavaće sobe', en: '2 bedrooms' } },
  { icon: '🛋️', label: { sr: 'Dnevni boravak', en: 'Living room' } },
  { icon: '🍳', label: { sr: 'Opremljena kuhinja', en: 'Equipped kitchen' } },
  { icon: '🚿', label: { sr: 'Kupatilo sa tušem', en: 'Bathroom with shower' } },
  { icon: '🌿', label: { sr: 'Balkon i terasa', en: 'Balcony and terrace' } },
  { icon: '🌳', label: { sr: 'Vrt i dvorište', en: 'Garden and yard' } },
]

export const facilities = [
  { icon: '🅿️', label: { sr: 'Besplatan privatni parking', en: 'Free private parking' } },
  { icon: '📶', label: { sr: 'Besplatan WiFi', en: 'Free WiFi' } },
  { icon: '🚭', label: { sr: 'Sobe za nepušače', en: 'Non-smoking rooms' } },
  { icon: '👨‍👩‍👧', label: { sr: 'Porodične sobe', en: 'Family rooms' } },
  { icon: '🛝', label: { sr: 'Igralište za decu', en: 'Children’s playground' } },
  { icon: '📺', label: { sr: 'TV', en: 'TV' } },
  { icon: '🧊', label: { sr: 'Frižider i kuvalo', en: 'Fridge and kettle' } },
  { icon: '💨', label: { sr: 'Fen za kosu', en: 'Hairdryer' } },
  { icon: '🧺', label: { sr: 'Peškiri i posteljina', en: 'Towels and bed linen' } },
]

const label = {
  seating: { sr: 'Prostor za sedenje', en: 'Seating area' },
  kitchen: { sr: 'Kuhinja', en: 'Kitchen' },
  tv: { sr: 'TV i multimedija', en: 'TV and multimedia' },
  bedroom: { sr: 'Spavaća soba', en: 'Bedroom' },
  plan: { sr: 'Nacrt objekta', en: 'Floor plan' },
  building: { sr: 'Zgrada u kojoj se nalazi apartman', en: 'The building' },
  garden: { sr: 'Vrt ispred objekta', en: 'Garden' },
  sunset: { sr: 'Vrt u zalasku sunca', en: 'Garden at sunset' },
  yard: { sr: 'Popločano dvorište', en: 'Paved courtyard' },
}

const photo = (id, alt) => ({ src: `/images/${id}.jpg`, alt })

export const photos = [
  photo('hero-lale', label.seating),
  photo('hero-vrt', label.sunset),
  photo('864163681', label.kitchen),
  photo('864163679', label.kitchen),
  photo('864163671', label.seating),
  photo('864167727', label.tv),
  photo('864167730', label.seating),
  photo('864167740', label.tv),
  photo('864163672', label.bedroom),
  photo('864163675', label.bedroom),
  photo('864166018', label.plan),
  photo('864166023', label.bedroom),
  photo('864166470', label.seating),
  photo('864163680', label.bedroom),
  photo('614593385', label.building),
  photo('831996353', label.building),
  photo('903735300', label.plan),
  photo('903735315', label.garden),
  photo('903735298', label.garden),
  photo('903735304', label.garden),
  photo('903735308', label.plan),
  photo('903735294', label.yard),
  photo('614593401', label.garden),
]

export const ratings = [
  { label: { sr: 'Osoblje', en: 'Staff' }, value: 9.6 },
  { label: { sr: 'Sadržaji', en: 'Facilities' }, value: 9.5 },
  { label: { sr: 'Čistoća', en: 'Cleanliness' }, value: 9.7 },
  { label: { sr: 'Udobnost', en: 'Comfort' }, value: 9.4 },
  { label: { sr: 'Odnos cene i kvaliteta', en: 'Value for money' }, value: 9.7 },
  { label: { sr: 'Lokacija', en: 'Location' }, value: 9.5 },
  { label: { sr: 'Besplatan WiFi', en: 'Free WiFi' }, value: 8.0 },
]

// Recenzije gostiju iz Srbije sa Booking.com-a (original na srpskom, en = prevod)
export const reviews = [
  { name: 'Aleksandra', sr: 'Sve je čisto, uredno. Veliko dvorište sa aktivnostima sa decu. Ljubazni domaćini.', en: 'Everything is clean and tidy. A big yard with activities for kids. Friendly hosts.' },
  { name: 'Andrijana', sr: 'Mi smo isli porodicno, sa dvoje male dece. Bilo je dovoljno prostora, dve spavace sobe sa velikim, i jako udobnim krevetima. Jako uredno i cisto. Lokacija je na oko 5 min hodom do centra. Domacini su vrlo ljubazni.', en: 'We travelled as a family with two small children. There was plenty of space – two bedrooms with big, very comfortable beds. Very tidy and clean. The location is about a 5-minute walk from the centre. The hosts are very friendly.' },
  { name: 'Aleksandar', sr: 'Apartman je skroz korektan, veoma je čist i dobro je opremljen. Nalazi se na odličnoj mirnoj lokaciji, blizu centra (par minuta hoda). Kreveti su bili veoma udobni. Domaćin je izuzetno ljubazan. Moja preporuka', en: 'The apartment is perfectly fine, very clean and well equipped. It is in a great, quiet location close to the centre (a few minutes’ walk). The beds were very comfortable. The host is extremely kind. I recommend it.' },
  { name: 'Mladen', sr: 'Sve preporuke, objekat je imao sve sto nam je potrebno za boravak, cista 10', en: 'Highly recommended – the place had everything we needed for our stay. A clear 10.' },
  { name: 'Jasmina', sr: 'Smeštaj je sasvim ok. Čist. Domaćini ljubazni... Sve preporuke... Blizu centra..', en: 'The accommodation is perfectly OK. Clean. Friendly hosts… Highly recommended… Close to the centre.' },
  { name: 'Srđan', sr: 'Prostran i lep stan, udobni kreveti, cist nesprekorno. Gazde su jako ljubazne.', en: 'A spacious and lovely flat, comfortable beds, spotlessly clean. The owners are very kind.' },
  { name: 'Biljana', sr: 'Sve nam se dopalo, od samog smeštaja do higijene, lokacije i ljubaznih domaćina... Za svaku preporuku...', en: 'We liked everything – the accommodation, the cleanliness, the location and the friendly hosts… Highly recommended…' },
  { name: 'Marina', sr: 'Lokacija i smestaj peefektni. Domacini ljubazni. Sve preporuke', en: 'Location and accommodation are perfect. Friendly hosts. Highly recommended.' },
]

export const houseRules = [
  { icon: '🔑', title: { sr: 'Prijavljivanje', en: 'Check-in' }, text: { sr: 'Od 15:00 do 23:30. Potrebno je da unapred obavestite objekat o tome kada stižete.', en: 'From 15:00 to 23:30. Please let the property know in advance what time you will arrive.' } },
  { icon: '🚪', title: { sr: 'Odjavljivanje', en: 'Check-out' }, text: { sr: 'Od 00:00 do 10:00.', en: 'From 00:00 to 10:00.' } },
  { icon: '🧒', title: { sr: 'Deca', en: 'Children' }, text: { sr: 'Deca bilo kog uzrasta su dobrodošla. Krevetac i dodatni kreveti nisu dostupni.', en: 'Children of all ages are welcome. Cots and extra beds are not available.' } },
  { icon: '🚭', title: { sr: 'Pušenje', en: 'Smoking' }, text: { sr: 'Pušenje nije dozvoljeno.', en: 'Smoking is not allowed.' } },
  { icon: '🎉', title: { sr: 'Zabave', en: 'Parties' }, text: { sr: 'Zabave i događaji nisu dozvoljeni.', en: 'Parties and events are not allowed.' } },
  { icon: '🌙', title: { sr: 'Period tišine', en: 'Quiet hours' }, text: { sr: 'Gosti treba da budu tihi između 23:00 i 07:00.', en: 'Guests are asked to keep quiet between 23:00 and 07:00.' } },
  { icon: '🐾', title: { sr: 'Kućni ljubimci', en: 'Pets' }, text: { sr: 'Kućni ljubimci nisu dozvoljeni.', en: 'Pets are not allowed.' } },
]

export const nearby = [
  {
    group: { sr: 'Javni prevoz', en: 'Public transport' },
    items: [{ name: { sr: 'Železnička stanica Pirot', en: 'Pirot railway station' }, distance: { sr: '2,2 km', en: '2.2 km' } }],
  },
  {
    group: { sr: 'Najbliži aerodromi', en: 'Nearest airports' },
    items: [
      { name: { sr: 'Aerodrom Konstantin Veliki (Niš)', en: 'Niš Constantine the Great Airport' }, distance: '72 km' },
      { name: { sr: 'Aerodrom Sofija', en: 'Sofia Airport' }, distance: '92 km' },
    ],
  },
]
