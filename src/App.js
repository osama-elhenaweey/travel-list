import { useState } from "react";
import "./style.css";

// const initialItems = [
//     { id: 1, description: "Passports", quantity: 2, packed: false },
//     { id: 2, description: "Socks", quantity: 12, packed: true },
//     { id: 3, description: "Charger", quantity: 1, packed: false },
// ];
function App() {
    const [items, SetItems] = useState([]);
    function handleAddItems(item) {
        SetItems((items) => [...items, item]);
    }
    function handleDeleteItems(id) {
        SetItems((items) => items.filter((item) => item.id !== id));
    }
    function handleToggleItem(id) {
        SetItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }
    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItems={handleDeleteItems}
                onToggleItem={handleToggleItem}
            />
            <Stats />
        </div>
    );
}
function Logo() {
    return <h1> ⛵ FAR AWAY 💼</h1>;
}
function Form({ onAddItems }) {
    const [description, SetDescription] = useState("");
    const [quantity, SetQuantity] = useState(1);
    // const [items, SetItems] = useState([]);
    // function handeleAddItems(item) {
    //     SetItems((items) => [...items, item]);
    // }
    // Putting the state and the function to the closest parent element so we can use in two siblings element like [form and packinglist] and pass the function and obj as a props
    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        // handeleAddItems(newItem);
        onAddItems(newItem);

        SetDescription(" ");
        SetQuantity(1);
        // console.log(newItem);
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for the trip ?</h3>
            <select
                value={quantity}
                onChange={(e) => SetQuantity(+e.target.value)}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="items..."
                value={description}
                onChange={(e) => SetDescription(e.target.value)}
            />
            <button>add</button>
        </form>
    );
}
function PackingList({ items, onDeleteItems, onToggleItem }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        onDeleteItems={onDeleteItems}
                        onToggleItem={onToggleItem}
                        key={item.id}
                    />
                ))}
            </ul>
        </div>
    );
}
function Item({ item, onDeleteItems, onToggleItem }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity + ` `}
                {item.description}
            </span>
            <button onClick={() => onDeleteItems(item.id)}>❌</button>
        </li>
    );
}
function Stats() {
    return (
        <footer className="stats">
            <em>
                💼You have X items on your list, and you already packed X (X%)
            </em>
        </footer>
    );
}
export default App;
