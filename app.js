function startgame(type) {
    function start1() {
        var st = document.getElementById("start");
        st.style.display = "none";

        var bike = document.getElementById('bike');
        var bikespeed = 1;
        var isGameover = 1;
        var bikeright = parseInt(window.getComputedStyle(bike).getPropertyValue("right"));
        var screen = document.getElementById('screen');
        var bike1 = document.getElementById('bike-1');
        var bike2 = document.getElementById('bike-2');
        var isClose = false;
        var distance = 0;

        // ===== أسئلة الرياضيات =====
        var questions = [
            { q: "بكم طريقة يمكن اختيار ٣ عناصر من ٧ عناصر؟", options: ["٣٥", "٢١", "٢١٠"], answer: "٣٥" },
            { q: "عدد تباديل ٣ عناصر من ٧ عناصر مختلفة:", options: ["٢١٠", "٣٥", "١٢٠"], answer: "٢١٠" },
            { q: "بكم طريقة يمكن اختيار ٢ طالبين من ٦ طلاب؟", options: ["١٥", "١٢", "٣٠"], answer: "١٥" },
            { q: "عدد تباديل ٤ عناصر من ٦ عناصر مختلفة:", options: ["٣٦٠", "١٥", "٧٢٠"], answer: "٣٦٠" },
            { q: "عدد الحدود في مفكوك (١ + س)^٥", options: ["٥", "٦", "٧"], answer: "٦" },
            { q: "مجموع معاملات مفكوك (١ + س)^٦", options: ["٣٢", "٦٤", "١٢٨"], answer: "٦٤" },
            { q: "عدد تباديل ٥ عناصر من ٧ عناصر مختلفة:", options: ["٢٥٢٠", "٨٤٠", "٢١"], answer: "٢٥٢٠" },
            { q: "بكم طريقة يمكن اختيار ٤ عناصر من ٨ عناصر؟", options: ["٧٠", "٥٦", "١٦٨٠"], answer: "٧٠" },
            { q: "عدد طرق ترتيب ٤ كتب مختلفة في صف واحد:", options: ["٢٤", "١٦", "٤"], answer: "٢٤" },
            { q: "عدد طرق ترتيب ٣ كتب من ٥ كتب مختلفة:", options: ["٦٠", "٢٠", "١٠"], answer: "٦٠" }
        ];

        var questionIndex = 0;
        var questionLock = false;
        var correctCount = 0;

        function shuffle(arr) {
            var a = arr.slice();
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = a[i];
                a[i] = a[j];
                a[j] = temp;
            }
            return a;
        }

        questions = shuffle(questions).slice(0, 5);

        function askMathQuestion() {
            if (questionIndex >= questions.length) {
                questionIndex = 0;
            }

            var item = questions[questionIndex];
            questionIndex++;

            var text =
                "سؤال رياضيات\n\n" +
                item.q + "\n\n" +
                "١) " + item.options[0] + "\n" +
                "٢) " + item.options[1] + "\n" +
                "٣) " + item.options[2] + "\n\n" +
                "اكتب رقم الإجابة الصحيحة: ١ أو ٢ أو ٣";

            var userInput = prompt(text);

            if (userInput === null) {
                return false;
            }

            userInput = userInput.trim();

            var selectedAnswer = "";
            if (userInput === "1" || userInput === "١") {
                selectedAnswer = item.options[0];
            } else if (userInput === "2" || userInput === "٢") {
                selectedAnswer = item.options[1];
            } else if (userInput === "3" || userInput === "٣") {
                selectedAnswer = item.options[2];
            } else {
                return false;
            }

            if (selectedAnswer === item.answer) {
                correctCount++;
                localStorage.setItem("math_correct_count", correctCount);
                alert("إجابة صحيحة ✅ أكمل اللعب");
                return true;
            } else {
                alert("إجابة خاطئة ❌");
                return false;
            }
        }

        function handleCollision(car) {
            if (questionLock || !isGameover) return;

            questionLock = true;

            var ok = askMathQuestion();

            if (ok) {
                // إبعاد السيارة المصطدم بها حتى لا تتكرر نفس الصدمة فورًا
                if (car) {
                    car.style.top = "-300px";
                    car.style.opacity = "0";
                    setTimeout(function () {
                        if (car.parentNode) {
                            car.parentNode.removeChild(car);
                        }
                    }, 100);
                }
                questionLock = false;
            } else {
                isGameover = 0;
            }
        }

        // ===== الحركة والتحكم =====
        document.onkeydown = function (e) {
            if (!isGameover) return;

            if (e.keyCode == 39) {
                if (bikeright > 350) {
                    bikeright -= 20;
                    bike.style.right = bikeright + "px";
                }
                bike.style.transform = "rotate(20deg)";
            }
            else if (e.keyCode == 37) {
                if (bikeright < 590) {
                    bikeright += 10;
                    bike.style.right = bikeright + "px";
                }
                bike.style.transform = "rotate(-20deg)";
            }
            else if (e.keyCode == 38) {
                if (bikespeed < 20) {
                    bikespeed += 0.3;
                }

                var bike1btm;
                bike1btm = parseInt(window.getComputedStyle(bike1).getPropertyValue("bottom"));
                bike1.style.bottom = (bike1btm - bikespeed) + "px";

                var bike2btm = parseInt(window.getComputedStyle(bike2).getPropertyValue("bottom"));
                bike2.style.bottom = (bike2btm - bikespeed) + "px";

                distance += 0.5;
            }
            else if (e.keyCode == 40) {
                if (bikespeed > 0) bikespeed--;
            }
            else if (e.keyCode == 13) {
                if (isClose) {
                    console.log("close");
                }
            }
        };

        document.onkeyup = function () {
            bike.style.transform = "rotate(0deg)";
        };

        setInterval(() => {
            distance += 0.2;
            var tot_dis = document.getElementById('dis');
            if (tot_dis) {
                tot_dis.innerHTML = (parseInt(distance)) + "m";
            }
        }, 100);

        setInterval(() => {
            if (bikespeed > 0) {
                bikespeed -= 2;
                if (bikespeed < 0) bikespeed = 0;
            }
        }, 500);

        // ===== إضافة السيارات =====
        function addcar() {
            if (!isGameover) return;

            var randomno = Math.random();
            var car = document.createElement("div");
            car.classList.add("car");

            if (randomno < 0.25) {
                car.style.left = "330px";
            }
            else if (randomno <= 0.5) {
                car.style.left = "400px";
            }
            else if (randomno <= 0.75) {
                car.style.left = "470px";
            }
            else {
                car.style.left = "540px";
            }

            screen.appendChild(car);

            if (isGameover) {
                setTimeout(addcar, Math.max(600, 2000 - 30 * bikespeed));
            }
        }

        addcar();

        // ===== تحريك السيارات + التصادم =====
        setInterval(() => {
            var cars = document.getElementsByClassName("car");

            for (var i = 0; i < cars.length; i++) {
                var car = cars[i];
                var cartop = parseInt(window.getComputedStyle(car).getPropertyValue("top"));
                var carbtm = parseInt(window.getComputedStyle(car).getPropertyValue("bottom"));
                var bikerightNow = parseInt(window.getComputedStyle(bike).getPropertyValue("right"));

                car.style.top = cartop + (1 + parseInt(bikespeed / 4)) + "px";

                if ((carbtm > -75 && carbtm < 90) && (car.style.left == "330px") && (bikerightNow > 520 && bikerightNow < 600)) {
                    handleCollision(car);
                }
                else if ((carbtm > -75 && carbtm < 90) && (car.style.left == "400px") && (bikerightNow > 460 && bikerightNow < 530)) {
                    handleCollision(car);
                }
                else if ((carbtm > -75 && carbtm < 90) && (car.style.left == "470px") && (bikerightNow > 390 && bikerightNow < 460)) {
                    handleCollision(car);
                }
                else if ((carbtm > -75 && carbtm < 90) && (car.style.left == "540px") && (bikerightNow > 320 && bikerightNow < 390)) {
                    handleCollision(car);
                }
            }
        }, 5);

        // ===== حركة الدراجات الأخرى =====
        setInterval(() => {
            var bike1btm = parseInt(window.getComputedStyle(bike1).getPropertyValue("bottom"));
            bike1.style.bottom = (bike1btm + 2) + "px";
        }, 2);

        setInterval(() => {
            var bike2btm = parseInt(window.getComputedStyle(bike2).getPropertyValue("bottom"));
            bike2.style.bottom = (bike2btm + 1) + "px";
        }, 4);

        setInterval(() => {
            var bike1left = parseInt(window.getComputedStyle(bike1).getPropertyValue("left"));
            var bike1hor = Math.floor(Math.random() * 30);
            var bike1right = parseInt(window.getComputedStyle(bike1).getPropertyValue("right"));
            var pos = Math.random() < 0.5 ? 1 : 0;

            if (pos && (bike1left > 380)) {
                bike1.style.right = (bike1right + bike1hor) + "px";
            }
            else if (!pos && (bike1left < 560)) {
                bike1.style.right = (bike1right - bike1hor) + "px";
            }
        }, 500);

        setInterval(() => {
            var bike2left = parseInt(window.getComputedStyle(bike2).getPropertyValue("left"));
            var bike2hor = Math.floor(Math.random() * 50);
            var bike2right = parseInt(window.getComputedStyle(bike2).getPropertyValue("right"));
            var pos = Math.random() < 0.5 ? 1 : 0;

            if (pos && (bike2left > 380)) {
                bike2.style.right = (bike2right + bike2hor) + "px";
            }
            else if (!pos && (bike2left < 560)) {
                bike2.style.right = (bike2right - bike2hor) + "px";
            }
        }, 700);

        // ===== قرب الدراجات =====
        setInterval(() => {
            var bike1y = parseInt(window.getComputedStyle(bike1).getPropertyValue("bottom"));
            var bike2y = parseInt(window.getComputedStyle(bike2).getPropertyValue("bottom"));
            var bikey = parseInt(window.getComputedStyle(bike).getPropertyValue("bottom"));
            var bike1x = parseInt(window.getComputedStyle(bike1).getPropertyValue("right"));
            var bike2x = parseInt(window.getComputedStyle(bike2).getPropertyValue("right"));
            var bikex = parseInt(window.getComputedStyle(bike).getPropertyValue("right"));

            if (((Math.abs(bikey - bike1y)) < 80 || (Math.abs(bikey - bike2y)) < 80) && ((Math.abs(bikex - bike1x)) < 60 || (Math.abs(bikex - bike2x)) < 60)) {
                isClose = true;
            } else {
                isClose = false;
            }
        }, 10);

        // ===== شاشة الخسارة =====
        setInterval(() => {
            if (!isGameover) {
                var yu = document.getElementsByClassName("board");
                if (yu[0]) {
                    yu[0].style.display = "flex";
                }
            }
        }, 50);

        // ===== سرعة الطريق =====
        setInterval(() => {
            var op = document.getElementById("road");
            if (op) {
                op.style.animationDuration = Math.max(5, 100 - (bikespeed * 4)) + "s";
            }
        }, 50);
    }

    function restart() {
        window.location.reload();
    }

    switch (type.className) {
        case "startbutton":
            start1();
            break;
        case "gameover":
            restart();
            break;
    }
}
