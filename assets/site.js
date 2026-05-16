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
})();
