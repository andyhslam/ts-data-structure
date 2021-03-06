class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

export class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // insert(key) 向树中插入一个新的键。
    insert(key) {
        // 1.根据key创建Node节点
        const newNode = new Node(key);

        // 2.如果原来的树是一颗空树
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.key > node.key) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        } else if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        }
    }

    // preOrderTraverse 通过先序遍历方式遍历所有节点。回退：表明上一层函数的递归调用已经结束。
    preOrderTraverse() {
        this.preOrderTraverseNode(this.root);
    }

    preOrderTraverseNode(node) {
        if (node === null) return;

        console.log(node.key); //直接访问
        this.preOrderTraverseNode(node.left);
        this.preOrderTraverseNode(node.right);
    }

    // inOrderTraverse 通过中序遍历方式遍历所有节点，按照从小到大的顺序排列。
    inOrderTraverse() {
        this.inOrderTraverseNode(this.root);
    }

    inOrderTraverseNode(node) {
        if (node === null) return;

        this.inOrderTraverseNode(node.left);
        console.log(node.key);
        this.inOrderTraverseNode(node.right);
    }

    // postOrderTraverse 通过后序遍历方式遍历所有节点。
    postOrderTraverse() {
        this.postOrderTraverseNode(this.root);
    }

    postOrderTraverseNode(node) {
        if (node === null) return;

        this.postOrderTraverseNode(node.left);
        this.postOrderTraverseNode(node.right);
        console.log(node.key);
    }

    // min 返回树中最小的值/键。
    min() {
        let node = this.root;
        while (node.left !== null) {
            node = node.left;
        }
        return node.key;
    }

    // max 返回树中最大的值/键。
    max() {
        let node = this.root;
        while (node.right !== null) {
            node = node.right;
        }
        return node.key;
    }

    // search(key) 在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回false。
    // 递归函数能够与循环相互转化。

    // 递归写法
    search(key) {
        return this.searchNode(this.root, key);
    }

    searchNode(node, key) {
        // 1.判断node有没有值
        if (node === null) return false;

        // 2.判断搜索的key和节点值的关系
        if (key < node.key) {
            return this.searchNode(node.left, key);
        } else if (key > node.key) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }

    // while循环：直接循环效率更高，不用担心溢出。
    searchInWhile(key) {
        let node = this.root;

        while (node !== null) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return true;
            }
        }
        return false;
    }

    // remove(key) 从树中移除某个键。
    remove(key) {
        // 1.定义一些变量记录状态
        let current = this.root;
        let parent = null;
        let isLeftChild = true; // 用于判断：删除的节点是parent节点的左子节点还是右子节点

        // 2.开始查找要删除的节点
        while (current.key !== key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }

            if (current === null) return false;
        }

        // 3.找到要删除的节点：current

        // 情况一：删除的节点是叶子节点(没有子节点)
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
        // 情况二：删除的节点只有一个子节点
        else if (current.right === null) { // 只有左子节点
            if (current === this.root) {
                this.root = current.left;
            } else if (isLeftChild) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        } else if (current.left === null) { // 只有右子节点
            if (current === this.root) {
                this.root = current.right;
            } else if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }
        // 情况二：删除的节点有两个子节点
        else {
            // 1.获取后继节点
            let successor = this.getSuccessor(current);

            // 2.判断是否是根节点
            if (this.root === current) {
                this.root = successor;
            } else if (isLeftChild) {
                parent.left = successor;
            } else {
                parent.right = successor;
            }
            successor.left = current.left;
        }

        return true;
    }

    getSuccessor(delNode) {
        // 1.定义变量，来存储临时节点
        let successorParent = delNode;
        let successor = delNode;
        let current = delNode.right;

        // 2.寻找(后继)节点
        while (current !== null) {
            successorParent = successor;
            successor = current;
            current = current.left; //往左找到最小值(后继)
        }

        // 3.如果后继节点不是删除节点的右节点
        if (successor !== delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }

        return successor;
    }
}