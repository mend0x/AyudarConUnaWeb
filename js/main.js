const carousel = document.getElementById('carousel');
const track = document.querySelector('.carousel-track');
let cards = document.querySelectorAll('.video-card');
const dots = document.querySelectorAll('.dot');

let index = 1;
let cardWidth;
let carouselWidth;
const gap = 40;
let transitioning = false;

/* CLONES */
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

cards = document.querySelectorAll('.video-card');

function setPosition(noAnim = false) {
    track.style.transition = noAnim ? 'none' : 'transform 0.6s ease';

    const offset =
        index * (cardWidth + gap)
        - (carouselWidth / 2)
        + (cardWidth / 2);

    track.style.transform = `translateX(${-offset}px)`;
}

function updateActive() {
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    const realIndex =
        index === 0 ? dots.length - 1 :
            index === cards.length - 1 ? 0 :
                index - 1;

    cards[index].classList.add('active');
    dots[realIndex].classList.add('active');
}

function init() {
    cardWidth = cards[0].offsetWidth;
    carouselWidth = carousel.offsetWidth;
    setPosition(true);
    updateActive();
}

window.addEventListener('resize', init);

function nextSlide() {
    if (transitioning) return;
    transitioning = true;
    index++;
    setPosition();
}

function prevSlide() {
    if (transitioning) return;
    transitioning = true;
    index--;
    setPosition();
}

track.addEventListener('transitionend', () => {
    transitioning = false;

    if (index === 0) {
        index = cards.length - 2;
        setPosition(true);
    }
    if (index === cards.length - 1) {
        index = 1;
        setPosition(true);
    }
    updateActive();
});

init();
