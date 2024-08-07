document.getElementById('openPopupBtn').addEventListener('click', function() {
    document.getElementById('loginPopup').style.display = 'block';
});

document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('loginPopup').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('loginPopup')) {
        document.getElementById('loginPopup').style.display = 'none';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Login form submitted!');
    document.getElementById('loginPopup').style.display = 'none';
});
