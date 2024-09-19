import { useState } from "react";
export default function Form({ onAddItems }) {
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
