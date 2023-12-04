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
  function start() {
    gapi.client
      .init({
        apiKey: "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",
        clientId:
          "267145899813-qfs54lb9il2oo9e1gnln8rqfcn1c6nd2.apps.googleusercontent.com",
        scope: "profile",
      })
      .then(function () {
        return gapi.client.people.people.get({
          resourceName: "people/me",
          "requestMask.includeField": "person.names",
        });
      })
      .then(
        function (response) {
          console.log(response.result);

          const accessToken = gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().access_token;
          const spreadsheetId = "unitedtrade-407114";
          const range = "List1!A:A";

          fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                values: [response.result.names[0].displayName],
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
        },
        function (reason) {
          console.dir(reason);
        }
      );
  }

  gapi.load("client", start);
};

sendButton.addEventListener("click", submitForm);
