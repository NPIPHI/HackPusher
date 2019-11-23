function scrollToBottom() {
    const scrollElement = document.getElementById("chatLog");
    scrollElement.scrollTop = scrollElement.scrollHeight;
}

window.onload = () => {
    scrollToBottom();
}