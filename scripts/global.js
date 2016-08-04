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
	if (!element.className) {
		element.className = value;
	} else {
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
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

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideShow);
addLoadEvent(prepareInternalnav);