document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Create a new FormData object from the form element
        const formData = new FormData(form);

        // Convert FormData to an object
        const Params = new URLSearchParams();

        formData.forEach((value, key) => {
            Params.append(key,value)
        });

        // Log the key-value pairs to the console
        console.log(formData)
        console.log(Params.toString())
    });
});