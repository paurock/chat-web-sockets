//Make connection
const socket = io.connect("http://localhost:4000");

//Query DOM
const message = document.getElementById("message"),
  nick = document.getElementById("nick"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//Emmit events
btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    nick: nick.value
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", nick.value);
});
//Listen for events
socket.on("chat", data => {
  output.innerHTML +=
    "<p><strong>" + data.nick + ":</strong>" + data.message + "</p>";
});

socket.on("typing", data => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
