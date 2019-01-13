


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

    return baseURL + $.param(params);

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
            .then(updatePage);
    } else {
        document.querySelector('#articleForm').reportValidity()
    }


})