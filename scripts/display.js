export function renderTechStackItems(element, techStackItems) {
  let techStackHTML = "";
  techStackItems.forEach((item) => {
    const iconName = item.toLowerCase().split(' ').join('-');
    techStackHTML += `
      <div class="tech-stack-item">
        <i class="bx bxl-${iconName}"></i>
        <h3 class="tech-stack-name">${item}</h3>
      </div>
    `;
  });

  element.innerHTML = techStackHTML;
}

export function renderMessage(message) {
  const messageHTML = `<p>${message}</p>`;
  document.querySelector("#message").innerHTML = messageHTML;
}

export function renderSocials(socials) {
  let socialsHTML = '';
  socials.forEach((social) => {
    socialsHTML += `
      <a href="${social.link}" target="_blank">
        <i class="bx bxl-${social.id}"></i>
      </a>
    `;
  });
  const socialLinks = document.querySelectorAll(".social-links");
  socialLinks.forEach((socialLink) => {
    socialLink.innerHTML = socialsHTML;
  });
}

export function renderServices(about, services) {
  document.querySelector('#serviceAbout').innerHTML = `<p>${about}</p>`;
  let serviceHTML = '';
  services.forEach((service) => {
    serviceHTML += `
      <div class="service-item">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
      </div>
    `;
  });

  document.querySelector('#serviceItems').innerHTML = serviceHTML;
}

export function renderExperiences(experiences) {
  let experienceHTML = '';
  experiences.forEach((experience) => {
    let detailsHTML = '';
    experience.details.forEach((detail) => {
      detailsHTML += `
        <p>- ${detail}</p>
      `;
    });
    experienceHTML += `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${experience.duration}</div>
        <div class="timeline-content">
          <h3>${experience.heading}</h3>
          <p>${experience.company}</p>
          ${detailsHTML}
        </div>
      </div>
    `;
  })

  document.querySelector('#experienceTimeline').innerHTML = experienceHTML;
}

export function renderContactDetails(email, phoneNumber) {
  let contactDetailHTML = '';
  contactDetailHTML += `<p>${email}</p>`;
  contactDetailHTML += `<p>${phoneNumber}</p>`;
  document.querySelector('#contactDetails').innerHTML = contactDetailHTML;
}