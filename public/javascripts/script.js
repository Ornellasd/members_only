function deleteMessage(messageURL) {
	const target = document.querySelector('#delete-post');
	target.action = '/delete-message/' + messageURL;
}