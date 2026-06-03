function searchDestinations() {
    // የተጻፈውን ፅሁፍ ወደ ትናንሽ ሆሄያት (lowercase) መቀየር
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
        // በእያንዳንዱ ካርድ ላይ የተሰጠውን data-name መረጃ ማንበብ
        let destinationAttr = cards[i].getAttribute('data-name');
        
        if (destinationAttr.includes(input)) {
            cards[i].style.display = "flex"; // የሚዛመድ ከሆነ አሳይ
        } else {
            cards[i].style.display = "none"; // ካልሆነ ደብቅ
        }
    }
}
