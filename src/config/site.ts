export const siteConfig = {
  name: "Manzoor Ul Mushaikh",
  displayName: "Manzoor Ul Mushaikh",
  location: "Okara, Punjab, Pakistan",
  timezone: "Asia/Karachi",
  coordinates: { lat: 30.8138, lng: 73.4534 },
  url: "https://manzoorulmushaikh.com",
  tagline: "A place for worship, community, and connection.",
  description:
    "Manzoor ul Mushaikh is a welcoming mosque serving its community through worship, learning, and connection.",
  images: {
    hero: "/hero.jpeg",
    heroAlt: "An illuminated shrine with a brightly lit dome and minarets at night.",
    prayerBg: "/prayertime.jpg" as string | null,
    services: ["/spiritualguidance.png","/images.png", "/mosqueinner.jpg","/Urs.jpeg", "/brotherhood.jpeg"],
    aboutGallery: ["/mosqueinner.jpg", "/hero.jpeg"] as string[],
    donation: null as string | null,
    gallery: [
      "/Wfilter.png",
      "/Dis.png",
      "/Maddrissal.png",
      null,
      null,
      null,
    ] as (string | null)[],
    testimonials: [
      null,
      null,
      null,
      null,
      null,
    ] as (string | null)[],
  },
  donation: {
    currencies: ["PKR"],
    raised: 8500,
    goal: 12500,
  },
  highlights: [
    {
      title: "The Shrine",
      description:
        "A center of spiritual learning, focused on Zikr-e-Ilahi, Sunnah and purification of the heart (Tazkiyah-e-Nafs).",
    },
    {
      title: "The Silsila",
      description:
        "The Chishtia Sabria Nizamia Qaddosia order, tracing its spiritual authority through Hazrat Nizamuddin Auliya and Hazrat Abdul Quddus Gangohi.",
    },
    {
      title: "The Saint",
      description:
        "Hazrat Manzoor-ul-Mashaikh was a mystic, businessman and social figure who taught that true Sufism means living in the world with a heart connected to Allah.",
    },
  ],
  testimonials: [
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur. In quam purus quam bibendum nulla enim. Duis eu blandit commodo et egestas condimentum bibendum. Urna mattis diam fauce facilisis. Duis consequat dolor suscipit neque eget vitae sapien aliquam. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      name: "Alan Abdulla",
      role: "UI/UX Designer",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet dolor mauris suscipit felis pellentesque et, dolor. Tristique ipsum mattis ut mauris nam dictum. Donec elementum suspendisse. Duis eu blandit commodo et egestas condimentum bibendum.",
      name: "Alan Abdulla",
      role: "UI/UX Designer",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur. In quam purus quam bibendum nulla enim. Duis eu blandit commodo et egestas condimentum bibendum. Urna mattis diam fauce facilisis. Duis consequat dolor suscipit neque eget vitae sapien aliquam.",
      name: "Alan Abdulla",
      role: "UI/UX Designer",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique ipsum mattis ut mauris nam dictum. Donec elementum suspendisse, amet dolor mauris suscipit felis pellentesque et. Duis eu blandit commodo et egestas condimentum bibendum.",
      name: "Alan Abdulla",
      role: "UI/UX Designer",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur. Duis eu blandit commodo et egestas condimentum bibendum. Urna mattis diam fauce facilisis. Amet dolor mauris suscipit felis pellentesque et, dolor. Tristique ipsum mattis ut mauris nam dictum.",
      name: "Alan Abdulla",
      role: "UI/UX Designer",
    },
  ],
  services: [
    {
      title: "Spiritual Guidance",
      description:
        "Guidance for mureeds on the path of Tazkiyah-e-Nafs, within the Chishtia Sabria Nizamia Qaddosia order.",
      href: "/#prayer-times",
    },
    {
      title: "Zikr-e-Ilahi",
      description:
        "Weekly Mahfil-e-Zikr: collective remembrance of Allah and meditation to find peace away from worldly anxieties.",
      href: "/about",
    },
    {
      title: "Following the Sunnah",
      description:
        "Walking the path, manners and teachings of the Holy Prophet Muhammad (PBUH) in everyday life.",
      href: "/about",
    },
    {
      title: "Urs Mubarak",
      description:
        "The annual gathering with Quran recitation, scholarly discourse, Naat and Qawwali.",
      href: "/about",
    },
    {
      title: "Harmony & Brotherhood",
      description:
        "Peace and universal brotherhood, breaking barriers of caste, class and creed.",
      href: "/about",
    },
  ],
  activities: [
    {
      title: "Water Filtration",
      description:
        "Clean drinking water is one of the simplest forms of service. Rooted in the Chishtia tradition of serving humanity, the Astana provides filtered, safe water freely to visitors.",
    },
    {
      title: "Free Dispensary",
      description:
        "Hazrat Manzoor-ul-Mashaikh taught that true Sufism means serving those who suffer. In that spirit, the Astana offers medicines free of cost to those who cannot afford treatment, so that no one is turned away because of poverty.",
    },
    {
      title: "Madrassah",
      description:
        "A registered madrassah where children and students receive Islamic education free of charge. It carries forward the Astana’s mission of nurturing hearts and minds through the Quran, the Sunnah and good character.",
    },
  ],
  pageHeadings: {
    about: "About",
    contact: "Contact",
  },
  accessibilityLabels: {
    mainNavigation: "Main navigation",
    socialLinks: "Social links",
  },
  navLinks: [
    { label: "Home", href: "/" },
    // { label: "About Us", href: "/about" },
    { label: "What We Do", href: "/#what-we-do" },
    { label: "Projects", href: "/#activities" },
    // { label: "Donate", href: "/#donate" },
    // { label: "Contact", href: "/contact" },
  ],
  socialLinks: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  footer: {
  displayName: "Astana Alia Manzoor-ul-Mashaikh",
  description:
    "Astana Alia Manzoor-ul-Mashaikh is a Sufi sanctuary in Muhalla Ghazi Abad, Okara, devoted to the remembrance of Allah, purification of the heart and service to humanity.",
  socialHeading: "Connect with social media",
  socialLinksLabel: "Social links",
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" }, // TODO: real page URL
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" }, // TODO: real URL
    { label: "YouTube", href: "https://youtube.com/@hazratmanzoor-ul-mashaikhr9181?si=vK45xqr0VGkMIDQ4", icon: "youtube" }, // TODO: real channel URL
  ],
  newsletter: {
    heading: "Stay Connected",
    placeholder: "Your email address",
    submitLabel: "Subscribe",
    emailLabel: "Your email address",
    successMessage: "Thank you for subscribing!",
    errorMessage: "Please enter a valid email address.",
  },
  linkColumns: [
    {
      heading: "Our Projects",
      links: [
        { label: "Water Filtration", href: "/#activities" },
        { label: "Free Dispensary", href: "/#activities" },
        { label: "Madrassah", href: "/#activities" },
      ],
    },
    {
      heading: "Useful Links",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Events", href: "/#activities" },
        { label: "Donate", href: "/#donate" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  rightsText: "All rights reserved.",
  legalLinksLabel: "Legal links",
  legalLinks: [
    { label: "Terms & Agreements", href: "/" },
    { label: "Privacy Policy", href: "/" },
  ],
},
  contact: {
    address: "Address coming soon",
    phone: "+1 (000) 000-0000",
    email: "info@manzoorulmushaikh.com",
  },
  prayerTimes: [
    { key: "jumah", name: "Jumah", azan: "4:30 PM", iqamah: "5:00 PM" },
    { key: "chouruk", name: "Chouruk", azan: "4:30 PM", iqamah: "5:00 PM" },
    { key: "fajr", name: "Fajr", azan: "4:30 PM", iqamah: "5:00 PM" },
    { key: "zuhr", name: "Zuhr", azan: "4:30 PM", iqamah: "5:00 PM" },
    { key: "asr", name: "Asr", azan: "4:30 PM", iqamah: "5:00 PM" },
    { key: "mugrib", name: "Mugrib", azan: "4:30 PM", iqamah: "5:00 PM" },
    { key: "isha", name: "Isha", azan: "4:30 PM", iqamah: "5:00 PM" },
  ],
} as const;
