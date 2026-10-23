import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  apartment,
  highlights,
  facilities,
  photos,
  ratings,
  reviews,
  houseRules,
  nearby,
} from './data'
import { platforms, host, foreignReviews } from './guests'
import { languages, strings, LangContext, useLang, initialLang } from './i18n'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const sectionIds = ['galerija', 'opis', 'sadrzaji', 'recenzije', 'domacin', 'pravila', 'lokacija']

// Tekst recenzije na izabranom jeziku: original ako je pisana tim jezikom, inače prevod
const reviewText = (r, lang) => (r.lang.toLowerCase() === lang ? r.original : r[lang])

// Elementi sa klasom .reveal se postepeno pojavljuju pri skrolovanju
function useReveal() {
  useEffect(() => {
    const pending = () => document.querySelectorAll('.reveal:not(.is-visible)')
    if (reducedMotion()) {
      const showAll = () => pending().forEach((el) => el.classList.add('is-visible'))
      showAll()
      const mo = new MutationObserver(showAll)
      mo.observe(document.body, { childList: true, subtree: true })
      return () => mo.disconnect()
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px' }
    )
    const observeAll = () => pending().forEach((el) => io.observe(el))
    observeAll()
    // Prati i elemente koji se dodaju kasnije (npr. "Prikaži sve fotografije")
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

function CountUp({ to, decimals = 0, suffix = '' }) {
  const { fmt } = useLang()
  const ref = useRef(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    if (reducedMotion()) return
    let frame
    setValue(0)
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / 1400, 1)
        setValue(to * (1 - Math.pow(1 - t, 3)))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to])

  return (
    <span ref={ref}>
      {decimals ? fmt(value, decimals) : Math.round(value)}
      {suffix}
    </span>
  )
}

function Stars({ value, max = 5 }) {
  const { s, fmt } = useLang()
  const pct = (value / max) * 100
  return (
    <span className="stars-rating" aria-label={s.outOf(fmt(value), max)}>
      <span className="stars-empty">★★★★★</span>
      <span className="stars-full" style={{ width: `${pct}%` }}>★★★★★</span>
    </span>
  )
}

function Typed({ words }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState(words[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion()) return
    const word = words[i]
    let delay = deleting ? 40 : 85
    if (!deleting && text === word) delay = 2200
    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setI((i + 1) % words.length)
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(id)
  }, [text, deleting, i, words])

  return <span className="typed">{text}</span>
}

function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let frame
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" ref={ref} />
}

// Kućica iz logoa (krov sa dimnjakom); boja prati currentColor
function HouseMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 226 140" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 132 L112 44 L220 132" />
        <path d="M40 132 L112 72 L208 132" />
        <path d="M36 105 V58 H70 V78" />
        <path d="M50 42 C40 34 60 26 48 12" strokeWidth="6" />
        <path d="M66 42 C58 36 72 30 64 20" strokeWidth="5" />
      </g>
    </svg>
  )
}

