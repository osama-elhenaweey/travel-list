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
            <Stats items={items} />
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
    const [sortBy, SetSortBy] = useState("input");
    let sortedItems;
    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description") {
        sortedItems = items
            .slice() // creates a shallow copy of the items array
            .sort((a, b) => a.description.localeCompare(b.description));
        // sorts the items based on the `description` property using localeCompare
    }

    if (sortBy === "packed") {
        sortedItems = items
            .slice() // creates a shallow copy of the items array
            .sort((a, b) => Number(a.packed) - Number(b.packed));
        // sorts the items based on the `packed` property by converting to numbers
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        onDeleteItems={onDeleteItems}
                        onToggleItem={onToggleItem}
                        key={item.id}
                    />
                ))}
            </ul>
            <div className="actions">
                <select
                    value={sortBy}
                    onChange={(e) => SetSortBy(e.target.value)}
                >
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
            </div>
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
function Stats({ items }) {
    if (!items.length) {
        return (
            <p className="stats">
                <em>Start Adding some items to you packing list 📌</em>
            </p>
        );
    }
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const numPercent = Math.round((numPacked / numItems) * 100);
    // console.log(numItems, numPacked, numPercent);
    return (
        <footer className="stats">
            {numPercent === 100 ? (
                <em>You got everything ,Ready to go 🛫</em>
            ) : (
                <em>
                    💼You have {numItems} items on your list, and you already
                    packed
                    {numPacked} ({numPercent}%)
                </em>
            )}
        </footer>
    );
}
export default App;
