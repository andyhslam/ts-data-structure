const MAX_LOAD_FACTOR = 0.75;
const MIN_LOAD_FACTOR = 0.25;

// 哈希函数的实现
export function hashFunc(str, max) {
    // 1.定义hasCode
    let hashCode = 0;

    // 2.霍纳算法
    for (let i = 0; i < str.length; i++) {
        hashCode = 31 * hashCode + str.charCodeAt(i);
    }

    hashCode = hashCode % max;

    return hashCode;
}

// 判断质数
export function isPrime(num) {
    if (num === 1) return false;

    // 1.获取平方根
    let temp = Math.ceil(Math.sqrt(num));

    // 2.循环判断
    for (let i = 2; i < temp; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// 哈希表
export class HashTable {
    constructor() {
        this.storage = []; // 数组存储元素
        this.count = 0; // 当前存放多少个元素
        this.limit = 7; // 总个数
    }

    // 哈希函数
    hashFunc(str, max) {
        // 1.定义hasCode
        let hashCode = 0;

        // 2.霍纳算法
        for (let i = 0; i < str.length; i++) {
            hashCode = 31 * hashCode + str.charCodeAt(i);
        }

        hashCode = hashCode % max;

        return hashCode;
    }

    // 插入/修改元素：HashMap -> {key, value}
    put(key, value) {
        // 1. 根据key映射到index
        const index = this.hashFunc(key, this.limit);

        // 2. 取出数组
        let bucket = this.storage[index];
        if (bucket === undefined) {
            bucket = [];
            this.storage[index] = bucket;
        }

        // 3. 判断是插入还是修改操作
        let overide = false;
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                tuple[1] = value;
                overide = true;
            }
        }

        // 4. 如果没有覆盖，那么就是新增
        if (!overide) {
            bucket.push([key, value]);
            this.count++;

            if (this.count > this.limit * MAX_LOAD_FACTOR) {
                let newLimit = this.getPrime(this.limit * 2);
                this.resize(newLimit);
            }
        }
    }

    // 根据key获取value
    get(key) {
        // 1. 根据key获取index
        const index = this.hashFunc(key, this.limit);

        // 2. 根据下标值获取bucket
        const bucket = this.storage[index];
        if (bucket === undefined) {
            return null;
        }

        // 3. 遍历bucket,一个个查找
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                return tuple[1];
            }
        }

        return null;
    }

    // 根据key删除元素
    remove(key) {
        // 1. 根据key获取index
        const index = this.hashFunc(key, this.limit);

        // 2. 根据下标值获取bucket
        const bucket = this.storage[index];
        if (bucket === undefined) {
            return null;
        }

        // 3. 遍历bucket，找到元素，并且返回删除的元素
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            if (tuple[0] === key) {
                bucket.splice(i, 1);
                this.count--;

                if (this.limit >= 8 && this.count < this.limit * MIN_LOAD_FACTOR) {
                    let newLimit = Math.floor(this.limit / 2);
                    newLimit = this.getPrime(newLimit);
                    this.resize(newLimit);
                }

                return tuple[1];
            }
        }

        return null;
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    // 装填因子loadFactor = 已经存放的数据量/总长度，一般在loadFactor > 0.75的时候进行扩容

    // 扩容函数
    resize(newLimit) {
        // 1. 保存旧数组的内容
        let oldStorage = this.storage;

        // 2. 重置属性
        this.limit = newLimit;
        this.storage = [];
        this.count = 0;

        // 3. 取出oldStorage的所有元素，重新放入到storage
        oldStorage.forEach((bucket) => {
            // forEach里continue和break无效
            if (bucket === null) {
                return;
            }

            for (let i = 0; i < bucket.length; i++) {
                let tuple = bucket[i];
                this.put(tuple[0], tuple[1]);
            }
        })
    }

    // 判断质数
    isPrime(num) {
        if (num === 1) return false;

        // 1.获取平方根
        let temp = Math.ceil(Math.sqrt(num));

        // 2.循环判断
        for (let i = 2; i < temp; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    // 获取质数
    getPrime(num) {
        while (!this.isPrime(num)) {
            num++;
        }
        return num;
    }
}