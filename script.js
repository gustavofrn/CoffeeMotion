const cursor = document.querySelector(".cursor");
const preview = document.querySelector(".image-preview");
const previewImg = preview.querySelector("img");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let previewX = 0;
let previewY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateMouse() {
  cursorX += (mouseX - cursorX) * 0.22;
  cursorY += (mouseY - cursorY) * 0.22;

  previewX += (mouseX + 190 - previewX) * 0.12;
  previewY += (mouseY - previewY) * 0.12;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  preview.style.left = previewX + "px";
  preview.style.top = previewY + "px";

  requestAnimationFrame(animateMouse);
}

animateMouse();

document.querySelectorAll(".mood-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    previewImg.src = item.dataset.img;
    preview.classList.add("active");
  });

  item.addEventListener("mouseleave", () => {
    preview.classList.remove("active");
  });
});

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = ((y / rect.height) - 0.5) * -16;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.035)
    `;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  });
});

document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

document.querySelectorAll("section, .product-card, .event-card").forEach((el) => {
  el.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

const marquee = document.querySelector(".marquee div");
marquee.innerHTML += marquee.innerHTML;

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  document.querySelector(".hero-visual").style.transform =
    `translateY(${scroll * 0.08}px)`;

  document.querySelector(".hero-content").style.transform =
    `translateY(${scroll * -0.035}px)`;
});