function Logo({ stacked = false }) {
  return (
    <span className={`brand${stacked ? ' brand-stacked' : ''}`}>
      <HouseMark className="brand-mark" />
      <span className="brand-text">
        <span className="brand-name">Apartment Gray</span>
        <span className="brand-tag">Hosting since 2010</span>
      </span>
    </span>
  )
}

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Jezik / Language">
      <span className="lang-thumb" style={{ transform: `translateX(${languages.indexOf(lang) * 100}%)` }} />
      {languages.map((l) => (
        <button
          key={l}
          className={l === lang ? 'is-active' : ''}
          aria-pressed={l === lang}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function Header() {
  const { s } = useLang()
  const [active, setActive] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      let current = null
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
      <ScrollProgress />
      <div className="container topbar-inner">
        <a href="#" className="logo" aria-label="Apartment Gray">
          <Logo />
        </a>
        <nav className="nav">
          {sectionIds.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
              {s.nav[id]}
            </a>
          ))}
        </nav>
        <div className="topbar-actions">
          <LangSwitch />
          <a className="btn btn-primary" href={s.bookingUrl} target="_blank" rel="noreferrer">
            {s.book}
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero({ onOpen }) {
  const { s, t, fmt } = useLang()
  return (
    <section className="hero">
      <img src={photos[0].src} alt={t(photos[0].alt)} onClick={() => onOpen(0)} />
      <div className="hero-overlay">
        <div className="container">
          <div className="stars rise">{'★'.repeat(apartment.stars)}</div>
          <h1 className="rise" style={{ '--delay': '0.1s' }}>{apartment.name}</h1>
          <p className="tagline rise" style={{ '--delay': '0.2s' }}>
            <Typed key={s.typed[0]} words={s.typed} />
          </p>
          <p className="address rise" style={{ '--delay': '0.3s' }}>📍 {t(apartment.address)}</p>
          <div className="hero-badges rise" style={{ '--delay': '0.4s' }}>
            {platforms.map((p) => (
              <a key={p.name} href="#recenzije" className="hero-badge">
                <strong>{fmt(p.score)}</strong>
                <span>
                  {p.name}
                  <small>{p.max === 5 ? '★★★★★' : `${p.count} ${s.reviewWord(p.count)}`}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <a href="#galerija" className="scroll-hint" aria-label={s.scrollDown}>
        <span />
      </a>
    </section>
  )
}

function Gallery({ onOpen }) {
  const { s, t } = useLang()
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? photos : photos.slice(0, 9)
  return (
    <section id="galerija" className="section container">
      <h2 className="reveal">{s.gallery}</h2>
      <div className="gallery">
        {visible.map((p, i) => (
          <button
            key={p.src}
            className="thumb reveal"
            style={{ '--delay': `${(i % 3) * 0.08}s` }}
            onClick={() => onOpen(i)}
          >
            <img src={p.src} alt={t(p.alt)} loading="lazy" />
            <span className="thumb-label">{t(p.alt)}</span>
          </button>
        ))}
      </div>
      {!showAll && (
        <div className="center">
          <button className="btn btn-outline" onClick={() => setShowAll(true)}>
            {s.showAll(photos.length)}
          </button>
        </div>
      )}
    </section>
  )
}

function Lightbox({ index, onClose, onNav }) {
  const { s, t } = useLang()
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNav])

  const p = photos[index]
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label={s.close}>✕</button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); onNav(-1) }} aria-label={s.prev}>‹</button>
      <figure key={p.src} onClick={(e) => e.stopPropagation()}>
        <img src={p.src} alt={t(p.alt)} />
        <figcaption>
          {t(p.alt)} · {index + 1} / {photos.length}
        </figcaption>
      </figure>
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); onNav(1) }} aria-label={s.next}>›</button>
    </div>
  )
}

function About() {
  const { s, t } = useLang()
  return (
    <section id="opis" className="section container about">
      <div className="reveal">
        <h2>{s.about}</h2>
        {apartment.description.map((d) => (
          <p key={d.sr}>{t(d)}</p>
        ))}
      </div>
      <aside className="card highlights reveal" style={{ '--delay': '0.15s' }}>
        <h3>{s.summary}</h3>
        <ul>
          {highlights.map((h) => (
            <li key={h.label.sr}>
              <span className="icon">{h.icon}</span>
              {t(h.label)}
            </li>
          ))}
        </ul>
        <a className="btn btn-primary block" href={s.bookingUrl} target="_blank" rel="noreferrer">
          {s.checkAvailability}
        </a>
      </aside>
    </section>
  )
}

