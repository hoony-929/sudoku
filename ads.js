(function () {
  const config = window.SUDOKU_ADSENSE || {};
  const scriptId = "adsense-script";

  function hasConfig() {
    return Boolean(config.client && config.slots && config.slots.home);
  }

  function loadScript() {
    if (document.getElementById(scriptId)) {
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.client}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }

  function mountHomeAd() {
    const section = document.getElementById("homeAdSection");
    const slot = document.getElementById("homeAdSlot");
    if (!section || !slot || !hasConfig()) {
      return;
    }
    slot.setAttribute("data-ad-client", config.client);
    slot.setAttribute("data-ad-slot", config.slots.home);
    loadScript();
    section.classList.remove("hidden");
    window.setTimeout(function () {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn("AdSense did not initialize.", error);
      }
    }, 0);
  }

  window.SudokuAds = {
    mountHomeAd
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountHomeAd, { once: true });
  } else {
    mountHomeAd();
  }
})();
