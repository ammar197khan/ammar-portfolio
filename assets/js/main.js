(function () {
  "use strict";

  var data = window.PORTFOLIO || {};
  var config = data.config || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function icon(name) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + esc(name) + '"/></svg>';
  }

  function safeUrl(url) {
    return /^(https?:|mailto:)/i.test(url || "") ? url : "";
  }

  /* ---------------- Header & navigation ---------------- */
  var header = $(".site-header");
  var toggle = $(".nav-toggle");
  var menu = $("#nav-menu");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  $$("a", menu).forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  // Highlight the nav link for the section currently in view
  var navLinks = $$(".nav-links a");
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  function updateActiveLink() {
    var line = window.innerHeight * 0.35;
    var current = null;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    });
    navLinks.forEach(function (a) {
      var active = a.getAttribute("href") === "#" + current;
      a.classList.toggle("is-active", active);
      if (active) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------------- Reveal on scroll ---------------- */
  var revealObserver = null;
  if ("IntersectionObserver" in window && !reduceMotion) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  }

  function observeReveals(root) {
    $$(".reveal", root).forEach(function (el) {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add("is-visible");
    });
  }

  /* ---------------- Projects ---------------- */
  var filters = data.filters || [];
  var projects = data.projects || [];
  var filterBox = $("#project-filters");
  var grid = $("#project-grid");
  var filterStatus = $("#filter-status");

  function labelFor(category) {
    var match = filters.filter(function (f) { return f.id === category; })[0];
    return match ? match.label : category;
  }

  function projectCard(p) {
    var links = [];
    var demo = safeUrl(p.demo);
    var repo = safeUrl(p.repo);
    if (demo) links.push('<a href="' + esc(demo) + '" target="_blank" rel="noopener">' + icon("external") + 'Live demo<span class="sr-only"> of ' + esc(p.title) + '</span></a>');
    if (repo) links.push('<a href="' + esc(repo) + '" target="_blank" rel="noopener">' + icon("github") + 'Source code<span class="sr-only"> of ' + esc(p.title) + '</span></a>');
    if (!links.length) links.push('<span class="muted">' + (p.concept ? "Case study coming soon" : "Private project") + "</span>");

    return (
      '<li class="card project" data-category="' + esc(p.category) + '">' +
        '<div class="project-thumb">' +
          '<img src="' + esc(p.image) + '" alt="" loading="lazy" decoding="async" width="640" height="400">' +
          '<span class="project-tag">' + esc(labelFor(p.category)) + "</span>" +
          (p.concept ? '<span class="project-tag concept">Concept</span>' : "") +
        "</div>" +
        '<div class="project-body">' +
          "<h3>" + esc(p.title) + "</h3>" +
          "<p>" + esc(p.summary) + "</p>" +
          '<ul class="tech-list" aria-label="Technologies">' +
            (p.tech || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
          "</ul>" +
          '<div class="project-links">' + links.join("") + "</div>" +
        "</div>" +
      "</li>"
    );
  }

  function countFor(id) {
    return id === "all" ? projects.length : projects.filter(function (p) { return p.category === id; }).length;
  }

  function applyFilter(id) {
    $$(".filter-btn", filterBox).forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === id));
    });

    var visible = 0;
    $$(".project", grid).forEach(function (card) {
      var show = id === "all" || card.dataset.category === id;
      card.hidden = !show;
      if (show) {
        visible++;
        // restart the fade-in animation
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "";
      }
    });

    var empty = $(".empty-state", grid);
    if (!visible && !empty) {
      grid.insertAdjacentHTML("beforeend", '<li class="empty-state">New projects in this category are on the way. In the meantime, see <a href="' + esc(config.github) + '" target="_blank" rel="noopener">my GitHub</a>.</li>');
    } else if (visible && empty) {
      empty.remove();
    }

    filterStatus.textContent = "Showing " + visible + " " + (visible === 1 ? "project" : "projects") + (id === "all" ? "" : " in " + labelFor(id)) + ".";
  }

  if (filterBox && grid) {
    filterBox.innerHTML = filters.map(function (f) {
      return '<button type="button" class="filter-btn" data-filter="' + esc(f.id) + '" aria-pressed="false">' +
        esc(f.label) + '<span class="filter-count" aria-hidden="true">' + countFor(f.id) + "</span></button>";
    }).join("");

    grid.innerHTML = projects.map(projectCard).join("");

    filterBox.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (btn) applyFilter(btn.dataset.filter);
    });

    applyFilter("all");
  }

  /* ---------------- Skills ---------------- */
  var skillsGrid = $("#skills-grid");
  if (skillsGrid) {
    skillsGrid.innerHTML = (data.skills || []).map(function (s) {
      return (
        '<section class="card skill-group reveal" aria-label="' + esc(s.group) + '">' +
          '<div class="skill-head">' + icon(s.icon || "spark") + "<h3>" + esc(s.group) + "</h3></div>" +
          (s.note ? '<p class="skill-note">' + esc(s.note) + "</p>" : "") +
          '<ul class="chip-list">' + (s.items || []).map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" +
        "</section>"
      );
    }).join("");
  }

  /* ---------------- Experience ---------------- */
  var timeline = $("#timeline");
  if (timeline) {
    timeline.innerHTML = (data.experience || []).map(function (x) {
      return (
        '<li class="timeline-item reveal"><article class="card timeline-card">' +
          '<div class="timeline-top"><h3>' + esc(x.role) + '</h3><span class="timeline-period">' + esc(x.period) + "</span></div>" +
          '<p class="timeline-meta"><span>' + esc(x.company) + "</span>" +
            (x.location ? "<span>" + icon("pin") + esc(x.location) + "</span>" : "") + "</p>" +
          (x.points && x.points.length
            ? '<ul class="timeline-points">' + x.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>"
            : "") +
        "</article></li>"
      );
    }).join("");
  }

  /* ---------------- Education ---------------- */
  var eduList = $("#education-list");
  if (eduList) {
    eduList.innerHTML = (data.education || []).map(function (e) {
      return (
        '<li class="card education-item reveal">' + icon("grad") +
          "<div><h3>" + esc(e.title) + "</h3>" +
          '<p class="inst">' + esc(e.institution) + "</p>" +
          (e.period ? '<p class="period">' + esc(e.period) + "</p>" : "") +
          (e.details ? '<p class="details">' + esc(e.details) + "</p>" : "") +
        "</div></li>"
      );
    }).join("");
  }

  observeReveals(document);

  /* ---------------- Hero console animation ---------------- */
  var consoleBody = $("#console-body");
  if (consoleBody && !reduceMotion) {
    var lines = $$("li", consoleBody);
    consoleBody.classList.add("is-animating");
    lines.forEach(function (li, i) {
      setTimeout(function () { li.classList.add("is-shown"); }, 500 + i * 420);
    });
  }

  /* ---------------- Copy email ---------------- */
  $$(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.dataset.copy;
      var done = function () {
        btn.classList.add("is-copied");
        btn.setAttribute("aria-label", "Email address copied");
        btn.innerHTML = icon("check");
        setTimeout(function () {
          btn.classList.remove("is-copied");
          btn.setAttribute("aria-label", "Copy email address");
          btn.innerHTML = icon("copy");
        }, 2000);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { window.prompt("Copy email address:", text); });
      } else {
        window.prompt("Copy email address:", text);
      }
    });
  });

  /* ---------------- Contact form ---------------- */
  var form = $("#contact-form");
  if (form) {
    var status = $("#form-status");
    var submitBtn = $("button[type=submit]", form);
    var submitLabel = $(".btn-label", submitBtn);
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var rules = {
      name: function (v) { return v.length >= 2 ? "" : "Please enter your name."; },
      email: function (v) { return emailPattern.test(v) ? "" : "Please enter a valid email address."; },
      subject: function (v) { return v.length >= 3 ? "" : "Please add a short subject."; },
      message: function (v) { return v.length >= 10 ? "" : "Please write a message of at least 10 characters."; }
    };

    function validateField(input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var message = rule(input.value.trim());
      var errorEl = document.getElementById(input.id + "-error");
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (message) input.setAttribute("aria-describedby", errorEl.id);
      else input.removeAttribute("aria-describedby");
      errorEl.textContent = message;
      return !message;
    }

    $$("input, textarea", form).forEach(function (input) {
      input.addEventListener("blur", function () { if (input.value) validateField(input); });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validateField(input);
      });
    });

    function setStatus(text, type) {
      status.textContent = text;
      status.className = "form-status" + (type ? " " + type : "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setStatus("");

      var fields = ["name", "email", "subject", "message"].map(function (n) { return form.elements[n]; });
      var firstInvalid = null;
      fields.forEach(function (f) { if (!validateField(f) && !firstInvalid) firstInvalid = f; });
      if (firstInvalid) { firstInvalid.focus(); return; }
      if (form.elements._gotcha.value) return; // spam bot

      var values = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        subject: form.elements.subject.value.trim(),
        message: form.elements.message.value.trim()
      };

      if (config.formEndpoint) {
        submitBtn.disabled = true;
        submitLabel.textContent = "Sending…";
        fetch(config.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values)
        })
          .then(function (res) {
            if (!res.ok) throw new Error("Request failed");
            form.reset();
            setStatus("Thanks, " + values.name + "! Your message has been sent. I'll get back to you soon.", "success");
          })
          .catch(function () {
            setStatus("Sorry, the message couldn't be sent. Please email me directly at " + config.email + ".", "error");
          })
          .then(function () {
            submitBtn.disabled = false;
            submitLabel.textContent = "Send message";
          });
        return;
      }

      // No form service configured: open the visitor's email app with the message filled in.
      var body = values.message + "\n\n— " + values.name + " (" + values.email + ")";
      var href = "mailto:" + config.email + "?subject=" + encodeURIComponent(values.subject) + "&body=" + encodeURIComponent(body);
      window.location.href = href;
      setStatus("Your email app should open with your message ready to send. If nothing happens, email me at " + config.email + ".", "success");
    });
  }

  /* ---------------- Footer year ---------------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
