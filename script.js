// ስለ 4ቱም ቦታዎች ሙሉ መረጃ የያዘ ዳታ
const destinationData = {
    mountains: {
        title: "The Majestic Simien Mountains National Park",
        img1: "https://images.unsplash.com/photo-1606318313647-137d1f3b4d3c?w=800", 
        img2: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800", 
        description: `The Simien Mountains National Park, located in northern Ethiopia, is a spectacular landscape, where massive erosion over the years has created jagged mountain peaks, deep valleys and sharp precipices dropping some 1,500 meters. Established in 1969, it is home to Ras Dashen, the highest peak in Ethiopia (4,550m). It protects rare and endemic species like the Walia Ibex and Gelada Baboon.`,
        highlights: [
            "Location: North Gondar Zone, Amhara Region.",
            "Key Peaks: Ras Dashen (4,550m).",
            "UNESCO Status: Inscribed in 1978 as a World Natural Heritage."
        ]
    },
    lalibela: {
        title: "The Holy Rock-Hewn Churches of Lalibela",
        img1: "https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?w=800", // እውነተኛ የላሊበላ ፎቶ 1
        img2: "https://images.unsplash.com/photo-1599931818731-97b40974cc9e?w=800", // እውነተኛ የላሊበላ ፎቶ 2
        description: `Lalibela is a historic town famous for its eleven monolithic and semi-monolithic churches, entirely carved out of solid living rock. Dating back to the late 12th and early 13th centuries during the reign of King Gebre Meskel Lalibela, these masterpieces represent a 'New Jerusalem'. The churches were meticulously hand-carved from the top down into volcanic tuff rock without using mortar or bricks.`,
        highlights: [
            "Founder: King Lalibela (Zagwe Dynasty) in the 12th/13th century.",
            "UNESCO Status: Inscribed as a World Cultural Heritage Site in 1978.",
            "Key Monoliths: Biete Giyorgis (St. George) shaped like a perfect cross."
        ]
    },
    axum: {
        title: "The Ancient Obelisk and Empire of Axum",
        img1: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", // አክሱም ሐውልት 1
        img2: "https://images.unsplash.com/photo-1627563721343-4e4881fa6d64?w=800", // አክሱም ሐውልት 2
        description: `Axum was the center of the ancient Aksumite Empire, which was one of the four major global powers of its time alongside Rome, Persia, and China. The ruins of the site include monumental stelae (obelisks), royal tombs, and ancient palaces. The largest standing obelisk rises to a height of 23 meters and represents a masterpiece of engineering, carved from a single piece of granite. Axum is also home to the Church of Our Lady Mary of Zion, where tradition holds the Ark of the Covenant is kept.`,
        highlights: [
            "Location: Tigray Region, Northern Ethiopia.",
            "Historical Era: Peak influence from the 1st to the 7th centuries AD.",
            "UNESCO Status: Inscribed as a World Cultural Heritage Site in 1980.",
            "Significance: Spiritual center of Ethiopian Orthodox Christianity."
        ]
    },
    gondar: {
        title: "Fasil Ghebbi: The Royal Castles of Gondar",
        img1: "https://images.unsplash.com/photo-1607584822941-86f1e8e50587?w=800", // ጎንደር 1
        img2: "https://images.unsplash.com/photo-1569930784237-ea65a2f48a66?w=800", // ጎንደር 2
        description: `Fasil Ghebbi is a spectacular fortress-city located in Gondar, which served as the home of Ethiopian emperors during the 17th and 18th centuries. Founded by Emperor Fasilides in 1636, the site features unique architecture that blends European Baroque style with Hindu, Arab, and traditional Ethiopian Aksumite influences. The complex includes palaces, a massive banquet hall, royal baths, and historic churches decorated with beautiful angel-faced frescoes.`,
        highlights: [
            "Founder: Emperor Fasilides in 1636 AD.",
            "Location: Gondar, Amhara Region.",
            "UNESCO Status: Inscribed as a World Cultural Heritage Site in 1979.",
            "Architecture: Known as the 'Camelot of Africa' due to its medieval castle layout."
        ]
    }
};

let currentDestination = ""; 

// የፍለጋ ፈንክሽን (🌟 አዲስ 🌟)
function searchDestinations() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let cards = document.getElementsByClassName('tour-card');

    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getAttribute('data-name');
        if (name.includes(input)) {
            cards[i].style.display = "flex"; // ካርዱን አሳይ
        } else {
            cards[i].style.display = "none"; // ካርዱን ደብቅ
        }
    }
}

// ሳጥኑን ለመክፈት
function openModal(destinationKey) {
    currentDestination = destinationKey;
    const modal = document.getElementById('infoModal');
    const data = destinationData[destinationKey];

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalImg1').src = data.img1;
    document.getElementById('modalImg2').src = data.img2;
    document.getElementById('modalDescription').innerText = data.description;

    const highlightsList = document.getElementById('modalHighlights');
    highlightsList.innerHTML = "";
    data.highlights.forEach(item => {
        let li = document.createElement('li');
        li.innerText = item;
        highlightsList.appendChild(li);
    });

    updateLikeUI();
    updateRatingUI();

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
}

// Like ተግባር
function toggleLike() {
    let likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || {};
    if (likedPlaces[currentDestination]) {
        delete likedPlaces[currentDestination];
    } else {
        likedPlaces[currentDestination] = true;
    }
    localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
    updateLikeUI();
}

function updateLikeUI() {
    let likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || {};
    const likeBtn = document.getElementById('likeBtn');
    const likeCountSpan = document.getElementById('likeCount');

    let baseLikes = { mountains: 98, lalibela: 150, axum: 120, gondar: 115 };
    let currentLikes = baseLikes[currentDestination] || 0;

    if (likedPlaces[currentDestination]) {
        likeBtn.classList.add('liked');
        likeBtn.innerText = "❤️ Liked";
        likeCountSpan.innerText = currentLikes + 1;
    } else {
        likeBtn.classList.remove('liked');
        likeBtn.innerText = "❤️ Like";
        likeCountSpan.innerText = currentLikes;
    }
}

// Rating ተግባር
function ratePlace(starsCount) {
    let ratings = JSON.parse(localStorage.getItem('placeRatings')) || {};
    ratings[currentDestination] = starsCount;
    localStorage.setItem('placeRatings', JSON.stringify(ratings));
    updateRatingUI();
}

function updateRatingUI() {
    let ratings = JSON.parse(localStorage.getItem('placeRatings')) || {};
    let savedRating = ratings[currentDestination] || 0;
    const stars = document.querySelectorAll('.star');
    const status = document.getElementById('ratingStatus');

    stars.forEach(star => star.classList.remove('active'));

    if (savedRating > 0) {
        for (let i = 0; i < savedRating; i++) {
            stars[5 - 1 - i].classList.add('active');
        }
        status.innerText = `(You rated: ${savedRating} ★)`;
    } else {
        status.innerText = "";
    }
}

// ሳጥኑን ለመዝጋት
function closeModal() {
    document.getElementById('infoModal').style.display = "none";
    document.body.style.overflow = "auto"; 
}

window.onclick = function(event) {
    const modal = document.getElementById('infoModal');
    if (event.target == modal) { closeModal(); }
}
