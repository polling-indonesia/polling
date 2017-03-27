function createUser(){
  $(document).ready(function(){
    $.ajax({
      url  : "http://localhost:3000/users/new",
      type : "POST",
      data: {
        username: $('#signup-username').val(),
        password: $('#signup-password').val()
      },
      success: function(data) {
        console.log(data.err);
        if (data.err) {
          alert(data.err)
        }
        else {
          alert("Register success! Now Login!")
        }

      }
    })
  })
}

function login(){
    $.ajax({
      url  : "http://localhost:3000/users/login",
      type : "POST",
      data: {
        username: $('#signin-username').val(),
        password: $('#signin-password').val()
      },
      success: function(data) {
        if (data.err) {
          alert(data.err)
        }
        else {
          // console.log(data.token)
          localStorage.setItem("token", data.token)
          localStorage.setItem("username", data.username)

          window.location.href = 'http://127.0.0.1:8080/index.html'
        }
      }
    })
}
