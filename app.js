//staks
//function push,pop,peek,length
//array


let letters = [];
let word = "ivyliu";
let rword = "";

//put words into stack
for(let i=0;i<word.length;i++){
    letters.push(word[i]);
}
console.log(letters);

//pop off words from stack
for (let i = 0; i < word.length; i++) {
    rword+=letters.pop();
}
console.log(rword);

var Stack = function() {
    this.count=0;
    this.storage={};

    //add
    this.push = function(val) {
        this.storage[this.count]=val;
        this.count++;
    }
    console.log(this.storage);

    this.pop = function(){
        if(this.count===0){
            return undefined;
        }
        this.count--;
        let res = this.storage[this.count];
        delete this.storage[this.count];
        return res;

    }
    this.size = function(){
        return this.count;
    }

    this.peek = function(){
        return this.storage[this.count-1];
    }

}

let myStock = new Stack();
myStock.push(1);
myStock.push(2);
console.log(myStock.peek());
console.log(myStock.pop());
console.log(myStock.peek()); 
console.log(myStock.size());

//set
//like array but no dupilicate items
//for check the number of same items

function mySet(){
    let collection=[];

    //if element is in the array
    this.has=function(val){
        return (collection.indexOf(val)!==-1);
    };
    this.values = function(){
        return collection;
    };
    //add element into set,no depulicate
    this.add= function(val){
        if(!this.has(val)){
            collection.push(val);
            return true;
        }
        return false;
    }
    //remove
    this.remove = function(val){

        if(this.has(val)){
            index=collection.indexOf(val);
            collection.splice(index,1);
            return true;
        }
        return false;
    }
    this.size = function(){
        return collection.length();
    }
    this.union = function(otherset){
        let unionset = new mySet();
        let firstset= this.values();
        let secondset = otherset.values();
        firstset.forEach(element => {
            unionset.add(element)
        }); 
        secondset.forEach(element => {
            unionset.add(element)
        }); 
        return unionset;
    }

    //intersection
    this.intersection = function(otherset){
        let interSet = new mySet();
        let firstset = this.values();
        firstset.forEach(element => {
            if(otherset.has(element)){
                interSet.add(element);
            }
        }); 
        return interSet;
    }

    //difference
    this.different = function(otherset){
        let differSet = new mySet();
        let firstset = this.values();
        firstset.forEach(e =>{
            if(!otherset.has(e)){
                differSet.add(e);
            }
        });
        return differSet;
    }

    //subset
    this.subset = function(otherset){
        let firstset = this.values();
        return firstset.every(function(val){
            return otherset.has(val);
        });
    }
}

let setA = new mySet();
let setB = new mySet();
setA.add("a");
setB.add("b");
setB.add("c");
setB.add("a");
setB.add("d");
console.log(setA.subset(setB));
console.log(setA.union(setB).values());
console.log(setA.intersection(setB).values());
console.log(setB.different(setA).values());

let setC = new mySet();
let setD = new mySet();
setC.add("a");
setD.add("b");
setD.add("c");
setD.add("a");
setD.add("d");
console.log(setD.values());
setD.remove("a");
console.log(setD.has("a"));

//queue first in and first out

function Queue(){
    collection = [];
    this.print = function(){
        console.log(collection);
    };
    this.enqueue = function(e){
        collection.push(e);
    };
    this.dequeue = function(){
        collection.shift();
    };
    this.front = function(){
        return collection[0];
    };
    this.size = function(){
        return collection.length;
    };
    this.isEmpty = function(){
        return (collection.length === 0);
    };
}

let myQueue = new Queue();
myQueue.enqueue("a");
myQueue.enqueue("b");
myQueue.enqueue("c");
myQueue.print();
console.log(myQueue.front());
myQueue.print();
myQueue.dequeue("a");
console.log(myQueue.front());
myQueue.print();

