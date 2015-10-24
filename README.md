Slayer game
===========

**Work In Progress**

## Demo

Game running on a [demo page](http://juchi.github.io/slayer/).

## Build from source

In order to build the distributed file from source, you need to have npm installed
and run the following steps.

```
npm install
npm run-script grunt
```

You can then just open index.html in your web browser.

As the game configuration is located in a JSON file loaded through AJAX,
if you use Chrome you cannot use the file:// protocol because of the security policy.
The easiest solution is to start a web server on localhost serving the files.

```
python -m SimpleHTTPServer 8080   # python 2.x
python -m http.server 8080        # python 3.x
```

Chrome (and other browsers) will then accept to run the game when accessing http://localhost:8080 .
