/* EventifyLab — interações: reveal on scroll, contadores, header dinâmico, carrossel de pacotes, menu móvel */
(function(){
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobile-menu');
    toggle.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
    });
    var carousel = document.getElementById('packCarousel');
    var prevBtn = document.getElementById('packPrev');
    var nextBtn = document.getElementById('packNext');
    if(carousel && prevBtn && nextBtn){
      var scrollStep = function(){
        var card = carousel.querySelector('.pack-card');
        return card ? card.getBoundingClientRect().width + 20 : 320;
      };
      prevBtn.addEventListener('click', function(){ carousel.scrollBy({left:-scrollStep(), behavior:'smooth'}); });
      nextBtn.addEventListener('click', function(){ carousel.scrollBy({left:scrollStep(), behavior:'smooth'}); });
    }
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hoverCapable = window.matchMedia('(hover: hover)').matches;

    function animateCount(el){
      var text = el.textContent.trim();
      var match = text.match(/^([+]?)(\d[\d.,]*)(.*)$/);
      if(!match){ return; }
      var prefix = match[1], suffix = match[3];
      var target = parseInt(match[2].replace(/\D/g,''), 10);
      if(isNaN(target) || reducedMotion){ return; }
      var dur = 1100, start = null;
      function step(ts){
        if(!start){ start = ts; }
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if(p < 1){ requestAnimationFrame(step); } else { el.textContent = text; }
      }
      requestAnimationFrame(step);
    }

    var els = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('in');
            var nums = e.target.querySelectorAll('.stat .num');
            if(nums.length){ nums.forEach(animateCount); }
            io.unobserve(e.target);
          }
        });
      }, {threshold:.12});
      var deferido = document.getElementById('numeros');
      els.forEach(function(el){
        if(el !== deferido){ io.observe(el); }
      });
      // "numeros" ja nasce visivel no carregamento (logo abaixo do hero) e
      // revelava sozinho, sem o efeito de entrada — esse aqui, so comeca a
      // observar depois do primeiro scroll de verdade do usuario.
      // prefers-reduced-motion ja deixa .reveal sempre visivel via CSS,
      // entao esse atraso nao afeta esses usuarios de qualquer forma.
      if(deferido){
        window.addEventListener('scroll', function comecarReveal(){
          io.observe(deferido);
          window.removeEventListener('scroll', comecarReveal);
        }, { passive: true, once: true });
      }
    } else {
      els.forEach(function(el){ el.classList.add('in'); });
    }

    // header shrink + scroll progress bar, rAF-throttled
    var progressBar = document.getElementById('scrollProgress');
    var siteHeader = document.getElementById('siteHeader');
    var ticking = false;
    function onScroll(){
      var st = window.scrollY || document.documentElement.scrollTop;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      if(progressBar){ progressBar.style.width = (docH > 0 ? (st / docH * 100) : 0) + '%'; }
      if(siteHeader){ siteHeader.classList.toggle('scrolled', st > 40); }
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(onScroll); ticking = true; }
    }, {passive:true});
    onScroll();

    // hero cursor spotlight + circulo magnetico (segue o mouse com um
    // deslocamento sutil, puxando na direcao do cursor, mais forte perto
    // do centro do circulo)
    var heroEl = document.querySelector('.hero');
    var heroCircle = document.querySelector('.hero-bleed-circle');
    if(heroEl && hoverCapable){
      heroEl.addEventListener('mousemove', function(e){
        var r = heroEl.getBoundingClientRect();
        heroEl.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        heroEl.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
        if(heroCircle && !reducedMotion){
          var cr = heroCircle.getBoundingClientRect();
          var dx = e.clientX - (cr.left + cr.width / 2);
          var dy = e.clientY - (cr.top + cr.height / 2);
          heroCircle.style.setProperty('--magx', Math.max(-24, Math.min(24, dx * 0.03)) + 'px');
          heroCircle.style.setProperty('--magy', Math.max(-24, Math.min(24, dy * 0.03)) + 'px');
        }
      });
      heroEl.addEventListener('mouseleave', function(){
        if(heroCircle){
          heroCircle.style.setProperty('--magx', '0px');
          heroCircle.style.setProperty('--magy', '0px');
        }
      });
    }

    // active nav link on scroll
    var navLinks = document.querySelectorAll('.nav-links a, #mobile-menu a');
    var navMap = [
      [document.querySelector('.hero'), 'home'],
      [document.getElementById('como-funciona'), 'como-funciona'],
      [document.getElementById('mecanicas'), 'mecanicas'],
      [document.getElementById('pacotes'), 'pacotes'],
      [document.getElementById('faq'), 'faq'],
      [document.getElementById('parceiros'), 'parceiros']
    ];
    if('IntersectionObserver' in window){
      var navObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting){ return; }
          var match = navMap.filter(function(m){ return m[0] === entry.target; })[0];
          if(!match){ return; }
          navLinks.forEach(function(a){
            a.classList.toggle('active', a.getAttribute('href') === '#' + match[1]);
          });
        });
      }, {rootMargin:'-40% 0px -55% 0px', threshold:0});
      navMap.forEach(function(m){ if(m[0]){ navObserver.observe(m[0]); } });
    }

    // drag-to-scroll on the pacotes carousel
    if(carousel){
      var dragging = false, dragStartX = 0, dragScrollStart = 0;
      carousel.addEventListener('pointerdown', function(e){
        dragging = true;
        carousel.setPointerCapture(e.pointerId);
        dragStartX = e.clientX;
        dragScrollStart = carousel.scrollLeft;
      });
      carousel.addEventListener('pointermove', function(e){
        if(!dragging){ return; }
        carousel.scrollLeft = dragScrollStart - (e.clientX - dragStartX);
      });
      ['pointerup','pointercancel','pointerleave'].forEach(function(evt){
        carousel.addEventListener(evt, function(){ dragging = false; });
      });
    }

    // filtro por produto na politica de privacidade — so esconde via
    // [hidden], nunca por CSS de largada, pra pagina continuar completa
    // (os dois produtos, um embaixo do outro) sem JS/pra crawler
    var productSwitch = document.querySelector('.product-switch');
    if(productSwitch){
      var productPanels = document.querySelectorAll('.product-panel');
      var switchButtons = productSwitch.querySelectorAll('button');
      var setProduct = function(name){
        productPanels.forEach(function(p){ p.hidden = p.dataset.product !== name; });
        switchButtons.forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.product === name ? 'true' : 'false'); });
      };
      switchButtons.forEach(function(b){
        b.addEventListener('click', function(){ setProduct(b.dataset.product); });
      });
      setProduct('eventifylab');
    }

    // faq em acordeao — sem JS, a resposta fica visivel (progressive
    // enhancement); com JS, comeca fechada e alterna no clique. So uma
    // pergunta fica aberta por vez: abrir uma fecha qualquer outra.
    var qaItems = document.querySelectorAll('.qa');
    qaItems.forEach(function(item, i){
      var btn = item.querySelector('.q');
      var answer = item.querySelector('.a');
      if(!btn || !answer){ return; }
      var id = 'qa-answer-' + i;
      answer.id = id;
      btn.setAttribute('aria-controls', id);
      btn.setAttribute('aria-expanded', 'false');
      item.classList.add('is-collapsed');
    });
    qaItems.forEach(function(item){
      var btn = item.querySelector('.q');
      if(!btn){ return; }
      btn.addEventListener('click', function(){
        var wasCollapsed = item.classList.contains('is-collapsed');
        qaItems.forEach(function(other){
          other.classList.add('is-collapsed');
          var otherBtn = other.querySelector('.q');
          if(otherBtn){ otherBtn.setAttribute('aria-expanded', 'false'); }
        });
        if(wasCollapsed){
          item.classList.remove('is-collapsed');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();
