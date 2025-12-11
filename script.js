const catalogGameCardsData = [
    {
        id: 0,
        title: "CS2",
        genre: "Шутер",
        developer: "Valve",
        price: "Бесплатно",
        rating: "★★★★☆",
        image: "images/cs2.jpg",
        isFree: true,
        online: 591628,
    },
    {
        id: 1,
        title: "ARC Raiders",
        genre: "Шутер",
        developer: "Embark Studios",
        price: "2 999 ₽",
        rating: "★★★☆☆",
        image: "images/arc raiders.webp",
        isFree: false,
        online: 245454,
    },
    {
        id: 2,
        title: "Battlefield 6",
        genre: "Шутер",
        developer: "EA DICE",
        price: "6 999,00 ₽",
        rating: "★★★★★",
        image: "images/battlefield6.jpeg",
        isFree: false,
        online: 99517,
    },
    {
        id: 3,
        title: "Call of Duty: Black Ops 6",
        genre: "Шутер",
        developer: "Treyarch",
        price: "6 999,00 ₽",
        rating: "★★★★★",
        image: "images/call of duty black ops 6.jpeg",
        isFree: false,
        online: 47046,
    },
    {
        id: 4,
        title: "Forza Horizon 5: Standard Edition",
        genre: "Гонки, Приключение",
        developer: "Playground Games",
        price: "6 999,00 ₽",
        rating: "★★★★★",
        image: "images/fh 5.jpeg",
        isFree: false,
        online: 7146,
    },
    {
        id: 5,
        title: "BeamNG Drive",
        genre: "Гонки, Симулятор",
        developer: "BeamNG GmbH",
        price: "6 999,00 ₽",
        rating: "★★★★★",
        image: "images/BeamNG drive.jpeg",
        isFree: false,
        online: 18524,
    },
    {
        id: 6,
        title: "Sid Meier's Civilization VII",
        genre: "Стратегия, Симулятор",
        developer: "Firaxis Games",
        price: "5 600 ₽",
        rating: "★★★★★",
        image: "images/civilization 7.jpeg",
        isFree: false,
        online: 7146,
    },
    {
        id: 7,
        title: "Hearts of Iron IV",
        genre: "Стратегия, Симулятор",
        developer: "Paradox Development Studio",
        price: "639 ₽",
        rating: "★★★★★",
        image: "images/hoi4.jpeg",
        isFree: false,
        online: 22787,
    },
    {
        id: 8,
        title: "Europe Universalis V",
        genre: "Стратегия, Симулятор",
        developer: "Paradox Development Studio",
        price: "5 600 ₽",
        rating: "★★★★★",
        image: "images/Europe Universalis V.jpeg",
        isFree: false,
        online: 13782,
    },
    {
        id: 9,
        title: "The Elder Scrolls V: Skyrim Special Edition",
        genre: "RPG, Симулятор, Приключение",
        developer: "Bethesda Game Studios",
        price: "3 200 ₽",
        rating: "★★★★★",
        image: "images/skyrim se.jpeg",
        isFree: false,
        online: 23309,
    }
];


function renderGameCards(gameCards) {
    const grid = document.getElementsByClassName('games-grid')[0];

    if(grid){
        grid.innerHTML = "";

        gameCards.forEach(game => {
            const gameCard = document.createElement('a');
            gameCard.href = "catalog.html"
            gameCard.className = 'game-card';
            gameCard.setAttribute('id', game.id);
            
            const gamePrice = game.isFree ? 'Бесплатно' : game.price;
            gameCard.innerHTML = `
                <img class="game-image" src="${game.image}" alt="${game.title}">
                <div class="game-info">
                    <div class="game-title">
                        <h3 class="small-header">${game.title}</h3>
                    </div>
                    <p class="game-caption">${game.genre}</p>
                    <p class="game-caption">${game.developer}</p>
                    <div class="game-footer">
                        <span class="${game.isFree ? 'price free' : 'price'}">${gamePrice}</span>
                        <span class="rating">${game.rating}</span>
                        <a href="catalog.html" class="slide-btn">Подробнее</a>
                    </div>
                </div>
            `

            grid.appendChild(gameCard);
        });

    }
}

