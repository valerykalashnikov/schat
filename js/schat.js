
var sChat = (function(window, document){
	//create set object to save user logins ti highlight their in text message
	var Set = function() {}
	Set.prototype = {
		add: function(o) { this[o] = true; },
		remove: function(o) { delete this[o]; }
	}

	var Chat = function(options) {
		this.users = new Set();
		this.init = function() {
			this.options = {
				form_id: 'form',
				login_id: 'login',
				msg_id: 'msg',
				content_id: 'content',
				target: null,
				win: parent,
				smiles: [
					{regexp: ':\\D', class: 'emoticon-grin'},
					{regexp: ':\\)', class: 'emoticon-smile'},
					{regexp: ':\\(', class: 'emoticon-sad'},
					{regexp: ';\\)', class: 'emoticon-wink'},
					{regexp: ':\\P', class: 'emoticon-cheeky'}
				]
			};	
			// apply options that user define
			for (i in options) this.options[i] = options[i];
			var form = document.getElementById(this.options.form_id),
			me = this;
			form.onsubmit = function(e) {
				me.send(me.options,e.currentTarget);
				document.getElementById(me.options.msg_id).value = "";
				return false;
			};		
			
	    }

	    this.init()
	}
	Chat.prototype = {
		send: function(options, form) {
			var content = document.getElementById(options.content_id),
			message = {}, input, 
			i;
			for (i = form.children.length;i--;) {
				var input = form.children[i];
				switch(input.id) {
					case options.login_id:
						message.login = input.value;
						this.users.add(input.value);
						break;
					case options.msg_id:
						message.msg = input.value;
						break
				}
				//we use window.locataion href because we are working with files
				//event origin will be empty
				message.origin = window.location.href;

			}
			//Test that user fill the login and msg fields
			if (message.login && message.msg) {
				options.win.postMessage( JSON.stringify(message), options.target );
				this.__appendMessage(message,content,'i-am')
			}
			
			else {
				alert('incorrect login or message');
			}
		},
		receive: function(message,content_id) {
				var msg = JSON.parse(message);
				//add new user to users set
				this.users.add(msg.login);
				//parse messages and add it to the DOM
				this.__appendMessage(msg,document.getElementById(content_id),'received');
		},

		__appendMessage: function(message,contentObj, userClassName) {
			var smiles = this.options.smiles;
			var msgText = message.msg, regExp;
			//highlight user logins
			//Maybe ranges object will be better way, but sting faster to realize
			for (var i in this.users) {
				if (!this.users.hasOwnProperty(i)) continue;
				regExp = new RegExp(i,'g');
				msgText = msgText.replace(regExp, '<span class="user-login">'+i+'</span>');

			}
			//replace smiles symbols to images
			for (var i=smiles.length; i--;) {
				//Maybe ranges object will be better way, but sting faster to realize
				var smileObj = smiles[i];
				regExp = new RegExp(smileObj.regexp, 'g');
				msgText = msgText.replace(regExp, '<span class="emoticon '+smileObj.class+'"></span>')
			}
			//save markup back to message object
			message.msg = msgText;
			var htmlMessage = document.createElement('div');
						htmlMessage.setAttribute('class', 'message');
						htmlMessage.innerHTML = '<p><span class="'+userClassName+'">' + message.login + '</span>: ' + message.msg + '<p>';
					contentObj.appendChild(htmlMessage);
		}
	}

	return Chat;
})(window,document)