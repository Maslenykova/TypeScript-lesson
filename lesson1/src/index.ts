import { updateUser, addNewUser, users, fetchUserDetails } from "./users";


type Pizza = {
    id: number
    name: string,
    price: number,
}

type Order = {
    id: number,
    pizza: Pizza,
    status: "ordered" | "completed",
}

let cashInRegister = 100
let nextOrderId = 1;
let nextPizzaId = 1;
const orderQueue: Order[] = []


export const menu: Pizza[] = [
    {id: nextOrderId++, name: "Margherita", price: 8},
    {id: nextOrderId++, name: "Pepperoni", price: 10},
    {id: nextOrderId++, name: "Hawaiian", price: 10},
    {id: nextOrderId++, name: "Veggie", price: 9},
]

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizza: Pizza = {
        id: nextOrderId++,
        ...pizzaObj
    }
    menu.push(newPizza)
    return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined{
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if(!selectedPizza){
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price;
    const newOrder: Order = {id: nextOrderId++, pizza: selectedPizza, status: "ordered"};
    orderQueue.push(newOrder);
    return newOrder;
};

function completeOrder(orderId: number): Order | undefined{
    const order = orderQueue.find(order => order.id === orderId)
    if(!order){
        console.error(`${orderId} was not found in orderQueue`)
        return
    }
    order.status = "completed"
    return order;
}

 function getPizzaDetail(identifier: string | number): Pizza | undefined{
    if (typeof identifier === "string"){
      return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
    }
   else if(typeof identifier === "number"){
        return menu.find(pizza => pizza.id === identifier)
      }
      else{
        throw TypeError("Parameter `identifier` must be either a string or a number") 
      }
}

function addToArray<T>(array: T[], item: T): T[]{
    array.push(item);
    return array;
}

addToArray<Pizza>(menu, {id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12});
addToArray<Order>(orderQueue, {id: nextOrderId++, pizza: menu[2], status:"completed" })

addNewPizza({ name: "Chicken Bacon Ranch", price: 12})
addNewPizza({ name: "BBQ Chicken", price: 12})
addNewPizza({ name: "Spicy Sausage", price: 1})

placeOrder("Chicken Bacon Ranch")
completeOrder(2)

console.log('detail',getPizzaDetail(2));

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)


console.log(updateUser(1, {username:"new_john_doe"}));
console.log(addNewUser({username:"joe_schmoe", role: "memeber"}));
console.log(users);
console.log(fetchUserDetails("jane_doe"));