function getMostPopularGames(count){
    let games = Array.from(catalogGameCardsData);
    games.sort((firstGame, secondGame) => {
        return (firstGame.online - secondGame.online) * -1;
    });

    console.log(games);
    return games.slice(0, count);
}

//INDEX.HTML
const gamesGrid = document.getElementsByClassName('games-grid')[0];
if(gamesGrid){
    const games = getMostPopularGames(6);
    renderGameCards(games);
}

// Меню бургер
const menuBtn = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        if (window.innerWidth <= 768) {
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'var(--gray)';
            nav.style.padding = '1rem';
            nav.style.gap = '1rem';
        }
    });
}

// Адаптация меню при ресайзе
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'row';
        nav.style.position = 'static';
        nav.style.background = 'transparent';
        nav.style.padding = '0';
    } else {
        nav.style.display = 'none';
    }
});

const slider = document.getElementsByClassName('slider')[0];
if(slider){
    document.addEventListener('DOMContentLoaded', function() {
        class Slider {
            constructor() {
                this.slides = document.querySelectorAll('.slide');
                this.dots = document.querySelectorAll('.dot');
                this.prevBtn = document.querySelector('.slider-prev');
                this.nextBtn = document.querySelector('.slider-next');
                this.currentSlide = 0;
                this.autoSlideInterval = null;
                
                this.init();
            }
            
            init() {
                // Показываем первый слайд
                this.showSlide(this.currentSlide);
                
                // Добавляем обработчики событий
                if (this.prevBtn) {
                    this.prevBtn.addEventListener('click', () => this.prevSlide());
                }
                
                if (this.nextBtn) {
                    this.nextBtn.addEventListener('click', () => this.nextSlide());
                }
                
                // Обработчики для точек
                this.dots.forEach(dot => {
                    dot.addEventListener('click', (e) => {
                        const slideIndex = parseInt(e.target.dataset.slide);
                        this.showSlide(slideIndex);
                    });
                });
                
                // Автопрокрутка
                this.startAutoSlide();
                
                // Останавливаем автопрокрутку при наведении
                const slider = document.querySelector('.slider');
                if (slider) {
                    slider.addEventListener('mouseenter', () => this.stopAutoSlide());
                    slider.addEventListener('mouseleave', () => this.startAutoSlide());
                }
                
                // Останавливаем автопрокрутку при касании на мобильных
                if (slider) {
                    slider.addEventListener('touchstart', () => this.stopAutoSlide());
                }
            }
            
            showSlide(index) {
                // Скрываем все слайды
                this.slides.forEach(slide => {
                    slide.classList.remove('active');
                });
                
                // Убираем активный класс со всех точек
                this.dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Показываем выбранный слайд
                if (index >= this.slides.length) {
                    this.currentSlide = 0;
                } else if (index < 0) {
                    this.currentSlide = this.slides.length - 1;
                } else {
                    this.currentSlide = index;
                }
                
                this.slides[this.currentSlide].classList.add('active');
                this.dots[this.currentSlide].classList.add('active');
            }
            
            nextSlide() {
                this.showSlide(this.currentSlide + 1);
            }
            
            prevSlide() {
                this.showSlide(this.currentSlide - 1);
            }
            
            startAutoSlide() {
                this.stopAutoSlide(); // Останавливаем предыдущий интервал
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000); // Меняем слайд каждые 5 секунд
            }
            
            stopAutoSlide() {
                if (this.autoSlideInterval) {
                    clearInterval(this.autoSlideInterval);
                    this.autoSlideInterval = null;
                }
            }
        }
        
        // Инициализируем слайдер при загрузке страницы
        new Slider();
    });
}

// Фильтр по жанрам в каталоге
const catalog = document.getElementsByClassName('catalog-header')[0];
const catalogFilters = getFilters();

if(catalog){
    renderGameCards(catalogGameCardsData);

    const btnApply = document.getElementsByClassName('btn-apply')[0];
    btnApply.addEventListener('click', function() {
        const selectedFilters = getSelectedFilters(); 

        showGameCardsByGenres(selectedFilters);      

    });

    catalogFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            if(filter.getAttribute('selected') === 'true'){
                filter.removeAttribute('selected');
            }
            else{
                filter.setAttribute('selected', 'true');
            }
        });
    });
}

