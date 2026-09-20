/**
 * MOHAMMED NAWAZ RIFAN - PORTFOLIO LOGIC
 * Minimalist, high performance, interactive avatar toggle & clipboard actions
 */

document.addEventListener('DOMContentLoaded', () => {
  initAvatarToggle();
  initEmailTriggers();
  initClipboardCopier();
  initSmoothScroll();
  initFloatingNav();
  initCertificateModal();
  updateCurrentYear();
  initProjectCardParallax();
  initRetroGridGame();
  initGitGoNavigation();
  initSosInteraction();
  initBijliOptimizer();
});

/* --------------------------------------------------------------------------
   DIRECT EMAIL COMPOSER (Opens Gmail Web on Desktop & Native App on Mobile)
   -------------------------------------------------------------------------- */
function initEmailTriggers() {
  const emailTriggers = document.querySelectorAll('.email-trigger, a[href^="mailto:"]');
  const recipient = 'rifan3737mtr@gmail.com';
  const defaultSubject = encodeURIComponent("Hello Rifan! Let's connect");

  emailTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // On desktop web browsers, open Gmail compose directly in a new tab
      if (!isMobile) {
        e.preventDefault();
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${defaultSubject}`;
        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      }
      // On mobile devices, native mailto executes to launch Gmail/Apple Mail app
    });
  });
}

/* --------------------------------------------------------------------------
   1. INTERACTIVE AVATAR TOGGLER (Hand-drawn Sketch <-> Real Suit Photo)
   -------------------------------------------------------------------------- */
function initAvatarToggle() {
  const frame = document.getElementById('avatar-toggle');
  const img = document.getElementById('avatar-image');
  const label = document.getElementById('avatar-mode-label');

  if (!frame || !img || !label) return;

  let isPhoto = false;

  frame.addEventListener('click', () => {
    isPhoto = !isPhoto;

    // Smooth opacity fade without layout shift
    img.style.opacity = '0';

    setTimeout(() => {
      if (isPhoto) {
        img.src = 'assets/profile.jpg';
        img.alt = 'Mohammed Nawaz Rifan - Portrait in Suit';
        label.innerHTML = '<i class="fa-solid fa-paintbrush"></i> View Sketch';
      } else {
        img.src = 'assets/avatar.png?v=3';
        img.alt = 'Mohammed Nawaz Rifan - Hand Drawn Avatar';
        label.innerHTML = '<i class="fa-solid fa-camera"></i> View Photo';
      }
      
      img.onload = () => {
        img.style.opacity = '1';
      };
      setTimeout(() => {
        img.style.opacity = '1';
      }, 40);
    }, 120);
  });
}

/* --------------------------------------------------------------------------
   2. FLOATING NAV SCROLL REVEAL
   -------------------------------------------------------------------------- */
function initFloatingNav() {
  const dock = document.getElementById('floating-nav');
  if (!dock) return;

  function handleScroll() {
    if (window.scrollY > 220) {
      dock.classList.add('visible');
    } else {
      dock.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   3. CLIPBOARD COPIER WITH TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initClipboardCopier() {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  document.querySelectorAll('[data-copy]').forEach(element => {
    element.addEventListener('click', (e) => {
      const textToCopy = element.getAttribute('data-copy');
      if (!textToCopy) return;

      // Only prevent default if element is not an active link or button intended for navigation
      if (!element.getAttribute('href')) {
        e.preventDefault();
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast('Copied to clipboard!');
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. SMOOTH NAVIGATION SCROLLING
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. CURRENT YEAR IN FOOTER
   -------------------------------------------------------------------------- */
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   6. CERTIFICATE VIEWER LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const modalDownload = document.getElementById('cert-modal-download');
  const modalCloseBtn = document.getElementById('cert-modal-close');
  const modalDismissBtn = document.getElementById('cert-modal-dismiss');

  if (!modal || !modalImg || !modalTitle) return;

  function openModal(certSrc, title) {
    modalImg.src = certSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;
    if (modalDownload) {
      modalDownload.href = certSrc;
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cert-open-modal').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const certSrc = trigger.getAttribute('data-cert');
      const title = trigger.getAttribute('data-title') || 'Certificate Verification';
      if (certSrc) {
        openModal(certSrc, title);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   GLOBAL TOAST NOTIFICATION HELPER
   -------------------------------------------------------------------------- */
let globalToastTimer;
function showToastNotification(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  clearTimeout(globalToastTimer);
  globalToastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* --------------------------------------------------------------------------
   7. 3D PERSPECTIVE PARALLAX TILT ON SHOWCASE CARDS
   Calculates mouse coordinates relative to card center and smoothly tilts
   the card and offsets overlapping mockup elements for true depth.
   -------------------------------------------------------------------------- */
function initProjectCardParallax() {
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return;

  const cards = document.querySelectorAll('.project-showcase-card[data-parallax="true"]');

  cards.forEach(card => {
    const mockupLayer = card.querySelector('.showcase-card-mockup-layer');
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Realistic max tilt angles (+-4deg)
      const tiltX = ((y - centerY) / centerY) * -4.5;
      const tiltY = ((x - centerX) / centerX) * 4.5;

      // Parallax shift on overlapping floating layers (+-10px)
      const shiftX = ((x - centerX) / centerX) * 12;
      const shiftY = ((y - centerY) / centerY) * 12;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1200px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
        if (mockupLayer) {
          mockupLayer.style.transform = `translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 28px)`;
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (mockupLayer) {
        mockupLayer.style.transform = 'translate3d(0, 0, 0)';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. DECENTRALIZED VOTING TERMINAL INTERACTION
   Handles candidate selection, RFID verification simulation, on-chain ballot
   mining with dynamic vote tally calculation, and cryptographic Tx receipts.
   -------------------------------------------------------------------------- */
function initVotingTerminal() {
  const ballotOptions = document.querySelectorAll('.ballot-option');
  const castBtn = document.getElementById('btn-cast-ballot');
  const blockCounter = document.getElementById('vote-block-count');
  const cand1Tally = document.getElementById('cand1-tally');
  const cand2Tally = document.getElementById('cand2-tally');
  const cand1Bar = document.querySelector('.cand1-bar');
  const cand2Bar = document.querySelector('.cand2-bar');
  const receiptText = document.getElementById('voting-receipt-text');

  if (!castBtn) return;

  let selectedCandidate = 1;
  let votesCand1 = 1248;
  let votesCand2 = 964;
  let blockNumber = 1842;
  let isMining = false;

  ballotOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      if (isMining) return;
      ballotOptions.forEach(o => {
        o.classList.remove('active');
        o.setAttribute('aria-checked', 'false');
      });
      opt.classList.add('active');
      opt.setAttribute('aria-checked', 'true');
      selectedCandidate = parseInt(opt.getAttribute('data-candidate'), 10);
    });

    opt.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        opt.click();
      }
    });
  });

  castBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isMining) return;
    isMining = true;

    castBtn.style.transform = 'scale(0.97)';
    castBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Verifying RFID & Mining Block...</span>';
    castBtn.style.background = 'linear-gradient(135deg, #475569 0%, #334155 100%)';
    castBtn.style.borderColor = '#64748b';

    setTimeout(() => {
      // Increment candidate vote
      if (selectedCandidate === 1) {
        votesCand1++;
      } else {
        votesCand2++;
      }

      blockNumber++;
      const total = votesCand1 + votesCand2;
      const pct1 = ((votesCand1 / total) * 100).toFixed(1);
      const pct2 = ((votesCand2 / total) * 100).toFixed(1);

      if (cand1Tally) cand1Tally.textContent = `${votesCand1.toLocaleString()} votes (${pct1}%)`;
      if (cand2Tally) cand2Tally.textContent = `${votesCand2.toLocaleString()} votes (${pct2}%)`;
      if (cand1Bar) cand1Bar.style.width = `${pct1}%`;
      if (cand2Bar) cand2Bar.style.width = `${pct2}%`;

      if (blockCounter) {
        blockCounter.textContent = blockNumber.toLocaleString();
        blockCounter.style.transform = 'scale(1.35)';
        blockCounter.style.color = '#38bdf8';
        setTimeout(() => {
          blockCounter.style.transform = 'scale(1)';
          blockCounter.style.color = '#10b981';
        }, 300);
      }

      // Generate random transaction hash
      const randomHex = Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const txHash = `Tx: 0x7F2e...${randomHex}89Aa · Block #${blockNumber} · Sealed`;
      if (receiptText) receiptText.textContent = txHash;

      castBtn.style.transform = '';
      castBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Ballot Recorded on Ethereum!</span>';
      castBtn.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
      castBtn.style.borderColor = '#10b981';

      showToastNotification(`🗳️ Verified Ballot Cast for Option #${selectedCandidate}! Mined into Sepolia block #${blockNumber}.`);

      setTimeout(() => {
        castBtn.innerHTML = '<i class="fa-solid fa-fingerprint"></i> <span>Cast Smart Contract Vote</span>';
        castBtn.style.background = '';
        castBtn.style.borderColor = '';
        isMining = false;
      }, 4000);
    }, 850);
  });
}

