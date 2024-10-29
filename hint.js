document.getElementById('toggleButton').addEventListener('click', function() {
    var content = document.querySelector('.content');
    content.classList.add('show'); // Show the content area
    var toggleButton = document.getElementById('toggleButton');
    var closeButton = document.getElementById('closeButton');
    
    // Hide the "Get Hints" button and show the "X" button
    toggleButton.style.display = 'none';
    closeButton.style.display = 'inline-block';
});

document.getElementById('closeButton').addEventListener('click', function() {
    var content = document.querySelector('.content');
    content.classList.remove('show'); // Hide the content area
    var toggleButton = document.getElementById('toggleButton');
    var closeButton = document.getElementById('closeButton');
    
    // Hide the "X" button and show the "Get Hints" button
    closeButton.style.display = 'none';
    toggleButton.style.display = 'inline-block';
});
