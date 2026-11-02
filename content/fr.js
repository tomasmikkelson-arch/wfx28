// Version française — même structure que en.js.
import en from './en.js';

const E = en.experience.items;
const exp = (i, patch, popupPatch) => ({
  ...E[i],
  ...patch,
  popup: E[i].popup ? { ...E[i].popup, ...popupPatch } : null,
});

export default {
  lang: 'fr',
  locale: 'fr_FR',
  meta: {
    title: 'Ihor Isychenko',
    description:
      'Expert en marketing alliant stratégie d’entreprise et design. Compétences en direction d’équipe, stratégie de marque et réalisation créative. Une maîtrise du design graphique pour des visuels de marque cohérents. Un esprit analytique doté d’une vision artistique pour des campagnes marketing percutantes.',
  },
  nav: {
    about: 'À propos',
    experience: 'Expérience',
    contacts: 'Contacts',
    cv: 'Voir le CV',
    menu: 'Menu',
    close: 'Fermer',
    langLabel: 'Langue',
    skip: 'Aller au contenu',
    top: 'Haut de page',
  },
  hero: {
    first: 'Ihor',
    last: 'Isychenko',
    role: 'Marketing | Communication | Design graphique',
    write: 'M’écrire',
    follow: 'Suivez-moi',
    ring: 'Travaillons ensemble! ',
  },
  bio: {
    ...en.bio,
    title: 'Biographie',
    lead: 'Bonjour! Je suis Ihor Isychenko, expert en communication visuelle et en marketing',
    leadRest:
      ', passionné par l’art de donner vie aux idées grâce au design, au contenu et au storytelling digital. Mon expérience en design graphique, en gestion des réseaux sociaux et en marketing m’a permis de développer un sens aigu de la communication visuelle, de l’image de marque et de l’engagement du public.',
    paragraphs: [
      'J’aime collaborer avec différents professionnels de la création – designers, marketeurs et créateurs de contenu – pour transformer des concepts en réalisations concrètes et porteuses de sens. Qu’il s’agisse d’identité de marque, de contenus pour les réseaux sociaux ou de stratégie digitale, je m’efforce de rendre chaque projet à la fois visuellement captivant et stratégiquement réfléchi.',
      'Pour moi, un excellent design et une bonne communication consistent à créer des liens, raconter des histoires et susciter des émotions qui laissent une impression durable, tout en atteignant chaque objectif marketing.',
    ],
    personalTitle: 'Informations personnelles',
    skillsTitle: 'Compétences clés',
    labels: { name: 'Nom', email: 'E-mail', city: 'Ville' },
    region: '(région de Donetsk, Ukraine)',
    skills: [
      'Design graphique;',
      'Illustration;',
      'Typographie;',
      'Communication visuelle;',
      'Théorie des couleurs;',
      'Gestion de projet;',
      'Planification stratégique;',
      'Gestion de marque;',
      'Marketing sur les réseaux sociaux;',
      'Marketing digital;',
      'Indicateurs de performance et KPI;',
      'Présentation et communication.',
    ],
    tools: en.bio.tools,
  },
  numbers: {
    titleBold: 'L’expertise',
    titleRest: 'en chiffres',
    text: 'Mon approche allie stratégie et créativité pour aider les marques à se démarquer dans le paysage numérique actuel. Chaque chiffre reflète une valeur réelle apportée aux clients qui ont fait confiance à ma vision.',
    items: [
      { value: 3, suffix: '', head: 'domaines d’activité', label: 'marketing, design graphique, SMM' },
      { value: 9, suffix: '+', head: 'ans d’expérience', label: 'dans la mise en œuvre de solutions efficaces' },
      { value: 35, suffix: '+', head: '', label: 'projets livrés dans les délais avec succès' },
      { value: 400, suffix: '+', head: '', label: 'concepts de communication visuelle créés' },
    ],
  },
  experience: {
    title: 'Expérience professionnelle',
    details: '[DÉTAILS]',
    workExp: 'Expérience professionnelle',
    items: [
      exp(0, {
        company: 'Institut de l’information de masse',
        role: 'Responsable de la communication visuelle',
        period: 'Mars 2025 - Aujourd’hui',
        body: [
          'J’étais chargé de concevoir et de gérer la communication visuelle sur les réseaux sociaux, le site web de l’organisation et les supports imprimés. Mon travail comprenait la création de visuels statiques, d’infographies, d’illustrations, de courtes vidéos sous-titrées, ainsi que la rédaction de contenus pour le site. Je veillais à la cohérence de tous les canaux, numériques comme hors ligne.',
          'J’ai également créé, géré et développé la page LinkedIn officielle de l’organisation, en définissant son style visuel, la structure de ses contenus et son approche de communication afin de renforcer sa présence professionnelle.',
          'En tant que designer principal de «Mediabaza», un réseau national de 15 hubs médiatiques régionaux soutenant les journalistes indépendants en temps de guerre, j’ai coordonné les standards visuels de l’ensemble des hubs: supervision des créations proposées par les chargés de communication, validation des supports et maintien d’une identité visuelle unifiée sur tout le réseau.',
        ],
      }),
      exp(
        1,
        {
          company: 'ONG «Make Sense»',
          role: 'Directeur marketing (CMO)',
          period: 'Févr. 2024 - Févr. 2025',
          place: 'Tchernivtsi, Ukraine',
          body: [
            'J’ai élaboré et mis en œuvre des stratégies globales de promotion des produits et services médiatiques. J’étais responsable de construire et de faire vivre la marque dans l’environnement médiatique, notamment en créant et en coordonnant des campagnes sur différentes plateformes.',
            'Mon rôle consistait à analyser le marché des médias, étudier la concurrence et comprendre les tendances du secteur afin de bâtir des stratégies de communication efficaces. Je pilotais aussi la création de contenus pour les plateformes médiatiques – sites d’actualité, réseaux sociaux et blogs – en veillant à ce que l’information soit pertinente, engageante et conforme aux standards de la marque.',
            'Par ailleurs, je suivais les résultats des campagnes, analysais l’efficacité des différents canaux et ajustais les stratégies en fonction des données recueillies pour obtenir les meilleurs résultats.',
          ],
        },
        {
          org: 'ONG «Make Sense»',
          blocks: [
            {
              li: [
                'Élaboration et mise en œuvre de la stratégie marketing et de communication (une stratégie globale pour les trois pôles – Médias, Hubs, Académie – alignée sur les objectifs de l’organisation).',
                'Collaboration avec le service communication (coordination des efforts pour garantir une communication cohérente et atteindre les objectifs stratégiques).',
                'Gestion de campagnes publicitaires sur Meta et Google Ads (ciblage des annonces, optimisation des budgets publicitaires).',
                'Gestion des réseaux sociaux (Facebook, Instagram, LinkedIn) et SMM (participation à l’élaboration du plan de contenu, analyse de l’efficacité et ajustement de la stratégie).',
                'Collaboration avec les bailleurs Internews, Chemonics International, NDI, Irex, Prague Civil Society Centre (élaboration de stratégies visuelles et marketing innovantes, préparation rigoureuse des rapports, collecte et analyse des données, préparation des publications, respect des exigences de branding et de communication des bailleurs).',
                'Coordination avec les responsables de départements (communication et promotion des projets clés).',
                'Création d’une charte graphique et d’un design unique pour l’ONG (logo, palette de couleurs, typographies, éléments de style et règles d’usage; une identité visuelle harmonieuse et reconnaissable reflétant la mission et les valeurs de l’organisation).',
                'Conception et production de supports marketing (supervision de brochures, présentations, bannières; collaboration avec les designers).',
                'Conception et maintenance de landing pages et de sites web (création de pages attractives sur des plateformes comme Weblium et Webflow).',
                'Suivi et analyse des performances des contenus (outils d’analyse comme Meta Business Suite et Google Analytics).',
              ],
            },
          ],
        }
      ),
      exp(
        2,
        {
          company: 'ONG «Make Sense»',
          role: 'Responsable marketing et designer graphique',
          period: 'Oct. 2023 - Févr. 2024',
          place: 'Tchernivtsi, Ukraine',
          body: [
            'En tant que responsable marketing, j’ai élaboré et mis en œuvre des stratégies de promotion de la marque, analysé le marché et la concurrence, créé des plans de contenu et proposé de nouvelles idées pour renforcer l’efficacité de la communication.',
            'En tant que designer graphique, j’ai créé des contenus visuels alignés sur les objectifs marketing et renforçant la stratégie de marque: illustrations, affiches pour des articles d’actualité, couvertures et icônes, ainsi que des visuels pour les réseaux sociaux.',
          ],
        },
        {
          org: 'ONG «Make Sense»',
          blocks: [
            {
              li: [
                'Élaboration et mise en œuvre d’une stratégie marketing pour les trois pôles de l’organisation (Médias, Hubs, Académie).',
                'Création d’un style visuel unifié pour l’organisation, adaptable à chaque pôle.',
                'Conception et production de supports marketing (brochures, présentations, bannières) pour tous les projets et initiatives.',
                'Gestion de la présence de l’organisation sur les réseaux sociaux et élaboration d’un plan de contenu couvrant les activités de tous les pôles.',
                'Collaboration avec les bailleurs: préparation des rapports, collecte de statistiques, mise en forme visuelle des supports, publication sur les réseaux sociaux et respect des exigences de branding.',
                'Coordination avec les responsables de départements pour une communication et une promotion efficaces de leurs projets.',
                'Soutien visuel aux campagnes de collecte de fonds et aux événements.',
              ],
            },
          ],
        }
      ),
      exp(
        3,
        {
          company: 'Site de la ville de Tchernivtsi 0372.ua',
          role: 'Designer graphique et community manager',
          period: 'Août 2022 - Févr. 2024',
          place: 'Tchernivtsi, Ukraine',
          body: [
            'J’étais chargé de créer et de gérer les contenus des réseaux sociaux, en développant des stratégies pour engager l’audience et accroître la visibilité de la marque: planification et publication des posts, suivi des retours des utilisateurs et analyse des résultats des campagnes pour en maximiser l’efficacité.',
            'Je créais également des contenus visuels adaptés aux plateformes sociales et alignés sur la stratégie marketing globale, notamment des visuels de posts et des bannières publicitaires.',
          ],
        },
        {
          blocks: [
            {
              li: [
                'Construction de la nouvelle identité visuelle du média dans l’espace numérique (concepts graphiques, style de marque pour les plateformes en ligne).',
                'Création et gestion de contenus pour Facebook, Instagram et Telegram (adaptation des contenus journalistiques aux réseaux sociaux).',
                'Élaboration de la stratégie de communication digitale (canaux clés, calendrier éditorial, KPI).',
                'Data visualisation et infographies (transformer des informations complexes en supports visuels compréhensibles).',
                'Optimisation de la présence de la marque sur les différentes plateformes (adaptation du design et du contenu à chaque réseau).',
                'Engagement de l’audience (discussions, sondages, événements en ligne).',
                'Suivi et analyse de l’efficacité des contenus (outils d’analyse, recommandations pour améliorer la stratégie).',
                'Suivi et analyse des performances des contenus (Meta Business Suite et Google Analytics).',
                'Coordination avec la rédaction (alignement de la communication visuelle sur la ligne éditoriale, participation à la planification des contenus).',
              ],
            },
          ],
        }
      ),
      exp(
        4,
        {
          company: 'Site de la ville de Sloviansk 6262.com.ua',
          role: 'Designer médias numériques et SMM',
          period: 'Août 2019 - Févr. 2024',
          body: [
            'Je créais des visuels pour les articles d’actualité et pour les réseaux sociaux d’un site d’information, afin d’offrir au public des contenus attrayants et pertinents.',
            'Je gérais aussi la publication des contenus, collectais les statistiques et réalisais des analyses pour mesurer l’efficacité de nos supports et ajuster la stratégie si nécessaire.',
            'J’élaborais enfin des plans de contenu et mettais en œuvre de nouvelles idées pour maintenir un fort engagement des utilisateurs et améliorer la communication visuelle de la marque.',
          ],
        },
        {
          blocks: [
            { h: 'Responsable marketing des réseaux sociaux:' },
            {
              li: [
                'Élaboration et mise en œuvre de la stratégie de présence du média sur les réseaux sociaux (public cible, choix des plateformes, planification des contenus).',
                'Création et gestion des contenus sur Facebook, Instagram et Telegram (adaptation des contenus éditoriaux, contenus originaux, éléments visuels).',
                'Animation des communautés (modération des commentaires, réponses aux questions, interaction avec l’audience).',
                'Analyse des performances et reporting (indicateurs clés, taux d’engagement, rapports réguliers).',
                'Veille sur les tendances et innovations des réseaux sociaux (nouveaux formats, nouvelles plateformes).',
                'Relations avec les bailleurs et donateurs (contenus dédiés aux projets financés, supports de reporting pour les réseaux sociaux, visibilité des donateurs, respect de leurs exigences de branding et de communication).',
                'Collaboration avec les autres services (rédaction, commercial) pour aligner contenus et campagnes.',
                'Gestion de crise sur les réseaux sociaux (stratégies de réponse aux situations négatives, gestion de la réputation de la marque).',
              ],
            },
            { h: 'Designer médias numériques:' },
            {
              li: [
                'Création de contenus visuels (éléments graphiques pour sites web, réseaux sociaux et autres plateformes; bannières, infographies, illustrations; montage vidéo et animation de base).',
                'Adaptation du design (optimisation des visuels pour tous les appareils et pour chaque réseau social).',
                'Design print (flyers, brochures, citylights, cartes de visite, stickers; motifs pour t-shirts et sacs).',
                'Branding (entretien et développement de l’identité visuelle; modèles pour les publications régulières).',
                'Travail d’équipe (avec rédacteurs, journalistes et marketeurs; traduction des idées créatives en solutions visuelles).',
                'Projets financés (styles visuels pour la durée des projets, visuels pour les articles et posts).',
                'Analyse et optimisation continues (performances des contenus Facebook et Instagram via Meta Business Suite, et du site via Google Analytics).',
              ],
            },
          ],
        }
      ),
      exp(
        5,
        {
          role: 'Designer graphique',
          period: 'Janv. 2018 - Avr. 2019',
          body: [
            'J’y réalisais des illustrations en 2D, notamment pour des livres pour enfants. Je concevais non seulement les illustrations elles-mêmes, mais aussi les couvertures de ces livres.',
            'Je m’occupais également de la mise en page des livres pour enfants sous Adobe InDesign, ainsi que de la création de cartes de visite, de flyers et d’autres supports imprimés.',
          ],
        },
        {
          blocks: [
            {
              li: [
                'Création d’illustrations vectorielles 2D pour des livres pour enfants de différents genres.',
                'Mise en page et design des ouvrages.',
                'Conception de couvertures originales.',
                'Création d’icônes et d’autres éléments visuels pour le site et les réseaux sociaux de l’éditeur.',
                'Conception et préparation de supports imprimés: cartes de visite, brochures et flyers.',
              ],
            },
          ],
        }
      ),
      exp(
        6,
        {
          role: 'Illustrateur',
          period: 'Juin 2016 - Nov. 2017',
          place: 'Londres, Royaume-Uni',
          body: [
            'Je réalisais des graphismes vectoriels 2D en style flat. Mes principales missions consistaient à concevoir des illustrations et des icônes pour l’entreprise, en créant des illustrations vectorielles originales conformes à son style et à ses standards de marque.',
            'La conception d’icônes était un aspect essentiel de mon travail: elles devaient être simples, facilement reconnaissables et fonctionnelles sur toutes les plateformes. Je veillais à ce que chaque icône exprime clairement sa fonction et reste lisible à toutes les tailles.',
          ],
        },
        {
          blocks: [
            {
              p: 'J’ai commencé ma carrière comme illustrateur freelance, en créant des images vectorielles. J’ai ensuite eu l’occasion de collaborer officiellement avec une école de langues à Londres, où j’étais chargé de:',
            },
            {
              li: [
                'Créer des illustrations et des icônes pour le site web de l’école.',
                'Mettre en page et concevoir des brochures, livrets et autres supports imprimés à partir de mes illustrations.',
                'Concevoir des supports publicitaires, des présentations et d’autres contenus visuels.',
              ],
            },
            {
              p: 'Au cours de notre collaboration, j’ai considérablement accru la notoriété de l’école et porté sa communication visuelle à un nouveau niveau.',
            },
          ],
        }
      ),
    ],
  },
  band: { label: 'Projets et partenaires' },
  testimonials: {
    title: 'Ce qu’en disent mes collègues',
    kicker: 'Recommandations',
    source: 'Recommandation sur LinkedIn',
    items: [],
  },
  dino: {
    connect: 'Me contacter',
    title: 'Donner vie aux visions marketing grâce à un design remarquable. Restons en contact!',
    text: 'Je transforme des concepts marketing abstraits en créations visuelles qui captivent et convertissent.',
    pill: 'Jurassic marketer',
  },
  media: {
    title: ['Actualités', '&', 'Nouvelles'],
    kicker: 'Les médias parlent de moi',
    items: [
      { ...en.media.items[0], title: 'Comment travailler efficacement avec Instagram, Facebook et Telegram' },
      { ...en.media.items[1], title: 'Tendances des réseaux sociaux en 2025: conseils d’expert pour les médias' },
      {
        ...en.media.items[2],
        title: 'TikTok, YouTube, Instagram & Cie. Quels réseaux sociaux sont populaires chez les jeunes aujourd’hui?',
      },
    ],
  },
  trainings: {
    seeDetails: 'Voir les détails',
    items: [
      {
        ...en.trainings.items[0],
        title: 'Le travail efficace des médias sur les réseaux sociaux',
        text: 'Lors de cette formation, j’ai partagé mes propres méthodes et stratégies éprouvées qui aident les médias à réussir sur les réseaux sociaux.',
      },
      {
        ...en.trainings.items[1],
        title: 'Réseaux sociaux 2025: défis et opportunités pour les médias',
        text: 'Lors de cette formation, j’ai expliqué comment les médias peuvent s’adapter aux nouvelles tendances et aux algorithmes, et tirer parti des opportunités des réseaux sociaux en 2025.',
      },
    ],
  },
  pages: {
    'effective-media-social': {
      ...en.pages['effective-media-social'],
      metaTitle: 'Méthodes efficaces pour les médias sur les réseaux sociaux — Ihor Isychenko',
      title: 'Méthodes efficaces de travail des médias sur les réseaux sociaux',
      subtitle: 'Ma formation pour les médias: conseils clés pour bien utiliser les réseaux sociaux',
      lead: [
        'Découvrez les enseignements clés de la formation en ligne que j’ai animée sur les stratégies médiatiques efficaces pour 2025.',
        'Formats populaires, conseils pour engager l’audience et tendances propres à chaque plateforme: de quoi renforcer votre présence médiatique.',
      ],
      body: [
        'J’ai récemment eu l’occasion d’animer une formation en ligne intitulée <strong>«Méthodes efficaces de travail des médias sur les réseaux sociaux»</strong>, organisée par le hub régional de l’Institut de l’information de masse, «MediaBase Tchernihiv». Nous y avons exploré les tendances et les outils qui façonnent les stratégies sur les réseaux sociaux en 2025.',
        'L’accent a été mis sur l’évolution de plateformes comme Instagram et Facebook. Sur Instagram, les formats interactifs comme les Reels, les Stories et les carrousels gagnent du terrain. J’ai souligné l’importance des contenus «en temps réel», comme les publications générées par les utilisateurs et les mises à jour en direct, qui favorisent un engagement plus profond. De même, sur Facebook, les vidéos sous-titrées, les stories et les publications textuelles restent de puissants outils pour toucher des publics variés.',
        'Autre point clé de la formation: le rôle de l’interaction avec l’audience. Répondre aux commentaires, organiser des sondages ou intégrer les suggestions des utilisateurs dans la création de contenu renforce considérablement les liens avec la communauté. Telegram continue par ailleurs d’offrir aux médias des opportunités uniques, notamment les messages vocaux et les sessions vidéo en direct, à ne pas négliger.',
        'Si vous cherchez des moyens efficaces d’évoluer dans cet environnement dynamique, je serai ravi de partager mon expertise. Vous trouverez ci-dessous la présentation détaillée de la formation; n’hésitez pas à me contacter via le formulaire pour de futures collaborations.',
      ],
      dateline: 'Tchernihiv, 28 novembre 2024',
    },
    'work-with-social-media': {
      ...en.pages['work-with-social-media'],
      metaTitle: 'Les médias et les réseaux sociaux en 2025 — Ihor Isychenko',
      title: 'Comment les médias peuvent travailler avec les réseaux sociaux: défis et opportunités en 2025',
      kicker: 'Pourquoi est-il important de suivre les tendances comme la vidéo et les stratégies d’engagement?',
      subtitle: 'Conseils pour travailler efficacement avec Instagram, Facebook et Telegram en 2025',
      lead: [
        'Lors d’une formation en ligne destinée aux professionnels des médias, j’ai partagé des stratégies actuelles pour travailler avec les grands réseaux sociaux et gagner en efficacité et en engagement: nouveaux formats de contenu et fonctionnement des algorithmes.',
      ],
      body: [
        'En 2025, les réseaux sociaux restent un outil essentiel pour les médias: une source clé de trafic, de retours et de dialogue avec le public. Lors d’une formation en ligne que j’ai animée pour «Mediabaza Tchernivtsi», hub régional de l’Institut de l’information de masse, j’ai partagé des conseils pour utiliser efficacement Instagram, Facebook et Telegram.',
        'L’un des points clés abordés était le rôle de la vidéo. La tendance 2025, ce sont les vidéos courtes et dynamiques: Instagram continuera de promouvoir les Reels, tandis que Facebook mettra davantage l’accent sur les vidéos sous-titrées. Il est essentiel de s’adapter, car les plateformes affinent sans cesse leurs algorithmes, et ceux qui ne suivent pas seront distancés.',
        'Pour obtenir les meilleurs résultats, il faut adopter des approches stratégiques: interagir activement avec les abonnés via les commentaires et les messages, et utiliser les nouveaux outils des plateformes. Par exemple, sur Facebook, mieux vaut éviter les liens externes dans les publications pour ne pas réduire la portée; sur Telegram, des récapitulatifs hebdomadaires de l’actualité aident à maintenir l’intérêt du public.',
      ],
      dateline: 'Tchernivtsi, 11 octobre 2024',
    },
  },
  page: { press: 'Communiqué de presse', presentation: 'Présentation' },
  collab: {
    title: 'Je suis toujours ouvert à de nouveaux partenariats et collaborations.',
    text: 'Si vous recherchez un spécialiste expérimenté de la création de contenu et de la promotion sur les réseaux sociaux, je suis prêt à discuter de vos projets. Mon objectif: vous aider à atteindre de nouveaux sommets grâce à des stratégies efficaces et des solutions créatives.',
    advTitle: '3 avantages de travailler avec moi:',
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
    popupTitle: 'Restons en contact!',
    popupText: 'Contactez Ihor Isychenko – votre expert de confiance en marketing et en design, prêt à donner vie à vos idées.',
    pageTitle: 'Travaillons ensemble',
    name: 'Votre nom*',
    phone: 'Numéro de téléphone',
    email: 'Votre e-mail*',
    message: 'Votre message*',
    send: 'Envoyer',
    sending: 'Envoi…',
    okTitle: 'Merci!',
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
  },
};
