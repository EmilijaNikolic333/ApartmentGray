import { useCallback, useEffect, useRef, useState } from 'react'
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

const fmt = (n, decimals = 1) => n.toFixed(decimals).replace('.', ',')
const reviewWord = (n) => {
  const last = n % 10
  const lastTwo = n % 100
  if (lastTwo >= 11 && lastTwo <= 14) return 'recenzija'
  return last >= 2 && last <= 4 ? 'recenzije' : 'recenzija'
}
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const sections = [
  { id: 'galerija', label: 'Galerija' },
  { id: 'opis', label: 'Opis' },
  { id: 'sadrzaji', label: 'Sadržaji' },
  { id: 'recenzije', label: 'Recenzije' },
  { id: 'domacin', label: 'Domaćin' },
  { id: 'pravila', label: 'Kućni red' },
  { id: 'lokacija', label: 'Lokacija' },
]

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
  const pct = (value / max) * 100
  return (
    <span className="stars-rating" aria-label={`${fmt(value)} od ${max}`}>
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

function Header() {
  const [active, setActive] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      let current = null
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id
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
        <a href="#" className="logo">
          Apartment <span>Gray</span>
        </a>
        <nav className="nav">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>
              {s.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-primary" href={apartment.bookingUrl} target="_blank" rel="noreferrer">
          Rezerviši
        </a>
      </div>
    </header>
  )
}

function Hero({ onOpen }) {
  return (
    <section className="hero">
      <img src={photos[0].src} alt={photos[0].alt} onClick={() => onOpen(0)} />
      <div className="hero-overlay">
        <div className="container">
          <div className="stars rise">{'★'.repeat(apartment.stars)}</div>
          <h1 className="rise" style={{ '--delay': '0.1s' }}>{apartment.name}</h1>
          <p className="tagline rise" style={{ '--delay': '0.2s' }}>
            <Typed words={['vrt sa ružama', 'mir 5 minuta od centra', 'domaćinski doček', 'mesto za celu porodicu']} />
          </p>
          <p className="address rise" style={{ '--delay': '0.3s' }}>📍 {apartment.address}</p>
          <div className="hero-badges rise" style={{ '--delay': '0.4s' }}>
            {platforms.map((p) => (
              <a key={p.name} href="#recenzije" className="hero-badge">
                <strong>{fmt(p.score)}</strong>
                <span>
                  {p.name}
                  <small>{p.max === 5 ? '★★★★★' : `${p.count} recenzija`}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <a href="#galerija" className="scroll-hint" aria-label="Skroluj naniže">
        <span />
      </a>
    </section>
  )
}

function Gallery({ onOpen }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? photos : photos.slice(0, 9)
  return (
    <section id="galerija" className="section container">
      <h2 className="reveal">Galerija</h2>
      <div className="gallery">
        {visible.map((p, i) => (
          <button
            key={p.src}
            className="thumb reveal"
            style={{ '--delay': `${(i % 3) * 0.08}s` }}
            onClick={() => onOpen(i)}
          >
            <img src={p.src} alt={p.alt} loading="lazy" />
            <span className="thumb-label">{p.alt}</span>
          </button>
        ))}
      </div>
      {!showAll && (
        <div className="center">
          <button className="btn btn-outline" onClick={() => setShowAll(true)}>
            Prikaži sve fotografije ({photos.length})
          </button>
        </div>
      )}
    </section>
  )
}

function Lightbox({ index, onClose, onNav }) {
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
      <button className="lb-close" onClick={onClose} aria-label="Zatvori">✕</button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); onNav(-1) }} aria-label="Prethodna">‹</button>
      <figure key={p.src} onClick={(e) => e.stopPropagation()}>
        <img src={p.src} alt={p.alt} />
        <figcaption>
          {p.alt} · {index + 1} / {photos.length}
        </figcaption>
      </figure>
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); onNav(1) }} aria-label="Sledeća">›</button>
    </div>
  )
}

