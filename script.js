// Smooth scrolling for navigation links
(function() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return; // allow default for external
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

// Mobile menu toggle (kept safe)
(function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }
})();

// Optional form validation (guarded)
(function() {
  const contactForm = document.querySelector('#contact-form');
  if (!contactForm) return;
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
})();

// On-scroll reveal (basic)
(function() {
  function onScroll() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) el.classList.add('visible');
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
})();

// Visitor Counter (guarded)
(function() {
  function updateVisitorCount() {
    try {
      let count = localStorage.getItem('visitorCount') || '0';
      count = String(parseInt(count, 10) + 1);
      localStorage.setItem('visitorCount', count);
      const node = document.getElementById('visitorCount');
      if (node) node.textContent = count;
    } catch (_) { /* ignore */ }
  }
  document.addEventListener('DOMContentLoaded', updateVisitorCount);
})();

// === Animated Hero Section Logic ===
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const greetings = [
      { text: 'Hello', font: "'Outfit', sans-serif" },
      { text: 'नमस्ते', font: "'Noto Sans Devanagari', sans-serif" },
      { text: 'ନମସ୍କାର', font: "'Noto Sans Oriya', sans-serif" },
      { text: 'こんにちは', font: "'Noto Sans JP', sans-serif" },
      { text: 'Hola', font: "'Outfit', sans-serif" },
      { text: 'Здравствуйте', font: "'Noto Sans', sans-serif" }
    ];
    const greetingText = document.getElementById('greeting-text');
    const nameText = document.getElementById('name-text');
    const mainSection = document.querySelector('main');
    const animatedHero = document.getElementById('animated-hero');
    if (!greetingText || !nameText || !animatedHero) return;

    function showGreeting(index) {
      greetingText.style.opacity = '0';
      setTimeout(() => {
        greetingText.textContent = greetings[index].text;
        greetingText.style.fontFamily = greetings[index].font;
        greetingText.style.opacity = '1';
        setTimeout(() => {
          greetingText.style.opacity = '0';
          if (index < greetings.length - 1) {
            setTimeout(() => showGreeting(index + 1), 80);
          } else {
            setTimeout(showName, 120);
          }
        }, 320);
      }, 80);
    }

    function showName() {
      greetingText.style.display = 'none';
      nameText.style.display = 'inline-block';
      nameText.textContent = '';
      nameText.style.opacity = '1';
      const name = 'I am Subrat Ojha';
      let i = 0;
      (function typeChar() {
        if (i <= name.length) {
          nameText.textContent = name.slice(0, i);
          i++;
          setTimeout(typeChar, 16);
        } else {
          setTimeout(() => {
            animatedHero.style.transition = 'opacity 0.8s';
            animatedHero.style.opacity = '0';
            setTimeout(() => {
              animatedHero.style.display = 'none';
              if (mainSection) mainSection.scrollIntoView({ behavior: 'smooth' });
            }, 800);
          }, 260);
        }
      })();
    }

    showGreeting(0);
  });
})();

// === NEON PARTICLE BACKGROUND ===
(function() {
  const canvas = document.getElementById('neon-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = Math.max(1, window.devicePixelRatio || 1);
  let particles = [];
  let mouse = { x: -9999, y: -9999 }; // offscreen
  let hueBase = 180;

  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const count = Math.min(150, Math.floor((width * height) / 14000));
    particles = new Array(count).fill(0).map(() => makeParticle());
  }

  function makeParticle() {
    const speed = 0.3 + Math.random() * 0.6;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1.2 + Math.random() * 1.8
    };
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    hueBase = (hueBase + 0.12) % 360;

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Move
      p.x += p.vx; p.y += p.vy;

      // Mouse interaction (gentle repel)
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist2 = dx*dx + dy*dy;
      if (dist2 < 180*180) {
        const force = Math.max(0.6, 1 - dist2 / (180*180));
        p.vx += (dx / Math.sqrt(dist2 + 0.001)) * 0.06 * force;
        p.vy += (dy / Math.sqrt(dist2 + 0.001)) * 0.06 * force;
      }

      // Bounds wrap
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
    }

    // Lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p = particles[i], q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist2 = dx*dx + dy*dy;
        const maxDist = 120;
        if (dist2 < maxDist*maxDist) {
          const alpha = 1 - Math.sqrt(dist2) / maxDist;
          const hue = (hueBase + (i * 3)) % 360;
          ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    // Particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const hue = (hueBase + (i * 3)) % 360;
      ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.9)`;
      ctx.shadowBlur = 18; ctx.shadowColor = ctx.fillStyle;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  function onMouseMove(e) { mouse.x = e.clientX; mouse.y = e.clientY; }
  function onMouseLeave() { mouse.x = -9999; mouse.y = -9999; }
  function onClick() {
    // Burst
    for (let i = 0; i < 16; i++) particles.push(makeParticle());
    setTimeout(() => { particles.splice(0, 16); }, 1200);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);
  window.addEventListener('click', onClick);
  resize();
  requestAnimationFrame(step);
})();

// === TILT EFFECTS ===
(function() {
  const tiltSelectors = ['.stat-box', '.experience-box', '.skill-tag'];
  const tiltEls = document.querySelectorAll(tiltSelectors.join(','));
  tiltEls.forEach(el => {
    let rafId = 0;
    function onMove(e) {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rotateX = Math.max(-8, Math.min(8, -dy * 10));
        const rotateY = Math.max(-8, Math.min(8, dx * 10));
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      });
    }
    function onLeave() {
      cancelAnimationFrame(rafId);
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    }
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });
})(); 