function getFilters() {
    if(catalog){
        return Array.from(document.getElementsByClassName('filter-checkbox'));
    }
    return null;
}

function getSelectedFilters() {
    if(catalogFilters){
        const selectedFilters = catalogFilters
        .map(filter => {
            if(filter.getAttribute('selected') === 'true'){
                return filter.textContent.trim();
            }
            return null;
        })
        .filter(function(filter){
            return filter !== null
        });

        return selectedFilters;
    }
    return null;
}

function showAllGameCards() {
    if(catalog){
        renderGameCards(catalogGameCardsData);
    }
}

function hideAllGameCards() {
    if(catalog){
        renderGameCards([]);
    }
}

function showGameCardsByGenres(genres){
    if(genres.length !== 0){
        let fittingGameCards = [];

        catalogGameCardsData.forEach(game => {
            const gameGenres = game.genre;
            
            isFitting = true;
            genres.forEach(genre => {
                if(gameGenres.includes(genre) === false){
                    isFitting = false;
                }
            })

            if(isFitting){
                fittingGameCards.push(catalogGameCardsData[game.id]);
            }
        });

        renderGameCards(fittingGameCards);
        return;
    }

    showAllGameCards();
}




//ПОИСК
const searchField = document.getElementsByClassName('search-input')[0] ?? null;
const searchButton = document.getElementsByClassName('search-btn')[0] ?? null;

if(searchField && searchButton){
    searchButton.addEventListener('click', function() {
        search(searchField.value);    
    });
}
function search(query) {
        if(query !== ""){
            const fittingGameCards = [];
            catalogGameCardsData.forEach(game => {
                const title = game.title.toLowerCase();
                const genres = game.genre.toLowerCase();
    
                if(title.includes(query.toLowerCase()) || genres.includes(query.toLowerCase)){
                    fittingGameCards.push(catalogGameCardsData[game.id]);
                }
            })
            
            renderGameCards(fittingGameCards);
            return;
        }

        showAllGameCards();
}

//Подсказки при поиске
const searchSuggestions = document.getElementsByClassName('search-suggestions')[0];
if(searchField && searchButton){
    searchField.addEventListener('input', function() {
        suggestQueryFittingGames();
    });
    
    searchField.addEventListener('focus', function() {
        searchSuggestions.classList.remove('search-suggestions_hidden');
        suggestQueryFittingGames();
    });

    searchField.addEventListener('blur', function() {
        setTimeout(() => {
            searchSuggestions.classList.add('search-suggestions_hidden');
        }, 150)
    });
}

function suggestQueryFittingGames() {
    const query = searchField.value;
    let suggestions = [];
    catalogGameCardsData.forEach(game => {
        if (suggestions.length >= 3) {
            return;
        }

        const gameTitle = game.title.toLocaleLowerCase();
        if (gameTitle.includes(query.toLowerCase())) {
            suggestions.push([
                {
                    'title': game.title,
                    'image': game.image,
                }
            ]);
        }
    });
    renderSearchSuggestions(suggestions);
}

function renderSearchSuggestions(suggestions) {
    searchSuggestions.innerHTML = "";
    suggestions.forEach(searchSuggestion => {
        searchSuggestion = searchSuggestion[0];
        const suggestion = document.createElement('div');
        suggestion.className = "search-suggestion";

        suggestion.innerHTML = `
            <img class="search-suggestion__game-image" src="${searchSuggestion.image}" alt="${searchSuggestion.title}">
            <h3 class="small-header">${searchSuggestion.title}</h3>
        `

        suggestion.addEventListener('mouseenter', function() {
            searchField.placeholder = searchSuggestion.title;
        });

        suggestion.addEventListener('mouseleave', function() {
            searchField.placeholder = "Поиск по играм...";
        });

        suggestion.addEventListener('click', function() {
            searchField.value = searchSuggestion.title;
            searchSuggestions.classList.add('search-suggestions_hidden');
            searchButton.click();
        });

        searchSuggestions.appendChild(suggestion);
    });
}