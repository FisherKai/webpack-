// 异步的钩子
class AsyncParallelHook {
    constructor(args) {
        this.tasks = [];
    }
    /**
     * 
     * @param {*} name 标识作用，无实际意义
     * @param {*} task 
     */
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        // 拿到最终的函数
        let finalCallback = args.pop();
        let count = 0;
        let self = this;
        function done() {
            count++;
            if (count === self.tasks.length) {
                finalCallback();
            }
        }
        this.tasks.forEach(task => {
            task(...args, done);
        });
    }
}

let hook = new AsyncParallelHook(['name']);
hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log(`react ${name}`);
        cb();
    })
});
hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log(`node ${name}`);
        cb();
    })
});
hook.callAsync('yukai', function () {
    console.log(`end`);
})