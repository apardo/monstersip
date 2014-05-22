var monsterxSrvs = angular.module('monsterxSrvs', []);

monsterxSrvs.factory('sipSrv', function() {

	function SIP(username, password) {

		var selfView =   document.getElementById('selfVideo');
		var remoteView =  document.getElementById('remoteVideo');

		var username = username;
		var password = password;

		var uaConfig = function() {
			return {
				'ws_servers': 'ws://192.168.1.221:8080',
				'uri': 'sip:'+username+'@192.168.1.221',
				'password': password
			}
		}

		var phone = new JsSIP.UA(uaConfig());

		phone.on('newMessage', function(e) {

			var request = e.data.request,
				message = e.data.message;

			if (message.direction === 'incoming') {
				console.log('MENSAJE: '+request.body);
			}
		});

		phone.on('newRTCSession', function(e) {

			var call = e.data.session;

			call.on('started', function(e) {

				console.log("DATA: "+e);

				if ( call.getLocalStreams().length > 0) {
			    	selfView.src = window.URL.createObjectURL(call.getLocalStreams()[0]);
			      	selfView.volume = 0;
				}

				if ( call.getRemoteStreams().length > 0) {
					remoteView.src = window.URL.createObjectURL(call.getRemoteStreams()[0]);
				}
			});			
		});

		this.login = function() {
			phone.start();
			$('#loginModal').modal('hide');
		}

		this.call = function(destination) {

			var callEventHandlers = {
			  'progress':   function(e){ /* Your code here */ },
			  'failed':     function(e){ /* Your code here */ },
			  'started':    function(e){
			    var rtcSession = e.sender;

			    // Attach local stream to selfView
			    if (rtcSession.getLocalStreams().length > 0) {
			    	selfView.src = window.URL.createObjectURL(rtcSession.getLocalStreams()[0]);
			    }

			    // Attach remote stream to remoteView
			    if (rtcSession.getRemoteStreams().length > 0) {
			    	remoteView.src = window.URL.createObjectURL(rtcSession.getRemoteStreams()[0]);
			    }
			  },
			  'ended':      function(e){ /* Your code here */ }
			};

			var callOpts = {
			  'eventHandlers': callEventHandlers,
			  'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ],
			  'mediaConstraints': {'audio': true, 'video': true}
			};

			phone.call(destination, callOpts);
		}

		this.sendMessage = function(destination, message) {
			var messageEventHandlers = {
				'succeeded': function(e){ /* Your code here */ },
				'failed':    function(e){ /* Your code here */ }
			};

			var msgOpts = {
				'eventHandlers': messageEventHandlers
			};

			phone.sendMessage(destination, message, msgOpts);
		}
	}

	return SIP;

});
