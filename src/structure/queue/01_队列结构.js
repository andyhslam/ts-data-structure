// 封装队列类
function Queue() {
    // 属性
    this.items = []

    // 方法
    // 1.将元素加入到队列中
    Queue.prototype.enqueue = function(element) {
        this.items.push(element)
    }

    // 2.从队列中删除前端元素
    Queue.prototype.dequeue = function() {
        return this.items.shift()
    }

    // 3.查看前端的元素
    Queue.prototype.front = function() {
        return this.items[0]
    }

    // 4.查看队列是否为空
    Queue.prototype.isEmpty = function() {
        return this.items.length == 0
    }

    // 5.查看队列中元素的个数
    Queue.prototype.size = function() {
        return this.items.length
    }

    // 6.toString方法
    Queue.prototype.toString = function() {
        var resultString = ''
        for (var i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + ' '
        }
        return resultString
    }
}

// 使用队列
var queue = new Queue()

// 将元素加入到队列中
queue.enqueue('abc')
queue.enqueue('cba')
queue.enqueue('nba')
queue.enqueue('mba')
console.log(queue);

// 从队列中删除元素
queue.dequeue()
console.log('queue1 :', queue);
queue.dequeue()
console.log('queue2 :', queue);

console.log(queue.front());
console.log(queue.isEmpty());
console.log(queue.size());

// 面试题：击鼓传花
function passGame(nameList, num) {
    // 1. 创建一个队列结构
    var queue = new Queue()

    // 2.将所有人依次加入到队列中
    for (var i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i])
    }

    // 3.开始数数字
    while (queue.size() > 1) {
        // 不是num的时候，重新加入到队列的末尾
        // 是num的时候，将其从队列中删除

        // 3-1.num数字之前的人重新放入到队列的末尾
        for (var i = 0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue())
        }

        // 3-2.num对应这个人，直接从队列中删除掉
        queue.dequeue()
    }

    // 4. 获取剩下的那个人
    console.log(queue.size())
    var endName = queue.front()
    var endNameIndex = nameList.indexOf(endName)
    console.log('最终剩下的人：' + endName + endNameIndex)
}

// 测试击鼓传花
const nameList = ['Lily', 'Lucy', 'Tom', 'Jacky', 'Andy']
passGame(nameList, 3)

// 优先级队列
class QueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue extends Queue {
    enqueue(element, priority) {
        // 1. 创建QueueElement对象
        const queueElement = new QueueElement(element, priority);

        // 2. 考虑如何插入新的元素
        if (this.isEmpty()) {
            this.items.push(queueElement);
        } else {
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].priority > queueElement.priority) {
                    this.items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.items.push(queueElement);
            }
        }
    }
}

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('aaa', 100);
priorityQueue.enqueue('bbb', 150);
priorityQueue.enqueue('ccc', 120);
priorityQueue.enqueue('ddd', 90);

// for (let key of Object.keys(priorityQueue.items)) {
//     console.log(key, priorityQueue.items[key]);
// }

priorityQueue.items.forEach(item => {
    console.log(item.element, item.priority);
})

console.log(priorityQueue.dequeue());