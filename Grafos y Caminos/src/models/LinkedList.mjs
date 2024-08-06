import Node from "./Node.mjs";
import City from "./Rutas.mjs";

export default class LiknkedList{
    #head
    #count

    constructor(){
        this.#head=null
        this.#count=0
    }

    push (rutas,distance){
        let rutas=new City(rutas,distance)
        let node= new Node(rutas)

        if (this.#head==null)
            this.#head=node
        else{
            let current=this.#head
            while(current.next!=null)
                current=current.next
            current.next=node
        }
        this.#count++
    }
    size(){
        return this.#count
    }

    isEmpty(){
        return(this.#head==null)?true:false
    }
        
    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next;
            }
            return node;
        }
        return null;
    }

    getHead() {
        return this.#head;
    }

    toArray() {
        const elements = [];
        for (let current = this.#head; current !== null; current = current.next) {
            elements.push(current.value);
        }
        return elements;
    }
}


