// Version française. Tout le texte du site se trouve ici.
import en from './en.js';

const exp = (i, patch) => ({ ...en.experience.items[i], ...patch });

export default {
  lang: 'fr',
  locale: 'fr_FR',
  meta: {
    title: 'Ihor Isychenko — Marketing | Communication | Design graphique',
    description:
      'Expert en marketing alliant stratégie d’entreprise et design. Compétences en direction d’équipe, stratégie de marque et réalisation créative. Une maîtrise du design graphique pour des visuels de marque cohérents. Un esprit analytique doté d’une vision artistique pour des campagnes marketing percutantes.',
  },
  nav: {
    about: 'À propos',
    experience: 'Expérience',
    media: 'Médias',
    contacts: 'Contacts',
    cv: 'Voir le CV',
    menu: 'Menu',
    close: 'Fermer',
    langLabel: 'Langue',
    skip: 'Aller au contenu',
  },
  hero: {
    hello: 'Bonjour ! Je suis',
    name: 'Ihor Isychenko',
    role: 'Marketing | Communication | Design graphique',
    tagline: 'Transformer les idées en expériences numériques',
    cta: 'M’écrire',
    cta2: 'Voir le CV',
    scroll: 'Défiler',
    location: 'Sloviansk · Kyiv · Tchernivtsi',
  },
  marquee: ['Marketing', 'Communication visuelle', 'Design graphique', 'SMM', 'Branding', 'Illustration', 'Stratégie digitale', 'Storytelling'],
  bio: {
    ...en.bio,
    kicker: 'Biographie',
    title: 'Expert en communication visuelle et marketing',
    lead:
      'Bonjour ! Je suis Ihor Isychenko, expert en communication visuelle et en marketing, passionné par l’art de donner vie aux idées grâce au design, au contenu et au storytelling digital. Mon expérience en design graphique, en gestion des réseaux sociaux et en marketing m’a permis de développer un sens aigu de la communication visuelle, de l’image de marque et de l’engagement du public.',
    paragraphs: [
      'J’aime collaborer avec différents professionnels de la création – designers, marketeurs et créateurs de contenu – pour transformer des concepts en réalisations concrètes et porteuses de sens. Qu’il s’agisse d’identité de marque, de contenus pour les réseaux sociaux ou de stratégie digitale, je m’efforce de rendre chaque projet à la fois visuellement captivant et stratégiquement réfléchi.',
      'Pour moi, un excellent design et une bonne communication consistent à créer des liens, raconter des histoires et susciter des émotions qui laissent une impression durable, tout en atteignant chaque objectif marketing.',
    ],
    personalTitle: 'Informations personnelles',
    skillsTitle: 'Compétences clés',
    toolsTitle: 'Outils',
    labels: { name: 'Nom', email: 'E-mail', city: 'Ville' },
    region: '(région de Donetsk, Ukraine)',
    skills: [
      'Design graphique',
      'Illustration',
      'Typographie',
      'Communication visuelle',
      'Théorie des couleurs',
      'Gestion de projet',
      'Planification stratégique',
      'Gestion de marque',
      'Marketing sur les réseaux sociaux',
      'Marketing digital',
      'Indicateurs de performance et KPI',
      'Présentation et communication',
    ],
    tools: [...en.bio.tools.slice(0, 7), 'Jira, Asana, Trello', 'Microsoft Office'],
  },
  numbers: {
    title: ['L’expertise', 'en chiffres'],
    text:
      'Mon approche allie stratégie et créativité pour aider les marques à se démarquer dans le paysage numérique actuel. Chaque chiffre reflète une valeur réelle apportée aux clients qui ont fait confiance à ma vision.',
    items: [
      { value: 400, suffix: '+', label: 'concepts de communication visuelle créés' },
      { value: 8, suffix: '+', label: 'années d’expérience dans la mise en œuvre de solutions efficaces' },
      { value: 35, suffix: '+', label: 'projets livrés dans les délais avec succès' },
      { value: 3, suffix: '', label: 'domaines principaux : marketing, design graphique, SMM' },
    ],
  },
  experience: {
    kicker: 'Parcours',
    title: 'Expérience professionnelle',
    details: 'Détails',
    present: 'Aujourd’hui',
    items: [
      exp(0, {
        company: 'Institut de l’information de masse (IMI)',
        role: 'Responsable de la communication visuelle',
        period: 'Mars 2025 - Aujourd’hui',
        place: 'Kyiv, Ukraine',
        body: [
          'J’étais chargé de concevoir et de gérer la communication visuelle sur les réseaux sociaux, le site web de l’organisation et les supports imprimés. Mon travail comprenait la création de visuels statiques, d’infographies, d’illustrations, de courtes vidéos sous-titrées, ainsi que la rédaction de contenus pour le site. Je veillais à la cohérence de tous les canaux, numériques comme hors ligne.',
          'J’ai également créé, géré et développé la page LinkedIn officielle de l’organisation, en définissant son style visuel, la structure de ses contenus et son approche de communication afin de renforcer sa présence professionnelle.',
          'En tant que designer principal de « Mediabaza », un réseau national de 15 hubs médiatiques régionaux soutenant les journalistes indépendants en temps de guerre, j’ai coordonné les standards visuels de l’ensemble des hubs : supervision des créations proposées par les chargés de communication, validation des supports et maintien d’une identité visuelle unifiée sur tout le réseau.',
        ],
      }),
      exp(1, {
        company: 'ONG « Make Sense »',
        role: 'Directeur marketing (CMO)',
        period: 'Févr. 2024 - Févr. 2025',
        place: 'Tchernivtsi, Ukraine',
        body: [
          'J’ai élaboré et mis en œuvre des stratégies globales de promotion des produits et services médiatiques. J’étais responsable de construire et de faire vivre la marque dans l’environnement médiatique, notamment en créant et en coordonnant des campagnes sur différentes plateformes.',
          'Mon rôle consistait à analyser le marché des médias, étudier la concurrence et comprendre les tendances du secteur afin de bâtir des stratégies de communication efficaces. Je pilotais aussi la création de contenus pour les plateformes médiatiques – sites d’actualité, réseaux sociaux et blogs – en veillant à ce que l’information soit pertinente, engageante et conforme aux standards de la marque.',
          'Par ailleurs, je suivais les résultats des campagnes, analysais l’efficacité des différents canaux et ajustais les stratégies en fonction des données recueillies pour obtenir les meilleurs résultats.',
        ],
      }),
      exp(2, {
        company: 'ONG « Make Sense »',
        role: 'Responsable marketing et designer graphique',
        period: 'Oct. 2023 - Févr. 2024',
        place: 'Tchernivtsi, Ukraine',
        body: [
          'En tant que responsable marketing, j’ai élaboré et mis en œuvre des stratégies de promotion de la marque, analysé le marché et la concurrence, créé des plans de contenu et proposé de nouvelles idées pour renforcer l’efficacité de la communication.',
          'En tant que designer graphique, j’ai créé des contenus visuels alignés sur les objectifs marketing et renforçant la stratégie de marque : illustrations, affiches pour des articles d’actualité, couvertures et icônes, ainsi que des visuels pour les réseaux sociaux.',
        ],
      }),
      exp(3, {
        role: 'Illustrateur',
        period: 'Juin 2016 - Nov. 2017',
        place: 'Londres, Royaume-Uni',
        body: [
          'Je réalisais des graphismes vectoriels 2D en style flat. Mes principales missions consistaient à concevoir des illustrations et des icônes pour l’entreprise, en créant des illustrations vectorielles originales conformes à son style et à ses standards de marque.',
          'La conception d’icônes était un aspect essentiel de mon travail : elles devaient être simples, facilement reconnaissables et fonctionnelles sur toutes les plateformes. Je veillais à ce que chaque icône exprime clairement sa fonction et reste lisible à toutes les tailles.',
        ],
      }),
      exp(4, {
        role: 'Designer graphique',
        period: 'Janv. 2018 - Avr. 2019',
        place: 'Kyiv, Ukraine',
        body: [
          'J’y réalisais des illustrations en 2D, notamment pour des livres pour enfants. Je concevais non seulement les illustrations elles-mêmes, mais aussi les couvertures de ces livres.',
          'Je m’occupais également de la mise en page des livres pour enfants sous Adobe InDesign, ainsi que de la création de cartes de visite, de flyers et d’autres supports imprimés.',
        ],
      }),
      exp(5, {
        company: 'Site de la ville de Sloviansk 6262.com.ua',
        role: 'Designer médias numériques et SMM',
        period: 'Août 2019 - Févr. 2024',
        place: 'Sloviansk, Ukraine',
        body: [
          'Je créais des visuels pour les articles d’actualité et pour les réseaux sociaux d’un site d’information, afin d’offrir au public des contenus attrayants et pertinents.',
          'Je gérais aussi la publication des contenus, collectais les statistiques et réalisais des analyses pour mesurer l’efficacité de nos supports et ajuster la stratégie si nécessaire.',
          'J’élaborais enfin des plans de contenu et mettais en œuvre de nouvelles idées pour maintenir un fort engagement des utilisateurs et améliorer la communication visuelle de la marque.',
        ],
      }),
      exp(6, {
        company: 'Site de la ville de Tchernivtsi 0372.ua',
        role: 'Designer graphique et community manager',
        period: 'Août 2022 - Févr. 2024',
        place: 'Tchernivtsi, Ukraine',
        body: [
          'J’étais chargé de créer et de gérer les contenus des réseaux sociaux, en développant des stratégies pour engager l’audience et accroître la visibilité de la marque : planification et publication des posts, suivi des retours des utilisateurs et analyse des résultats des campagnes pour en maximiser l’efficacité.',
          'Je créais également des contenus visuels adaptés aux plateformes sociales et alignés sur la stratégie marketing globale, notamment des visuels de posts et des bannières publicitaires.',
        ],
      }),
    ],
  },
  connect: {
    title: 'Donner vie aux visions marketing grâce à un design remarquable. Restons en contact !',
    text: 'Je transforme des concepts marketing abstraits en créations visuelles qui captivent et convertissent.',
    cta: 'Me contacter',
  },
  gallery: { kicker: 'Dans les coulisses', title: 'Au travail' },
  media: {
    title: ['Actualités', '&', 'Nouvelles'],
    kicker: 'Les médias parlent de moi',
    read: 'Lire l’article',
    items: [
      { ...en.media.items[0], title: 'Comment travailler efficacement avec Instagram, Facebook et Telegram' },
      {
        ...en.media.items[1],
        title: 'TikTok, YouTube, Instagram & Cie. Quels réseaux sociaux sont populaires chez les jeunes aujourd’hui ?',
      },
      { ...en.media.items[2], title: 'Tendances des réseaux sociaux en 2025 : conseils d’expert pour les médias' },
    ],
  },
  trainings: {
    kicker: 'Formations',
    title: 'Partager ce qui fonctionne',
    seeDetails: 'Voir les détails',
    items: [
      {
        ...en.trainings.items[0],
        title: 'Le travail efficace des médias sur les réseaux sociaux',
        text: 'Lors de cette formation, j’ai partagé mes propres méthodes et stratégies éprouvées qui aident les médias à réussir sur les réseaux sociaux.',
      },
      {
        ...en.trainings.items[1],
        title: 'Réseaux sociaux 2025 : défis et opportunités pour les médias',
        text: 'Lors de cette formation, j’ai expliqué comment les médias peuvent s’adapter aux nouvelles tendances et aux algorithmes, et tirer parti des opportunités des réseaux sociaux en 2025.',
      },
    ],
  },
  pages: {
    'effective-media-social': {
      ...en.pages['effective-media-social'],
      metaTitle: 'Méthodes efficaces pour les médias sur les réseaux sociaux — Ihor Isychenko',
      kicker: 'Méthodes efficaces de travail des médias sur les réseaux sociaux',
      title: 'Ma formation pour les médias : conseils clés pour bien utiliser les réseaux sociaux',
      lead: [
        'Découvrez les enseignements clés de la formation en ligne que j’ai animée sur les stratégies médiatiques efficaces pour 2025.',
        'Formats populaires, conseils pour engager l’audience et tendances propres à chaque plateforme : de quoi renforcer votre présence médiatique.',
      ],
      body: [
        'J’ai récemment eu l’occasion d’animer une formation en ligne intitulée <strong>« Méthodes efficaces de travail des médias sur les réseaux sociaux »</strong>, organisée par le hub régional de l’Institut de l’information de masse, « MediaBase Tchernihiv ». Nous y avons exploré les tendances et les outils qui façonnent les stratégies sur les réseaux sociaux en 2025.',
        'L’accent a été mis sur l’évolution de plateformes comme Instagram et Facebook. Sur Instagram, les formats interactifs comme les Reels, les Stories et les carrousels gagnent du terrain. J’ai souligné l’importance des contenus « en temps réel », comme les publications générées par les utilisateurs et les mises à jour en direct, qui favorisent un engagement plus profond. De même, sur Facebook, les vidéos sous-titrées, les stories et les publications textuelles restent de puissants outils pour toucher des publics variés.',
        'Autre point clé de la formation : le rôle de l’interaction avec l’audience. Répondre aux commentaires, organiser des sondages ou intégrer les suggestions des utilisateurs dans la création de contenu renforce considérablement les liens avec la communauté. Telegram continue par ailleurs d’offrir aux médias des opportunités uniques, notamment les messages vocaux et les sessions vidéo en direct, à ne pas négliger.',
        'Si vous cherchez des moyens efficaces d’évoluer dans cet environnement dynamique, je serai ravi de partager mon expertise. Vous trouverez ci-dessous la présentation détaillée de la formation ; n’hésitez pas à me contacter via le formulaire pour de futures collaborations.',
      ],
      dateline: 'Tchernihiv, 28 novembre 2024',
    },
    'work-with-social-media': {
      ...en.pages['work-with-social-media'],
      metaTitle: 'Les médias et les réseaux sociaux en 2025 — Ihor Isychenko',
      kicker: 'Pourquoi est-il important de suivre les tendances comme la vidéo et les stratégies d’engagement ?',
      title: 'Comment les médias peuvent travailler avec les réseaux sociaux : défis et opportunités en 2025',
      lead: [
        'Conseils pour travailler efficacement avec Instagram, Facebook et Telegram en 2025',
        'Lors d’une formation en ligne destinée aux professionnels des médias, j’ai partagé des stratégies actuelles pour travailler avec les grands réseaux sociaux et gagner en efficacité et en engagement : nouveaux formats de contenu et fonctionnement des algorithmes.',
      ],
      body: [
        'En 2025, les réseaux sociaux restent un outil essentiel pour les médias : une source clé de trafic, de retours et de dialogue avec le public. Lors d’une formation en ligne que j’ai animée pour « Mediabaza Tchernivtsi », hub régional de l’Institut de l’information de masse, j’ai partagé des conseils pour utiliser efficacement Instagram, Facebook et Telegram.',
        'L’un des points clés abordés était le rôle de la vidéo. La tendance 2025, ce sont les vidéos courtes et dynamiques : Instagram continuera de promouvoir les Reels, tandis que Facebook mettra davantage l’accent sur les vidéos sous-titrées. Il est essentiel de s’adapter, car les plateformes affinent sans cesse leurs algorithmes, et ceux qui ne suivent pas seront distancés.',
        'Pour obtenir les meilleurs résultats, il faut adopter des approches stratégiques : interagir activement avec les abonnés via les commentaires et les messages, et utiliser les nouveaux outils des plateformes. Par exemple, sur Facebook, mieux vaut éviter les liens externes dans les publications pour ne pas réduire la portée ; sur Telegram, des récapitulatifs hebdomadaires de l’actualité aident à maintenir l’intérêt du public.',
      ],
      dateline: 'Tchernivtsi, 11 octobre 2024',
    },
  },
  page: {
    back: 'Retour à l’accueil',
    press: 'Communiqué de presse',
    presentation: 'Présentation',
    more: 'Autres formations',
  },
  collab: {
    title: 'Je suis toujours ouvert à de nouveaux partenariats et collaborations.',
    text: 'Si vous recherchez un spécialiste expérimenté de la création de contenu et de la promotion sur les réseaux sociaux, je suis prêt à discuter de vos projets. Mon objectif : vous aider à atteindre de nouveaux sommets grâce à des stratégies efficaces et des solutions créatives.',
    advTitle: '3 avantages de travailler avec moi :',
    advantages: [
      {
        title: 'Expertise',
        text: 'J’ai de l’expérience dans de nombreux aspects du marketing et des médias, de la stratégie à l’exécution, ce qui me permet de garantir efficacité et résultats de haut niveau.',
      },
      {
        title: 'Approche personnalisée',
        text: 'Chaque projet est unique pour moi, et je suis prêt à concevoir des stratégies parfaitement adaptées à vos besoins et à vos objectifs.',
      },
      {
        title: 'Actualité',
        text: 'Je suis de près les dernières tendances des réseaux sociaux et du marketing digital, ce qui me permet de proposer des solutions modernes et efficaces pour réussir dans un environnement concurrentiel.',
      },
    ],
  },
  form: {
    title: 'Travaillons ensemble',
    name: 'Votre nom',
    email: 'Votre e-mail',
    message: 'Message',
    send: 'Envoyer',
    sending: 'Envoi…',
    okTitle: 'Merci !',
    okText: 'Je vous recontacte très vite.',
    errTitle: 'Impossible d’envoyer le formulaire',
    errText: 'Veuillez réessayer plus tard.',
    ok: 'Ok',
  },
  footer: {
    tagline: 'Transformer les idées en expériences numériques',
    quick: 'Liens rapides',
    contact: 'Coordonnées',
    rights: 'Tous droits réservés',
    top: 'Haut de page',
  },
};
