const URLparams = async ()=>{
    const current_url_params = window.location.search
    const url = new URL('http://localhost:3000/search/api/v1/');
    if (current_url_params){
        try {
            // Fetch data from the server
            const response = await fetch(`${url}${current_url_params.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }          
    
            // Parse the JSON response
            const data = await response.json();
            console.log(data)
    
            // Update the page content dynamically
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';  // Clear previous results
    
            data.product.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = `Name: ${item.name}, Price: ${item.price}`;
                resultsDiv.appendChild(itemDiv);
            });
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);        
    }
        console.log(current_url_params)
    }
    else{
        console.log("no search parameters")
    }
}

URLparams();


document.getElementById('searchButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value;
    const url = new URL('http://localhost:3000/search/api/v1/');

    // Add search parameters
    const params = new URLSearchParams();
    if (searchInput) {
        params.append('name', searchInput);
    }

    try {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set("name", searchInput);
        const newURL = `${window.location.pathname}?${searchParams.toString()}`
        history.replaceState({},'',newURL)
        // Fetch data from the server
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const data = await response.json();
        console.log(data)

        // Update the page content dynamically
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';  // Clear previous results

        data.product.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `Name: ${item.name}, Price: ${item.price}`;
            resultsDiv.appendChild(itemDiv);
        });


        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});