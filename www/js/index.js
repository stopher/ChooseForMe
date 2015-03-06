/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


(function() {
    SpriteSpinner = function(el, options){
        var self = this,
            img = el.children[0];
        this.interval = options.interval || 10;
        this.diameter = options.diameter || img.width;
        this.count = 0;
        this.el = el;
        img.setAttribute("style", "position:absolute");
        el.style.width = this.diameter+"px";
        el.style.height = this.diameter+"px";
        return this;
    };
    SpriteSpinner.prototype.start = function(){
        var self = this,
            count = 0,
            img = this.el.children[0];
        this.el.display = "block";
        self.loop = setInterval(function(){
            if(count == 19){
                count = 0;
            }
            img.style.top = (-self.diameter*count)+"px";
            count++;
        }, this.interval);
    };
    SpriteSpinner.prototype.stop = function(){
        clearInterval(this.loop);
        this.el.style.display = "none";
    };
    document.SpriteSpinner = SpriteSpinner;
})();


function createEvent(nameOfCustomEvent) {
  

  var event; // The custom event that will be created

  if (document.createEvent) {
    event = document.createEvent("HTMLEvents");
    event.initEvent(nameOfCustomEvent, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = nameOfCustomEvent;
  }

  event.eventName = nameOfCustomEvent;

  if (document.createEvent) {
    document.dispatchEvent(event);
  } else {
    document.fireEvent("on" + event.eventType, event);
  }

}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', this.onDeviceResume, false);
        document.addEventListener('pause', this.onDevicePause, false);

        var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if(is_chrome) {
            setTimeout(function() {
                createEvent('deviceready');
            },500);            
        }

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    onDeviceResume: function() {
        app.receivedEvent('resume');
    },
    onDevicePause: function() {
        app.receivedEvent('pause');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        if(id === 'resume' || id === 'pause') {
            app.resetApp();
        }

        if(id === 'deviceready') {
            console.log(app);
            console.log("..");
            console.log(this);
            app.initializeApp();
        }
    
    },
    resetApp: function() {
            $('.preloader').transition({ opacity: 0 });
            $('.button').transition({ opacity: 1 });            
            $('.output').transition({ opacity: 0 });
            $("body").removeClass("negative");
            $("body").removeClass("positive");
    },
    initializeApp: function() {

        $(".button").on("click", function() {

            $('.button').transition({ opacity: 0, duration: 500 });            
            $('.preloader').transition({ opacity: 1, duration: 3000 }, function() {
                $('.preloader').transition({ opacity: 0, duration: 500 });
                $('.output').transition({ opacity: 1, duration: 1000 });
                if(decide() == 0) {
                    $(".output").html("Don't do it!")
                    $("body").addClass("negative");
                    $("body").removeClass("positive");
                } else {
                    $(".output").html("Do it!");
                    $("body").addClass("positive");
                    $("body").removeClass("negative");
                }                
            });
        });

        $(".sprite-spinner").each(function(i){
            var s = new SpriteSpinner(this, {
                interval:50
            });
            s.start();
        });
        app.resetApp();

        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    },
};
