var dataLayer = {};
var pageDir = window.location.pathname.replace(/\//g, '');

if (window.location.pathname != '/') {
 	dataLayer = {
		"page": {
			"articleTitle": pageDir,
			"name": 'fund-managers/news/' +  pageDir
		}
	}
} else {
	dataLayer = {
		"page": {
			"name": 'fund-managers/home'
		}
	}
}
