<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>تسلق البرج</title>
  <style>
    *{
      box-sizing:border-box;
      margin:0;
      padding:0;
    }

    :root{
      --bg1:#06142f;
      --bg2:#0a2150;
      --card:#14306a;
      --card2:#1b3c80;
      --line:rgba(255,255,255,.10);
      --text:#fff;
      --gold:#ffc400;
      --gold2:#ffdc68;
      --good:#9cf3b1;
      --bad:#ffb0b0;
      --shadow:0 18px 40px rgba(0,0,0,.30);
    }

    body{
      font-family:Arial,sans-serif;
      min-height:100vh;
      background:linear-gradient(180deg,var(--bg2),var(--bg1));
      color:var(--text);
    }

    .page{
      width:94%;
      max-width:850px;
      margin:0 auto;
      padding:16px 0 28px;
    }

    .topbar{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:12px;
      margin-bottom:14px;
    }

    .top-card{
      background:linear-gradient(180deg,var(--card2),var(--card));
      border:1px solid var(--line);
      border-radius:18px;
      padding:14px;
      box-shadow:var(--shadow);
    }

    .top-card .label{
      color:#c9d8ff;
      font-size:13px;
      margin-bottom:6px;
    }

    .top-card .value{
      font-size:20px;
      font-weight:700;
    }

    .main-card{
      background:linear-gradient(180deg,var(--card2),var(--card));
      border:1px solid var(--line);
      border-radius:26px;
      padding:16px;
      box-shadow:var(--shadow);
    }

    .game-header{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      margin-bottom:14px;
      flex-wrap:wrap;
    }

    .game-title{
      font-size:28px;
      font-weight:800;
    }

    .badges{
      display:flex;
      gap:8px;
      flex-wrap:wrap;
    }

    .badge{
      background:rgba(255,255,255,.06);
      border:1px solid var(--line);
      padding:8px 12px;
      border-radius:999px;
      color:#eef3ff;
      font-size:14px;
    }

    .start-box{
      margin-bottom:14px;
      display:grid;
      gap:10px;
    }

    .start-btn{
      width:100%;
      border:none;
      border-radius:18px;
      padding:16px;
      font-size:22px;
      font-weight:800;
      background:linear-gradient(180deg,var(--gold2),var(--gold));
      color:#111;
      cursor:pointer;
    }

    .scene{
      position:relative;
      width:100%;
      height:520px;
      border-radius:24px;
      overflow:hidden;
      border:1px solid var(--line);
      background:
        linear-gradient(180deg, rgba(6,20,47,.10), rgba(6,20,47,.28)),
        url("images/tower_game_scene.png") center/cover no-repeat;
      margin-bottom:16px;
    }

    .goal{
      position:absolute;
      left:16px;
      top:16px;
      z-index:4;
      background:rgba(0,0,0,.30);
      border:1px solid rgba(255,255,255,.12);
      color:#fff3c8;
      padding:10px 14px;
      border-radius:16px;
      font-size:14px;
      box-shadow:var(--shadow);
    }

    .platform{
      position:absolute;
      height:16px;
      background:linear-gradient(180deg,#dce3ed,#9ca6b7);
      border-radius:12px;
      box-shadow:inset 0 2px 0 rgba(255,255,255,.35), 0 4px 10px rgba(0,0,0,.18);
      z-index:2;
    }

    .player{
      position:absolute;
      width:42px;
      height:42px;
      border-radius:50%;
      background:#ffbf00;
      border:3px solid #fff2b8;
      box-shadow:0 0 18px rgba(255,191,0,.45);
      z-index:5;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:24px;
      font-weight:800;
      color:#222;
      transition:none;
    }

    .controls{
      display:grid;
      grid-template-columns:1fr 1fr 1fr;
      gap:10px;
      margin-top:12px;
    }

    .ctrl{
      border:none;
      border-radius:18px;
      padding:16px;
      font-size:28px;
      font-weight:800;
      background:#eef3fc;
      color:#111;
      cursor:pointer;
    }

    .ctrl:active{
      transform:scale(.98);
    }

    .progress-wrap{
      margin-top:14px;
      margin-bottom:12px;
    }

    .progress-label{
      display:flex;
      justify-content:space-between;
      margin-bottom:8px;
      color:#dfe8ff;
      font-size:14px;
    }

    .progress{
      width:100%;
      height:12px;
      border-radius:999px;
      background:rgba(255,255,255,.08);
      overflow:hidden;
      border:1px solid var(--line);
    }

    .progress-bar{
      height:100%;
      width:0%;
      background:linear-gradient(90deg,var(--gold2),var(--gold));
      transition:width .3s ease;
    }

    .help{
      margin-top:10px;
      color:#d5e0ff;
      line-height:1.8;
      font-size:14px;
      text-align:center;
    }

    .question-overlay{
      position:fixed;
      inset:0;
      background:rgba(2,8,25,.78);
      display:none;
      align-items:center;
      justify-content:center;
      z-index:999;
      padding:16px;
    }

    .question-card{
      width:100%;
      max-width:720px;
      background:linear-gradient(180deg,var(--card2),var(--card));
      border:1px solid var(--line);
      border-radius:24px;
      padding:18px;
      box-shadow:var(--shadow);
    }

    .question-top{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      margin-bottom:12px;
      flex-wrap:wrap;
    }

    .question-number{
      font-size:16px;
      color:#e8efff;
      font-weight:700;
    }

    .timer{
      padding:8px 14px;
      border-radius:999px;
      background:rgba(255,255,255,.06);
      border:1px solid var(--line);
      color:#fff1b8;
      font-weight:700;
    }

    .question-text{
      font-size:24px;
      line-height:1.9;
      margin-bottom:16px;
    }

    .options{
      display:grid;
      gap:12px;
    }

    .option-btn{
      width:100%;
      padding:16px;
      border:none;
      border-radius:18px;
      font-size:24px;
      font-weight:700;
      cursor:pointer;
      background:#f4f6fb;
      color:#111;
    }

    .option-btn.correct{
      background:var(--good);
      color:#103d1f;
    }

    .option-btn.wrong{
      background:#ffd1d1;
      color:#4e0f0f;
    }

    .status{
      margin-top:14px;
      min-height:28px;
      font-size:16px;
      line-height:1.8;
    }

    .status.good{ color:#c7ffd4; }
    .status.bad{ color:#ffd6d6; }

    .finish-card{
      display:none;
      background:linear-gradient(180deg,var(--card2),var(--card));
      border:1px solid var(--line);
      border-radius:26px;
      padding:24px 18px;
      margin-top:16px;
      box-shadow:var(--shadow);
      text-align:center;
    }

    .finish-card h2{
      font-size:34px;
      margin-bottom:10px;
    }

    .finish-score{
      font-size:44px;
      color:var(--gold2);
      font-weight:800;
      margin:12px 0;
    }

    .finish-grid{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:12px;
      margin-top:16px;
    }

    .finish-box{
      background:rgba(255,255,255,.05);
      border:1px solid var(--line);
      border-radius:18px;
      padding:14px;
    }

    .finish-box .t1{
      color:#c9d6f4;
      font-size:14px;
      margin-bottom:6px;
    }

    .finish-box .t2{
      font-size:24px;
      font-weight:800;
    }

    .finish-actions{
      display:grid;
      gap:12px;
      margin-top:18px;
    }

    .action-btn{
      width:100%;
      border:none;
      border-radius:18px;
      padding:15px;
      font-size:20px;
      font-weight:800;
      cursor:pointer;
    }

    .play-again{
      background:linear-gradient(180deg,var(--gold2),var(--gold));
      color:#111;
    }

    .back-home{
      background:#ecf1fb;
      color:#111;
    }

    @media (max-width:600px){
      .topbar{
        grid-template-columns:1fr;
      }
      .question-text{
        font-size:20px;
      }
      .option-btn{
        font-size:22px;
      }
      .finish-grid{
        grid-template-columns:1fr;
      }
      .scene{
        height:500px;
      }
      .game-title{
        font-size:24px;
      }
    }
  </style>
</head>
<body>
  <div class="page">

    <div class="topbar">
      <div class="top-card">
        <div class="label">الطالب</div>
        <div class="value" id="playerName">—</div>
      </div>
      <div class="top-card">
        <div class="label">الصف</div>
        <div class="value" id="playerClass">—</div>
      </div>
    </div>

    <div class="main-card" id="gameCard">
      <div class="game-header">
        <div class="game-title">تسلّق البرج</div>
        <div class="badges">
          <div class="badge">النقاط: <span id="score">٠</span></div>
          <div class="badge">المحاولة: <span id="attemptView">١</span> / ٣</div>
        </div>
      </div>

      <div class="start-box">
        <button class="start-btn" id="startBtn" onclick="startRun()">ابدأ الجولة</button>
      </div>

      <div class="scene" id="scene">
        <div class="goal">🏁 الهدف: الوصول إلى القمة</div>

        <div class="platform" style="width:140px; right:20px; bottom:48px;"></div>
        <div class="platform" style="width:110px; right:190px; bottom:122px;"></div>
        <div class="platform" style="width:120px; right:44px; bottom:196px;"></div>
        <div class="platform" style="width:110px; right:210px; bottom:272px;"></div>
        <div class="platform" style="width:120px; right:56px; bottom:348px;"></div>
        <div class="platform" style="width:105px; right:220px; bottom:426px;"></div>

        <div class="player" id="player">★</div>
      </div>

      <div class="controls">
        <button class="ctrl" id="leftBtn">←</button>
        <button class="ctrl" id="jumpBtn">↑</button>
        <button class="ctrl" id="rightBtn">→</button>
      </div>

      <div class="progress-wrap">
        <div class="progress-label">
          <span>تقدم الجولة</span>
          <span id="progressText">٠ / ٥</span>
        </div>
        <div class="progress">
          <div class="progress-bar" id="progressBar"></div>
        </div>
      </div>

      <div class="help">
        اضغط "ابدأ الجولة" أولًا، ثم استخدم الأسهم لتحريك اللاعب.  
        إذا سقط من المنصة سيظهر سؤال الرياضيات.
      </div>
    </div>

    <div class="finish-card" id="finishCard">
      <h2>انتهت المحاولة</h2>
      <div class="finish-score" id="finalScore">٠</div>

      <div class="finish-grid">
        <div class="finish-box">
          <div class="t1">إجابات صحيحة</div>
          <div class="t2" id="correctCount">٠</div>
        </div>
        <div class="finish-box">
          <div class="t1">أفضل نتيجة لك</div>
          <div class="t2" id="bestScore">٠</div>
        </div>
        <div class="finish-box">
          <div class="t1">المحاولات المستخدمة</div>
          <div class="t2" id="usedAttempts">٠</div>
        </div>
        <div class="finish-box">
          <div class="t1">المتبقي من المحاولات</div>
          <div class="t2" id="remainingAttempts">٠</div>
        </div>
      </div>

      <div class="finish-actions">
        <button class="action-btn play-again" id="playAgainBtn" onclick="restartAttempt()">محاولة جديدة</button>
        <button class="action-btn back-home" onclick="goHome()">العودة للصفحة الرئيسية</button>
      </div>
    </div>

  </div>

  <div class="question-overlay" id="questionOverlay">
    <div class="question-card">
      <div class="question-top">
        <div class="question-number" id="questionNumber">السؤال ١ من ٥</div>
        <div class="timer">الوقت: <span id="timeLeft">٣٠</span> ثانية</div>
      </div>

      <div class="question-text" id="questionText">...</div>

      <div class="options" id="optionsBox"></div>

      <div class="status" id="statusText"></div>
    </div>
  </div>

  <script>
    const questions = [
      { q: "بكم طريقة يمكن اختيار ٣ عناصر من ٧ عناصر؟", options: ["٣٥", "٢١", "٢١٠"], answer: "٣٥" },
      { q: "عدد تباديل ٣ عناصر من ٧ عناصر مختلفة:", options: ["٢١٠", "٣٥", "١٢٠"], answer: "٢١٠" },
      { q: "بكم طريقة يمكن اختيار ٢ طالبين من ٦ طلاب؟", options: ["١٥", "١٢", "٣٠"], answer: "١٥" },
      { q: "عدد تباديل ٤ عناصر من ٦ عناصر مختلفة:", options: ["٣٦٠", "١٥", "٧٢٠"], answer: "٣٦٠" },
      { q: "عدد الحدود في مفكوك (١ + س)^٥", options: ["٥", "٦", "٧"], answer: "٦" },
      { q: "مجموع معاملات مفكوك (١ + س)^٦", options: ["٣٢", "٦٤", "١٢٨"], answer: "٦٤" },
      { q: "عدد تباديل ٥ عناصر من ٧ عناصر مختلفة:", options: ["٢٥٢٠", "٨٤٠", "٢١"], answer: "٢٥٢٠" },
      { q: "بكم طريقة يمكن اختيار ٤ عناصر من ٨ عناصر؟", options: ["٧٠", "٥٦", "١٦٨٠"], answer: "٧٠" },
      { q: "عدد طرق ترتيب ٤ كتب مختلفة في صف واحد:", options: ["٢٤", "١٦", "٤"], answer: "٢٤" },
      { q: "عدد طرق ترتيب ٣ كتب من ٥ كتب مختلفة:", options: ["٦٠", "٢٠", "١٠"], answer: "٦٠" },
      { q: "عدد الحدود في مفكوك (١ + س)^٧", options: ["٧", "٨", "٩"], answer: "٨" },
      { q: "مجموع معاملات مفكوك (٢ص + ٣)^٤", options: ["٢٤", "٦٢٥", "١٢٩٦"], answer: "٦٢٥" }
    ];

    const scene = document.getElementById("scene");
    const player = document.getElementById("player");
    const overlay = document.getElementById("questionOverlay");

    let selectedQuestions = [];
    let currentQuestion = 0;
    let score = 0;
    let correctAnswers = 0;
    let timer = null;
    let timeLeft = 30;
    let questionOpen = false;
    let gameEnded = false;
    let started = false;

    const playerState = {
      x: 36,
      y: 48 + 42,
      width: 42,
      height: 42,
      vx: 0,
      vy: 0,
      speed: 6,
      jump: 14,
      gravity: 0.7,
      onGround: false
    };

    const keys = { left: false, right: false };

    const platforms = [
      { x: 20,  y: 48,  w: 140, h: 16 },
      { x: 190, y: 122, w: 110, h: 16 },
      { x: 44,  y: 196, w: 120, h: 16 },
      { x: 210, y: 272, w: 110, h: 16 },
      { x: 56,  y: 348, w: 120, h: 16 },
      { x: 220, y: 426, w: 105, h: 16 }
    ];

    const playerName = localStorage.getItem("playerName") || "طالب";
    const playerClass = localStorage.getItem("playerClass") || "—";
    document.getElementById("playerName").textContent = playerName;
    document.getElementById("playerClass").textContent = playerClass;

    function toArabicNumber(num){
      return String(num).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
    }

    function getAttemptsKey(){
      const email = localStorage.getItem("playerEmail") || playerName;
      return "attempts_" + email;
    }

    function getBestKey(){
      const email = localStorage.getItem("playerEmail") || playerName;
      return "best_" + email;
    }

    function getUsedAttempts(){
      return parseInt(localStorage.getItem(getAttemptsKey()) || "0");
    }

    function setUsedAttempts(val){
      localStorage.setItem(getAttemptsKey(), String(val));
    }

    function getBestScore(){
      return parseInt(localStorage.getItem(getBestKey()) || "0");
    }

    function setBestScore(val){
      localStorage.setItem(getBestKey(), String(val));
    }

    function shuffle(array){
      let arr = [...array];
      for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function updatePlayerView(){
      player.style.right = playerState.x + "px";
      player.style.bottom = (playerState.y - playerState.height) + "px";
    }

    function updateTopInfo(){
      document.getElementById("score").textContent = toArabicNumber(score);
      document.getElementById("attemptView").textContent = toArabicNumber(getUsedAttempts() + 1);
      document.getElementById("progressText").textContent = toArabicNumber(currentQuestion) + " / " + toArabicNumber(5);
      document.getElementById("progressBar").style.width = (currentQuestion / 5) * 100 + "%";
    }

    function startRun(){
      if(started || gameEnded) return;
      started = true;
      document.getElementById("startBtn").textContent = "الجولة بدأت";
      document.getElementById("startBtn").disabled = true;
      document.getElementById("startBtn").style.opacity = ".7";
      player.textContent = "🧭";
      respawn();
    }

    function startTimer(){
      clearInterval(timer);
      timeLeft = 30;
      document.getElementById("timeLeft").textContent = toArabicNumber(timeLeft);

      timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").textContent = toArabicNumber(timeLeft);

        if(timeLeft <= 0){
          clearInterval(timer);
          timeUp();
        }
      }, 1000);
    }

    function openQuestion(){
      if(questionOpen || gameEnded || !started) return;
      questionOpen = true;
      playerState.vx = 0;
      playerState.vy = 0;
      overlay.style.display = "flex";
      loadQuestion();
    }

    function closeQuestion(){
      overlay.style.display = "none";
      questionOpen = false;
      document.getElementById("statusText").textContent = "";
      document.getElementById("statusText").className = "status";
    }

    function loadQuestion(){
      updateTopInfo();

      const q = selectedQuestions[currentQuestion];
      document.getElementById("questionNumber").textContent =
        "السؤال " + toArabicNumber(currentQuestion + 1) + " من " + toArabicNumber(5);

      document.getElementById("questionText").textContent = q.q;

      const optionsBox = document.getElementById("optionsBox");
      optionsBox.innerHTML = "";

      q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option, btn);
        optionsBox.appendChild(btn);
      });

      startTimer();
    }

    function timeUp(){
      document.getElementById("statusText").textContent = "انتهى الوقت. ننتقل للسؤال التالي.";
      document.getElementById("statusText").className = "status bad";

      setTimeout(() => {
        currentQuestion++;
        if(currentQuestion >= 5){
          finishAttempt();
        } else {
          respawn();
          closeQuestion();
        }
      }, 1100);
    }

    function checkAnswer(selected, btn){
      if(!questionOpen) return;
      clearInterval(timer);

      const q = selectedQuestions[currentQuestion];
      const buttons = document.querySelectorAll(".option-btn");
      buttons.forEach(b => b.disabled = true);

      let gained = 0;

      if(selected === q.answer){
        if(timeLeft >= 25) gained = 15;
        else if(timeLeft >= 20) gained = 10;
        else if(timeLeft >= 10) gained = 7;
        else gained = 5;

        score += gained;
        correctAnswers++;
        btn.classList.add("correct");
        document.getElementById("statusText").textContent =
          "إجابة صحيحة. حصلت على " + toArabicNumber(gained) + " نقاط.";
        document.getElementById("statusText").className = "status good";
      } else {
        btn.classList.add("wrong");
        buttons.forEach(b => {
          if(b.textContent === q.answer){
            b.classList.add("correct");
          }
        });
        document.getElementById("statusText").textContent =
          "إجابة غير صحيحة. الإجابة الصحيحة: " + q.answer;
        document.getElementById("statusText").className = "status bad";
      }

      setTimeout(() => {
        currentQuestion++;
        if(currentQuestion >= 5){
          finishAttempt();
        } else {
          respawn();
          closeQuestion();
          updateTopInfo();
        }
      }, 1200);
    }

    function respawn(){
      playerState.x = 36;
      playerState.y = 48 + playerState.height;
      playerState.vx = 0;
      playerState.vy = 0;
      updatePlayerView();
    }

    function finishAttempt(){
      gameEnded = true;
      clearInterval(timer);
      overlay.style.display = "none";

      let used = getUsedAttempts() + 1;
      setUsedAttempts(used);

      let best = getBestScore();
      if(score > best){
        best = score;
        setBestScore(score);
      }

      document.getElementById("gameCard").style.display = "none";
      document.getElementById("finishCard").style.display = "block";

      document.getElementById("finalScore").textContent = toArabicNumber(score);
      document.getElementById("correctCount").textContent = toArabicNumber(correctAnswers);
      document.getElementById("bestScore").textContent = toArabicNumber(best);
      document.getElementById("usedAttempts").textContent = toArabicNumber(used);
      document.getElementById("remainingAttempts").textContent = toArabicNumber(Math.max(0, 3 - used));

      const btn = document.getElementById("playAgainBtn");
      if(used >= 3){
        btn.disabled = true;
        btn.textContent = "انتهت المحاولات";
        btn.style.opacity = ".6";
        btn.style.cursor = "not-allowed";
      }
    }

    function restartAttempt(){
      if(getUsedAttempts() >= 3) return;
      window.location.reload();
    }

    function goHome(){
      window.location.href = "index.html";
    }

    function jump(){
      if(questionOpen || gameEnded || !started) return;
      if(playerState.onGround){
        playerState.vy = playerState.jump;
        playerState.onGround = false;
      }
    }

    function gameLoop(){
      if(started && !questionOpen && !gameEnded){
        if(keys.left) playerState.vx = playerState.speed;
        else if(keys.right) playerState.vx = -playerState.speed;
        else playerState.vx = 0;

        playerState.x += playerState.vx;
        playerState.y += playerState.vy;
        playerState.vy -= playerState.gravity;

        if(playerState.x < 0) playerState.x = 0;
        if(playerState.x > scene.clientWidth - playerState.width){
          playerState.x = scene.clientWidth - playerState.width;
        }

        playerState.onGround = false;

        const playerBottom = playerState.y - playerState.height;
        const prevBottom = playerBottom - playerState.vy;

        for(const p of platforms){
          const withinX =
            playerState.x + playerState.width > p.x &&
            playerState.x < p.x + p.w;

          const fallingOnto =
            playerState.vy <= 0 &&
            prevBottom >= p.y + p.h &&
            playerBottom <= p.y + p.h + 8;

          if(withinX && fallingOnto){
            playerState.y = p.y + p.h + playerState.height;
            playerState.vy = 0;
            playerState.onGround = true;
          }
        }

        if(playerState.y - playerState.height > scene.clientHeight + 20){
          openQuestion();
        }

        if(playerState.y >= 500){
          finishAttempt();
        }

        updatePlayerView();
      }

      requestAnimationFrame(gameLoop);
    }

    function holdButton(el, onStart, onEnd){
      el.addEventListener("touchstart", (e) => { e.preventDefault(); onStart(); }, {passive:false});
      el.addEventListener("touchend", (e) => { e.preventDefault(); onEnd(); }, {passive:false});
      el.addEventListener("mousedown", onStart);
      el.addEventListener("mouseup", onEnd);
      el.addEventListener("mouseleave", onEnd);
    }

    document.addEventListener("keydown", (e) => {
      if(e.key === "ArrowLeft") keys.left = true;
      if(e.key === "ArrowRight") keys.right = true;
      if(e.key === "ArrowUp" || e.key === " "){
        e.preventDefault();
        jump();
      }
    });

    document.addEventListener("keyup", (e) => {
      if(e.key === "ArrowLeft") keys.left = false;
      if(e.key === "ArrowRight") keys.right = false;
    });

    holdButton(document.getElementById("leftBtn"), () => keys.left = true, () => keys.left = false);
    holdButton(document.getElementById("rightBtn"), () => keys.right = true, () => keys.right = false);
    document.getElementById("jumpBtn").addEventListener("click", jump);
    document.getElementById("jumpBtn").addEventListener("touchstart", (e) => { e.preventDefault(); jump(); }, {passive:false});

    function initGame(){
      if(getUsedAttempts() >= 3){
        document.getElementById("gameCard").style.display = "none";
        document.getElementById("finishCard").style.display = "block";
        document.getElementById("finalScore").textContent = "٠";
        document.getElementById("correctCount").textContent = "٠";
        document.getElementById("bestScore").textContent = toArabicNumber(getBestScore());
        document.getElementById("usedAttempts").textContent = toArabicNumber(getUsedAttempts());
        document.getElementById("remainingAttempts").textContent = "٠";

        const btn = document.getElementById("playAgainBtn");
        btn.disabled = true;
        btn.textContent = "انتهت المحاولات";
        btn.style.opacity = ".6";
        btn.style.cursor = "not-allowed";
        return;
      }

      selectedQuestions = shuffle(questions).slice(0, 5);
      player.textContent = "★";
      respawn();
      updateTopInfo();
      gameLoop();
    }

    initGame();
  </script>
</body>
</html>
