const app = new Vue({
    el: '#pomodoroClock',
    data: {
        timer: null,
        breakLength: 5,
        sessionLength: 25,

        // 總時數
        totalTime: (this.sessionLength * 60),
        resetButton: false,
        breakStatus: false,
        sessionCounter: 0,
        firstStart: true,
        title: "Set your preferred periods!"
    },
    methods: {
        //新增時間
        // increment(value) {
        //     if (value === "session") {
        //         this.sessionLength++;
        //         this.totalTime = (this.sessionLength * 60);
        //     }
        //     if (value === "break") {
        //         this.breakLength++;
        //     }
        // },
       //減少時間
        // decrement(value) {
        //     if (value === "session" && this.sessionLength > 1) {
        //         this.sessionLength--;
        //         this.totalTime = (this.sessionLength * 60);
        //     }
        //     if (value === "break" && this.breakLength > 1) {
        //         this.breakLength--;
        //     }
        // },
        // 開始
        startTimer: function () {
            if (this.firstStart === true) {
                this.totalTime = (this.sessionLength * 60);
                this.firstStart = false;
            }
            this.timer = setInterval(() => this.countdown(), 1000);
            this.resetButton = true;
            this.title = "Work, work, work!"
        },
        // 暫停
        stopTimer: function () {
            clearInterval(this.timer);
            this.timer = null;
            this.resetButton = true;
            this.title = "Paused.."
        },
        // 重製
        resetTimer: function () {
            this.totalTime = (this.sessionLength * 60);
            clearInterval(this.timer);
            this.timer = null;
            this.resetButton = false;
            this.title = "Set your preferred periods!"
        },
        // 調整格式 (如果小於零的話就補零)
        padTime: function (time) { //set another 0 for better look
            return (time < 10 ? '0' : '') + time;
        },

        // 計算次數（根據每一個 session）
        countdown: function () {
            if (this.totalTime < 1 && this.breakStatus === false) {
                this.playSound();
                this.sessionCounter++;
                this.breakStatus = true;
                this.title = 'Break time!';
                this.totalTime = (this.breakLength * 60);
            }
            if (this.totalTime < 1 && this.breakStatus === true) {
                this.playSound();
                this.stopTimer(); //Pause the Timer after break
                this.breakStatus = false;
                this.title = 'Work, work, work!';
                this.totalTime = (this.sessionLength * 60);
            }
            this.totalTime--;
        },
        // 播放聲音
        playSound: function () {
            var audio = new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3");
            audio.play();
        }
    },
    computed: {
        minutes: function () {
            const minutes = Math.floor(this.totalTime / 60);
            return this.padTime(minutes);
        },
        seconds: function () {
            const seconds = this.totalTime - (this.minutes * 60);
            return this.padTime(seconds);
        }
    }
})




// var itemlist = [{
//     text: 'Learn Vue Js',
//     completed: false
// },
// {
//     text: 'Code a todo list',
//     completed: false
// },
// {
//     text: 'Learn something else',
//     completed: false
// }
// ]

// var vm = new Vue({
// el: '#vue-todolist',
// data: {
//     items: itemlist,
//     inputVaule: ""
// },

// methods: {
//     add: function () {
//         if (this.inputVaule.length == 0) {
//             alert("Input is require，please enter again");
//         } else {
//             this.items.push({
//                 text: this.inputVaule,
//                 completed: false
//             });
//             this.inputVaule = "";
//         }
//     },
//     removeTodo: function (todo) {
//         this.items.splice(this.items.indexOf(todo), 1)
//     },
//     gernerateId: function (index) {
//         return "ID_" + index
//     },
// },
// })