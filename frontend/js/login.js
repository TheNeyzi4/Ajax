const url_server = `https://localhost:7037`
async function getToken() {
	const url_auth = `${url_server}/api/apiuser/Auth`
	return await fetch(
		url_auth,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: 'zxc@gmail.com',
				password: 'zxczxczxc'
			})
		}
	).then(response => {
		if (!response.ok)
			throw new Error('Fail to fetch JWT Token ...')
		return response.json()
	}).then(data => {
		return data.token
	})
		.catch(err => console.log(err))
}
getToken()

document.getElementById('loginForm').addEventListener('submit', async function (event) {
	event.preventDefault();

	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const token = await getToken()

	const response = await fetch(`${url_server}/api/apiuser/auth`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	});

	if (response.ok) {
		const data = await response.json();
		localStorage.setItem('token', data.token);
		alert('Вхід успішний!');
		window.location.href = 'index.html';  // Перехід на головну сторінку
	} else {
		const error = await response.json();
		alert(`Помилка: ${error.message}`);
	}
});

const logout = () => {
	localStorage.removeItem('token')
	window.location.href = 'index.html';
}