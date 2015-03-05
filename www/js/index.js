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
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
    
    	$(".button").on("click", function() {

            $('.button').transition({ y: '3000px', duration: 2000 });
            //$('.header').transition({ y: '-300px', duration: 500 });
            $('.preloader').transition({ opacity: 1 });

            setTimeout(function() {
                $('.preloader').transition({ opacity: 0 });
                $('.output').transition({ opacity: 1 });
                if(decide() == 0) {
                    $(".output").html("Don't do it!")
                    $("body").addClass("negative");
                    $("body").removeClass("positive");
                } else {
                    $(".output").html("Do it!");
                    $("body").addClass("positive");
                    $("body").removeClass("negative");
                }
            }, 3000);
    	});
    }
};
