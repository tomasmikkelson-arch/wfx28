// Shared, non-translated settings.
export default {
  url: 'https://isychenko.com',
  email: { user: 'isychenko_ihor', domain: 'icloud.com' },
  cv: 'https://drive.google.com/file/d/1BgmdUA7xN-oN0gwxNLF9Qd0b_hh71H93/view?usp=sharing',
  socials: [
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/Ihor.Isychenko/' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ihor-isychenko/' },
  ],
  // Contact form is delivered by formsubmit.co to the email above.
  // The very first submission sends an activation email — confirm it once.
  formEndpoint: 'https://formsubmit.co/ajax/isychenko_ihor@icloud.com',
  languages: [
    { code: 'en', label: 'EN', name: 'English', prefix: '' },
    { code: 'fr', label: 'FR', name: 'Français', prefix: 'fr/' },
  ],
  gallery: ['golden-gate', 'pro-donbas', 'team', 'maie-sens-site', 'kids-books', 'newsroom', 'at-work', 'mediabaza-chernihiv'],
};
