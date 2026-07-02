async function searchBook() {

    const keyword = document.getElementById("searchInput").value.trim();
    const result = document.getElementById("result");

    if (!keyword) {
        result.innerHTML = "<p>📚 책 제목을 입력해 주세요.</p>";
        return;
    }

    result.innerHTML = "<p>검색 중...</p>";

    try {

        const response = await fetch(`/api/search?q=${encodeURIComponent(keyword)}`);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            result.innerHTML = "<p>검색 결과가 없습니다.</p>";
            return;
        }

        const book = data.items[0];

        result.innerHTML = `
            <div class="book">
                <img src="${book.cover}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>✍ ${book.author}</p>
                <p>💰 ${book.price}원</p>
                <a href="${book.link}" target="_blank">알라딘에서 보기</a>
            </div>
        `;

    } catch (error) {

        result.innerHTML = "<p>⚠️ 오류가 발생했습니다.</p>";
        console.error(error);

    }

}
