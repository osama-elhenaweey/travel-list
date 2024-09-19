import { useState } from "react";
import Item from "./Item";
export default function PackingList({
    items,
    onDeleteItems,
    onToggleItem,
    onClearList,
}) {
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
                <button onClick={onClearList}>Clear List</button>
            </div>
        </div>
    );
}
