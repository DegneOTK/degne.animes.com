document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        { id: 1, title: "Novo anime anunciado!", image: "imagens/slide1.jpg" },
        { id: 2, title: "Top 10 animes da temporada", image: "imagens/slide2.jpg" },
        { id: 3, title: "Entrevista exclusiva com criador de One Piece", image: "imagens/slide3.jpg" }
    ];

    const newsBlocks = [
        { id: 1, title: "Naruto ganha nova série", image: "imagens/news1.jpg", url: "news/naruto.html" },
        { id: 2, title: "Attack on Titan: Final temporada", image: "imagens/news2.jpg", url: "news/attack-on-titan.html" },
        { id: 3, title: "My Hero Academia: Novo filme anunciado", image: "imagens/news3.jpg", url: "news/my-hero-academia.html" },
        { id: 4, title: "Demon Slayer bate recordes de bilheteira", image: "imagens/news4.jpg", url: "news/demon-slayer.html" },
        { id: 5, title: "Jujutsu Kaisen: Segunda temporada confirmada", image: "imagens/news5.jpg", url: "news/jujutsu-kaisen.html" },
        { id: 6, title: "One Punch Man: Novo capítulo do mangá", image: "imagens/news6.jpg", url: "news/one-punch-man.html" }
    ];

    let currentSlide = 0;

    function initSlideshow() {
        const slideContainer = document.querySelector('.slide-container');
        const slideNav = document.querySelector('.slide-nav');

        slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `slide absolute inset-0 ${index === 0 ? 'active' : ''}`;
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" class="object-cover w-full h-full">
                <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h2 class="text-2xl font-bold">${slide.title}</h2>
                </div>
            `;
            slideContainer.appendChild(slideElement);

            const navButton = document.createElement('button');
            navButton.className = `w-3 h-3 rounded-full ${index === 0 ? 'bg-white' : 'bg-gray-400'}`;
            navButton.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
            navButton.addEventListener('click', () => goToSlide(index));
            slideNav.appendChild(navButton);
        });

        setInterval(nextSlide, 5000);
    }

    function goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const navButtons = document.querySelectorAll('.slide-nav button');

        slides[currentSlide].classList.remove('active');
        navButtons[currentSlide].classList.remove('bg-white');
        navButtons[currentSlide].classList.add('bg-gray-400');

        currentSlide = index;

        slides[currentSlide].classList.add('active');
        navButtons[currentSlide].classList.remove('bg-gray-400');
        navButtons[currentSlide].classList.add('bg-white');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function initNewsBlocks() {
        const newsGrid = document.querySelector('.news-grid');

        newsBlocks.forEach(block => {
            const blockElement = document.createElement('div');
            blockElement.className = 'news-block bg-white rounded-lg shadow-md overflow-hidden cursor-pointer';
            blockElement.innerHTML = `
                <img src="${block.image}" alt="${block.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold">${block.title}</h3>
                </div>
            `;
            blockElement.addEventListener('click', () => {
                window.open(block.url, '_blank');
            });
            newsGrid.appendChild(blockElement);
        });
    }

    function initNavigation() {
        const navButtons = document.querySelectorAll('.nav-button');
        const sections = document.querySelectorAll('main > section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.getAttribute('data-section');
                
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                sections.forEach(section => {
                    if (section.id === sectionId) {
                        section.classList.remove('hidden');
                        section.classList.add('active-section');
                    } else {
                        section.classList.add('hidden');
                        section.classList.remove('active-section');
                    }
                });
            });
        });
    }

    initSlideshow();
    initNewsBlocks();
    initNavigation();
});
