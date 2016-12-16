    var Apple = {};
    var ipad = "false";
    Apple.UA = navigator.userAgent;
    Apple.Device = false;
    Apple.Types = ["iPhone", "iPod", "iPad", "other"];
    for (var d = 0; d < Apple.Types.length; d++) {
        var t = Apple.Types[d];
        Apple[t] = !!Apple.UA.match(new RegExp(t, "i"));
        Apple.Device = Apple.Device || Apple[t];
    }
    var rightlock = 0;
    var leftlock = 0;
    var oldleftlock = 0;
    var oldrightlock = 0;
    var ResetAll = "true";
    var O = 0;
    var tilt = 0;
    function init() {

        var dataContainerOrientation = document.getElementById('dataContainerOrientation');
        var dataContainerMotion = document.getElementById('dataContainerMotion');

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function (event) {


                var alpha = event.alpha;
                var beta = event.beta;
                var gamma = event.gamma;


                if (alpha != null || beta != null || gamma != null)
                    dataContainerOrientation.innerHTML = '<strong>Orientation</strong><br />alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
            }, false);
        }

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function (event) {
                var x;
                var y;
                var z;
                if (event.accelerationIncludingGravity) {
                    x = event.accelerationIncludingGravity.x;
                    y = event.accelerationIncludingGravity.y;
                    z = event.accelerationIncludingGravity.z;
                }

                else if (event.acceleration) {
                    x = event.acceleration.x;
                    y = event.acceleration.y;
                    z = event.acceleration.z;
                }


                var r = event.rotationRate;
                var html = '<strong>Acceleration</strong><br />';

                //keep left=left when orientation changes
                window.addEventListener("orientationchange", function () {
                    O = window.orientation;
                }, false);


                if (O == 0) {
                    tilt = x;
                    //Portrait;
                    /*         if (x < -4) {
                     setleftlock();
                     }

                     if (x > 4) {
                     setrightlock();
                     }

                     if ((x < 2) && (x > -2)) {
                     setResetAll()
                     }*/
                }


                //LANDSCAPE
                if ((O == 90) || (O == -90)) {
                    tilt = y;
                    /*          if (y < -4) {
                     setrightlock();
                     }

                     if (y > 4) {
                     setleftlock();
                     }

                     if ((y < 2) && (y > -2)) {
                     setResetAll()
                     }*/
                }

                if (tilt < -4) {
                    setleftlock();
                }

                if (tilt > 4) {
                    setrightlock();
                }

                if ((tilt < 2) && (tilt > -2)) {
                    setResetAll()
                }


                html += 'x: ' + x + '<br />y: ' + y + '<br/>z: ' + z + '<br />' + ' leftlock ' + leftlock + ' rightlock ' + rightlock + '<br />' + ' oldleftlock ' + oldleftlock + ' oldrightlock ' + oldrightlock + ' ResetAll ' + ResetAll + '<br />';
                dataContainerMotion.innerHTML = html;


            });

        }
    }

    function setleftlock() {
        left();
        leftlock = leftlock + 1;
    }
    function setrightlock() {
        right();
        rightlock = rightlock + 1;
    }

    function setResetAll() {

        if (leftlock > 0) {
            if (oldleftlock == 1) {
                leftlock = 0;
                oldleftlock = 0;
                oldrightlock = 0;
                screen_reset();
            }
        }

        if (rightlock > 0) {
            if (oldrightlock == 1) {
                rightlock = 0;
                oldrightlock = 0;
                oldleftlock = 0;
                screen_reset();
            }
        }


        if (leftlock > 0) {
            oldleftlock = 1;
            left();
            leftlock = 0;
        }

        if (rightlock > 0) {
            oldrightlock = 1;
            right();
            rightlock = 0;
        }
    }


    function rightc() {
        $(leftside).attr("style", " position:absolute; left:0vw; transition: left 2s;");
        $(rightside).attr("style", " position:absolute; left:0vw; transition: left 2s;");
    }


    function right() {
        $(mr).attr("style", " opacity:1;transition: opacity 2s;  ");
        $(ml).attr("style", "opacity:0;transition: opacity 2s;  ");
        $(leftside).attr("style", " position:absolute; left:0vw; transition: left 2s;");
        $(rightside).attr("style", " position:absolute; left:0vw; transition: left 2s;");

        $(lefttext).attr("style", "opacity: 1; transition: opacity 2s;");
        $(righttext).attr("style", "opacity: 1; transition: opacity 2s;");
        $(left_promo).attr("style", "opacity: 1; transition: opacity 2s;");
        $(fdoffer).attr("style", "opacity: 1; transition: opacity 2s;");
        $(rightside).attr("style", " left:0vw; transition: left 2s;");


    }

    function leftc() {
        $(leftside).attr("style", " margin-left:-25vw; transition: margin-left 2s;");
        $(rightside).attr("style", " margin-left:50vw; transition: margin-left 2s;");
    }

    function left() {
        $(leftside).attr("style", " margin-left:-100vw; transition: margin-left 2s;");
        $(rightside).attr("style", " margin-left:-100vw; transition: margin-left 2s;");
        $(ml).attr("style", "opacity:1;transition: opacity 2s;  ");
        $(mr).attr("style", "opacity:0; transition: opacity 2s;  ");
        $(righttext).attr("style", "opacity: 1; transition: opacity 2s;");
        $(lefttext).attr("style", "opacity: 1; transition: opacity 2s;");
        $(fdoffer).attr("style", "opacity: 1; transition: opacity 2s;");
        $(left_promo).attr("style", "opacity: 1; transition: opacity 2s;");
        $(leftside).attr("style", " left:-50vw; transition: left 2s;");


    }

    function screen_reset() {

        $(rightside).attr("style", " margin-left:0vw; transition: margin-left 2s;");
        $(leftside).attr("style", " margin-left:-100vw; transition: margin-left 2s;");
        /*
         $(mr).attr("style", " opacity:0;transition: opacity 2s;  ");
         $(ml).attr("style", " opacity:0;transition: opacity 2s;  ");
         //$(rightside).attr("style", " margin-left:50vw; transition: margin-left 2s;");
         $(lefttext).attr("style","opacity: 1; transition: opacity 2s;");
         $(righttext).attr("style","opacity: 1; transition: opacity 2s;");
         $(fdoffer).attr("style","opacity: 1; transition: opacity 2s;");
         $(left_promo).attr("style","opacity: 1; transition: opacity 2s;");*/


    }

    var x;
    var rightleft = "none";
    //alert("leftright");
    window.addEventListener('devicemotion', function (event) {
        if (event.accelerationIncludingGravity) {
            x = event.accelerationIncludingGravity.x;
        }
        rightleft = x * 100;
    }, false);