/* --------------------------------------------------------------------------
   9. GITGO ARCHITECTURE NAVIGATION & RESPONDER FILTERING
   Clicking vertical nav categories in NeuroMesh dynamically highlights
   corresponding mesh nodes with a glowing status pulse.
   -------------------------------------------------------------------------- */
function initGitGoNavigation() {
  const navItems = document.querySelectorAll('.gitgo-nav-item');
  const profileItems = document.querySelectorAll('.gitgo-profile-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      const filter = item.getAttribute('data-filter');
      profileItems.forEach(p => {
        const nodeType = p.getAttribute('data-node');
        if (filter === 'all' || nodeType === filter) {
          p.classList.add('highlight-node');
          p.style.opacity = '1';
        } else {
          p.classList.remove('highlight-node');
          p.style.opacity = '0.45';
        }
      });

      // Restore full opacity smoothly after brief inspection
      setTimeout(() => {
        profileItems.forEach(p => p.style.opacity = '1');
      }, 1600);
    });
  });
}

/* --------------------------------------------------------------------------
   10. AROGYA MITRA CLINICIAN SOS DISPATCH INTERACTION
   -------------------------------------------------------------------------- */
function initSosInteraction() {
  const sosBtn = document.getElementById('btn-trigger-sos');
  if (!sosBtn) return;

  sosBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sosBtn.style.transform = 'scale(0.95)';
    sosBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Transmitting SOS...</span>';
    
    setTimeout(() => {
      sosBtn.style.transform = '';
      sosBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Clinician Alerted!</span>';
      sosBtn.style.background = '#16a34a';
      showToastNotification('🚨 Clinician SOS Dispatched: Real-time telemetry routed to Ward 4B!');
      
      setTimeout(() => {
        sosBtn.innerHTML = '<i class="fa-solid fa-truck-medical"></i> <span>Trigger Clinician SOS</span>';
        sosBtn.style.background = '';
      }, 3500);
    }, 750);
  });
}

