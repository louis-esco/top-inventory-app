const editBtns = document.querySelectorAll(".editBtn, .deleteBtn");

editBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let password = prompt("Please enter password to edit data:");

    if (password === null) {
      e.preventDefault();
      return;
    }

    if (password !== "hello") {
      e.preventDefault();
      alert("Wrong password");
    }
  });
});
