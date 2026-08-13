export interface StateHeritage {
  id: string;
  name: string;
  tagline: string;
  heroImage: string;
  secondaryImages: string[];
  description: string;
  historicalHighlights: { title: string; period: string; text: string }[];
  architecture: { title: string; desc: string }[];
  cultureAndArts: { title: string; desc: string }[];
  festivals: { title: string; desc: string }[];
  famousPersonalities: { name: string; role: string; desc: string }[];
  cuisineAndCrafts: { title: string; desc: string }[];
  timeline: { year: string; event: string }[];
}

export const STATE_HERITAGE_MAP: Record<string, StateHeritage> = {
  karnataka: {
    id: "karnataka",
    name: "Karnataka",
    tagline: "Cradle of Stone Architecture, Hoysala Masterpieces & Imperial Dynasties",
    heroImage: "/src/assets/culture4.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture1.jpg"],
    description: "From the megalithic iron age sites and Satavahana capitals to the magnificent empire of Vijayanagara at Hampi and the intricate star-shaped temples of the Hoysalas, Karnataka is an open-air museum of stone poetry and intellectual tradition.",
    historicalHighlights: [
      { title: "The Vijayanagara Empire", period: "1336 – 1565 CE", text: "Hampi stood as one of the largest, wealthiest and most refined cities in the medieval world, famed for diamond trade and towering stone chariot shrines." },
      { title: "Hoysala Temple Art", period: "10th – 14th Century", text: "Temples at Belur and Halebidu feature soapstone carvings of astonishing microscopic detail, carved by master sculptors like Amarashilpi Jakanachari." },
      { title: "Chalukya Dynasty of Badami", period: "6th – 8th Century", text: "Pioneered rock-cut cave architecture at Badami, Aihole, and Pattadakal, blending Northern Nagara and Southern Dravidian styles." }
    ],
    architecture: [
      { title: "Virupaksha Temple, Hampi", desc: "A towering 9th-century sanctuary that remained an active place of worship through the fall of the empire." },
      { title: "Chennakesava Temple, Belur", desc: "Exquisite bracket figures (Madanakai) and lathe-turned pillars embodying the zenith of Hoysala craftsmanship." },
      { title: "Mysore Palace", desc: "A breathtaking synthesis of Indo-Saracenic, Hindu, Muslim, and Gothic revival styles illuminated by 100,000 incandescent lamps." }
    ],
    cultureAndArts: [
      { title: "Yakshagana", desc: "A classical theatre art form combining dance, music, elaborate costume, and extemporaneous mythological dialogue." },
      { title: "Carnatic Music & Mysore Painting", desc: "A legendary musical heritage nurtured in royal courts, alongside delicate gold-leaf Mysore paintings." }
    ],
    festivals: [
      { title: "Mysore Dasara", desc: "A 10-day grand Nada Habba (state festival) celebrating the victory of good over evil with royal processions and caparisoned elephants." },
      { title: "Hampi Utsav", desc: "A cultural extravaganza celebrating the ruins of Vijayanagara with dance, light, and music against ancient boulders." }
    ],
    famousPersonalities: [
      { name: "Basaveshwara", role: "12th Century Philosopher", desc: "Social reformer who pioneered the Lingayat movement and founded the Anubhava Mantapa, an early parliament of spiritual debate." },
      { name: "Krishnadevaraya", role: "Emperor of Vijayanagara", desc: "Famed poet-king under whose rule literature, art, and irrigation engineering reached their golden zenith." }
    ],
    cuisineAndCrafts: [
      { title: "Mysore Pak & Bisi Bele Bath", desc: "Culinary masterpieces blending rich ghee, lentils, spices, and fragrant rice." },
      { title: "Channapatna Toys & Ilkal Sarees", desc: "Centuries-old lacquerware wooden toy craft and traditional handloom weaving." }
    ],
    timeline: [
      { year: "3rd Century BCE", event: "Maurya Empire reaches southern Karnataka; Ashokan edicts carved at Siddapur." },
      { year: "345 – 1345 CE", event: "Reign of Kadambas, Gangas, Chalukyas, and Hoysalas shaping classical temple towns." },
      { year: "1336 CE", event: "Foundation of Vijayanagara Empire by Harihara and Bukka." },
      { year: "1956 CE", event: "Formation of Mysore State (later renamed Karnataka) uniting Kannada-speaking regions." }
    ]
  },
  rajasthan: {
    id: "rajasthan",
    name: "Rajasthan",
    tagline: "Land of Forts, Rajput Valor, Desert Horizons & Eternal Ballads",
    heroImage: "/src/assets/archive.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/culture3.jpg", "/src/assets/culture2.jpg"],
    description: "A breathtaking tapestry of colossal hill forts rising from arid sands, painted Havelis, mirror-inlaid palaces, and a martial code of honor that echoes through centuries of bardic poetry.",
    historicalHighlights: [
      { title: "The Hill Forts of Rajasthan", period: "8th – 18th Century", text: "UNESCO World Heritage complexes including Chittorgarh, Kumbhalgarh, and Jaisalmer demonstrating advanced medieval military fortification." },
      { title: "Rajputana Princely States", period: "Medieval Era", text: "Independent clans of Mewar, Marwar, and Amber maintaining fierce sovereignty and patronizing miniature painting." }
    ],
    architecture: [
      { title: "Mehrangarh Fort, Jodhpur", desc: "A massive citadel towering 410 feet above the blue city, featuring impregnable gates and exquisite palaces." },
      { title: "Amber Fort & Palace", desc: "A stunning fusion of Hindu and Mughal architecture overlooking Maota Lake." },
      { title: "Hawa Mahal, Jaipur", desc: "The Palace of Winds, featuring 953 intricate jharokhas designed for royal women to observe street festivities." }
    ],
    cultureAndArts: [
      { title: "Kalbelia & Ghoomar", desc: "Enchanting folk dances celebrating desert nomad heritage and royal celebratory rituals." },
      { title: "Phad Painting & Miniature Art", desc: "Scroll paintings narrating folk deities like Pabuji and devotional epics." }
    ],
    festivals: [
      { title: "Pushkar Camel Fair", desc: "One of the world's largest cattle fairs combined with spiritual ritual and folk music." },
      { title: "Desert Festival, Jaisalmer", desc: "A celebration of Thar culture amidst the golden dunes of Sam." }
    ],
    famousPersonalities: [
      { name: "Maharana Pratap", role: "King of Mewar", desc: "Legendary monarch famed for his uncompromising resistance against Mughal expansion at the Battle of Haldighati." },
      { name: "Meera Bai", role: "Mystic Poet", desc: "16th-century royal princess whose devotional bhajans dedicated to Lord Krishna transcended feudal barriers." }
    ],
    cuisineAndCrafts: [
      { title: "Dal Baati Churma & Laal Maas", desc: "Hearty, slow-cooked royal delicacies packed with desert spices and clarified butter." },
      { title: "Block Printing & Blue Pottery", desc: "World-renowned textile printing crafts of Sanganer and Jaipur." }
    ],
    timeline: [
      { year: "728 CE", event: "Establishment of the Mewar dynasty by Bappa Rawal." },
      { year: "1576 CE", event: "The Battle of Haldighati between Maharana Pratap and Mughal forces." },
      { year: "1727 CE", event: "Foundation of Jaipur, India's first planned grid-iron city, by Sawai Jai Singh II." },
      { year: "1949 CE", event: "Integration of princely states to form the modern state of Rajasthan." }
    ]
  },
  "uttar-pradesh": {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    tagline: "Heartland of Ancient Empires, Awadh Poetry & Sacred River Ghats",
    heroImage: "/src/assets/hero.jpg",
    secondaryImages: ["/src/assets/culture1.jpg", "/src/assets/archive.jpg", "/src/assets/culture4.jpg"],
    description: "The cradle of Indian civilization where the Ganges and Yamuna meet, giving birth to Vedic hymns, Buddhist sermons at Sarnath, Mughal architectural marvels, and the refined court culture of Awadh.",
    historicalHighlights: [
      { title: "The Mauryan & Gupta Golden Age", period: "4th Century BCE – 6th Century CE", text: "Center of imperial power, Sanskrit literature, and metallurgical wonders such as the Iron Pillar of Delhi/Mathura." },
      { title: "Awadh Courtly Culture", period: "18th – 19th Century", text: "Lucknow emerged as the pinnacle of refined Urdu poetry, Kathak dance, cuisine, and Ganga-Jamuni tehzeeb." }
    ],
    architecture: [
      { title: "Taj Mahal, Agra", desc: "The universally celebrated masterpiece of Mughal symmetry, white marble inlay, and eternal love." },
      { title: "Sarnath Dhamek Stupa", desc: "Marking the sacred site where the Buddha delivered his first discourse after enlightenment." },
      { title: "Varanasi Ghats", desc: "An unbroken crescent of stone steps along the Ganges alive with morning rituals and evening Aarti." }
    ],
    cultureAndArts: [
      { title: "Kathak", desc: "Classical dance originating from temple storytellers, refined in the courts of Lucknow and Jaipur." },
      { title: "Banarasi Silk Weaving", desc: "Legendary brocade textiles woven with pure gold and silver threads." }
    ],
    festivals: [
      { title: "Deepotsav, Ayodhya", desc: "Illumination of hundreds of thousands of earthen lamps along the Saryu riverbanks." },
      { title: "Kumbh Mela, Prayagraj", desc: "The largest peaceful gathering of humanity on earth at the confluence of holy rivers." }
    ],
    famousPersonalities: [
      { name: "Tulsidas", role: "Poet-Saint", desc: "Author of the Ramcharitmanas, bringing the epic saga to the common people in Awadhi." },
      { name: "Rani Lakshmibai", role: "Queen of Jhansi", desc: "Iconic heroine of the 1st War of Indian Independence (1857)." }
    ],
    cuisineAndCrafts: [
      { title: "Awadhi Galouti Kebab & Tunday", desc: "Meltingly soft culinary creations born in the royal kitchens of the Nawabs." },
      { title: "Zardozi Embroidery & Chikankari", desc: "Exquisite white-on-white shadow needlework and metallic gold thread embroidery." }
    ],
    timeline: [
      { year: "528 BCE", event: "Buddha preaches his first sermon at Sarnath (Deer Park)." },
      { year: "1632 CE", event: "Construction of the Taj Mahal begins under Shah Jahan in Agra." },
      { year: "1857 CE", event: "The Uprising erupts in Meerut, spreading across Awadh and Bundelkhand." },
      { year: "1950 CE", event: "United Provinces renamed Uttar Pradesh." }
    ]
  },
  "west-bengal": {
    id: "west-bengal",
    name: "West Bengal",
    tagline: "Land of Literary Giants, Terracotta Temples & Revolutionary Awakening",
    heroImage: "/src/assets/culture1.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/ff2.jpg"],
    description: "A vibrant cultural powerhouse where folk baul music meets Nobel laureate literature, terracotta temple villages, colonial architectural grandeur, and the intellectual fervor of the Bengal Renaissance.",
    historicalHighlights: [
      { title: "The Bengal Renaissance", period: "19th – Early 20th Century", text: "A profound socio-religious and intellectual movement spearheaded by figures like Raja Ram Mohan Roy and Rabindranath Tagore." },
      { title: "Terracotta Temples of Bishnupur", period: "17th – 18th Century", text: "Malla dynasty temples built entirely of carved red clay bricks depicting epic narratives." }
    ],
    architecture: [
      { title: "Victoria Memorial, Kolkata", desc: "A magnificent white marble monument combining British and Mughal architectural motifs." },
      { title: "Shantipur & Bishnupur Temples", desc: "Exquisite curved-roof (Chala) shrines adorned with intricate terracotta panels." }
    ],
    cultureAndArts: [
      { title: "Baul Music", desc: "Mystic minstrels singing songs of spiritual awakening while roaming rural Bengal with a single-string ektara." },
      { title: "Durga Puja", desc: "An UNESCO Intangible Cultural Heritage festival transforming neighborhoods into immersive art galleries." }
    ],
    festivals: [
      { title: "Durga Puja", desc: "The grand autumnal celebration of art, community devotion, and cultural homecoming." },
      { title: "Poila Boishakh", desc: "The Bengali New Year celebrated with traditional hal khata ledger blessings and sweets." }
    ],
    famousPersonalities: [
      { name: "Rabindranath Tagore", role: "Polymath & Poet", desc: "First non-European Nobel laureate in Literature and author of national anthems for India and Bangladesh." },
      { name: "Netaji Subhash Chandra Bose", role: "Freedom Fighter", desc: "Supreme Commander of the Indian National Army (INA) and apostle of radical freedom." }
    ],
    cuisineAndCrafts: [
      { title: "Roshogolla & Machher Jhol", desc: "Iconic spongy cottage cheese sweets in syrup and comforting mustard fish curry." },
      { title: "Kantha Embroidery & Sholapith", desc: "Running-stitch quilt artistry and delicate pith-craft sculptures." }
    ],
    timeline: [
      { year: "1690 CE", event: "Job Charnock founds Calcutta as an English trading post." },
      { year: "1861 CE", event: "Birth of Rabindranath Tagore in Jorasanko, Calcutta." },
      { year: "1905 CE", event: "Partition of Bengal sparks the Swadeshi national movement." },
      { year: "1947 CE", event: "Independence and partition of Bengal, creating West Bengal within India." }
    ]
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra",
    tagline: "Empire of Sahyadri Caves, Maratha Forts & Cinematic Dreams",
    heroImage: "/src/assets/culture3.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture2.jpg"],
    description: "Carved out of volcanic basalt cliffs and sweeping coastal Konkan shores, Maharashtra bridges ancient rock-cut Buddhist and Hindu cave wonders with the formidable hill fort network of Chhatrapati Shivaji Maharaj.",
    historicalHighlights: [
      { title: "Rock-Cut Masterpieces", period: "2nd Century BCE – 10th Century CE", text: "Monolithic marvels of Ajanta, Ellora (Kailasa Temple), and Elephanta carved by hand out of solid rock face." },
      { title: "The Maratha Empire", period: "17th – 19th Century", text: "Founded by Shivaji Maharaj, establishing Swaraj and naval supremacy along the western coast." }
    ],
    architecture: [
      { title: "Ellora Kailasa Temple", desc: "The largest monolithic rock excavation in the world, carved top-down from a single cliff." },
      { title: "Gateway of India, Mumbai", desc: "An iconic basalt arch commemorating the royal landing of King George V." },
      { title: "Raigad & Sinhagad Forts", desc: "Formidable mountain strongholds that served as the capital and bastion of Maratha power." }
    ],
    cultureAndArts: [
      { title: "Lavani & Povada", desc: "Vibrant traditional dance forms characterized by rhythmic footwork and historical ballad narration." },
      { title: "Warli Painting", desc: "Aboriginal geometric tribal art depicting nature, harvest, and community circles." }
    ],
    festivals: [
      { title: "Ganeshotsav", desc: "The monumental public festival of Lord Ganesha popularized by Lokmanya Tilak to unite freedom fighters." },
      { title: "Gudi Padwa", desc: "The Maharashtrian New Year marking spring harvest and new beginnings." }
    ],
    famousPersonalities: [
      { name: "Chhatrapati Shivaji Maharaj", role: "Founder of Maratha Swaraj", desc: "Visionary military strategist and benevolent ruler who established a progressive administrative state." },
      { name: "Dr. B.R. Ambedkar", role: "Architect of the Indian Constitution", desc: "Eminent jurist, social reformer, and champion of human rights." }
    ],
    cuisineAndCrafts: [
      { title: "Puran Poli & Vada Pav", desc: "Beloved sweet flatbreads and iconic street-side culinary innovations." },
      { title: "Paithani Sarees", desc: "Handwoven silk sarees featuring intricate peacock and lotus zari pallus." }
    ],
    timeline: [
      { year: "2nd Century BCE", event: "Excavation of early Buddhist caves at Ajanta and Bhaja begins." },
      { year: "1674 CE", event: "Coronation of Shivaji Maharaj at Raigad Fort as Chhatrapati." },
      { year: "1853 CE", event: "India's first passenger railway runs from Bombay to Thane." },
      { year: "1960 CE", event: "Formation of Maharashtra state with Mumbai as its capital." }
    ]
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat",
    tagline: "Land of Maritime Trade, Stepwells, Salt Deserts & Mahatma Gandhi",
    heroImage: "/src/assets/culture2.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture1.jpg"],
    description: "A legendary peninsula of ancient maritime ports at Lothal, breathtaking subterranean stepwells, glittering salt flats of Kutch, and the birthplace of the apostle of non-violence, Mahatma Gandhi.",
    historicalHighlights: [
      { title: "Indus Valley Civilization Ports", period: "3300 – 1300 BCE", text: "Lothal possessed the world's earliest known tidal dockyard, engaging in international maritime trade with Mesopotamia." },
      { title: "Solanki Golden Age", period: "10th – 13th Century", text: "Patronized exquisite temple architecture like the Sun Temple at Modhera and Rani ki Vav." }
    ],
    architecture: [
      { title: "Rani ki Vav, Patan", desc: "An inverted subterranean temple and stepwell adorned with over 500 principal sculptures." },
      { title: "Sun Temple, Modhera", desc: "Designed so the equinox sun illuminates the inner sanctum directly without artificial light." }
    ],
    cultureAndArts: [
      { title: "Garba & Dandiya Raas", desc: "Energetic circular devotional dances performed during Navratri honoring the divine feminine." },
      { title: "Patola Weaving", desc: "Double ikat silk sari weaving technique taking months of meticulous dyed-warp precision." }
    ],
    festivals: [
      { title: "Uttarayan (International Kite Festival)", desc: "Skies filled with millions of colorful kites celebrating the transition of the sun into Makara Rashi." },
      { title: "Rann Utsav", desc: "A celebration of white salt desert moonlight, folk music, and Kutch artisan crafts." }
    ],
    famousPersonalities: [
      { name: "Mahatma Gandhi", role: "Father of the Nation", desc: "Led India to independence through Satyagraha, truth, and non-violent civil disobedience." },
      { name: "Sardar Vallabhbhai Patel", role: "Iron Man of India", desc: "Unified over 560 princely states to forge the modern Republic of India." }
    ],
    cuisineAndCrafts: [
      { title: "Gujarati Thali & Dhokla", desc: "A harmonious balance of sweet, spicy, and tangy vegetarian delicacies." },
      { title: "Kutch Mirror Embroidery", desc: "Vibrant textile needlework embellished with tiny reflective mirrors and beadwork." }
    ],
    timeline: [
      { year: "2500 BCE", event: "Flourishing of Harappan port city at Lothal." },
      { year: "1026 CE", event: "Construction of the Modhera Sun Temple during the Solanki dynasty." },
      { year: "1930 CE", event: "Mahatma Gandhi leads the historic Salt March from Sabarmati to Dandi." },
      { year: "1960 CE", event: "Gujarat bifurcated from Bombay State to form an independent state." }
    ]
  },
  "jammu-and-kashmir": {
    id: "jammu-and-kashmir",
    name: "Jammu & Kashmir",
    tagline: "Paradise on Earth, Sufi Shrines, Ancient Sanskrit Scholarship & Chinar Groves",
    heroImage: "/src/assets/archive.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/culture3.jpg", "/src/assets/culture4.jpg"],
    description: "A legendary Himalayan sanctuary renowned for its snow-capped peaks, pristine lakes, ancient valley temples, peerless Pashmina wool, and centuries of profound philosophical and mystical poetry.",
    historicalHighlights: [
      { title: "Center of Sanskrit Learning", period: "1st – 9th Century CE", text: "Home to the Kashmiri Shaivism philosophy, Panini's grammar commentaries, and Kalhana's Rajatarangini, India's first historical chronicle." },
      { title: "The Silk Road Crossroads", period: "Ancient & Medieval", text: "A vital mountain nexus connecting India with Central Asia, China, and Persia." }
    ],
    architecture: [
      { title: "Martand Sun Temple", desc: "A majestic 8th-century stone temple built on a plateau overlooking the Kashmir valley." },
      { title: "Srinagar Wooden Mosques & Sufi Shrines", desc: "Exquisite multi-tiered timber architecture (Kashmiri traditional building style)." }
    ],
    cultureAndArts: [
      { title: "Sufiana Kalam & Rouf", desc: "Ethereal classical music influenced by Persian maqams and graceful springtime folk dance." },
      { title: "Pashmina & Walnut Woodcarving", desc: "Hand-spun underfleece luxury weaving and intricate walnut woodwork." }
    ],
    festivals: [
      { title: "Hemis Festival", desc: "Celebrating the birth of Guru Padmasambhava with sacred masked monastic dances." },
      { title: "Tulip Festival", desc: "Showcasing millions of blooming tulips against the Zabarwan mountain range." }
    ],
    famousPersonalities: [
      { name: "Lal Ded (Lalleshwari)", role: "Mystic Poet", desc: "14th-century saint whose four-line spiritual sayings (Vakhs) shaped Kashmiri language and ethos." },
      { name: "Kalhana", role: "Historian & Poet", desc: "Author of Rajatarangini (River of Kings), establishing empirical historical writing in ancient India." }
    ],
    cuisineAndCrafts: [
      { title: "Wazwan & Kahwa", desc: "A multi-course master banquet of exquisite meats served with aromatic saffron green tea." },
      { title: "Papier-mâché Craft", desc: "Hand-painted decorative boxes and ornaments crafted from recycled paper pulp and gold leaf." }
    ],
    timeline: [
      { year: "3rd Century BCE", event: "Emperor Ashoka founds the ancient city of Srinagar (Srinagari)." },
      { year: "1148 CE", event: "Kalhana completes the Rajatarangini historical chronicle." },
      { year: "1586 CE", event: "Mughal Emperor Akbar annexes Kashmir, laying out famous gardens like Shalimar." },
      { year: "1947 CE", event: "Accession of Jammu & Kashmir to the Indian Union." }
    ]
  },
  "punjab": {
    id: "punjab",
    name: "Punjab",
    tagline: "Land of Five Rivers, Gurus, Valor, Harvest Rhythms & Unbreakable Spirit",
    heroImage: "/src/assets/culture1.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture2.jpg"],
    description: "The fertile granary of India watered by five sacred rivers, known for the spiritual radiance of Sikh Gurus, epic folk resilience, bhangra rhythms, and legendary hospitality.",
    historicalHighlights: [
      { title: "The Indus Valley Outpost", period: "3300 – 1300 BCE", text: "Excavations at Harappa and Rupnagar revealing a sophisticated Bronze Age urban grid." },
      { title: "The Sikh Empire", period: "1799 – 1849 CE", text: "Forged under Maharaja Ranjit Singh, establishing a sovereign secular empire across the northwest." }
    ],
    architecture: [
      { title: "Sri Harmandir Sahib (Golden Temple), Amritsar", desc: "The holiest Sikh shrine shimmering in the pool of nectar, welcoming all humanity regardless of caste or creed." },
      { title: "Gobindgarh Fort", desc: "A historic military fortification witnessing the rise and defense of Punjab." }
    ],
    cultureAndArts: [
      { title: "Bhangra & Gidha", desc: "Exhilarating folk dances celebrating the joyous harvest and seasonal vitality." },
      { title: "Sufi Qawwali & Tumbi", desc: "Soul-stirring devotional music echoing the verses of Baba Bulleh Shah and Shah Hussain." }
    ],
    festivals: [
      { title: "Baisakhi", desc: "The spring harvest festival marking the formation of the Khalsa by Guru Gobind Singh Ji in 1699." },
      { title: "Lohri", desc: "Winter solstice bonfire festival celebrating fertility, newborn children, and community warmth." }
    ],
    famousPersonalities: [
      { name: "Guru Nanak Dev Ji", role: "Founder of Sikhism", desc: "Spiritual master who preached universal equality, honest work, and remembrance of the Divine." },
      { name: "Maharaja Ranjit Singh", role: "The Sher-e-Punjab", desc: "Benevolent ruler who united Punjab and patronized arts and religious tolerance." }
    ],
    cuisineAndCrafts: [
      { title: "Makki di Roti & Sarson da Saag", desc: "Nutritious mustard greens paired with rustic corn flatbreads and fresh white butter." },
      { title: "Phulkari Embroidery", desc: "Vibrant floral needlework embroidered on handspun khadi cloth." }
    ],
    timeline: [
      { year: "1469 CE", event: "Birth of Guru Nanak Dev Ji, ushering in an era of spiritual equality." },
      { year: "1699 CE", event: "Creation of the Khalsa Panth at Anandpur Sahib by Guru Gobind Singh Ji." },
      { year: "1799 CE", event: "Maharaja Ranjit Singh captures Lahore and establishes the Sikh Empire." },
      { year: "1966 CE", event: "Reorganization of Punjab into the present linguistic state." }
    ]
  },
  "madhya-pradesh": {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    tagline: "Heart of India, Khajuraho Sculptural Wonders & Ancient Tribal Roots",
    heroImage: "/src/assets/culture4.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture3.jpg"],
    description: "Positioned at the geographical heart of the nation, Madhya Pradesh preserves prehistoric rock art at Bhimbetka, the sublime sculptural masterpieces of Khajuraho, and legendary Buddhist stupas at Sanchi.",
    historicalHighlights: [
      { title: "Bhimbetka Prehistoric Rock Shelters", period: "Paleolithic Era", text: "Over 750 rock shelters featuring cave paintings spanning 30,000 years of human expression." },
      { title: "Chandela Dynasty of Khajuraho", period: "10th – 12th Century", text: "Built sandstone temples celebrating human emotion, divine union, music, and celestial dance." }
    ],
    architecture: [
      { title: "Sanchi Great Stupa", desc: "Commissioned by Emperor Ashoka in the 3rd century BCE, featuring magnificent carved toranas." },
      { title: "Khajuraho Group of Monuments", desc: "UNESCO World Heritage temples renowned for nagara architecture and graceful sculpture." },
      { title: "Gwalior Fort", desc: "Described by Babur as 'the pearl among fortresses of Hind'." }
    ],
    cultureAndArts: [
      { title: "Gond & Bhil Tribal Painting", desc: "Intricate dot and line art capturing tribal folklore, sacred trees, and animal spirits." },
      { title: "Maheshwar Chanderi Weaving", desc: "Fine silk and cotton handloom sarees woven on the banks of the Narmada river." }
    ],
    festivals: [
      { title: "Khajuraho Dance Festival", desc: "Classical dance performances set against the illuminated backdrop of medieval temples." },
      { title: "Tansen Music Festival, Gwalior", desc: "Honoring the legendary court musician of Akbar with all-night classical maestro concerts." }
    ],
    famousPersonalities: [
      { name: "Tansen", role: "Musical Maestro", desc: "One of the Navratnas in Akbar's court, credited with creating legendary ragas." },
      { name: "Ahilyabai Holkar", role: "Queen of Indore", desc: "Revered philosopher-queen renowned for temple restorations and philanthropic statecraft." }
    ],
    cuisineAndCrafts: [
      { title: "Poha, Jalebi & Bhutte ka Kees", desc: "Beloved street breakfasts and grated corn delicacies spiced with mustard and green chillies." },
      { title: "Bagh Print & Terracotta Craft", desc: "Natural vegetable dye block printing practiced along the Bagh river." }
    ],
    timeline: [
      { year: "3rd Century BCE", event: "Construction of the Sanchi Stupa under Maurya patronage." },
      { year: "950 – 1050 CE", event: "Construction of the principal temples at Khajuraho by Chandela kings." },
      { year: "18th Century", event: "Holkar dynasty rules from Indore, fostering arts and infrastructure." },
      { year: "1956 CE", event: "Madhya Pradesh established as a state." }
    ]
  },
  assam: {
    id: "assam",
    name: "Assam",
    tagline: "Land of Blue Hills, Red Rivers, Ahom Valour & Golden Muga Silk",
    heroImage: "/src/assets/culture1.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture2.jpg"],
    description: "Framed by the mighty Brahmaputra river and rolling tea gardens, Assam preserves the six-century-long sovereign legacy of the Ahom dynasty, sacred Kamakhya temple traditions, and unmatched wildlife sanctuaries.",
    historicalHighlights: [
      { title: "The Ahom Kingdom", period: "1228 – 1826 CE", text: "Successfully repulsed 17 Mughal invasions, maintaining fierce independence under legendary generals like Lachit Borphukan." },
      { title: "Kamrup & Pragjyotishpur", period: "Ancient Era", text: "An ancient seat of Tantric philosophy and trade mentioned in the Mahabharata." }
    ],
    architecture: [
      { title: "Rang Ghar, Sivasagar", desc: "Asia's oldest surviving amphitheater used by Ahom royalty for buffalo fights and sports." },
      { title: "Kamakhya Temple", desc: "A revered hilltop shakti peeth exemplifying ancient Nilachal architectural styles." }
    ],
    cultureAndArts: [
      { title: "Bihu Dance", desc: "A joyous springtime folk dance celebrating fertility, youth, and agricultural rebirth." },
      { title: "Sattriya Dance", desc: "A classical dance form nurtured in Vaishnavite monastic mathas (Sattras) founded by Srimanta Sankaradeva." }
    ],
    festivals: [
      { title: "Bhogali Bihu", desc: "Harvest festival featuring community feasts around temporary thatched huts (Meji)." },
      { title: "Ambubachi Mela", desc: "An annual fertility festival drawing seekers and ascetics to Kamakhya temple." }
    ],
    famousPersonalities: [
      { name: "Lachit Borphukan", role: "Military Commander", desc: "Legendary Ahom general who defeated Mughal forces at the Battle of Saraighat in 1671." },
      { name: "Srimanta Sankaradeva", role: "Saint & Reformer", desc: "15th-century polymath who unified Assam through the Bhakti movement, art, and drama (Ankia Naat)." }
    ],
    cuisineAndCrafts: [
      { title: "Khar & Masor Tenga", desc: "Traditional alkaline purifying dishes and tangy fish curries flavored with sour mangosteen." },
      { title: "Muga & Pat Silk", desc: "Natural golden silk unique to Assam that becomes glossier with every wash." }
    ],
    timeline: [
      { year: "1228 CE", event: "Sukaphaa enters Assam, establishing the Ahom dynasty." },
      { year: "1671 CE", event: "Battle of Saraighat: Ahom forces triumph over the Mughal navy." },
      { year: "1826 CE", event: "Treaty of Yandabo integrates Assam into British administration." },
      { year: "1947 CE", event: "Assam becomes part of independent India." }
    ]
  },
  telangana: {
    id: "telangana",
    name: "Telangana",
    tagline: "Land of Kakatiya Dynamos, Golconda Diamonds & Perin Dance",
    heroImage: "/src/assets/culture3.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture4.jpg"],
    description: "A storied plateau of colossal granite hill forts, irrigation engineering marvels, legendary diamond markets, and the devotional warmth of Bathukamma floral celebrations.",
    historicalHighlights: [
      { title: "The Kakatiya Dynasty", period: "1163 – 1323 CE", text: "Renowned for constructing massive thousand-pillar temples, intricate toranas, and vast rain-harvesting tank networks." },
      { title: "Qutb Shahi Sultanate", period: "1512 – 1687 CE", text: "Ruled from Golconda fort, turning Hyderabad into a global trading hub for pearls and diamonds." }
    ],
    architecture: [
      { title: "Ramappa Temple", desc: "A UNESCO World Heritage temple featuring floating lightweight bricks and intricate dolerite stone dancing figures." },
      { title: "Golconda Fort & Charminar", desc: "Acoustic engineering marvels and iconic monuments of Indo-Islamic urban planning." }
    ],
    cultureAndArts: [
      { title: "Perin Shivatandavam", desc: "The vigorous 'Dance of Warriors' performed by ancient Kakatiya soldiers as a form of worship." },
      { title: "Nirmal & Cheriyal Scroll Painting", desc: "Traditional wooden toy craft and narrative scroll paintings." }
    ],
    festivals: [
      { title: "Bathukamma", desc: "A vibrant floral festival where women stack seasonal flowers in concentric mounds honoring nature and life." },
      { title: "Bonalu", desc: "An annual goddess festival expressing community gratitude with ritual offerings." }
    ],
    famousPersonalities: [
      { name: "Rani Rudrama Devi", role: "Kakatiya Queen", desc: "One of the few ruling queens in Indian history who defended her kingdom valiantly against external invasions." },
      { name: "Komaram Bheem", role: "Tribal Freedom Fighter", desc: "Gond leader who fought against the Nizam's administration with the cry 'Jal, Jangal, Zameen'." }
    ],
    cuisineAndCrafts: [
      { title: "Hyderabadi Biryani & Haleem", desc: "World-famous slow-cooked culinary masterpieces infused with saffron and authentic spices." },
      { title: "Pochampally Ikat", desc: "Geometric tie-and-dye handloom silk and cotton fabrics." }
    ],
    timeline: [
      { year: "1163 CE", event: "Kakatiya dynasty declares sovereign independence under Rudradeva." },
      { year: "1591 CE", event: "Construction of the Charminar in Hyderabad by Muhammad Quli Qutb Shah." },
      { year: "1946 – 1951 CE", event: "Telangana Peasant Armed Struggle against feudal landlord exploitation." },
      { year: "2014 CE", event: "Telangana becomes India's 29th state." }
    ]
  },
  kerala: {
    id: "kerala",
    name: "Kerala",
    tagline: "God's Own Country, Spice Coast, Kathakali & Ancient Maritime Ports",
    heroImage: "/src/assets/culture2.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture1.jpg"],
    description: "A tropical paradise of emerald backwaters, spice plantations, ancient Muziris port roots, and martial arts that gave birth to Ayurveda and classical theatrical pageantry.",
    historicalHighlights: [
      { title: "The Ancient Spice Trade", period: "Ancient Era", text: "Romans, Greeks, Arabs, and Chinese sailed to Muziris (Kodungallur) trading gold for black pepper and cardamom." },
      { title: "The Chera Dynasty", period: "3rd Century BCE – 12th Century CE", text: "Unified Malayalam-speaking territories and fostered flourishing cultural synthesis." }
    ],
    architecture: [
      { title: "Padmanabhaswamy Temple", desc: "A sacred Dravidian-style shrine renowned for its architectural grandeur and ancient vaults." },
      { title: "Traditional Nalukettu Homes", desc: "Eco-friendly timber and tiled courtyard houses designed for tropical monsoons." }
    ],
    cultureAndArts: [
      { title: "Kathakali & Koodiyattam", desc: "Classical dance-drama and UNESCO-listed Sanskrit theatre featuring striking facial paint and mudras." },
      { title: "Kalaripayattu", desc: "Considered the mother of all martial arts, emphasizing agility, weapon mastery, and holistic conditioning." }
    ],
    festivals: [
      { title: "Onam", desc: "The legendary harvest festival celebrating the homecoming of the benevolent King Mahabali with Pookkalam flower carpets and boat races." },
      { title: "Thrissur Pooram", desc: "The mother of all temple festivals featuring caparisoned elephants and thunderous percussion ensembles." }
    ],
    famousPersonalities: [
      { name: "Adi Shankara", role: "Philosopher & Reformer", desc: "8th-century theologian who consolidated the doctrine of Advaita Vedanta across India." },
      { name: "Raja Ravi Varma", role: "Master Painter", desc: "Pioneered modern Indian art by synthesizing European academic realism with Indian mythological subjects." }
    ],
    cuisineAndCrafts: [
      { title: "Kerala Sadya & Appam with Stew", desc: "A vegetarian feast of 20+ delicacies served on a plantain leaf during festivals." },
      { title: "Aranmula Kannadi", desc: "Handmade metal alloy mirror craft unique to a single artisan family in Pathanamthitta." }
    ],
    timeline: [
      { year: "1st Century CE", event: "Muziris port thrives as the queen of the Arabian Sea spice trade." },
      { year: "1498 CE", event: "Vasco da Gama lands at Calicut, opening maritime trade with Europe." },
      { year: "1956 CE", event: "Formation of Kerala state uniting Malabar, Cochin, and Travancore." },
      { year: "1991 CE", event: "Kerala achieves 100% total literacy milestone." }
    ]
  },
  "tamil-nadu": {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    tagline: "Land of Towering Gopurams, Sangam Literature & Chola Maritime Empire",
    heroImage: "/src/assets/culture4.jpg",
    secondaryImages: ["/src/assets/hero.jpg", "/src/assets/archive.jpg", "/src/assets/culture3.jpg"],
    description: "The sanctuary of classical Tamil culture, featuring monumental granite temples whose gopurams touch the sky, ancient Sangam poetry academies, and the naval supremacy of the Chola emperors.",
    historicalHighlights: [
      { title: "The Imperial Cholas", period: "9th – 13th Century CE", text: "Ruled a vast maritime empire across Southeast Asia, constructing architectural marvels like the Thanjavur Brihadisvara Temple." },
      { title: "Sangam Literature", period: "300 BCE – 300 CE", text: "Earliest surviving corpus of secular and romantic poetry in South India." }
    ],
    architecture: [
      { title: "Brihadisvara Temple, Thanjavur", desc: "A UNESCO World Heritage granite masterpiece whose 216-foot vimana is crowned by a single 80-tonne capstone." },
      { title: "Meenakshi Amman Temple, Madurai", desc: "A sprawling temple city complex adorned with thousands of colorful mythological sculptures." }
    ],
    cultureAndArts: [
      { title: "Bharatanatyam", desc: "The oldest classical dance tradition of India, expressing spiritual devotion through geometric adavus and abhinaya." },
      { title: "Carnatic Music & Thanjavur Bronzes", desc: "Sublime vocal traditions and lost-wax bronze metal sculpture." }
    ],
    festivals: [
      { title: "Pongal", desc: "A four-day harvest festival thanking the sun, rain, and farm cattle for agricultural bounty." },
      { title: "Natyanjali Festival, Chidambaram", desc: "Dance offerings dedicated to Lord Nataraja within the temple courts." }
    ],
    famousPersonalities: [
      { name: "Thiruvalluvar", role: "Philosopher & Poet", desc: "Author of the Tirukkural, a timeless masterpiece of ethics, statecraft, and love." },
      { name: "C.V. Raman", role: "Nobel Laureate Physicist", desc: "Discovered the Raman Effect, revolutionizing the study of light scattering." }
    ],
    cuisineAndCrafts: [
      { title: "Chettinad Cuisine & Filter Coffee", desc: "Fiery, freshly ground spice masalas paired with aromatic brewed chicory coffee." },
      { title: "Kanchipuram Silk Weaving", desc: "Pure mulberry silk sarees renowned for contrasting korvai borders and durability." }
    ],
    timeline: [
      { year: "3rd Century BCE", event: "Sangam academies flourish under Pandya and Chola patronage." },
      { year: "1010 CE", event: "Completion of the Brihadisvara Temple by Raja Raja Chola I." },
      { year: "1947 CE", event: "Madras Presidency transitions into Madras State (renamed Tamil Nadu in 1969)." }
    ]
  }
};
