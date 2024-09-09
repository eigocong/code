document.querySelectorAll('.shape-option').forEach(option => {
    option.addEventListener('click', function() {
        const correctAnswer = document.getElementById("circle"); 
        document.body.style.backgroundColor = (this === correctAnswer) ? "#05FF00" : "#FF2424";
        document.getElementById("nextButton").style.display = (this === correctAnswer) ? "block" : "none";
    });
});