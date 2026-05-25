// ስለ ቦታዎቹ ታሪክ፣ ፎቶዎች እና መስተጋብሮች (Likes/Ratings) የያዘ ዳታ
const destinationData = {
    mountains: {
        title: "The Majestic Simien Mountains National Park",
        img1: "https://images.unsplash.com/photo-1606318313647-137d1f3b4d3c?w=800", 
        img2: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800", 
        description: `The Simien Mountains National Park, located in the North Gondar Zone of the Amhara Region, is one of the most breathtaking natural wonders in Africa. Established in 1969, it was one of the first sites to be recognized as a UNESCO World Heritage Site in 1978 due to its global biological importance and staggering natural beauty.`,
        highlights: [
            "Location: North Gondar Zone, Amhara Region, Ethiopia.",
            "Key Peaks: Ras Dashen (4,550m) – The highest point in the country.",
            "UNESCO Status: Registered in 1978 as a World Natural Heritage."
        ]
    },
    lalibela: {
        title: "The Holy Rock-Hewn Churches of Lalibela",
        img1: "https://images.unsplash.com/photo-1565120130276-dfbd9a7a3ad7?w=800", 
        img2: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", 
        description: `Lalibela, formerly known as Roha, is a historic town in the Lasta district of the Amhara Region. It is world-renowned for its eleven monolithic and semi-monolithic churches, entirely carved out of living rock. These architectural marvels date back to the late 12th and early 13th centuries, during the reign of King Gebre Meskel Lalibela of the Zagwe Dynasty.`,
        highlights: [
            "Location: Lasta District, Wollo, Amhara Region, Ethiopia.",
            "Founder: King Gebre Meskel Lalibela (Zagwe Dynasty) in the 12th/13th century.",
            "UNESCO Status: Inscribed as a World Cultural Heritage Site in 1978."
        ]
    }
};

let currentDestination = ""; // አሁን የተከፈተውን ቦታ ለመለየት

// ሳጥኑን ለመክፈት
function openModal(destinationKey) {
    currentDestination = destinationKey;
    const modal = document.getElementById('infoModal');
    const data = destinationData[destinationKey];

    // ይዘቶችን መሙላት
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

    // 🌟 የ Like እና Rating ሁኔታን ከ LocalStorage ላይ ጭኖ ማሳየት 🌟
    updateLikeUI();
    updateRatingUI();

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
}

// 🔴 የ LIKE ተግባር (Toggle Like)
function toggleLike() {
    let likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || {};
    
    if (likedPlaces[currentDestination]) {
        // በፊት Like ተደርጎ ከሆነ አሁን ማጥፋት (Unlike)
        delete likedPlaces[currentDestination];
    } else {
        // ካልተደረገ Like ማድረግ
        likedPlaces[currentDestination] = true;
    }
    
    localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
    updateLikeUI();
}

function updateLikeUI() {
    let likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || {};
    const likeBtn = document.getElementById('likeBtn');
    const likeCountSpan = document.getElementById('likeCount');

    // ለሙከራ ያህል መሠረታዊ የላይክ ቁጥር (12) ላይ እኛ ያደረግነውን መደመር
    let baseLikes = currentDestination === 'lalibela' ? 150 : 98; 

    if (likedPlaces[currentDestination]) {
        likeBtn.classList.add('liked');
        likeBtn.innerText = "❤️ Liked";
        likeCountSpan.innerText = baseLikes + 1;
    } else {
        likeBtn.classList.remove('liked');
        likeBtn.innerText = "❤️ Like";
        likeCountSpan.innerText = baseLikes;
    }
}

// 🔴 የ RATING ተግባር (Star Rating)
function ratePlace(starsCount) {
    let ratings = JSON.parse(localStorage.getItem('placeRatings')) || {};
    ratings[currentDestination] = starsCount; // ደረጃውን መመዝገብ
    localStorage.setItem('placeRatings', JSON.stringify(ratings));
    
    updateRatingUI();
}

function updateRatingUI() {
    let ratings = JSON.parse(localStorage.getItem('placeRatings')) || {};
    let savedRating = ratings[currentDestination] || 0;
    
    const stars = document.querySelectorAll('.star');
    const status = document.getElementById('ratingStatus');

    // ሁሉንም ከዋክብት መጀመሪያ ማጽዳት (Deactivate)
    stars.forEach(star => star.classList.remove('active'));

    // የተመረጠውን ያህል ኮከብ ማብራት (በ CSS Flex-reverse ምክንያት ከበስተጀርባ ነው የምንቆጥረው)
    if (savedRating > 0) {
        // 5 ኮከብ ስላለ index ማስተካከል
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