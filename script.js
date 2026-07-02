const input = document.getElementById("searchInput");

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        searchBook();
    }
});

async function searchBook(){

    const keyword = input.value.trim();
    const result = document.getElementById("result");

    if(keyword===""){
        result.innerHTML="<p>📚 책 제목을 입력해 주세요!</p>";
        return;
    }

    result.innerHTML="<p>🌼 책을 찾는 중...</p>";

    try{

        const response=await fetch(`/api/search?q=${encodeURIComponent(keyword)}`);
        const data=await response.json();

        if(!data.items || data.items.length===0){
            result.innerHTML="<p>😥 검색 결과가 없어요.</p>";
            return;
        }

        let html="";

        data.items.forEach(book=>{

            html+=`
            <div class="book">

                <img src="${book.cover}" alt="${book.title}">

                <h2>${book.title}</h2>

                <p>✍ ${book.author}</p>

                <p>💰 ${Number(book.price).toLocaleString()}원</p>

                <div class="buttons">

                    <a class="aladin"
                       href="${book.link}"
                       target="_blank">
                       📕 알라딘
                    </a>

                    <a class="yes24"
                       href="https://www.yes24.com/Product/Search?query=${encodeURIComponent(book.title)}"
                       target="_blank">
                       📘 예스24
                    </a>

                    <a class="kyobo"
                       href="https://search.kyobobook.co.kr/search?keyword=${encodeURIComponent(book.title)}"
                       target="_blank">
                       📗 교보문고
                    </a>

                </div>

            </div>
            <br>
            `;

        });

        result.innerHTML=html;

    }catch(err){

        console.error(err);

        result.innerHTML="<p>⚠️ 오류가 발생했어요.</p>";

    }

}
