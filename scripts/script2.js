let page = 1;
let isLoaded = false;

function fetchData(page) {
    fetch("https://jsonplaceholder.typicode.com/posts?_page="+page+"&_limit=12")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    .then((posts) => {
        let grid = document.getElementById("page2content");

        let gridrow = document.createElement("span");
        gridrow.setAttribute("class", "page2row");

        for (let i = 1; i <= 12; i++) {
            if (posts[i-1] != null) {
                const post = document.createElement("span");

            const title = document.createElement("h4");
            title.textContent = posts[i-1].title;
            post.appendChild(title);

            const text = document.createElement("p");
            text.textContent = posts[i-1].body;
            post.appendChild(text);

            gridrow.appendChild(post);

            if (i % 3 == 0) {
                grid.appendChild(gridrow);
                gridrow = document.createElement("span")
                gridrow.setAttribute("class", "page2row");
            }
            }
        }
    })
}

window.onload = function () {
    isLoaded = true;
}

window.addEventListener('scroll', function() {
    if (isLoaded) {
        if ((window.innerHeight + Math.round(window.scrollY)) >= Math.round(document.body.offsetHeight)) {
            fetchData(++page);
        }
    }
});

fetchData(page);