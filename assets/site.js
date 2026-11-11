(function () {
  var toggle = document.querySelector("[data-mobile-menu-toggle]");
  var nav = document.querySelector("[data-mobile-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isHidden = nav.classList.contains("hidden");
      nav.classList.toggle("hidden", !isHidden);
      toggle.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
          nav.classList.add("hidden");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Contact Form Mailto Handler
  var form = document.getElementById("portfolio-contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = (fd.get("name") || "").toString().trim();
      var email = (fd.get("email") || "").toString().trim();
      var subject = (fd.get("subject") || "Portfolio contact").toString();
      var message = (fd.get("message") || "").toString().trim();
      var emailInput = document.getElementById("contact-email");
      if (email && emailInput && !emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }
      if (!message) {
        window.alert("Please enter your message before sending.");
        var msgEl = document.getElementById("contact-message");
        if (msgEl) msgEl.focus();
        return;
      }
      var body =
        (name ? "Name: " + name + "\n" : "") +
        (email ? "Email: " + email + "\n\n" : "\n") +
        message;
      var mailtoUrl =
        "mailto:chewsinai2002@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      if (mailtoUrl.length > 2000) {
        body =
          (name ? "Name: " + name + "\n" : "") +
          (email ? "Email: " + email + "\n\n" : "\n") +
          message.slice(0, 1200) +
          "\n\n[Message truncated — URL length limit.]";
        mailtoUrl =
          "mailto:chewsinai2002@gmail.com?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);
      }
      var link = document.createElement("a");
      link.href = mailtoUrl;
      link.setAttribute("aria-hidden", "true");
      link.style.cssText = "position:fixed;left:-9999px;top:0;";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Interactive Project Filter Tabs & Live Instant Search (projects.html)
  var filterButtons = document.querySelectorAll("[data-filter]");
  var projectCards = document.querySelectorAll("[data-category]");
  var searchInput = document.getElementById("project-search");
  var countBadge = document.getElementById("project-count");
  var noResultsEl = document.getElementById("no-projects-found");

  if (projectCards.length) {
    var activeCategory = "all";
    var activeQuery = "";

    function updateProjectFilter() {
      var visibleCount = 0;
      var q = activeQuery.toLowerCase().trim();

      projectCards.forEach(function (card) {
        var cats = (card.getAttribute("data-category") || "").toLowerCase().split(" ");
        var cardText = (card.innerText || card.textContent || "").toLowerCase();

        var categoryMatch = activeCategory === "all" || cats.indexOf(activeCategory) !== -1;
        var queryMatch = !q || cardText.indexOf(q) !== -1;

        if (categoryMatch && queryMatch) {
          card.classList.remove("hidden");
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
          visibleCount++;
        } else {
          card.classList.add("hidden");
        }
      });

      if (countBadge) {
        countBadge.textContent = "Showing " + visibleCount + " of " + projectCards.length + " projects";
      }

      if (noResultsEl) {
        if (visibleCount === 0) {
          noResultsEl.classList.remove("hidden");
        } else {
          noResultsEl.classList.add("hidden");
        }
      }
    }

    if (filterButtons.length) {
      filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          activeCategory = btn.getAttribute("data-filter") || "all";
          filterButtons.forEach(function (b) {
            b.classList.remove("bg-sky-400", "text-slate-950", "font-bold", "shadow-lg", "shadow-sky-400/20");
            b.classList.add("bg-slate-900/80", "text-slate-400", "border-slate-800");
          });
          btn.classList.add("bg-sky-400", "text-slate-950", "font-bold", "shadow-lg", "shadow-sky-400/20");
          btn.classList.remove("bg-slate-900/80", "text-slate-400", "border-slate-800");
          updateProjectFilter();
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        activeQuery = searchInput.value;
        updateProjectFilter();
      });
    }

    var resetBtn = document.getElementById("reset-search-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (searchInput) searchInput.value = "";
        activeQuery = "";
        activeCategory = "all";
        if (filterButtons.length) {
          filterButtons[0].click();
        } else {
          updateProjectFilter();
        }
      });
    }
  }

  // Copy Email Quick Button with Interactive Toast
  var copyEmailBtns = document.querySelectorAll("[data-copy-email]");
  copyEmailBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var email = btn.getAttribute("data-copy-email") || "chewsinai2002@gmail.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showToast);
      } else {
        var input = document.createElement("input");
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        showToast();
      }

      function showToast() {
        var origHtml = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-sm">done</span> Copied!';
        btn.classList.add("bg-emerald-500/20", "text-emerald-300", "border-emerald-500/40");
        setTimeout(function () {
          btn.innerHTML = origHtml;
          btn.classList.remove("bg-emerald-500/20", "text-emerald-300", "border-emerald-500/40");
        }, 2200);
      }
    });
  });

  // Spotlight Mouse-Follow Glow on Cards
  var glowCards = document.querySelectorAll(".glass-card, .flat-tech-card");
  glowCards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", x + "px");
      card.style.setProperty("--mouse-y", y + "px");
    });
  });

  // Mini Arcade Easter Egg: Konami Code & Game Modal
  var konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  var konamiIndex = 0;
  document.addEventListener("keydown", function (e) {
    if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        openArcadeModal();
      }
    } else {
      konamiIndex = 0;
    }
  });

  var triggerBtns = document.querySelectorAll("[data-open-arcade]");
  triggerBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openArcadeModal();
    });
  });

  function openArcadeModal() {
    var existing = document.getElementById("arcade-modal");
    if (existing) {
      existing.classList.remove("hidden");
      return;
    }

    var modal = document.createElement("div");
    modal.id = "arcade-modal";
    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in";
    modal.innerHTML = [
      '<div class="relative w-full max-w-md bg-slate-900 border-2 border-sky-400/40 rounded-2xl p-6 shadow-2xl shadow-sky-500/20 text-center">',
      '  <button type="button" id="close-arcade" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg bg-transparent border-0 cursor-pointer">&times;</button>',
      '  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold mb-3 border border-sky-500/30">',
      '    <span class="material-symbols-outlined text-sm">sports_esports</span> DEV ARCADE',
      '  </div>',
      '  <h3 class="text-xl font-bold text-white mb-1">Bug Smasher &middot; 30s Blitz</h3>',
      '  <p class="text-xs text-slate-400 mb-4">Click bugs 🪲 to smash them before production crashes! Catch powerups ⚡</p>',
      '  <div class="flex justify-between items-center bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 mb-3">',
      '    <span>SCORE: <strong id="game-score" class="text-sky-400">0</strong></span>',
      '    <span>TIME: <strong id="game-timer" class="text-emerald-400">30s</strong></span>',
      '    <span>BEST: <strong id="game-high" class="text-amber-400">0</strong></span>',
      '  </div>',
      '  <div id="game-canvas" class="relative w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden cursor-crosshair select-none flex items-center justify-center">',
      '    <div id="game-start-prompt" class="text-center p-4">',
      '      <span class="material-symbols-outlined text-4xl text-sky-400 mb-2 block animate-bounce">joystick</span>',
      '      <p class="text-sm font-bold text-white mb-2">Ready to debug?</p>',
      '      <button type="button" id="start-game-btn" class="px-4 py-2 bg-primary text-slate-950 font-bold rounded-lg text-xs uppercase hover:brightness-110 active:scale-95 transition-all">Start Game</button>',
      '    </div>',
      '  </div>',
      '  <p class="text-[10px] text-slate-500 mt-3 font-mono">Tip: You can also unlock this anytime with the Konami Code: &uarr; &uarr; &darr; &darr; &larr; &rarr; &larr; &rarr; B A</p>',
      '</div>'
    ].join("");

    document.body.appendChild(modal);

    var closeBtn = document.getElementById("close-arcade");
    closeBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
      stopGame();
    });

    var startBtn = document.getElementById("start-game-btn");
    var canvas = document.getElementById("game-canvas");
    var scoreEl = document.getElementById("game-score");
    var timerEl = document.getElementById("game-timer");
    var highEl = document.getElementById("game-high");
    var startPrompt = document.getElementById("game-start-prompt");

    var score = 0;
    var highScore = parseInt(localStorage.getItem("dev_arcade_high") || "0", 10);
    highEl.textContent = highScore;
    var timeLeft = 30;
    var gameInterval = null;
    var spawnInterval = null;
    var isRunning = false;

    startBtn.addEventListener("click", startGame);

    function startGame() {
      if (isRunning) return;
      isRunning = true;
      score = 0;
      timeLeft = 30;
      scoreEl.textContent = "0";
      timerEl.textContent = "30s";
      startPrompt.classList.add("hidden");

      // Clear any remaining entities
      canvas.querySelectorAll(".game-entity").forEach(function (e) { e.remove(); });

      gameInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft + "s";
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);

      spawnInterval = setInterval(spawnBug, 650);
      spawnBug();
    }

    function stopGame() {
      isRunning = false;
      clearInterval(gameInterval);
      clearInterval(spawnInterval);
      if (startPrompt) startPrompt.classList.remove("hidden");
    }

    function endGame() {
      stopGame();
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("dev_arcade_high", highScore);
        highEl.textContent = highScore;
      }
      startPrompt.innerHTML = [
        '<div class="animate-fade-in">',
        '  <span class="text-3xl mb-1 block">🏆</span>',
        '  <p class="text-sm font-bold text-white">Game Over!</p>',
        '  <p class="text-xs text-sky-300 mb-3">You squashed ' + score + ' bugs.</p>',
        '  <button type="button" id="restart-game-btn" class="px-4 py-2 bg-primary text-slate-950 font-bold rounded-lg text-xs uppercase hover:brightness-110 active:scale-95 transition-all">Play Again</button>',
        '</div>'
      ].join("");
      startPrompt.classList.remove("hidden");
      var restartBtn = document.getElementById("restart-game-btn");
      if (restartBtn) restartBtn.addEventListener("click", startGame);
    }

    function spawnBug() {
      if (!isRunning) return;
      var entity = document.createElement("div");
      entity.className = "game-entity absolute cursor-pointer select-none text-2xl transition-transform active:scale-125";
      
      var isBonus = Math.random() < 0.2;
      entity.textContent = isBonus ? "⚡" : (Math.random() < 0.3 ? "🐛" : "🪲");
      var points = isBonus ? 5 : 1;

      var maxX = canvas.clientWidth - 40;
      var maxY = canvas.clientHeight - 40;
      var x = Math.max(10, Math.floor(Math.random() * maxX));
      var y = Math.max(10, Math.floor(Math.random() * maxY));

      entity.style.left = x + "px";
      entity.style.top = y + "px";

      var lifetime = isBonus ? 1300 : 1800;

      var timeout = setTimeout(function () {
        if (entity.parentNode) entity.remove();
      }, lifetime);

      entity.addEventListener("click", function (e) {
        e.stopPropagation();
        clearTimeout(timeout);
        score += points;
        scoreEl.textContent = score;

        // Splat feedback
        entity.textContent = isBonus ? "+5!" : "💥";
        entity.style.transform = "scale(1.4)";
        entity.style.color = isBonus ? "#38bdf8" : "#f43f5e";
        setTimeout(function () {
          if (entity.parentNode) entity.remove();
        }, 200);
      });

      canvas.appendChild(entity);
    }
  }

  // Resume / CV Dropdown Component Handler
  var resumeDropdowns = document.querySelectorAll("[data-resume-dropdown]");
  resumeDropdowns.forEach(function (dropdown) {
    var toggleBtn = dropdown.querySelector("[data-resume-dropdown-toggle]");
    var menu = dropdown.querySelector("[data-resume-dropdown-menu]");
    if (!toggleBtn || !menu) return;

    function openMenu() {
      menu.classList.remove("hidden");
      toggleBtn.setAttribute("aria-expanded", "true");
      var icon = toggleBtn.querySelector(".dropdown-icon");
      if (icon) icon.style.transform = "rotate(180deg)";
    }

    function closeMenu() {
      menu.classList.add("hidden");
      toggleBtn.setAttribute("aria-expanded", "false");
      var icon = toggleBtn.querySelector(".dropdown-icon");
      if (icon) icon.style.transform = "rotate(0deg)";
    }

    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = !menu.classList.contains("hidden");
      if (isOpen) {
        closeMenu();
      } else {
        document.querySelectorAll("[data-resume-dropdown-menu]").forEach(function (m) {
          m.classList.add("hidden");
        });
        document.querySelectorAll("[data-resume-dropdown-toggle]").forEach(function (b) {
          b.setAttribute("aria-expanded", "false");
          var ic = b.querySelector(".dropdown-icon");
          if (ic) ic.style.transform = "rotate(0deg)";
        });
        openMenu();
      }
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest("[data-resume-dropdown]")) {
      document.querySelectorAll("[data-resume-dropdown-menu]").forEach(function (m) {
        m.classList.add("hidden");
      });
      document.querySelectorAll("[data-resume-dropdown-toggle]").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
        var icon = b.querySelector(".dropdown-icon");
        if (icon) icon.style.transform = "rotate(0deg)";
      });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll("[data-resume-dropdown-menu]").forEach(function (m) {
        m.classList.add("hidden");
      });
      document.querySelectorAll("[data-resume-dropdown-toggle]").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
        var icon = b.querySelector(".dropdown-icon");
        if (icon) icon.style.transform = "rotate(0deg)";
      });
    }
  });
})();
