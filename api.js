// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    fetchSeries();
    fetchBooks();
});

// ==========================================
// 1. DİZİLERİ ÇEKME FONKSİYONU (HİBRİT)
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
    if (!container) return;
    container.innerHTML = '';

    try {
        const fetchPromises = seriesList.map(title =>
            fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(title)}`)
                .then(res => res.json())
                .catch(err => null)
        );

        const results = await Promise.all(fetchPromises);

        results.forEach((data, index) => {
            if (data && data.length > 0) {
                const show = data[0].show;
                
                let imageUrl = show.image ? show.image.original : 'https://via.placeholder.com/400x600?text=Resim+Yok';
                if (show.name.toLowerCase() === 'prison break') imageUrl = 'prison-afis.jpg';
                
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
                                        <div class="mt-auto">${genresHtml}</div>
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
// 2. KİTAPLARI ÇEKME FONKSİYONU (HİBRİT)
// ==========================================
async function fetchBooks() {
    const booksList = [
        'Kürk Mantolu Madonna', 
        'Beyaz Zambaklar Ülkesinde', 
        'Sineklerin Tanrısı',
        'The Seven Dials Mystery'
    ]; 
    
    const container = document.getElementById('books-container');
    if (!container) return;
    
    container.innerHTML = '<p class="text-muted ms-4"><i class="fas fa-spinner fa-spin me-2"></i>Kitaplar getiriliyor...</p>';

    try {
        const fetchPromises = booksList.map(title =>
            fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=1`)
                .then(res => res.json())
                .catch(err => null)
        );

        const results = await Promise.all(fetchPromises);
        container.innerHTML = ''; 

        results.forEach((data, index) => {
            if (data && data.docs && data.docs.length > 0) {
                const bookInfo = data.docs[0];
                const bookTitle = bookInfo.title;
                const author = bookInfo.author_name ? bookInfo.author_name[0] : 'Bilinmeyen Yazar';
                const searchTitle = booksList[index].toLowerCase();
                
                let imageUrl;
                if (searchTitle.includes('sineklerin') || searchTitle.includes('seven dials')) {
                    imageUrl = bookInfo.cover_i 
                        ? `https://covers.openlibrary.org/b/id/${bookInfo.cover_i}-M.jpg` 
                        : 'https://via.placeholder.com/400x600?text=Kapak+Yok';
                } else {
                    if (searchTitle.includes('kürk')) imageUrl = 'kurk-mantolu.jpg';
                    else if (searchTitle.includes('beyaz')) imageUrl = 'beyaz-zambaklar.jpg';
                    else imageUrl = 'https://via.placeholder.com/400x600?text=Kapak+Yok';
                }

                const linkUrl = bookInfo.key ? `https://openlibrary.org${bookInfo.key}` : '#'; 

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