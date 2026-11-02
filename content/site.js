// Shared, non-translated settings.
export default {
  url: 'https://isychenko.com',
  email: { user: 'isychenko_ihor', domain: 'icloud.com' },
  cv: 'https://drive.google.com/file/d/1BgmdUA7xN-oN0gwxNLF9Qd0b_hh71H93/view?usp=sharing',
  socials: [
    { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/Ihor.Isychenko/' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ihor-isychenko/' },
  ],
  // Contact form endpoint (see tools/contact-form).
  formEndpoint: 'https://script.google.com/macros/s/AKfycbwT4o4PLahfmJRtCc08VJDoOr3OynZzRvfSrZhTR8k9vY9yaMeexZMKGfgdzaZFFEI_GA/exec',
  // Year shown at the end of the copyright line (current year is used if later).
  copyrightUntil: 2027,
  // Organisations and projects shown in the purple "Projects & partners" band.
  partners: [
    'Institute of Mass Information',
    'Legal Hundred',
    'Internews',
    'NDI',
    'Prosper Global (Mercy Corps)',
    'Chemonics International',
    'IREX',
    'Prague Civil Society Centre',
    'NGO «Make Sense»',
    '6262.com.ua',
    '0372.ua',
  ],
  // Google Analytics 4 + Microsoft Clarity IDs.
  analytics: { ga4: 'G-6B2CXD3TN5', clarity: 'pn2tnj629x' },
  languages: [
    { code: 'en', label: 'EN', name: 'English', prefix: '' },
    { code: 'fr', label: 'FR', name: 'Français', prefix: 'fr/' },
  ],
};
