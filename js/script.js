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

const submitForm = () => {
  const spreadsheetId = "test-table-407114";
  const range = "List1!A:A";
  const apiKey = "aGOCSPX-4i1SvB8hprKAv1LeRrua_cZZ0-yM";

  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [["data1", "data2"]] }),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

sendButton.addEventListener("click", submitForm);
