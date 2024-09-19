export default function Stats({ items }) {
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
                    packed {``}
                    {numPacked} ({numPercent}%)
                </em>
            )}
        </footer>
    );
}
