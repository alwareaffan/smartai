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
