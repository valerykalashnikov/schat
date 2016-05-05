sChat
=====

sChat - lib for cliend side chat used HTML5 postMessage

How to use
-----

Initilize the schat object with options:
~~~javascript
var schat = new sChat({
	target: "*"
})
~~~
and use callback function to receive messages.
For example:

~~~javascript
window.addEventListener('message', function(e) {
	schat.receive(e.data, schat.options.content_id);
}, false)
~~~

Schat supports :), :(, :D, ;) emoticons out of the box.
You have to style your smiles using classes with "emoticon" preffix:
~~~css
	.emoticon-grin { background-position: 0 0; }
	.emoticon-smile { background-position: -18px 0; }
	.emoticon-wink { background-position: -36px 0; }
	.emoticon-sad { background-position: -54px 0; }
	.emoticon-cheeky { background-position: -72px 0; } 
~~~

if you want to implement your own smiles: 
~~~javascript
var schat = new sChat({
	target: "*",
	smiles: [
			{regexp: ':\\D', class: 'emoticon-grin'},
			{regexp: ':\\)', class: 'emoticon-smile'},
			{regexp: ':\\(', class: 'emoticon-sad'},
			{regexp: ';\\)', class: 'emoticon-wink'},
			//your custom smiles
			{regexp: ':\\P', class: 'emoticon-cheeky'}
		]
})
~~~
You can check working example out at [http://valerykalashnikov.github.io/schat](http://valerykalashnikov.github.io/schat "Schat")
