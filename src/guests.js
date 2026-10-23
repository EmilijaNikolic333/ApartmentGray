// Domaćin i recenzije sa Airbnb-a i Google-a (oktobar 2026.)

export const platforms = [
  { name: 'Booking.com', score: 9.5, max: 10, count: 90, label: 'Izuzetan' },
  { name: 'Airbnb', score: 5.0, max: 5, count: 23, label: 'Izbor gostiju · top 10%' },
  { name: 'Google', score: 5.0, max: 5, count: 1, label: 'Google recenzije' },
]

export const host = {
  name: 'Boban',
  photo: '/images/boban.jpg',
  phone: '069 691384',
  phoneIntl: '+38169691384',
  work: 'Novinar',
  languages: 'srpski, engleski i bugarski',
  stats: [
    { value: 23, label: 'recenzije' },
    { value: 5, decimals: 1, label: 'prosečna ocena', suffix: ' ★' },
    { value: 2, label: 'godine domaćin' },
    { value: 100, label: 'stopa odgovora', suffix: '%' },
  ],
}

// Recenzije stranih gostiju sa Airbnb-a – sve ocenjene sa 5 zvezdica
export const foreignReviews = [
  { name: 'Brice', lang: 'FR', from: 'francuskog', date: 'oktobar 2026.', original: 'Boban est un très bon hôte. Son logement est idéalement situé.', text: 'Boban je odličan domaćin. Njegov smeštaj je idealno lociran.' },
  { name: 'Ilyas', lang: 'DE', from: 'nemačkog', date: 'septembar 2026.', original: 'Wir sind auf der Durchreise für eine Nacht in dieser Unterkunft geblieben und waren rundum sehr zufrieden. Das Gastgeber antwortet schnell und ist überaus freundlich und hilfsbereit. Wir würden es jedem weiterempfehlen und jederzeit wiederkommen. Danke 🙏🏽', text: 'Odseli smo ovde na jednu noć u prolazu i bili smo potpuno zadovoljni. Domaćin brzo odgovara i izuzetno je ljubazan i spreman da pomogne. Preporučili bismo svakome i rado bismo se vratili. Hvala 🙏🏽' },
  { name: 'Fedai', lang: 'TR', from: 'turskog', place: 'Adapazari, Turska', date: 'septembar 2026.', original: 'Herşey olması gerektiği gibiydi. Biz memnun kaldık.', text: 'Sve je bilo baš onako kako treba. Bili smo zadovoljni.' },
  { name: 'Rifat', lang: 'RU', from: 'ruskog', date: 'avgust 2026.', original: 'Спасибо большое за гостеприимство! Хозяева квартиры очень добрые и приятные люди, встретили нас у входа, приняли как положено))) нам очень понравился двор, очень чистый и ухоженный!!! Все супер!!! Спасибо большое', text: 'Veliko hvala na gostoprimstvu! Domaćini su veoma dobri i prijatni ljudi, dočekali su nas na ulazu i primili kako dolikuje :) Dvorište nam se mnogo dopalo, veoma čisto i negovano! Sve je super! Hvala vam puno.' },
  { name: 'Daniel', lang: 'EN', from: 'engleskog', date: 'avgust 2026.', original: 'Stayed with my girlfriend for one night but we really felt like home! We also had a chance to walk around the city and we really liked it! We really suggest it 🙌', text: 'Boravio sam sa devojkom jednu noć, ali smo se zaista osećali kao kod kuće! Prošetali smo i gradom, koji nam se mnogo dopao. Toplo preporučujemo 🙌' },
  { name: 'Menachem', lang: 'EN', from: 'engleskog', place: 'Njujork, SAD', date: 'avgust 2026.', original: 'Our stay was great, the house is spotless and has all the amenities needed. The backyard is beautiful and well maintained and was great for the children to play.', text: 'Boravak je bio sjajan, kuća je besprekorno čista i ima sve što je potrebno. Dvorište je prelepo i negovano, a deca su u njemu uživala u igri.' },
  { name: 'Tapissier', lang: 'FR', from: 'francuskog', date: 'jul 2026.', original: 'Super !!! Rien à dire, je vous le conseille sans hésiter !!!', text: 'Super!!! Nemam nijednu zamerku, preporučujem bez razmišljanja!!!' },
  { name: 'Jo', lang: 'FR', from: 'francuskog', date: 'jul 2026.', original: 'Tout était parfait.', text: 'Sve je bilo savršeno.' },
  { name: 'Fazıl', lang: 'TR', from: 'turskog', place: 'Anamur, Turska', date: 'jul 2026.', original: 'Boban çok ilgiliydi, sorularımıza hızlı cevap verdi.', text: 'Boban je bio veoma predusretljiv i brzo je odgovarao na naša pitanja.' },
  { name: 'Kalin', lang: 'EN', from: 'engleskog', date: 'jun 2026.', original: 'Great host, really clean place with a nice garden and outdoor sitting area. We’ve stayed for a night with an early check in – highly recommend!', text: 'Sjajan domaćin, zaista čist smeštaj sa lepim vrtom i mestom za sedenje napolju. Ostali smo jednu noć uz raniji dolazak – toplo preporučujem!' },
  { name: 'Emil', lang: 'EN', from: 'engleskog', date: 'februar 2026.', original: 'Boban is a fantastic host with excellent communication from start to finish. The location is great — just a 5-minute walk from the town center, with a small park right in front of the house, which was perfect for our kids. The place was very clean, tidy, and well organized. Overall, it was a comfortable and family-friendly stay, and we would be happy to come back again. Highly recommended!', text: 'Boban je fantastičan domaćin, sa odličnom komunikacijom od početka do kraja. Lokacija je sjajna – samo 5 minuta hoda do centra, sa malim parkom ispred kuće, što je bilo savršeno za našu decu. Smeštaj je veoma čist, uredan i dobro organizovan. Udoban boravak, idealan za porodice – rado ćemo se vratiti. Toplo preporučujem!' },
  { name: 'Vasil', lang: 'EN', from: 'engleskog', date: 'februar 2026.', original: 'Perfect location, nice and clean apartment.', text: 'Savršena lokacija, lep i čist apartman.' },
  { name: 'Hüseyin', lang: 'TR', from: 'turskog', place: 'Istanbul, Turska', date: 'januar 2026.', original: 'Harika bir konum.', text: 'Fantastična lokacija.' },
  { name: 'Elena', lang: 'BG', from: 'bugarskog', date: 'januar 2026.', original: 'Много любезен домакин. Препоръчвам.', text: 'Veoma ljubazan domaćin. Preporučujem.' },
  { name: 'Beatriz', lang: 'ES', from: 'španskog', date: 'decembar 2025.', original: 'Hola viajeros, la familia anfitriona fue muy linda y servicial, la casa es más para relajarse, lo cual es perfecto, se siente un ambiente hogareño. ¡Mis recomendaciones!', text: 'Zdravo putnici, porodica domaćina bila je veoma draga i uslužna. Kuća je kao stvorena za opuštanje, što je savršeno – oseća se domaća atmosfera. Sve preporuke!' },
  { name: 'Seb', lang: 'FR', from: 'francuskog', date: 'avgust 2025.', original: 'On ne juge pas un livre à sa couverture, tout comme on ne juge pas une personne à ce qu’il dit mais à ses actes. Les mots respect, amitié, gentillesse, générosité et beaucoup d’autres ont pris tout leur sens. Boban et sa famille sont des personnes formidables et nous espérons les revoir un jour. Nous recommandons fortement. Merci encore pour tout.', text: 'Knjigu ne sudimo po koricama, kao što ni čoveka ne sudimo po rečima, već po delima. Ovde su reči poštovanje, prijateljstvo, ljubaznost i velikodušnost dobile pun smisao. Boban i njegova porodica su divni ljudi i nadamo se da ćemo ih ponovo videti. Toplo preporučujemo. Hvala još jednom na svemu.' },
  { name: 'Viktor', lang: 'DE', from: 'nemačkog', date: 'maj 2025.', original: 'Alles unkompliziert.', text: 'Sve je bilo jednostavno i bez komplikacija.' },
  { name: 'Daniel', lang: 'DE', from: 'nemačkog', date: 'april 2025.', original: 'Boban hat uns gastfreundlich empfangen. Wir konnten unser Auto gut im Hof parken. Die Unterkunft war groß genug für eine fünfköpfige Familie. In der Nähe sehr gute Einkaufsmöglichkeiten. Die Unterkunft ist mit allem Nötigen ausgestattet.', text: 'Boban nas je gostoljubivo dočekao. Auto smo bez problema parkirali u dvorištu. Smeštaj je bio dovoljno prostran za petočlanu porodicu, a u blizini su odlične prodavnice. Apartman je opremljen svim potrebnim.' },
  { name: 'Ayub', lang: 'EN', from: 'engleskog', date: 'novembar 2024.', original: 'The family was outstanding, the place was fantastic, very clean — never seen a place this clean. Quiet, respectful, helpful. Don’t think twice about staying here, really nice people and family. They even washed, dried, ironed and folded our clothes while we stayed the night. Thank you very much, I will definitely stay here again!', text: 'Porodica domaćina bila je izvanredna, a smeštaj fantastičan i toliko čist da tako nešto nismo videli. Mirno, ljubazni i predusretljivi ljudi – ne razmišljajte dvaput! Čak su nam oprali, osušili, ispeglali i složili odeću dok smo prenoćili. Hvala vam puno, sigurno ću ponovo odsesti ovde!' },
  { name: 'Jelle', lang: 'EN', from: 'engleskog', date: 'oktobar 2024.', original: 'Everything went very smoothly and it’s a really nice place to stay!', text: 'Sve je prošlo glatko, a ovo je zaista lepo mesto za boravak!' },
  { name: 'Alena', lang: 'EN', from: 'engleskog', date: 'septembar 2024.', original: 'We spent one night in this apartment on our way from Bulgaria to Romania, and it was perfect. Clean and spacious accommodation with comfortable beds and thoughtful touches. Thank you very much for your hospitality, and we highly recommend it to other travelers.', text: 'Proveli smo jednu noć u ovom apartmanu na putu iz Bugarske za Rumuniju i bilo je savršeno. Čist i prostran smeštaj, udobni kreveti i pažljivo osmišljeni detalji. Hvala vam na gostoprimstvu – toplo preporučujemo drugim putnicima.' },
]