/* --------------------------------------------------------------------------
   11. SMART BIJLI GRID LOAD OPTIMIZER INTERACTION
   -------------------------------------------------------------------------- */
function initBijliOptimizer() {
  const optBtn = document.getElementById('btn-optimize-load');
  const powerVal = document.getElementById('bijli-live-power');
  if (!optBtn) return;

  optBtn.addEventListener('click', (e) => {
    e.preventDefault();
    optBtn.style.transform = 'scale(0.95)';
    optBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> <span>Balancing Phase Load...</span>';

    setTimeout(() => {
      optBtn.style.transform = '';
      optBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Load Balanced</span>';
      if (powerVal) powerVal.textContent = '1.84 kW';
      showToastNotification('⚡ Substation Phase Balanced: Efficiency boosted to 99.8% optimal!');

      setTimeout(() => {
        optBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> <span>Optimize Grid Load</span>';
        if (powerVal) powerVal.textContent = '2.41 kW';
      }, 4000);
    }, 850);
  });
}

/* --------------------------------------------------------------------------
   8. HALO RETRO BLOCK GRID INTERACTIVE GAME (Sepolia Block Verifier)
   Simulates on-chain ballot mining: tiles randomly flip grey -> blue -> green
   every ~1.2s, keeping the BLOCKS counter in sync. Also fully click-interactive!
   -------------------------------------------------------------------------- */
