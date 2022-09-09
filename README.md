<p align="center"><a href="https://lemon.every.yoga" target="_blank" rel="noopener noreferrer"><img width="100" src="https://lemon.every.yoga/images/lemon.png" alt="Lemon logo"></a></p>

<p align="center">
<h2 align="center">Refreshing Frontend Framework</h2>
<h3 align="center">Cleanest JS Reactivity &amp; Purest HTML/CSS Components</h3>
</p>

Early Stage Frontend Framework alternative to Vue/React/Angular. Join us at https://reddit.com/r/lemonjs or view the demo at https://lemon.every.yoga

### Install & Use
```
wget https://raw.githubusercontent.com/everyyoga/lemon/main/lemon.js
```

Simple Example (see /examples for more): 
```
<!-- index.html -->
<html>
    <body>
        <div id="title"></div>
        <input type="text" id="titleInput"></div>
        <script src="./lemon.js"></script>
        <script>
        Lemon.react({
            inputs:{"#titleInput":"title"},
            outputs:{"#title":"title"} 
        });
        Lemon.watch("title",(newValue,oldValue) => {
            console.log('title changed to ' + newValue);
        });
        Lemon.title = 'Hello Lemon';
        </script>
    </body>
</html>
```

### Running the /examples Folder
For the examples folder you'll need a server, otherwise you'll receive a message like 'CORS policy: Cross origin requests are only supported for protocol schemes: http, data, ..'. 

```
# example simple server setup
npm install -g live-server
cd examples
live-server --port=8888 --no-browser
# You should see something like: Serving "lemon/examples" at http://127.0.0.1:8888
# Browse to http://127.0.0.1:8888
```