function About() {
  return (
    <section id="opis" className="section container about">
      <div className="reveal">
        <h2>O apartmanu</h2>
        {apartment.description.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>
      <aside className="card highlights reveal" style={{ '--delay': '0.15s' }}>
        <h3>Ukratko</h3>
        <ul>
          {highlights.map((h) => (
            <li key={h.label}>
              <span className="icon">{h.icon}</span>
              {h.label}
            </li>
          ))}
        </ul>
        <a className="btn btn-primary block" href={apartment.bookingUrl} target="_blank" rel="noreferrer">
          Proveri raspoloživost
        </a>
      </aside>
    </section>
  )
}

function Facilities() {
  return (
    <section id="sadrzaji" className="section alt">
      <div className="container">
        <h2 className="reveal">Sadržaji</h2>
        <div className="facilities">
          {facilities.map((f, i) => (
            <div key={f.label} className="facility reveal" style={{ '--delay': `${(i % 3) * 0.06}s` }}>
              <span className="icon">{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformScores() {
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
            {p.label} · {p.count} {reviewWord(p.count)}
          </div>
        </div>
      ))}
    </div>
  )
}

function ForeignReviews() {
  const [index, setIndex] = useState(0)
  const [original, setOriginal] = useState(false)
  const [paused, setPaused] = useState(false)
  const drag = useRef(null)
  const n = foreignReviews.length
  const go = useCallback((dir) => {
    setOriginal(false)
    setIndex((i) => (i + dir + n) % n)
  }, [n])

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
  return (
    <div className="world reveal">
      <div className="world-head">
        <div>
          <h3>Gosti iz celog sveta</h3>
          <p className="muted">
            Recenzije sa Airbnb-a, prevedene na srpski · {n} recenzija, sve sa ocenom 5 ★
          </p>
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
          <p lang={original ? r.lang.toLowerCase() : 'sr'}>{original ? r.original : r.text}</p>
          <footer>
            <span className="avatar">{r.name[0]}</span>
            <div>
              <strong>{r.name}</strong>
              <div className="muted">
                {r.place ? `${r.place} · ` : ''}
                {r.date}
              </div>
            </div>
            <button className="translate" onClick={() => setOriginal((o) => !o)}>
              {original ? 'Prikaži prevod' : `Original (${r.lang})`}
            </button>
          </footer>
          {!original && (
            <div className="muted small">Prevedeno sa {r.from} jezika</div>
          )}
        </article>
        <button className="quote-nav prev" onClick={() => go(-1)} aria-label="Prethodna recenzija">‹</button>
        <button className="quote-nav next" onClick={() => go(1)} aria-label="Sledeća recenzija">›</button>
      </div>

      <div className="dots">
        {foreignReviews.map((x, i) => (
          <button
            key={i}
            className={i === index ? 'is-active' : ''}
            onClick={() => { setOriginal(false); setIndex(i) }}
            aria-label={`Recenzija ${i + 1}: ${x.name}`}
          >
            {i === index && <span key={index} className="dot-progress" />}
          </button>
        ))}
      </div>
    </div>
  )
}

function Reviews() {
  return (
    <section id="recenzije" className="section container">
      <h2 className="reveal">Utisci gostiju</h2>
      <PlatformScores />

      <div className="reviews-summary reveal">
        <div className="big-score">
          <span className="score lg">{fmt(apartment.score)}</span>
          <div>
            <strong>Booking.com · {apartment.scoreLabel}</strong>
            <div className="muted">{apartment.reviewCount} recenzija</div>
          </div>
        </div>
        <div className="bars">
          {ratings.map((r) => (
            <div key={r.label} className="bar-row">
              <div className="bar-head">
                <span>{r.label}</span>
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

      <h3 className="reviews-title reveal">Gosti iz Srbije</h3>
      <div className="reviews">
        {reviews.map((r, i) => (
          <article key={r.name} className="card review reveal" style={{ '--delay': `${(i % 3) * 0.08}s` }}>
            <div className="review-head">
              <span className="avatar">{r.name[0]}</span>
              <div>
                <strong>{r.name}</strong>
                <div className="muted">🇷🇸 {r.country}</div>
              </div>
            </div>
            <p>„{r.text}”</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Host() {
  return (
    <section id="domacin" className="section alt">
      <div className="container host">
        <div className="card host-card reveal">
          <div className="host-photo">
            <img src={host.photo} alt={`Domaćin ${host.name}`} />
            <span className="host-badge" title="Superhost">★</span>
          </div>
          <h3>{host.name}</h3>
          <div className="muted">Superhost · Domaćin</div>
          <div className="host-stats">
            {host.stats.map((s) => (
              <div key={s.label}>
                <strong>
                  <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="host-info reveal" style={{ '--delay': '0.15s' }}>
          <h2>Upoznajte domaćina</h2>
          <p>
            {host.name} je Superhost na Airbnb-u – status koji dobijaju iskusni domaćini sa
            izvanrednim ocenama i pouzdanim gostoprimstvom. Gosti ga u recenzijama najčešće opisuju
            kao ljubaznog, predusretljivog i uvek dostupnog.
          </p>
          <ul className="host-facts">
            <li><span className="icon">💼</span>Zanimanje: {host.work.toLowerCase()}</li>
            <li><span className="icon">🗣️</span>Govori {host.languages}</li>
            <li><span className="icon">⚡</span>Odgovara u roku od sat vremena</li>
          </ul>
          <div className="host-actions">
            <a className="btn btn-primary btn-call" href={`tel:${host.phoneIntl}`}>
              <span className="ring" aria-hidden="true">📞</span>
              Pozovi {host.name}a · {host.phone}
            </a>
            <a className="btn btn-outline" href={`viber://chat?number=%2B${host.phoneIntl.slice(1)}`}>
              Viber poruka
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function HouseRules() {
  return (
    <section id="pravila" className="section">
      <div className="container">
        <h2 className="reveal">Kućni red</h2>
        <div className="rules">
          {houseRules.map((r, i) => (
            <div key={r.title} className="rule reveal" style={{ '--delay': `${(i % 2) * 0.08}s` }}>
              <span className="icon">{r.icon}</span>
              <div>
                <strong>{r.title}</strong>
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location() {
  const { lat, lng } = apartment.coords
  const d = 0.008
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d / 2}%2C${lng + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lng}`
  return (
    <section id="lokacija" className="section alt">
      <div className="container">
        <h2 className="reveal">Lokacija</h2>
        <p className="muted reveal">
          📍 {apartment.address} · Odlična lokacija – ocena {fmt(apartment.locationScore)}/10, oko 5 minuta hoda do centra
        </p>
        <div className="location reveal">
          <iframe title="Mapa" src={mapSrc} loading="lazy" />
          <div className="card">
            {nearby.map((g) => (
              <div key={g.group} className="nearby-group">
                <h3>{g.group}</h3>
                <ul>
                  {g.items.map((i) => (
                    <li key={i.name}>
                      <span>{i.name}</span>
                      <span className="muted">{i.distance}</span>
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
              Otvori u Google mapama
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <strong>{apartment.name}</strong> · {apartment.address}
        <div className="footer-phone">
          Domaćin {host.name}: <a href={`tel:${host.phoneIntl}`}>{host.phone}</a>
        </div>
        <div className="muted">
          Podaci i fotografije preuzeti sa{' '}
          <a href={apartment.bookingUrl} target="_blank" rel="noreferrer">Booking.com</a> i{' '}
          <a href="https://www.airbnb.com/rooms/1241843572563048799" target="_blank" rel="noreferrer">Airbnb</a>
        </div>
      </div>
    </footer>
  )
}

function CallFab() {
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
      aria-label={`Pozovi domaćina ${host.name}a: ${host.phone}`}
    >
      <img src={host.photo} alt="" />
      <span>
        <small>Pozovi domaćina</small>
        {host.phone}
      </span>
    </a>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)
  const nav = useCallback((dir) => setOpen((i) => (i + dir + photos.length) % photos.length), [])
  const close = useCallback(() => setOpen(null), [])
  useReveal()

  return (
    <>
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
    </>
  )
}
