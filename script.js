const services = [
  {
    title: "Medical Billing & Healthcare RCM",
    description: "Healthcare billing, revenue cycle support, and administrative solutions.",
    icon: "✚"
  },
  {
    title: "AI Receptionist & AI Automation",
    description: "AI-powered receptionist solutions and business workflow automation.",
    icon: "⌘"
  },
  {
    title: "Website & Software Development",
    description: "Modern websites, web applications, and tailored software solutions.",
    icon: "〈〉"
  },
  {
    title: "SEO & Digital Marketing",
    description: "Search optimization and digital marketing strategies for online visibility.",
    icon: "↗"
  },
  {
    title: "Amazon & E-commerce Management",
    description: "E-commerce store support, product management, and marketplace operations.",
    icon: "▣"
  },
  {
    title: "Social Media Marketing",
    description: "Social media planning, content coordination, and account management.",
    icon: "◎"
  },
  {
    title: "Graphic Design & Branding",
    description: "Visual identity, brand assets, and creative design services.",
    icon: "✳"
  },
  {
    title: "Video Editing & Content Creation",
    description: "Video editing and digital content production for different platforms.",
    icon: "▶"
  },
  {
    title: "Virtual Assistants & Customer Support",
    description: "Remote administrative assistance and customer communication support.",
    icon: "◉"
  },
  {
    title: "Cold Calling & Appointment Setting",
    description: "Outbound calling support and appointment scheduling services.",
    icon: "☎"
  },
  {
    title: "Lead Generation & Business Development",
    description: "Prospect research and business development support.",
    icon: "⌕"
  },
  {
    title: "Bookkeeping & Accounting",
    description: "Financial record organization and bookkeeping assistance.",
    icon: "▤"
  },
  {
    title: "Data Entry & Web Research",
    description: "Structured data entry, online research, and information organization.",
    icon: "▦"
  },
  {
    title: "Mobile App Development",
    description: "Mobile application design and development solutions.",
    icon: "▣"
  },
  {
    title: "Content Writing & Translation",
    description: "Written content, editing, and multilingual translation support.",
    icon: "✎"
  },
  {
    title: "IT Support & Cybersecurity",
    description: "Technical support and security-focused technology assistance.",
    icon: "⬡"
  },
  {
    title: "Recruitment & HR Services",
    description: "Recruitment coordination and human resource support services.",
    icon: "♙"
  },
  {
    title: "CRM & Business Process Automation",
    description: "CRM setup support and automation of business workflows.",
    icon: "⟳"
  }
];

const servicesGrid = document.getElementById("servicesGrid");
const serviceSelect = document.getElementById("service");

services.forEach((service, index) => {
  const card = document.createElement("article");

  card.className = "service-card reveal";

  card.innerHTML = `
    <div class="service-top">
      <span class="service-icon">${service.icon}</span>
      <span class="service-number">${String(index + 1).padStart(2, "0")}</span>
    </div>

    <h3>${service.title}</h3>

    <p>${service.description}</p>

    <a href="#contact" class="service-link" data-service="${service.title}">
      Discuss This Service <span>↗</span>
    </a>
  `;

  servicesGrid.appendChild(card);

  const option = document.createElement("option");
  option.value = service.title;
  option.textContent = service.title;

  serviceSelect.appendChild(option);
});

/* INTRO */

document.body.classList.add("loading");

window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    intro.classList.add("hide");
    document.body.classList.remove("loading");
  }, 1700);
});

/* HEADER SCROLL */

const header = document.getElementById("header");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateHeader, { passive: true });

updateHeader();

/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

document.addEventListener("click", event => {
  if (
    !nav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    nav.classList.remove("open");
  }
});

/* ACTIVE NAV LINK */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const activeSectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach(section => {
  activeSectionObserver.observe(section);
});

/* SCROLL REVEAL - BOTH DIRECTIONS */

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.12
  }
);

function observeRevealElements() {
  document.querySelectorAll(".reveal:not([data-observed])").forEach(element => {
    element.dataset.observed = "true";
    revealObserver.observe(element);
  });
}

observeRevealElements();

/* SERVICE SELECT FROM SERVICE CARD */

document.addEventListener("click", event => {
  const serviceLink = event.target.closest("[data-service]");

  if (!serviceLink) return;

  const selectedService = serviceLink.dataset.service;

  serviceSelect.value = selectedService;
});

/* CONTACT FORM */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(contactForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const service = formData.get("service");
  const message = formData.get("message").trim();

  if (!name || !email || !service || !message) {
    alert("Please complete all fields.");
    return;
  }

  const subject = encodeURIComponent(
    `New Project Inquiry - ${service}`
  );

  const body = encodeURIComponent(
`Hello Leaders Group,

I would like to discuss a project.

Name: ${name}
Email: ${email}
Service: ${service}

Project Details:
${message}

Regards,
${name}`
  );

  const mailtoLink =
    `mailto:aftabjunaid85@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
});

/* CURRENT YEAR */

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

/* POLICY ACCORDION */

const policyItems = document.querySelectorAll(".policy-item");

policyItems.forEach(item => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      policyItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    }
  });
});
