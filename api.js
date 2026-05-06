// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
    fetchSeries();
    fetchBooks();
});

// ==========================================
// 1. FİLMLERİ ÇEKME FONKSİYONU (HIZLI & TIMELINE)
// ==========================================
async function fetchMovies() {
    const moviesList = [ 
        'Harry Potter and the Prisoner of Azkaban', 
        'flipped', 
        '28 days later', 
        'dune'
    ];
    
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; 

    try {
        const fetchPromises = moviesList.map(title =>
            // DİKKAT: Linkin sonuna &country=tr ekledik ki Türkçe isimleri bulabilsin
            fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(title)}&entity=movie&limit=1&country=tr`)
                .then(res => res.json())
                .catch(err => null)
        );

        const results = await Promise.all(fetchPromises);

        results.forEach(data => {
            if (data && data.results && data.results.length > 0) {
                const movie = data.results[0];
                const highResImage = movie.artworkUrl100.replace('100x100bb', '600x600bb');
                const linkUrl = movie.trackViewUrl || '#'; 
                
                const card = `
                    <div class="timeline-item">
                        <div class="timeline-icon bg-primary">
                            <i class="fas fa-video"></i>
                        </div>
                        <a href="${linkUrl}" target="_blank" class="text-decoration-none">
                            <div class="timeline-content card border-0 shadow-sm p-3 bg-white">
                                <div class="row g-0 align-items-center">
                                    <div class="col-4 col-sm-3 col-md-2 text-center">
                                        <img src="${highResImage}" class="img-fluid rounded shadow-sm" style="max-height: 120px; object-fit: cover;" alt="${movie.trackName}">
                                    </div>
                                    <div class="col-8 col-sm-9 col-md-10 ps-3">
                                        <h5 class="fw-bold text-dark mb-1">${movie.trackName}</h5>
                                        <p class="text-muted small mb-2"><i class="fas fa-calendar-alt me-1"></i> ${movie.releaseDate.substring(0, 4)}</p>
                                        <span class="badge custom-bg-primary">${movie.primaryGenreName}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
                container.innerHTML += card;
            }
        });
    } catch (error) {
        console.error('Film çekme hatası:', error);
    }
}

// ==========================================
// 2. DİZİLERİ ÇEKME FONKSİYONU (HIZLI & TIMELINE)
// ==========================================
async function fetchSeries() {
    const seriesList = [
        'the last of us',
        'prison break',
        'the walking dead',
        'baba candır',
        'Vincenzo', 
        'school 2015'
    ]; 
    
    const container = document.getElementById('series-container');
    container.innerHTML = '';

    try {
        const fetchPromises = seriesList.map(title =>
            fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(title)}`)
                .then(res => res.json())
                .catch(err => null)
        );

        const results = await Promise.all(fetchPromises);

        results.forEach(data => {
            if (data && data.length > 0) {
                const show = data[0].show;
                
                let imageUrl = show.image ? show.image.original : 'https://via.placeholder.com/400x600?text=Resim+Yok';
                if (show.name === 'Prison Break') {
                    imageUrl = 'prison-afis.jpg';
                }
                
                let genresHtml = '';
                if (show.genres && show.genres.length > 0) {
                    genresHtml = show.genres.map(genre => `<span class="badge bg-secondary me-1 mb-1">${genre}</span>`).join('');
                } else {
                    genresHtml = `<span class="badge bg-secondary">Dizi</span>`;
                }

                const linkUrl = show.url || '#'; 
                
                const card = `
                    <div class="timeline-item">
                        <div class="timeline-icon bg-success border-success text-white">
                            <i class="fas fa-tv"></i>
                        </div>
                        <a href="${linkUrl}" target="_blank" class="text-decoration-none">
                            <div class="timeline-content card border-0 shadow-sm p-3 bg-white">
                                <div class="row g-0 align-items-center">
                                    <div class="col-4 col-sm-3 col-md-2 text-center">
                                        <img src="${imageUrl}" class="img-fluid rounded shadow-sm" style="max-height: 120px; object-fit: cover;" alt="${show.name}">
                                    </div>
                                    <div class="col-8 col-sm-9 col-md-10 ps-3">
                                        <h5 class="fw-bold text-dark mb-1">${show.name}</h5>
                                        <p class="text-muted small mb-2"><i class="fas fa-star text-warning me-1"></i> Puan: ${show.rating.average || 'N/A'}</p>
                                        <div class="mt-auto">
                                            ${genresHtml}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
                container.innerHTML += card;
            }
        });
    } catch (error) {
        console.error('Dizi çekme hatası:', error);
    }
}

// ==========================================
// 3. KİTAPLARI ÇEKME FONKSİYONU (HIZLI & TIMELINE)
// ==========================================
async function fetchBooks() {
    const booksList = [
        'Kürk Mantolu Madonna', 
        'Beyaz Zambaklar Ülkesinde', 
        'satranç',
        'the 7 dials mystery'
    ]; 
    
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    try {
        const fetchPromises = booksList.map(title =>
            // DİKKAT: intitle: kısıtlamasını kaldırdık, artık daha esnek arıyor
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&maxResults=1`)
                .then(res => res.json())
                .catch(err => null)
        );

        const results = await Promise.all(fetchPromises);

        results.forEach((data, index) => {
            if (data && data.items && data.items.length > 0) {
                const bookInfo = data.items[0].volumeInfo;
                const bookTitle = bookInfo.title;
                const author = bookInfo.authors ? bookInfo.authors[0] : 'Bilinmeyen Yazar';
                
                let imageUrl = bookInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/400x600?text=Kapak+Yok';

                // Arama yaptığımız kelimeyi (title) baz alarak resim eşleştirmesi yapıyoruz
                const searchTitle = booksList[index].toLowerCase();
                
                if (searchTitle.includes('kürk')) {
                    imageUrl = 'kurk-mantolu.jpg';
                } else if (searchTitle.includes('yedi')) {
                    imageUrl = 'yedi-kadran.jpg';
                } else if (searchTitle.includes('beyaz')) {
                    imageUrl = 'beyaz-zambaklar.jpg';
                } else if (searchTitle.includes('incir')) {
                    // Eğer incir kuşları için resmin varsa adını buraya yazabilirsin
                    imageUrl = 'incir-kuslari.jpg'; 
                }

                const linkUrl = bookInfo.infoLink || '#'; 

                const card = `
                    <div class="timeline-item">
                        <div class="timeline-icon bg-warning border-warning text-dark">
                            <i class="fas fa-book-open"></i>
                        </div>
                        <a href="${linkUrl}" target="_blank" class="text-decoration-none">
                            <div class="timeline-content card border-0 shadow-sm p-3 bg-white">
                                <div class="row g-0 align-items-center">
                                    <div class="col-4 col-sm-3 col-md-2 text-center">
                                        <img src="${imageUrl}" class="img-fluid rounded shadow-sm" style="max-height: 120px; object-fit: cover;" alt="${bookTitle}">
                                    </div>
                                    <div class="col-8 col-sm-9 col-md-10 ps-3">
                                        <h5 class="fw-bold text-dark mb-1" style="font-size:1rem;">${bookTitle}</h5>
                                        <p class="text-muted small mb-2">${author}</p>
                                        <div class="mt-auto">
                                            <span class="badge custom-bg-accent">Kitap</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
                container.innerHTML += card;
            }
        });
    } catch (error) {
        console.error('Kitap çekme hatası:', error);
    }
}