sChat
=====

sChat - lib for cliend side chat used HTML5 postMessage


How to use
-----

initilize the schat object with options 
```
schat = new sChat({
	target: "*"
})
```
and using callback for received messages.
For example:

```
window.addEventListener('message', function(e) {
	schat.receive(e.data, schat.options.content_id);
}, false)
```

if your want some smiles, schat supports :), :(, :D, :P emoticons out of the box.
You have to style your smiles using classes with "emoticon" preffix like:
```
	.emoticon-grin { background-position: 0 0; }
	.emoticon-smile { background-position: -18px 0; }
	.emoticon-wink { background-position: -36px 0; }
	.emoticon-sad { background-position: -54px 0; }
	.emoticon-cheeky { background-position: -72px 0; } 
```

if you want your our smiles your can use it, by initialize in this format: 
```
schat = new sChat({
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
```
You can see a working example at http://valerykalashnikov.github.io/schat/