function initRetroGridGame() {
  const grid = document.getElementById('halo-pixel-grid');
  const counter = document.getElementById('halo-blocks-counter');
  if (!grid || !counter) return;

  const tiles = Array.from(grid.querySelectorAll('.halo-tile'));
  if (!tiles.length) return;

  // Helper to synchronize BLOCKS badge with colored tiles count
  function updateBlockCounter(animate = false) {
    const coloredCount = grid.querySelectorAll('.active-green, .active-cyan').length;
    counter.textContent = coloredCount;
    if (animate) {
      counter.style.transform = 'scale(1.22)';
      setTimeout(() => { counter.style.transform = 'scale(1)'; }, 220);
    }
  }

  // Initial count sync
  updateBlockCounter();

  // Automatic Block Mining Simulation every ~1.2s
  setInterval(() => {
    // Pick a random tile
    const randomIndex = Math.floor(Math.random() * tiles.length);
    const tile = tiles[randomIndex];
    const coloredCount = grid.querySelectorAll('.active-green, .active-cyan').length;

    if (!tile.classList.contains('active-green') && !tile.classList.contains('active-cyan')) {
      // Empty block -> New pending transaction block (cyan)
      tile.classList.add('active-cyan');
      updateBlockCounter(true);
    } else if (tile.classList.contains('active-cyan')) {
      // Pending block -> Verified Ethereum block (green)
      tile.classList.remove('active-cyan');
      tile.classList.add('active-green');
      updateBlockCounter(true);
    } else if (tile.classList.contains('active-green')) {
      // If block count is high (> 18), recycle back to mempool or empty
      if (coloredCount > 17 || Math.random() < 0.3) {
        tile.classList.remove('active-green');
        if (Math.random() < 0.5) {
          tile.classList.add('active-cyan');
        }
        updateBlockCounter(false);
      }
    }
  }, 1200);

  // User click interaction
  grid.addEventListener('click', (e) => {
    const tile = e.target.closest('.halo-tile');
    if (!tile) return;

    tile.classList.add('tile-just-clicked');
    setTimeout(() => tile.classList.remove('tile-just-clicked'), 250);

    if (tile.classList.contains('active-green')) {
      tile.classList.remove('active-green');
      tile.classList.add('active-cyan');
      showToastNotification('⛓️ Block status: Cryptographic state cycled to Mempool');
    } else if (tile.classList.contains('active-cyan')) {
      tile.classList.remove('active-cyan');
      showToastNotification('⛓️ Block state reset');
    } else {
      tile.classList.add('active-green');
      showToastNotification('🗳️ Encrypted Ballot Block verified on Sepolia Testnet!');
    }
    updateBlockCounter(true);
  });
}

/* --------------------------------------------------------------------------
   9. NEUROMESH ARCHITECTURE NAVIGATION & LIVE TELEMETRY SIMULATION
   -------------------------------------------------------------------------- */
function initGitGoNavigation() {
  const navItems = document.querySelectorAll('.gitgo-nav-item');
  if (navItems.length) {
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        const filter = item.getAttribute('data-filter');
        showToastNotification(`📡 NeuroMesh Focus: Filtered to ${item.textContent.trim()}`);
      });
    });
  }

  // Fluctuate live telemetry every 2s to feel active
  setInterval(() => {
    const wifiEls = document.querySelectorAll('.mesh-wifi-val');
    const signalEls = document.querySelectorAll('.mesh-signal-val');

    wifiEls.forEach(el => {
      const randomWifi = Math.floor(Math.random() * 4) + 96;
      el.textContent = randomWifi + '%';
    });

    signalEls.forEach(el => {
      const randomDb = -(Math.floor(Math.random() * 6) + 40);
      el.textContent = randomDb + 'dBm';
    });
  }, 2000);
}
