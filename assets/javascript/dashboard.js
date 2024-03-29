// DropDown Functionality
// Function to toggle the dropdown
function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// Function to toggle the dropdown
function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
document.addEventListener("click", function (event) {
  var dropdown = document.getElementById("myDropdown");
  if (!event.target.matches(".dropbtn") && !dropdown.contains(event.target)) {
    dropdown.classList.remove("show");
  }
});

 // Preloader Functionality
 setTimeout(function(){
  $('.wrapper').fadeOut();
}, 2800);