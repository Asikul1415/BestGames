const catalogGameCardsData = [
    {
        id: 0,
        title: "CS2",
        genre: "Шутер",
        price: "Бесплатно",
        rating: "★★★★☆",
        image: "images/cs2.jpg",
        isFree: true
    },
    {
        id: 1,
        title: "ARC Raiders",
        genre: "Шутер",
        price: "2 999 ₽",
        rating: "★★★☆☆",
        image: "images/arc raiders.webp",
        isFree: false
    },
    {
        id: 2,
        title: "Battlefield 6",
        genre: "Шутер",
        price: "6 999,00 ₽",
        rating: "★★★★★",
        image: "images/battlefield6.jpeg",
        isFree: false
    },
    {
        id: 3,
        title: "Call of Duty: Black Ops 6",
        genre: "Шутер",
        price: "6 999,00 ₽",
        rating: "★★★★★",
        image: "images/call of duty black ops 6.jpeg",
        isFree: false
    },
    {
        id: 4,
        title: "Forza Horizon 5: Standard Edition",
        genre: "Гонки, Приключение",
        price: "6 999,00 ₽",
        rating: "★★★★★",
        image: "images/fh 5.jpeg",
        isFree: false
    },
    {
        id: 5,
        title: "BeamNG Drive",
        genre: "Гонки, Симулятор",
        price: "6 999,00 ₽",
        rating: "★★★★★",
        image: "images/BeamNG drive.jpeg",
        isFree: false
    },
    {
        id: 6,
        title: "Sid Meier's Civilization VII",
        genre: "Стратегия, Симулятор",
        price: "5 600 ₽",
        rating: "★★★★★",
        image: "images/civilization 7.jpeg",
        isFree: false
    },
    {
        id: 7,
        title: "Hearts of Iron IV",
        genre: "Стратегия, Симулятор",
        price: "639 ₽",
        rating: "★★★★★",
        image: "images/hoi4.jpeg",
        isFree: false
    },
    {
        id: 8,
        title: "Europe Universalis V",
        genre: "Стратегия, Симулятор",
        price: "5 600 ₽",
        rating: "★★★★★",
        image: "images/Europe Universalis V.jpeg",
        isFree: false
    },
    {
        id: 9,
        title: "The Elder Scrolls V: Skyrim Special Edition",
        genre: "RPG, Симулятор, Приключение",
        price: "3 200 ₽",
        rating: "★★★★★",
        image: "images/skyrim se.jpeg",
        isFree: false
    }
];

function renderGameCards(gameCards) {
    const catalogGrid = document.getElementsByClassName('catalog-grid')[0];

    if(catalogGrid){
        catalogGrid.innerHTML = "";

        gameCards.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.setAttribute('id', game.id);
            
            const gamePrice = game.isFree ? 'Бесплатно' : game.price;
            gameCard.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p class="genre">${game.genre}</p>
                    <div class="game-footer">
                        <span class="${game.isFree ? 'price free' : 'price'}">${gamePrice}</span>
                        <span class="rating">${game.rating}</span>
                    </div>
                </div>
            `

            catalogGrid.appendChild(gameCard);
        });

    }
}

// Меню бургер
const menuBtn = document.querySelector('.menu-btn');
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



// Добавь в конец твоего script.js этот код:

// ==================== ПЕРЕКЛЮЧЕНИЕ ТЕМ ====================
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const switcherButtons = document.querySelectorAll('.theme-switcher-btn');
    
    // Переключение через кнопки в профиле
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme') || this.textContent.trim();
            switchTheme(theme);
            
            // Сохраняем в localStorage
            localStorage.setItem('theme', theme);
        });
    });
    
    // Переключение через блок в светлой теме
    switcherButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('dark')) {
                e.preventDefault();
                switchTheme('dark');
                localStorage.setItem('theme', 'dark');
                // Перенаправляем на темную тему через 500мс
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            }
        });
    });
    
    // Восстановление темы при загрузке
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        switchTheme(savedTheme);
    }
}

// Функция переключения темы
function switchTheme(theme) {
    const body = document.body;
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Убираем активный класс у всех кнопок
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        // Добавляем active к соответствующей кнопке
        const btnTheme = btn.getAttribute('data-theme') || btn.textContent.trim();
        if (btnTheme.toLowerCase().includes(theme.toLowerCase())) {
            btn.classList.add('active');
        }
    });
    
    // Меняем тему на странице (если это не отдельная страница light)
    if (theme === 'light' && !body.classList.contains('light-theme')) {
        // Если нужно переключить на лету, можно добавить класс
        // body.classList.add('light-theme');
    } else if (theme === 'dark' && body.classList.contains('light-theme')) {
        // body.classList.remove('light-theme');
    }
}

// В основной инициализации добавь:
document.addEventListener('DOMContentLoaded', function() {
    initThemeSwitcher();
});


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

function getGameCards() {
    if(catalog){
        showAllGameCards(catalogGameCardsData);
        const gameCards = document.getElementsByClassName('game-card');
        return Array.from(gameCards);
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
        const gameCards = getGameCards();
        let fittingGameCards = [];

        gameCards.forEach(card => {
            const gameGenres = card.getElementsByClassName('genre')[0];
            
            isFitting = true;
            genres.forEach(genre => {
                if(gameGenres.textContent.includes(genre) === false){
                    isFitting = false;
                }
            })

            if(isFitting){
                fittingGameCards.push(catalogGameCardsData[card.getAttribute('id')]);
            }
        });

        console.log(fittingGameCards);
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
    const gameCards = getGameCards();
    
    if(gameCards){
        if(query !== ""){
            const fittingGameCards = [];
            gameCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
    
                if(cardText.includes(query.toLowerCase())){
                    fittingGameCards.push(catalogGameCardsData[card.getAttribute('id')]);
                }
            })
            
            renderGameCards(fittingGameCards);
            return;
        }

        showAllGameCards();
    }
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
        }, 100)
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
            <h3>${searchSuggestion.title}</h3>
        `

        suggestion.addEventListener('click', function() {
            searchField.value = searchSuggestion.title;
            searchSuggestions.classList.add('search-suggestions_hidden');
            searchButton.click();
        });

        searchSuggestions.appendChild(suggestion);
    });
}