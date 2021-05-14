//Devo fare una get al database per ottenere il JSON con i progetti recenti e con la bio aggiornata.
//Uso fetch
fetch('https://test-site.free.beeceptor.com/MainContent.json')
.then(response => response.text())
.then(out => JSON.parse(out))
.then(data => {
	let bio = Array.prototype.slice.call(document.getElementsByClassName('bio')); //In teoria è uno solo...comunque
	bio[0].innerHTML = data.bio;
})
.catch(err => console.log(err))