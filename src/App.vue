<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { t, lang, toggleLang, reviews } from './i18n'
import { site, img, wa } from './site'

const scrolled = ref(false)
const open = ref(false)
const lb = ref(null)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
const onKey = (e) => { if (e.key === 'Escape') lb.value = null }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('keydown', onKey) })
onUnmounted(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey) })
const links = ['services', 'idphoto', 'studio', 'reviews', 'visit']
const shots = ['lounge', 'shooting-set', 'seating', 'albums', 'storefront']

const today = new Date().toISOString().slice(0, 10)
const f = reactive({ name: '', phone: '', service: 0, date: '', people: 1, note: '' })
const err = ref('')
const pick = (i) => { f.service = i; document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }
const send = () => {
  if (!f.name.trim() || !f.phone.trim()) { err.value = t.value.book.required; return }
  err.value = ''
  const m = t.value.book.msg
  const lines = [m.hello, `${m.name}: ${f.name.trim()}`, `${m.phone}: ${f.phone.trim()}`, `${m.service}: ${t.value.services.items[f.service].t}`, `${m.people}: ${f.people}`,
    f.date ? `${m.date}: ${f.date}` : null, f.note.trim() ? `${m.note}: ${f.note.trim()}` : null].filter(Boolean)
  window.open(wa(lines.join('\n')), '_blank', 'noopener')
}
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>

  <header class="nav" :class="{ scrolled, open }">
    <div class="container nav-in">
      <a href="#top" class="brand" @click="open = false">
        <span class="mono">L</span>
        <span class="bt"><b>{{ t.brand }}</b><small>{{ t.brandSub }}</small></span>
      </a>
      <nav class="links"><a v-for="l in links" :key="l" :href="`#${l}`">{{ t.nav[l] }}</a></nav>
      <div class="acts">
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <a href="#book" class="btn btn-sage btn-sm hide-sm">{{ t.nav.book }}</a>
        <button type="button" class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open"><i></i><i></i></button>
      </div>
    </div>
    <div v-if="open" class="drawer">
      <a v-for="l in links" :key="l" :href="`#${l}`" @click="open = false">{{ t.nav[l] }}</a>
      <a :href="wa(t.book.msg.hello)" target="_blank" rel="noopener" class="btn btn-sage" @click="open = false">{{ t.sticky.book }}</a>
    </div>
  </header>

  <main>
    <section class="hero" id="top">
      <div class="container hero-in">
        <div class="hero-copy">
          <p class="eyebrow">{{ t.hero.kicker }}</p>
          <h1><span>{{ t.hero.title1 }}</span><em>{{ t.hero.title2 }}</em></h1>
          <p class="lead">{{ t.hero.lead }}</p>
          <div class="ctas">
            <a class="btn btn-sage" :href="wa(t.book.msg.hello)" target="_blank" rel="noopener">{{ t.hero.cta1 }}</a>
            <a class="btn btn-line" href="#idphoto">{{ t.hero.cta2 }}</a>
          </div>
          <ul class="badges"><li v-for="b in t.hero.badges" :key="b">{{ b }}</li></ul>
        </div>
        <div class="hero-art">
          <div class="oval"><img :src="img('lounge.jpg')" alt="" fetchpriority="high" /></div>
          <div class="pill"><img :src="img('storefront.jpg')" alt="" /></div>
          <div class="rating"><b>{{ site.rating }}</b><span>★★★★★</span><small>{{ site.reviews }} {{ t.hero.reviews }}</small></div>
          <span class="script" aria-hidden="true">Lady Studio</span>
        </div>
      </div>
    </section>

    <section class="section services" id="services">
      <div class="container">
        <div class="head" v-reveal>
          <p class="eyebrow">{{ t.services.kicker }}</p>
          <h2>{{ t.services.title }}</h2>
        </div>
        <div class="svc">
          <article v-for="(s, i) in t.services.items" :key="s.k" class="svc-item" :class="{ noimg: !s.img }" v-reveal>
            <div class="svc-img" v-if="s.img"><img :src="img(s.img)" alt="" loading="lazy" /></div>
            <div class="svc-img ph" v-else aria-hidden="true">
              <svg viewBox="0 0 80 60"><rect x="6" y="6" width="68" height="48" rx="3" /><path d="M14 46l16-18 12 12 8-8 16 14" /><circle cx="56" cy="20" r="5" /><path class="tear" d="M6 30l14 4-6 8 10 4" /></svg>
            </div>
            <div class="svc-body">
              <span class="num">0{{ i + 1 }}</span>
              <h3>{{ s.t }}</h3>
              <p>{{ s.d }}</p>
              <button type="button" class="link" @click="pick(i)">{{ t.services.book }}</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section idphoto" id="idphoto">
      <div class="container id-in">
        <div class="id-copy" v-reveal>
          <p class="eyebrow">{{ t.idphoto.kicker }}</p>
          <h2>{{ t.idphoto.title }}</h2>
          <p class="sub">{{ t.idphoto.sub }}</p>
          <a class="btn btn-sage" :href="wa(t.idphoto.ask)" target="_blank" rel="noopener">{{ t.idphoto.cta }}</a>
        </div>
        <div class="id-card" v-reveal>
          <div class="frame" aria-hidden="true">
            <svg viewBox="0 0 120 150"><rect width="120" height="150" fill="#fff" /><path d="M60 26c-20 0-32 16-32 36 0 10 2 20 6 28-12 6-22 18-26 40v20h104v-20c-4-22-14-34-26-40 4-8 6-18 6-28 0-20-12-36-32-36z" fill="#2f3a33" /><ellipse cx="60" cy="66" rx="17" ry="21" fill="#e8c9a8" /></svg>
          </div>
          <ol>
            <li v-for="(r, i) in t.idphoto.rules" :key="r.t"><span>{{ i + 1 }}</span><div><b>{{ r.t }}</b><small>{{ r.d }}</small></div></li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section studio" id="studio">
      <div class="container">
        <div class="head center" v-reveal>
          <p class="eyebrow">{{ t.studio.kicker }}</p>
          <h2>{{ t.studio.title }}</h2>
          <p class="sub">{{ t.studio.p }}</p>
        </div>
        <div class="strip">
          <button v-for="(s, i) in shots" :key="s" type="button" class="shot" :class="'s' + i" @click="lb = s" v-reveal>
            <img :src="img(s + '.jpg')" alt="" loading="lazy" />
            <span>{{ t.studio.labels[s] }}</span>
          </button>
        </div>
      </div>
      <Transition name="fade">
        <div v-if="lb" class="lightbox" role="dialog" aria-modal="true" @click.self="lb = null">
          <button type="button" class="lb-x" :aria-label="t.close" @click="lb = null">✕</button>
          <img :src="img(lb + '.jpg')" alt="" />
        </div>
      </Transition>
    </section>

    <section class="section reviews" id="reviews">
      <div class="container">
        <div class="head center" v-reveal>
          <p class="eyebrow">{{ t.reviews.kicker }}</p>
          <h2>{{ t.reviews.title }}</h2>
          <p class="score"><b>{{ site.rating }}</b> ★★★★★ · {{ site.reviews }} {{ t.reviews.count }}</p>
        </div>
        <div class="rev-grid">
          <blockquote v-for="r in reviews" :key="r.n" class="rev" dir="rtl" v-reveal>
            <p>{{ r.q }}</p>
            <footer>— {{ r.n }} <span>★★★★★</span></footer>
          </blockquote>
        </div>
        <p class="note">{{ t.reviews.note }}</p>
      </div>
    </section>

    <section class="section book" id="book">
      <div class="container book-in">
        <div v-reveal>
          <p class="eyebrow">{{ t.book.kicker }}</p>
          <h2>{{ t.book.title }}</h2>
          <p class="sub">{{ t.book.sub }}</p>
          <p class="walkin">{{ t.book.walkin }}</p>
        </div>
        <form class="form" novalidate @submit.prevent="send" v-reveal>
          <div class="row">
            <label><span>{{ t.book.name }}</span><input v-model="f.name" autocomplete="name" /></label>
            <label><span>{{ t.book.phone }}</span><input v-model="f.phone" type="tel" dir="ltr" autocomplete="tel" /></label>
          </div>
          <div class="svc-pick">
            <button v-for="(s, i) in t.services.items" :key="s.k" type="button" :class="{ on: f.service === i }" @click="f.service = i">{{ s.t }}</button>
          </div>
          <div class="row">
            <label><span>{{ t.book.date }}</span><input v-model="f.date" type="date" :min="today" /></label>
            <label><span>{{ t.book.people }}</span><input v-model.number="f.people" type="number" min="1" max="30" /></label>
          </div>
          <label><span>{{ t.book.note }}</span><textarea v-model="f.note" rows="3"></textarea></label>
          <p v-if="err" class="err" role="alert">{{ err }}</p>
          <button class="btn btn-sage block" type="submit">{{ t.book.send }}</button>
        </form>
      </div>
    </section>

    <section class="section visit" id="visit">
      <div class="container visit-in">
        <div class="visit-card" v-reveal>
          <p class="eyebrow">{{ t.visit.kicker }}</p>
          <h2>{{ t.visit.title }}</h2>
          <dl><div v-for="h in t.visit.hours" :key="h.d"><dt>{{ h.d }}</dt><dd>{{ h.h }}</dd></div></dl>
          <p class="addr">{{ t.visit.addr }}</p>
          <div class="ctas">
            <a class="btn btn-sage" :href="site.maps" target="_blank" rel="noopener">{{ t.visit.dir }}</a>
            <a class="btn btn-line" :href="`tel:${site.phone.tel}`">{{ t.visit.call }} <span dir="ltr">{{ site.phone.label }}</span></a>
          </div>
        </div>
        <div class="map" v-reveal><iframe :src="site.mapEmbed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container foot">
      <span class="foot-script">Lady Studio</span>
      <b>{{ t.brand }} {{ t.brandSub }}</b>
      <a :href="`tel:${site.phone.tel}`" dir="ltr">{{ site.phone.label }}</a>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>
  <div class="sticky">
    <a :href="`tel:${site.phone.tel}`">{{ t.sticky.call }}</a>
    <a :href="wa(t.book.msg.hello)" target="_blank" rel="noopener" class="main">{{ t.sticky.book }}</a>
  </div>
</template>
