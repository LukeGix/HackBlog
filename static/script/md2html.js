let converter = new showdown.Converter();
let test = '# this is a test';
let html = converter.makeHtml(test);
docuemnt.getElementsByClassName('content')[0].innerHTML = html;