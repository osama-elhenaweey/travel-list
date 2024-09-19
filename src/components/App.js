import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
// import Item from "./Item";
import Stats from "./Stats";
// import "./style.css";

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
    function handleClearList() {
        const confirmed = window.confirm(
            "Are you sure you want to clear the list items"
        );
        if (confirmed) SetItems([]);
    }
    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItems={handleDeleteItems}
                onToggleItem={handleToggleItem}
                onClearList={handleClearList}
            />
            <Stats items={items} />
        </div>
    );
}

export default App;
