function deleteMessage(messageURL) {
	let target = document.querySelector('#delete-post');
	target.action = '/delete-message/' + messageURL;
}