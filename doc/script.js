const app = new Vue({
    el: '#pomodoroClock',
    data: {
        timer: null,
        breakLength: 0.05,
        sessionLength: 0.05,
        // 總時數,以秒數來作為單位
        totalTime: (this.sessionLength * 60),

        resetButton: false,

        //在時間歸零時候判斷使用
        breakStatus: false,
        sessionCounter: 0,
        firstStart: true,
        title: "Set your preferred periods!",

    },
    methods: {
        // 開始
        startTimer: function () {
            if (this.firstStart === true) {
                this.totalTime = (this.sessionLength * 60);
                this.firstStart = false;
            }
            // this.totalTime = (this.sessionLength * 60);
            this.timer = setInterval(() => this.countdown(), 1000);
            this.resetButton = true;
            if(this.breakStatus === true){
                this.title = "break"
            }else{
                this.title = "work"
            }
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

        // 倒數計時
        countdown: function () {
            // 如果是工作狀態且秒數的時間已到
            if (this.totalTime < 1 && this.breakStatus === false) {
                this.playSound();
                this.stopTimer(); //Pause the Timer after break
                // this.sessionCounter++;
                this.breakStatus = true;
                this.title = 'Break time!';
                this.totalTime = (this.breakLength * 60);
            }
            // 如果是休息狀態且秒數的時間已到
            if (this.totalTime < 1 && this.breakStatus === true) {
                this.playSound();
                this.stopTimer(); //Pause the Timer after break
                this.breakStatus = false;
                this.firstStart = true;
                this.title = 'Work, work, work!';
                this.totalTime = (this.sessionLength * 60);
            }
            this.totalTime--;
        },
        // 播放聲音
        playSound: function () {
            // var audio = new Audio("Aluminum_Can_Crunch_Series.mp3");
            // audio.play();      
        }
    },
    computed: {
        minutes: function () {
            if (this.firstStart === true) {
                return (this.sessionLength < 1) ? this.padTime(0) : this.sessionLength
            }else{
                const minutes = Math.floor(this.totalTime / 60);
                return this.padTime(minutes);
            }

        },
        seconds: function () {
            if (this.firstStart === true){
                return this.padTime(this.sessionLength*60);    
            }else{
                const seconds = this.totalTime - (this.minutes * 60);
                return this.padTime(seconds);
            }

        }
    }
})


var itemlist = [{
    text: 'Learn Vue Js',
    completed: false
},
{
    text: 'Code a todo list',
    completed: false
},
{
    text: 'Learn something else',
    completed: false
}
]

var vm = new Vue({
el: '#todolist',
data: {
    items: itemlist,
    inputVaule: "",
    breakStatus: app.breakStatus
},

methods: {
    add: function () {
        if (this.inputVaule.length == 0) {
            alert("Input is require，please enter again");
        } else {
            this.items.push({
                text: this.inputVaule,
                completed: false
            });
            this.inputVaule = "";
        }
    },
    removeTodo: function (todo) {
        this.items.splice(this.items.indexOf(todo), 1)
    },
    gernerateId: function (index) {
        return "ID_" + index
    },
},
})

Vue.config.devtools = true