function Facilities() {
  const { s, t } = useLang()
  return (
    <section id="sadrzaji" className="section alt">
      <div className="container">
        <h2 className="reveal">{s.facilities}</h2>
        <div className="facilities">
          {facilities.map((f, i) => (
            <div key={f.label.sr} className="facility reveal" style={{ '--delay': `${(i % 3) * 0.06}s` }}>
              <span className="icon">{f.icon}</span>
              {t(f.label)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformScores() {
  const { s, t } = useLang()
  return (
    <div className="platforms">
      {platforms.map((p, i) => (
        <div key={p.name} className="card platform reveal" style={{ '--delay': `${i * 0.1}s` }}>
          <div className="platform-name">{p.name}</div>
          <div className="platform-score">
            <CountUp to={p.score} decimals={1} />
            <small>/{p.max}</small>
          </div>
          <Stars value={p.score} max={p.max} />
          <div className="muted">
            {t(p.label)} · {p.count} {s.reviewWord(p.count)}
          </div>
        </div>
      ))}
    </div>
  )
}

function ForeignReviews() {
  const { lang, s, t } = useLang()
  const [index, setIndex] = useState(0)
  const [original, setOriginal] = useState(false)
  const [paused, setPaused] = useState(false)
  const drag = useRef(null)
  const n = foreignReviews.length
  const go = useCallback((dir) => {
    setOriginal(false)
    setIndex((i) => (i + dir + n) % n)
  }, [n])

  useEffect(() => setOriginal(false), [lang])

  useEffect(() => {
    if (paused || original || reducedMotion()) return
    const id = setTimeout(() => go(1), 7000)
    return () => clearTimeout(id)
  }, [index, paused, original, go])

  const onPointerDown = (e) => { drag.current = e.clientX }
  const onPointerUp = (e) => {
    if (drag.current === null) return
    const dx = e.clientX - drag.current
    drag.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  const r = foreignReviews[index]
  const translated = r.lang.toLowerCase() !== lang
  const showOriginal = translated && original
  return (
    <div className="world reveal">
      <div className="world-head">
        <div>
          <h3>{s.worldTitle}</h3>
          <p className="muted">{s.worldSub(n)}</p>
        </div>
        <div className="langs" aria-hidden="true">
          {[...new Set(foreignReviews.map((x) => x.lang))].map((l) => (
            <span key={l} className={l === r.lang ? 'is-on' : ''}>{l}</span>
          ))}
        </div>
      </div>

      <div
        className={`quote-stage${paused ? ' is-paused' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <article key={index} className="card quote">
          <span className="quote-mark" aria-hidden="true">“</span>
          <Stars value={5} />
          <p lang={showOriginal ? r.lang.toLowerCase() : lang}>
            {showOriginal ? r.original : reviewText(r, lang)}
          </p>
          <footer>
            <span className="avatar">{r.name[0]}</span>
            <div>
              <strong>{r.name}</strong>
              <div className="muted">
                {r.place ? `${t(r.place)} · ` : ''}
                {t(r.date)}
              </div>
            </div>
            {translated && (
              <button className="translate" onClick={() => setOriginal((o) => !o)}>
                {original ? s.showTranslation : s.showOriginal(r.lang)}
              </button>
            )}
          </footer>
          {translated && !original && (
            <div className="muted small">{s.translatedFrom(s.langNames[r.lang])}</div>
          )}
        </article>
        <button className="quote-nav prev" onClick={() => go(-1)} aria-label={s.prevReview}>‹</button>
        <button className="quote-nav next" onClick={() => go(1)} aria-label={s.nextReview}>›</button>
      </div>

      <div className="dots">
        {foreignReviews.map((x, i) => (
          <button
            key={i}
            className={i === index ? 'is-active' : ''}
            onClick={() => { setOriginal(false); setIndex(i) }}
            aria-label={s.reviewN(i + 1, x.name)}
          >
            {i === index && <span key={index} className="dot-progress" />}
          </button>
        ))}
      </div>
    </div>
  )
}

function Reviews() {
  const { lang, s, t, fmt } = useLang()
  return (
    <section id="recenzije" className="section container">
      <h2 className="reveal">{s.guestImpressions}</h2>
      <PlatformScores />

      <div className="reviews-summary reveal">
        <div className="big-score">
          <span className="score lg">{fmt(apartment.score)}</span>
          <div>
            <strong>Booking.com · {t(apartment.scoreLabel)}</strong>
            <div className="muted">{apartment.reviewCount} {s.reviewWord(apartment.reviewCount)}</div>
          </div>
        </div>
        <div className="bars">
          {ratings.map((r) => (
            <div key={r.label.sr} className="bar-row">
              <div className="bar-head">
                <span>{t(r.label)}</span>
                <strong>{fmt(r.value)}</strong>
              </div>
              <div className="bar">
                <div style={{ '--w': `${r.value * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ForeignReviews />

      <h3 className="reviews-title reveal">{s.localTitle}</h3>
      <div className="reviews">
        {reviews.map((r, i) => (
          <article key={r.name} className="card review reveal" style={{ '--delay': `${(i % 3) * 0.08}s` }}>
            <div className="review-head">
              <span className="avatar">{r.name[0]}</span>
              <div>
                <strong>{r.name}</strong>
                <div className="muted">🇷🇸 {s.serbia}</div>
              </div>
            </div>
            <p lang={lang}>„{r[lang]}”</p>
            {lang !== 'sr' && <div className="muted small">{s.translatedFrom(s.langNames.SR)}</div>}
          </article>
        ))}
      </div>
    </section>
  )
}

function Host() {
  const { s, t } = useLang()
  return (
    <section id="domacin" className="section alt">
      <div className="container host">
        <div className="card host-card reveal">
          <div className="host-photo">
            <img src={host.photo} alt={s.hostPhotoAlt(host.name)} />
            <span className="host-badge" title="Superhost">★</span>
          </div>
          <h3>{host.name}</h3>
          <div className="muted">{s.superhost}</div>
          <div className="host-stats">
            {host.stats.map((st) => (
              <div key={st.label.sr}>
                <strong>
                  <CountUp to={st.value} decimals={st.decimals} suffix={st.suffix} />
                </strong>
                <span>{t(st.label)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="host-info reveal" style={{ '--delay': '0.15s' }}>
          <h2>{s.meetHost}</h2>
          <p>{s.hostBio(host.name)}</p>
          <ul className="host-facts">
            <li><span className="icon">💼</span>{s.work(t(host.work))}</li>
            <li><span className="icon">🗣️</span>{s.speaks(t(host.languages))}</li>
            <li><span className="icon">⚡</span>{s.responds}</li>
          </ul>
          <div className="host-actions">
            <a className="btn btn-primary btn-call" href={`tel:${host.phoneIntl}`}>
              <span className="ring" aria-hidden="true">📞</span>
              {s.callHost(host.name)} · {host.phone}
            </a>
            <a className="btn btn-outline" href={`viber://chat?number=%2B${host.phoneIntl.slice(1)}`}>
              {s.viber}
            </a>
            <a className="btn btn-outline" href={`https://wa.me/${host.phoneIntl.slice(1)}`} target="_blank" rel="noreferrer">
              {s.whatsapp}
            </a>
          </div>
          <a className="host-email" href={`mailto:${host.email}?subject=${encodeURIComponent(s.emailSubject)}`}>
            <span className="icon">✉️</span>
            <span>
              <small>{s.email}</small>
              {host.email}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function HouseRules() {
  const { s, t } = useLang()
  return (
    <section id="pravila" className="section">
      <div className="container">
        <h2 className="reveal">{s.rules}</h2>
        <div className="rules">
          {houseRules.map((r, i) => (
            <div key={r.title.sr} className="rule reveal" style={{ '--delay': `${(i % 2) * 0.08}s` }}>
              <span className="icon">{r.icon}</span>
              <div>
                <strong>{t(r.title)}</strong>
                <p>{t(r.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location() {
  const { s, t, fmt } = useLang()
  const { lat, lng } = apartment.coords
  const d = 0.008
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d / 2}%2C${lng + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lng}`
  return (
    <section id="lokacija" className="section alt">
      <div className="container">
        <h2 className="reveal">{s.location}</h2>
        <p className="muted reveal">
          📍 {t(apartment.address)} · {s.locationNote(fmt(apartment.locationScore))}
        </p>
        <div className="location reveal">
          <iframe title={s.map} src={mapSrc} loading="lazy" />
          <div className="card">
            {nearby.map((g) => (
              <div key={g.group.sr} className="nearby-group">
                <h3>{t(g.group)}</h3>
                <ul>
                  {g.items.map((i) => (
                    <li key={i.name.sr}>
                      <span>{t(i.name)}</span>
                      <span className="muted">{t(i.distance)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              className="btn btn-outline block"
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
              target="_blank"
              rel="noreferrer"
            >
              {s.openMaps}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { s, t } = useLang()
  return (
    <footer className="footer">
      <div className="container">
        <Logo stacked />
        <div className="footer-address">{t(apartment.address)}</div>
        <div className="footer-phone">
          {s.footerHost} {host.name}: <a href={`tel:${host.phoneIntl}`}>{host.phone}</a>
          {' · '}
          <a href={`mailto:${host.email}?subject=${encodeURIComponent(s.emailSubject)}`}>{host.email}</a>
        </div>
        <div className="muted">
          {s.dataFrom}{' '}
          <a href={s.bookingUrl} target="_blank" rel="noreferrer">Booking.com</a> {s.and}{' '}
          <a href="https://www.airbnb.com/rooms/1241843572563048799" target="_blank" rel="noreferrer">Airbnb</a>
        </div>
      </div>
    </footer>
  )
}

function CallFab() {
  const { s } = useLang()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a
      className={`call-fab${show ? ' is-on' : ''}`}
      href={`tel:${host.phoneIntl}`}
      aria-label={`${s.callHost(host.name)}: ${host.phone}`}
    >
      <img src={host.photo} alt="" />
      <span>
        <small>{s.callHostShort}</small>
        {host.phone}
      </span>
    </a>
  )
}

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const [open, setOpen] = useState(null)
  const nav = useCallback((dir) => setOpen((i) => (i + dir + photos.length) % photos.length), [])
  const close = useCallback(() => setOpen(null), [])
  useReveal()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = strings[lang].title
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // izbor jezika se tada ne pamti
    }
  }, [lang])

  const value = useMemo(() => {
    const s = strings[lang]
    return {
      lang,
      setLang,
      s,
      t: (x) => (x && typeof x === 'object' ? x[lang] : x),
      fmt: (n, decimals = 1) => n.toFixed(decimals).replace('.', s.decimal),
    }
  }, [lang])

  return (
    <LangContext.Provider value={value}>
      <Header />
      <Hero onOpen={setOpen} />
      <Gallery onOpen={setOpen} />
      <About />
      <Facilities />
      <Reviews />
      <Host />
      <HouseRules />
      <Location />
      <Footer />
      <CallFab />
      {open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}
    </LangContext.Provider>
  )
}
