function addLoadEvent(func) {
	var oldLoad = window.onload;
	if (typeof oldLoad != "function") {
		window.onload = func;
	} else {
		window.onload = function () {
			oldLoad();
			func();
		};
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addClass(element, value) {
	var test = (!element.className);
	console.log("initial:" + element.className + ", value=" + value + ", important=" + test);
	if (typeof element.className === "undefined") {
		element.className = value;
		console.log("111 value=" + value + ", classname=" + element.classname);
	} else {
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
		console.log("222 classname=" + element.className + ", newClassName=" + newClassName);
	}
}

function highlightPage() {
	if (!document.getElementById || !document.getElementsByTagName) {
		return false;
	}

	var headers = document.getElementsByTagName("header"); 
	if (headers.length <= 0) {
		return false;
	}

	var navs = headers[0].getElementsByTagName("nav");
	if (navs.length <= 0) {
		return false;
	}

	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for (var i = 0; i < links.length; i ++) {
		linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			var linkText = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linkText);
		}
	}
}

function moveElement(elementID, finalX, finalY, interval) {
	console.log("elementId=" + elementID + ", finalX=" + finalX + ", interval=" + interval);
	if (!document.getElementById || !document.getElementById(elementID)) {
		return false;
	}

	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}

	if (!elem.style.left) {
		elem.style.left = "0px";
	}

	if (!elem.style.top) {
		elem.style.top = "0px";
	}

	var xPos = parseInt(elem.style.left);
	var yPos = parseInt(elem.style.top);
	console.log("elementId=" + elementID + ", finalX=" + finalX + ", currX=" + xPos);

	if (xPos == finalX && yPos == finalY) {
		return true;
	}

	if (xPos < finalX) {
		xPos ++;
	} else if (xPos > finalX) {
		xPos --;
	}

	if (yPos < finalY) {
		yPos ++;
	} else if (yPos < finalY) {
		yPos --;
	}

	elem.style.left = xPos + "px";
	elem.style.top = yPos + "px";

	elem.movement = setTimeout(function () {
		moveElement(elementID, finalX, finalY, interval);
	}, interval);
}

function prepareSlideShow() {
	if (!document.getElementById ||  !document.getElementsByTagName || !document.getElementById("intro")) {
		return false;
	}

	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");

	var preview = document.createElement("img");
	preview.setAttribute("src", "images/slideshow.gif");
	preview.setAttribute("alt", "a glimpse of what awaits you");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);

	var links = intro.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i ++) {
		links[i].onmouseover = function () {
			destination = this.getAttribute("href");
			console.log("link=" + destination);
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview", 0, 0, 10);
			}

			if (destination.indexOf("about.html") != -1) {
				moveElement("preview", -150, 0, 10);
			}

			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview", -300, 0, 10);
			}

			if (destination.indexOf("live.hmtl") != -1) {
				moveElement("preview", -450, 0, 10);
			}

			if (destination.indexOf("contact.html") != -1) {
				console.log("it is ok!!!");
				moveElement("preview", -600, 0, 10);
			}
		};
	}

	var frame = document.createElement("img");
	frame.setAttribute("id", "frame");
	frame.setAttribute("src", "images/frame.gif");
	frame.setAttribute("alt", "");
	slideshow.appendChild(frame);
}


function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i = 0; i < sections.length; i ++) {
		if (sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if (!document.getElementsByTagName || !document.getElementById) {
		return false;
	}

	var articles = document.getElementsByTagName("article");
	if (articles.length <= 0) {
		return false;
	}

	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) {
		return false;
	}

	var links = navs[0].getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var hrefText = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(hrefText)) {
			continue;
		}

		links[i].destination = hrefText;
		links[i].onclick = function () {
			showSection(this.destination);
		};
		document.getElementById(hrefText).style.display = "none";
	}
}

function showPic(whichpic) {
	if (!document.getElementById || !document.getElementById("placeholder")) {
		return true;
	}

	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);

	if (!document.getElementById("description")) {
		return true;
	}

	var text = "";
	if (whichpic.getAttribute("title")) {
		text = whichpic.getAttribute("title");
	}

	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = description;
	}

	return false;
}

function preparePlaceholder() {
	if (!document.createElement || !document.createTextNode || !document.getElementById || !document.getElementsByTagName) {
		return false;
	}

	if (!document.getElementById("imagegallery")) {
		return false;
	}

	var imagegallery = document.getElementById("imagegallery");

	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("alt", "my image gallery");

	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var descText = document.createTextNode("Choose an image");
	description.appendChild(descText);

	insertAfter(description, imagegallery);
	insertAfter(placeholder, description);
}

function prepareGallery() {
	if (!document.getElementById || !document.getElementsByTagName || !document.getElementById("imagegallery")) {
		return false;
	}

	var imagegallery = document.getElementById("imagegallery");
	var links = imagegallery.getElementsByTagName("a");

	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			var res = showPic(this);
			console.log(res);
			return res;
		};
	}
}


function stripeTables() {
	if (!document.getElementsByTagName) {
		return false;
	}

	var tables = document.getElementsByTagName("table");
	if (tables.length == 0) {
		return false;
	}

	var rows = tables[0].getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		if (i % 2 == 1) {
			addClass(rows[i], "odd");
		}
	}
}

function highlightRows() {
	if (!document.getElementsByTagName) {
		return false;
	}

	var rows = document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function() {
			addClass(this, "highlight");
		};
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		};
	}
}

function displayAbbreviations() {
	if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
		return false;
	}

	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length == 0) {
		return false;
	}

	var defs = new Array();
	for (var i = 0; i < abbreviations.length; i++) {
		var currAbr = abbreviations[i];
		if (currAbr.childNodes.length < 1) continue;
		var definition = currAbr.getAttribute("title");
		var key = currAbr.lastChild.nodeValue;
		defs[key] = definition;
	}

	var dlist = document.createElement("dl");
	for (key in defs) {
		var dtitle = document.createElement("dt");
		var dtitleText = document.createTextNode(key);
		dtitle.appendChild(dtitleText);
		
		var ddesc = document.createElement("dd");
		var ddescText = document.createTextNode(defs[key]);
		ddesc.appendChild(ddescText);

		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}

	if (dlist.childNodes.length < 1) {
		return false;
	}

	var header = document.createElement("h3");
	var headerText = document.createTextNode("Abbreviations");
	header.appendChild(headerText);

	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) {
		return false;
	}
	articles[0].appendChild(header);
	articles[0].appendChild(dlist);
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideShow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);