let slideIndices = [0, 0, 0]; // Array to store current slide index for each slideshow

function showSlides(slideshowIndex) {
    let slideshows = document.querySelectorAll('.slideshow-container');
    let slides = slideshows[slideshowIndex].querySelectorAll('.slides img');
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = "none";
    });
    
    // Display current slide
    slides[slideIndices[slideshowIndex]].style.display = "block";
}

function nextSlide(slideshowIndex) {
    let slideshows = document.querySelectorAll('.slideshow-container');
    let slides = slideshows[slideshowIndex].querySelectorAll('.slides img');
    
    // Move to next slide
    slideIndices[slideshowIndex]++;
    
    // If index goes beyond the last slide, stay on the last slide
    if (slideIndices[slideshowIndex] >= slides.length) {
        slideIndices[slideshowIndex] = slides.length - 1;
    }
    
    // Display current slide
    showSlides(slideshowIndex);
}

function prevSlide(slideshowIndex) {
    // Move to previous slide
    slideIndices[slideshowIndex]--;
    
    // If index goes below 0, loop to the last slide
    if (slideIndices[slideshowIndex] < 0) {
        slideIndices[slideshowIndex] = slideshows[slideshowIndex].querySelectorAll('.slides img').length - 1;
    }
    
    // Display current slide
    showSlides(slideshowIndex);
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize and display the first slide for each slideshow
    document.querySelectorAll('.slideshow-container').forEach((slideshow, index) => {
        showSlides(index);
    });
    
    // Attach event listeners to buttons
    document.querySelectorAll('.slideshow-container').forEach((slideshow, index) => {
        slideshow.querySelector('.prev').addEventListener('click', () => {
            prevSlide(index);
        });
        slideshow.querySelector('.next').addEventListener('click', () => {
            nextSlide(index);
        });
    });
});
