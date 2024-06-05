
window.addEventListener("load", () => {
    const clock = new Clock(".clock");
});

class Clock {
    constructor(qs) {
        this.el = document.querySelector(qs);
        this.time = {a:[],b:[]};
        this.rollClass = "clock_block_bounce";  
        this.rollTimeout = null;
        this.digitsTimeout = null;

        this.loop();
    }

    loop() {
        this.updateTime();
        this.displayTime();
        this.animateTime();
        this.tick();
    }

    updateTime() {
        const rawDate = new Date();
        // NOTE : 1e3 == 1000
        const date = new Date(Math.ceil(rawDate.getTime() / 1e3) * 1e3);
        let h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const ap = h < 12 ? "AM" : "PM";

        if( h === 0) h = 12;
        if (h > 12) h -= 12;

        this.time.a = [...this.time.b];
        this.time.b = [
            h < 10 ? `0${h}` : `${h}`,  /// ` 
            m < 10 ? `0${m}` : `${m}`,  /// ` 
            s < 10 ? `0${s}` : `${s}`,  /// ` 
            ap
        ];

        if (!this.time.a.length) this.time.a = [...this.time.b];
    }

    displayTime() {
        const timeDigits = [...this.time.b];

        Object.keys(this.time).forEach(letter => {
            const letterEls = this.el.querySelectorAll(`[data-time="${letter}"]`); //`

            Array.from(letterEls).forEach((el,i) => {
                el.textContent = this.time[letter][i];
            })
        })
    }

    animateTime() {
        const groups = this.el.querySelectorAll("[data-time-group]");

        Array.from(groups).forEach((group,i) => {
            const {a,b} = this.time;

            if(a[i] !== b[i]) group.classList.add(this.rollClass);
        });

        clearTimeout(this.rollTimeout);
        this.rollTimeout = setTimeout(this.removeAnimations.bind(this),900);
    }

    removeAnimations() {
        const groups = this.el.querySelectorAll("[data-time-group]");

        Array.from(groups).forEach(group => {
            group.classList.remove(this.rollClass);
        })
    }

    tick() {
        clearTimeout(this.digitsTimeout);
        this.timeDigits = setTimeout(this.loop.bind(this),1e3);
    }
}