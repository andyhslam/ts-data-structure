import { BinarySearchTree } from './tree'

const bst = new BinarySearchTree();

// 插入数据
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

console.log(bst);

// bst.preOrderTraverse();
// bst.inOrderTraverse();
// bst.postOrderTraverse();

// console.log(bst.min());
// console.log(bst.max());

// console.log(bst.search(8));
// console.log(bst.search(24));

// console.log(bst.searchInWhile(8));
// console.log(bst.searchInWhile(24));

console.log(bst.remove(24));
bst.inOrderTraverse();