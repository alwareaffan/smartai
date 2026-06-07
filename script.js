const header = document.querySelector("[data-header]");
const buttons = document.querySelectorAll(".showcase-controls button");
const panels = document.querySelectorAll(".feature-panel");
const demoModal = document.querySelector("[data-demo-modal]");
const demoTriggers = document.querySelectorAll("[data-demo-trigger]");
const demoClose = document.querySelector("[data-demo-close]");

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;

    buttons.forEach((item) => item.classList.toggle("active", item === button));
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === target);
    });
  });
});

function openDemoModal() {
  if (!demoModal) return;
  demoModal.hidden = false;
  document.body.classList.add("modal-open");
  demoClose?.focus();
}

function closeDemoModal() {
  if (!demoModal) return;
  demoModal.hidden = true;
  document.body.classList.remove("modal-open");
}

demoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openDemoModal);
});

demoClose?.addEventListener("click", closeDemoModal);

demoModal?.addEventListener("click", (event) => {
  if (event.target === demoModal) {
    closeDemoModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && demoModal && !demoModal.hidden) {
    closeDemoModal();
  }
});

if (new URLSearchParams(window.location.search).has("demo")) {
  window.setTimeout(openDemoModal, 100);
}

const pricingCounters = document.querySelectorAll("[data-pricing-counter]");
const pricingControl = document.querySelector("[data-pricing-control]");

function setPricingRate(value) {
  pricingCounters.forEach((counter) => {
    counter.textContent = `TZS ${value}`;
  });
}

function completePricingAnimation(timerId) {
  if (timerId) {
    window.clearInterval(timerId);
  }

  setPricingRate(50);
  document.body.classList.remove("price-rate-idle");
  document.body.classList.remove("price-rate-animating");
  document.body.classList.add("price-rate-ready");
}

if (pricingCounters.length) {
  const startRate = 500;
  const finalRate = 50;
  const stepAmount = 10;
  const stepDelay = 110;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pricingTimer = 0;
  let currentRate = startRate;

  pricingCounters.forEach((counter) => {
    counter.setAttribute("aria-live", "polite");
  });

  setPricingRate(startRate);

  function startPricingAnimation() {
    if (document.body.classList.contains("price-rate-ready")) return;
    if (document.body.classList.contains("price-rate-animating")) return;

    if (reduceMotion) {
      completePricingAnimation(pricingTimer);
      return;
    }

    document.body.classList.remove("price-rate-idle");
    document.body.classList.add("price-rate-animating");
    if (pricingControl) {
      pricingControl.textContent = "Show actual price";
    }

    pricingTimer = window.setInterval(() => {
      currentRate -= stepAmount;
      setPricingRate(Math.max(currentRate, finalRate));

      if (currentRate <= finalRate) {
        completePricingAnimation(pricingTimer);
      }
    }, stepDelay);
  }

  pricingControl?.addEventListener("click", () => {
    if (document.body.classList.contains("price-rate-animating")) {
      completePricingAnimation(pricingTimer);
    }
  });

  startPricingAnimation();
}
