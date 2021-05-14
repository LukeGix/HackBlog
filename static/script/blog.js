//Devo prendere il json --> funziona!

fetch('https://sitooo.free.beeceptor.com/Data.json')
.then(response => response.text())
.then(out => JSON.parse(out))
.then(data => {
	let articles = Array.prototype.slice.call(document.getElementsByClassName('title'));
	let timestamp = Array.prototype.slice.call(document.getElementsByClassName('timestamp'));
	articles.forEach((article, index) => {
		article.innerHTML = data.Articles[index].Title;
	})

	timestamp.forEach((time, index) => {
		time.innerHTML = data.Articles[index].Author;
	})
})
.catch(err => console.log(err))