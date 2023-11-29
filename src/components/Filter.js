export default function Filter({
    name,
    isPressed,
    setFilter
}){
    return(
        <button
            className="border-2 border-black p-1 font-semibold disabled:bg-black disabled:text-white"
            disabled={isPressed}
            onClick={() => setFilter(name)}
        >
            {name}
        </button>
    )
}