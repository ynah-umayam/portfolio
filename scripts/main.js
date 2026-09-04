import { loadPortfolioData, porfolioData, techStack, experiences } from "./data.js";
import { renderTechStackItems, renderMessage, renderSocials, renderExperiences, renderServices, renderContactDetails } from "./display.js";

let menuIcon = document.querySelector("#menuIcon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");

window.onscroll = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      const activeSection = document.querySelector("header nav .active");
      if (activeSection) {
        activeSection.classList.remove("active");
      }
      const headerNav = document.querySelector('header nav a[href*="#' + id + '"]');
      if (headerNav) {
        headerNav.classList.add("active");
      }

      if (id === "experience") {
        let timelineItems = document.querySelectorAll("#experienceTimeline > .timeline-item");

        if (window.innerWidth > 991) {
          timelineItems.forEach((item, index) => {
            if ((index % 2) === 0) {
              // Odd timeline
              Object.assign(item.style, {
                paddingRight: 'calc(50% + 30px)',
                paddingLeft: '0'
              });

            } else {
              // Even timeline
              Object.assign(item.style, {
                paddingRight: '0',
                paddingLeft: 'calc(50% + 30px)'
              });
            }
          });
        } else {
          timelineItems.forEach((item, index) => {
            Object.assign(item.style, {
                paddingRight: '0',
                paddingLeft: '37px',
                textAlign: 'left'
              });
          });
        }
      }
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

function addFieldError(element, message) {
  element.classList.add('field-error');
  element.parentElement.querySelector('.field-error-message').innerText = message;
}

function removeFieldError(element) {
  element.classList.remove('field-error');
  element.parentElement.querySelector('.field-error-message').innerText = '';
}

function validateContact() {
  const contactName = document.querySelector('#contactName');
  const contactSubject = document.querySelector('#contactSubject');
  const contactBody = document.querySelector('#contactBody');

  if(contactName.value && contactSubject.value && contactBody.value) {
    return true;
  }

  if (!contactName.value) {
    addFieldError(contactName, 'Full name is empty');
  } else {
    removeFieldError(contactName);
  }

  if (!contactSubject.value) {
    addFieldError(contactSubject, 'Subject is empty');
  } else {
    removeFieldError(contactSubject);
  }

  if (!contactBody.value) {
    addFieldError(contactBody, 'Message is empty');
  } else {
    removeFieldError(contactBody);
  }

  return false;
}

loadPortfolioData().then(() => {
  const fullName = `${porfolioData.firstName} ${porfolioData.lastName}`;
  document.title = `${fullName} | ${porfolioData.role}`;
  document.querySelector("#fullName").innerText = `${fullName.toUpperCase()}`;
  document.querySelector("#firstName").innerText = `${porfolioData.firstName}`;
  document.querySelector("#tagline").innerText = `${porfolioData.tagline}`;

  renderMessage(porfolioData.message);
  renderSocials(porfolioData.socials);
  renderServices(porfolioData.about, porfolioData.services);

  if (porfolioData.resumeLink) {
    document.querySelector('#resumeLink').innerHTML = `
      <a href="${porfolioData.resumeLink}" class="btn" target="_blank">
        Resume
      </a>
    `;
  }

  renderTechStackItems(
    document.querySelector("#programmingLanguages"), 
    techStack.programmingLanguages
  );
  renderTechStackItems(
    document.querySelector("#frameworksAndLibraries"), 
    techStack.frameworksAndLibraries
  );
  renderTechStackItems(
    document.querySelector("#toolsAndPlatforms"), 
    techStack.toolsAndPlatforms
  );

  renderExperiences(experiences);
  renderContactDetails(porfolioData.email, porfolioData.phoneNumber);

  document.forms['contact-form'].addEventListener('submit', (event) => {
    if (!validateContact()) {
      event.preventDefault();
      return;
    }

    const recipient = porfolioData.email; 
    const contactName = document.querySelector('#contactName').value;
    const contactSubject = document.querySelector('#contactSubject').value;
    const contactBody = document.querySelector('#contactBody').value;

    const subject = encodeURIComponent(`${contactSubject} - ${contactName}`); 
    const body = encodeURIComponent(`${contactBody}`); 
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    contactName.value = '';
    contactSubject.value = '';
    contactBody.value = '';

    event.preventDefault();
  });
});