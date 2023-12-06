const modalWindow = document.querySelector(".modalWrp");

const contactUsButton = document.getElementById("contact-us-button");
const leaveRequestButton = document.getElementById("leave-request-button");
const leaveRequestButton2 = document.getElementById("leave-request-button-2");

const closeButton = document.getElementById("close-button");
const sendButton = document.getElementById("send-button");

const changeModalWindow = () => {
  if (modalWindow.classList.contains("active")) {
    modalWindow.classList.remove("active");
  } else {
    modalWindow.classList.add("active");
  }
};

contactUsButton.addEventListener("click", changeModalWindow);
leaveRequestButton.addEventListener("click", changeModalWindow);
leaveRequestButton2.addEventListener("click", changeModalWindow);
closeButton.addEventListener("click", changeModalWindow);
const inputName = document.getElementById("input-name");
const inputPhone = document.getElementById("input-phone");
const inputMessage = document.getElementById("input-message");

// const labelUp = ({ target }) => {
//   if (target.value) {
//     target.style.top = "0px";
//   } else {
//     target.style.top = "23px";
//   }
// };

// inputName.addEventListener("input", labelUp);

const submitForm = () => {
  if (!inputName.value || !inputPhone.value || !inputMessage.value) return;

  fetch(`https://api.unitedtrade.co/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      inputName.value,
      inputPhone.value,
      inputMessage.value,
    ]),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

sendButton.addEventListener("click", submitForm);
