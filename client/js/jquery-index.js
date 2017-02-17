$(document).ready(function() {
  if(localStorage.getItem("token") == null)
    window.location.href = 'http://127.0.0.1:8080/login.html'
})

function logOut() {
  localStorage.clear()
    window.location.href = 'http://127.0.0.1:8080/login.html'
}
