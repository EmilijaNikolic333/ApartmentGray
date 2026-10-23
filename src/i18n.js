import { createContext, useContext } from 'react'

export const languages = ['sr', 'en']

// Tekstovi interfejsa; podaci o apartmanu su u data.js i guests.js
export const strings = {
  sr: {
    title: 'Apartment Gray – Pirot',
    nav: {
      galerija: 'Galerija',
      opis: 'Opis',
      sadrzaji: 'Sadržaji',
      recenzije: 'Recenzije',
      domacin: 'Domaćin',
      pravila: 'Kućni red',
      lokacija: 'Lokacija',
    },
    book: 'Rezerviši',
    bookingUrl: 'https://www.booking.com/hotel/rs/apartment-gray.sr.html',
    typed: ['vrt sa ružama', 'mir 5 minuta od centra', 'domaćinski doček', 'mesto za celu porodicu'],
    scrollDown: 'Skroluj naniže',
    reviewWord: (n) => {
      const last = n % 10
      const lastTwo = n % 100
      if (lastTwo >= 11 && lastTwo <= 14) return 'recenzija'
      return last >= 2 && last <= 4 ? 'recenzije' : 'recenzija'
    },
    gallery: 'Galerija',
    showAll: (n) => `Prikaži sve fotografije (${n})`,
    close: 'Zatvori',
    prev: 'Prethodna',
    next: 'Sledeća',
    about: 'O apartmanu',
    summary: 'Ukratko',
    checkAvailability: 'Proveri raspoloživost',
    facilities: 'Sadržaji',
    guestImpressions: 'Utisci gostiju',
    outOf: (v, max) => `${v} od ${max}`,
    worldTitle: 'Gosti iz celog sveta',
    worldSub: (n) => `Recenzije sa Airbnb-a, prevedene na srpski · ${n} recenzija, sve sa ocenom 5 ★`,
    prevReview: 'Prethodna recenzija',
    nextReview: 'Sledeća recenzija',
    reviewN: (i, name) => `Recenzija ${i}: ${name}`,
    showOriginal: (code) => `Original (${code})`,
    showTranslation: 'Prikaži prevod',
    translatedFrom: (l) => `Prevedeno sa ${l} jezika`,
    langNames: { EN: 'engleskog', FR: 'francuskog', DE: 'nemačkog', TR: 'turskog', RU: 'ruskog', BG: 'bugarskog', ES: 'španskog', SR: 'srpskog' },
    localTitle: 'Gosti iz Srbije',
    serbia: 'Srbija',
    meetHost: 'Upoznajte domaćina',
    superhost: 'Superhost · Domaćin',
    hostPhotoAlt: (name) => `Domaćin ${name}`,
    hostBio: (name) =>
      `${name} je Superhost na Airbnb-u – status koji dobijaju iskusni domaćini sa izvanrednim ocenama i pouzdanim gostoprimstvom. Gosti ga u recenzijama najčešće opisuju kao ljubaznog, predusretljivog i uvek dostupnog.`,
    work: (w) => `Zanimanje: ${w}`,
    speaks: (l) => `Govori ${l}`,
    responds: 'Odgovara u roku od sat vremena',
    callHost: (name) => `Pozovi ${name}a`,
    viber: 'Viber poruka',
    whatsapp: 'WhatsApp poruka',
    callHostShort: 'Pozovi domaćina',
    rules: 'Kućni red',
    location: 'Lokacija',
    locationNote: (score) => `Odlična lokacija – ocena ${score}/10, oko 5 minuta hoda do centra`,
    map: 'Mapa',
    openMaps: 'Otvori u Google mapama',
    footerHost: 'Domaćin',
    dataFrom: 'Podaci i fotografije preuzeti sa',
    and: 'i',
    decimal: ',',
  },
  en: {
    title: 'Apartment Gray – Pirot, Serbia',
    nav: {
      galerija: 'Gallery',
      opis: 'About',
      sadrzaji: 'Amenities',
      recenzije: 'Reviews',
      domacin: 'Host',
      pravila: 'House rules',
      lokacija: 'Location',
    },
    book: 'Book now',
    bookingUrl: 'https://www.booking.com/hotel/rs/apartment-gray.en-gb.html',
    typed: ['a garden full of roses', 'quiet, 5 minutes from the centre', 'a warm family welcome', 'room for the whole family'],
    scrollDown: 'Scroll down',
    reviewWord: (n) => (n === 1 ? 'review' : 'reviews'),
    gallery: 'Gallery',
    showAll: (n) => `Show all photos (${n})`,
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    about: 'About the apartment',
    summary: 'At a glance',
    checkAvailability: 'Check availability',
    facilities: 'Amenities',
    guestImpressions: 'Guest reviews',
    outOf: (v, max) => `${v} out of ${max}`,
    worldTitle: 'Guests from around the world',
    worldSub: (n) => `Reviews from Airbnb · ${n} reviews, all rated 5 ★`,
    prevReview: 'Previous review',
    nextReview: 'Next review',
    reviewN: (i, name) => `Review ${i}: ${name}`,
    showOriginal: (code) => `Original (${code})`,
    showTranslation: 'Show translation',
    translatedFrom: (l) => `Translated from ${l}`,
    langNames: { EN: 'English', FR: 'French', DE: 'German', TR: 'Turkish', RU: 'Russian', BG: 'Bulgarian', ES: 'Spanish', SR: 'Serbian' },
    localTitle: 'Guests from Serbia',
    serbia: 'Serbia',
    meetHost: 'Meet your host',
    superhost: 'Superhost · Host',
    hostPhotoAlt: (name) => `Host ${name}`,
    hostBio: (name) =>
      `${name} is an Airbnb Superhost – a status given to experienced hosts with outstanding ratings and reliable hospitality. In their reviews, guests most often describe him as kind, helpful and always available.`,
    work: (w) => `Work: ${w}`,
    speaks: (l) => `Speaks ${l}`,
    responds: 'Responds within an hour',
    callHost: (name) => `Call ${name}`,
    viber: 'Message on Viber',
    whatsapp: 'Message on WhatsApp',
    callHostShort: 'Call the host',
    rules: 'House rules',
    location: 'Location',
    locationNote: (score) => `Excellent location – rated ${score}/10, about a 5-minute walk to the centre`,
    map: 'Map',
    openMaps: 'Open in Google Maps',
    footerHost: 'Host',
    dataFrom: 'Information and photos from',
    and: 'and',
    decimal: '.',
  },
}

export const LangContext = createContext(null)

export function useLang() {
  return useContext(LangContext)
}

// Početni jezik: sačuvan izbor, inače jezik pregledača (srpski/hrvatski/bosanski → sr)
export function initialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (languages.includes(saved)) return saved
  } catch {
    // localStorage nije dostupan
  }
  const nav = (navigator.language || 'sr').toLowerCase()
  return /^(sr|hr|bs|me|sh)/.test(nav) ? 'sr' : 'en'
}