//priorityqueue
function priorityQueue(){
    collection = [];
    this.print = function () {
        console.log(collection);
    };
    this.enqueue = function(e){
        if(this.isEmpty()){
            collection.push(e);
        }else {
            let added=false;
            for(let i=0;i<collection.length;i++){
                if(e[1]<collection[i][1]){
                    collection.splice(i,0,e);
                    added = true;
                    break;
                }
            }
            if(!added){
                collection.push(e);
            }
        }
    };
    this.dequeue = function () {
        let e=collection.shift();
        return e[0]
    };

}

//binary search tree
//left child is less than parent node 
//right child is greater than parent node

class Node{
    constructor(data,left=null,right=null){
        this.data=data;
        this.left=left;
        this.right=right;
    }
}

class BST{
    constructor(){
        this.root=null;
    }
    add(data){
        const node=this.root;
        if(node === null){
            this.root = new Node(data);
            return;
        } else{
            const searchTree = function(node){
                if(data<node.data){
                    if(node.left === null){
                        node.left = new Node(data);
                        return;
                    } else if(node.left !=null){
                        return (searchTree(node.left));
                    }
                } else if(data > node.data){
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right != null) {
                        return (searchTree(node.right));
                    }
                } else{
                    return null;
                }
            };
            return searchTree(node);
        }
    };
    findMin(){
        let current = this.root;
        while(current.left!==null){
            current=current.left;
        }
        return current.data;
    }
    findMax(){
        let current=this.root;
        while(current.right!==null){
            current=current.right;
        }
        return current.data;
    }
    find(data){
        let current=this.root;
        while(current.data!==data){
            if(data < current.data){
                current=current.left;
            } else{
                current = current.right;
            }
            if(current ===null){
                return null;
            }

        }
        return current;
    }
    isPresent(data){
        let current = this.root;
        while(current){
            if(data === current.data){
                return true;
            } 
            if(data < current.data){
                current = current.left;
            } else if(data > current.data){
                current = current.right;
            }
        }
        return false;
    }
    remove(data){
        const removeNode = function(node,data){
            if(node ===null){
                return null;
            }
            if(data ===node.data){
                //node has no child
                if(node.left === null && node.right ===null){
                    return null;
                }
                //node has no left child
                if(node.left === null){
                    return node.right;
                }
                //node has no right child
                if(node.right === null){
                    return node.left;
                }
                //node has two child
                var tempNode = node.right;
                while (tempNode.left !=null){
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right=removeNode(node.right, tempNode.data)
                return node;
            }
            else if(data < node.data){
                node.left = removeNode(node.left, data);
                return node;
            }
            else if (data > node.data) {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        this.root = removeNode(this.root,data);
    }
    isBalanced() {
        return (this.findMinHeight() + 1 >= this.findMaxHeight());
    }
    findMinHeight(node = this.root){
        if(node === null){
            return -1;
        }
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if(left < right){
            return left+1;
        } else {
            return right+1;
        }
    }
    findMaxHeight(node = this.root) {
        if (node === null) {
            return -1;
        }
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }
    inOrder(){
        if(this.root === null){
            return -1;
        } else{
            var res = new Array();
            function traversalInOrder(node){
                node.left && traversalInOrder(node.left);
                res.push(node.data);
                node.right && traversalInOrder(node.right);
            };
            traversalInOrder(this.root);
            return res;
        }
    }
    preOrder() {
        if (this.root === null) {
            return -1;
        } else {
            var res = new Array();
            function traversalPreOrder(node) {
                res.push(node.data);
                node.left && traversalPreOrder(node.left);
                node.right && traversalPreOrder(node.right);
            };
            traversalPreOrder(this.root);
            return res;
        }
    }
    postOrder() {
        if (this.root === null) {
            return -1;
        } else {
            var res = new Array();
            function traversalPostOrder(node) {
                node.left && traversalPostOrder(node.left);
                node.right && traversalPostOrder(node.right);
                res.push(node.data);
            };
            traversalPostOrder(this.root);
            return res;
        }
    }
    
}

const bst = new BST();
bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
bst.remove(4);
console.log(bst.findMin());
console.log(bst.findMax());
bst.remove(7);
console.log(bst.findMax());
console.log(bst.isPresent(4));

//tree triversal and height;
//height

console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.preOrder());
console.log(bst.inOrder()); 
console.log(bst.postOrder());


//hash table
var hash = (string,max) =>{
    var hash = 0;
    for (let i = 0; i < string.length;i++){
        hash += string.charCodeAt(i);
    }
    return hash % max;
};

let hashTable = function(){
    let storage = [];
    const storageLimit = 4;

    this.print = function(){
        console.log(storage);
    }
    this.add = function(key, value){
        let index = hash(key, storageLimit);
        if(storage[index] === undefined){
            storage[index] = [[key,value]];
        } else {
            let inserted = false;
            for(let i =0; i<storage[index].length;i++){
                if(storage[index][i][0]===key){
                    storage[index][i][1]=value;
                    inserted= true;
                }
            }
            if(inserted === false ){
                storage[index].push([key, value]);
                    
            }

        }
    }
    this.remove = function (key){
        let index = hash(key,storageLimit);
        if (storage[index].length === 1 && storage[index][0][0]===key){
            delete storage[index];
        } else {
            for(let i =0;i<storage[index].length;i++){
                if(storage[index][i][0] === key){
                    delete storage[index][i];
                }
            }
        }
    }
    this.lookup = function(key){
        let index = hash(key,storageLimit);
        if(storage[index] === undefined){
            return undefined;
        } else {
            for(let i =0;i<storage[index].length;i++){
                if(storage[index][i][0]===key){
                    return storage[index][i][1];
                }
            }
        }
    }
}

console.log(hash("beau",10));

let h1 = new hashTable();
h1.add("beau","person");
h1.add("fido", "dog");
h1.add("rex", "dinosour");
h1.add("tjs", "penguin");
console.log(h1.lookup("tjs"));
h1.print();

//linked list

function linkedList(){
    let length=0;
    let head=null;

    let Node = function(e){
        this.element=e;
        this.next=null;
    };
    this.size = function(){
        return length;
    };
    this.head = function(){
        return head;
    };
    this.add = function(e){
        let node =new Node(e);
        if (head === null) {
            head = node;
        } else {
            let currentNode = head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;

        }
        length++;
    }
    this.remove = function(e){
        let currentNode = head;
        let previousNode;
        if (currentNode.e === e){
            head = currentNode.next;
        } else {
            while(currentNode.element!=e){
                previousNode=currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next=currentNode.next;

        }
        length--;
    }
    this.isEmpty = function(){
        return length ===0;
    }
    this.indexOf = function(e){
        let currentNode=head;
        let index = -1;
        while (currentNode){
            index++;
            if(currentNode.element===e){
                return index;
            }
            currentNode=currentNode.next;
        }
        return -1;
    };
    this.elementAt = function (index){
        let currentNode=head;
        let count=0;
        while(count<index){
            count++;
            currentNode=currentNode.next;
        }
        return currentNode.element;
    };

    this.addAt = function(index,element){
        let node = new Node(index,element);

        let currentNode=head;
        let previousNode;
        let currentIndex = 0;

        if(index>length){
            return false;
        }
        if(index ===0){
            node.next = currentNode;
            head = node;
        } else {
            while (currentIndex<index){
                currentIndex++;
                previousNode=currentNode;
                currentNode=currentNode.next;
            }
            node.next=currentNode;
            previousNode.next=node;

        }
        length++;
    }
    this.removeat = function(index,element){
        let currentNode=head;
        let previousNode;
        let currentIndex=0;
        if(index<0 || index >=length){
            return null;
        }

        if(index===0){
            head = currentNode.next;
        } else {
            while(currentIndex<index){
                currentIndex++;
                previousNode = currentNode;
                currentNode = currentNode.next;
            }
            previousNode.next = currentNode.next;
        }
        length--;
        return currentNode.element;
    }
};

let l = new linkedList();
l.add("kitty");
l.add("lili");
l.add("dog");
l.add("cat");
l.add("fish");
console.log(l.size());
console.log(l.removeat(3)); 
console.log(l.size());
console.log(l.elementAt(3));
console.log(l.isEmpty());
console.log(l.head());
console.log(l.indexOf("fish"));