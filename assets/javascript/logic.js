


function buildQueryURL() {
    // our base url for NYtimes article search query
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    // the parameters object
    const params = {
        api_key: config.api_key
    }

    const searchTerm = document.querySelector('#topic').value.trim();
    const yearStart = document.querySelector('#startYear').value.trim();
    const yearEnd = document.querySelector('#endYear').value.trim();

    // setting the search term in the parameters
    params.q = searchTerm

    // checks if the year
    if (parseInt(yearStart)) {
        params.begin_date = yearStart + '0101';
    }

    if (parseInt(yearEnd)) {
        params.end_date = yearEnd + '1231';
    }
    console.log(baseURL + $.param(params))
    return baseURL + $.param(params);

}

function updatePage(data) {

    $('#articleDump').empty();

    const articles = data.response.docs;

    const numArticles = document.querySelector('#numArticleSelector').value.trim();

    const articleList = $('<ul class="list-group">');

    for (let i = 0; i < numArticles; i++) {

        let article = articles[i];
        let articleNum = i+1
        let li = $('<li class=" bg-dark list-group-item">');

        //headline
        //byline
        //articlelink
        //publication date
        
        if (article.headline && article.headline.main) {
            
            li.append(  `<h3 class="headline">
                            <span class="label label-primary">${articleNum}</span>
                            <a href="${article.web_url}">${article.headline.main}</a>
                         <h3>`);
        }

        if (article.byline && article.byline.original) {
            li.append(`<i>${article.byline.original}</i>`);
        }

        if (article.snippet) {
            li.append(`<blockquote><i>"${article.snippet}"</i></blockquote>`)
        }

        articleList.append(li);
    }

    $('#articleDump').append(articleList);

    console.log(articles);
}


$('#articleSearch').click(function (event) {
    // stop normal submission event.
    event.preventDefault();
    // set up a validation requirement variable
    const meetsRequirement = document.querySelector('#articleForm').checkValidity();
    // check if the form meets the validation requirement
    if (meetsRequirement) {
        // if it meets the requirements, get the input...
        const input = document.getElementById('topic').value;
        // build the query url...
        fetch(buildQueryURL())
            // convert the results to json..
            .then(function (res) {
                return res.json();
            })
            // update the page
            .then(updatePage);
    } else {
        document.querySelector('#articleForm').reportValidity()
    }


})