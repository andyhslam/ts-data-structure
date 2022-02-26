import { LinkedList, Node } from "./linked_list";

class DoublyNode extends Node {
    constructor(element) {
        super(element);
        this.prev = null;
    }
}

export class DoublyLinkedList extends LinkedList {
    constructor() {
        super();
        this.tail = null;
    }

    // append(element) 向链表尾部添加一个新的项。
    append(element) {
        // 1.根据element创建元素
        const newNode = new DoublyNode(element);
        // 2.追加元素
        if (this.head === null) {
            // 原来没有任何元素
            this.head = newNode;
            this.tail = newNode;
        } else {
            // 查询最后一个节点

            // 方法一：复杂一点
            // let current = this.head;
            // while(current.next) {
            //     current = current.next;
            // }

            // 方法二：简单点
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    // insert(position, element) 向链表的特定位置插入一个新的项。
    insert(position, element) {
        // 1.越界的判断
        if (position < 0 || position > this.length) return false;
        // 2.创建Node
        const newNode = new DoublyNode(element);
        // 3.判断多种插入的情况
        if (position === 0) {
            // 插入到最前
            if (this.head === null) {
                // 原来没有任何元素
                this.head = newNode;
                this.tail = newNode;
            } else {
                // 原来有元素
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            }
        } else if (position === this.length) {
            // 插入到最后
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        } else {
            // 插入到中间
            let index = 0;
            let current = this.head;
            let previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            // 交换节点信息
            previous.next = newNode;
            newNode.prev = previous;
            newNode.next = current;
            current.prev = newNode;
        }
        this.length++;
        return true;
    }

    // get(position) 获取对应位置的元素。
    // 注：此方法不需要重写，可继承父类的方法。

    // indexOf(element) 返回元素在链表中的索引。如果链表中没有该元素就返回-1。
    // 注：此方法不需要重写，可继承父类的方法。

    // removeAt(position) 从链表的特定位置移除一项。
    removeAt(position) {
        // 1. 越界判断
        if (position < 0 || position > this.length - 1) return null;
        // 2.根据不同情况删除元素
        let current = this.head;
        if (position === 0) {
            // 删除第一位
            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }
        } else if (position === this.length - 1) {
            // 删除最后一位
            // 方法一
            current = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
            // 方法二
            // current = this.tail;
            // this.tail.prev.next = null;
            // this.tail = this.tail.prev;
        } else {
            // 删除中间位
            let index = 0;
            let previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
            current.next.prev = previous;
        }
        this.length--;
        return current.element;
    }

    // update(position, element) 修改某个位置的元素。
    // 注：此方法不需要重写，可继承父类的方法。

    // remove(element) 从链表中移除一项。
    // 注：此方法不需要重写，可继承父类的方法。

    // isEmpty() 如果链表中不包含任何元素，返回 trun，如果链表长度大于 0 则返回 false。

    // size() 返回链表包含的元素个数，与数组的 length 属性类似。

}