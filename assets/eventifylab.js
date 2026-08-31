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
      els.forEach(function(el){ io.observe(el); });
    } else {
      els.forEach(function(el){ el.classList.add('in'); });
    }

    // header shrink + scroll progress bar, rAF-throttled
    var progressBar = document.getElementById('scrollProgress');
    var siteHeader = document.getElementById('siteHeader');
    var heroDiagram = document.querySelector('.hero-diagram');
    var ticking = false;
    function onScroll(){
      var st = window.scrollY || document.documentElement.scrollTop;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      if(progressBar){ progressBar.style.width = (docH > 0 ? (st / docH * 100) : 0) + '%'; }
      if(siteHeader){ siteHeader.classList.toggle('scrolled', st > 40); }
      if(heroDiagram && !reducedMotion && hoverCapable){
        var r = heroDiagram.getBoundingClientRect();
        var offset = Math.max(-12, Math.min(12, (window.innerHeight - r.top) * 0.015 - 8));
        heroDiagram.style.transform = 'translateY(' + offset + 'px)';
      }
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(onScroll); ticking = true; }
    }, {passive:true});
    onScroll();

    // hero cursor spotlight
    var heroEl = document.querySelector('.hero');
    if(heroEl && hoverCapable){
      heroEl.addEventListener('mousemove', function(e){
        var r = heroEl.getBoundingClientRect();
        heroEl.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        heroEl.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    }

    // magnetic primary buttons
    if(hoverCapable && !reducedMotion){
      document.querySelectorAll('.btn-primary').forEach(function(btn){
        btn.addEventListener('mousemove', function(e){
          var r = btn.getBoundingClientRect();
          var x = (e.clientX - r.left - r.width / 2) * 0.12;
          var y = (e.clientY - r.top - r.height / 2) * 0.12;
          btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        });
        btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
      });
    }

    // active nav link on scroll
    var navLinks = document.querySelectorAll('.nav-links a, #mobile-menu a');
    var navMap = [
      [document.querySelector('.hero'), 'home'],
      [document.getElementById('como-funciona'), 'como-funciona'],
      [document.getElementById('mecanicas'), 'mecanicas'],
      [document.getElementById('pacotes'), 'pacotes'],
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
  })();
