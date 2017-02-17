function createUser(){
  $(document).ready(function(){
    $.ajax({
      url  : `http://localhost:3000/polls/${localStorage.getItem("username")}`,
      type : "POST",
      data: {
        title : $('#input-title').val(),
        desc : $('#input-description').val()
      },
      success: function(data) {
        localStorage.setItem("title", data.title)
        localStorage.setItem("desc", data.desc)
        window.location.href = 'http://127.0.0.1:8080/create-detail.html'
      }
    })
  })
}
