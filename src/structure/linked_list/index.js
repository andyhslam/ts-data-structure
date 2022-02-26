import { LinkedList } from './linked_list'
import { DoublyLinkedList } from './doubly_linked_list'

// const linkedList = new LinkedList();
const linkedList = new DoublyLinkedList();
linkedList.append('aaa');
linkedList.append('bbb');
linkedList.append('ccc');
linkedList.append('ddd');
console.log(linkedList);

linkedList.insert(1, 'abc');
linkedList.insert(3, 'cba');
linkedList.insert(0, 'npc');
console.log(linkedList);

console.log(linkedList.get(0));
console.log(linkedList.get(3));

console.log(linkedList.indexOf('npc'));
console.log(linkedList.indexOf('abc'));
console.log(linkedList.indexOf('cba'));

console.log(linkedList.removeAt(3));
console.log(linkedList.removeAt(0));
console.log(linkedList);

console.log(linkedList.update(0, 'nnn'));
console.log(linkedList.update(1, 'mmm'));
console.log(linkedList);

console.log(linkedList.remove('mmm'));
console.log(linkedList.remove('nnn'));
console.log(linkedList);

console.log(linkedList.isEmpty());
console.log(linkedList.size());