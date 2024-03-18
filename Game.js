AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 5;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    var timer = setInterval(countDown, 1000);

    function countDown() {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      }
      else {
        this.game_over()
      }
    }
  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible", false)
        this.updatescore()
        this.updatetargets()

      } else {
this.game_over()
      }
    });
  },
  updatescore: function () {
    var element = document.querySelector("#SCORE")
    var count = element.getAttribute("text").value
    var score = parseInt(count) + 50
    element.setAttribute("text", { value: score })
  },

  updatetargets: function () {
    var element = document.querySelector("#TARGETS")
    var count = element.getAttribute("text").value
    var targets = parseInt(count) - 1
    element.setAttribute("text", { value: targets })
  },
  game_over: function () {
    var element = document.querySelector("#game_over")
    var plane = document.querySelector("plane_model")

    element.setAttribute("visible",true)
    plane.setAttribute("dynamic-body",{mass:1})
  },
});
