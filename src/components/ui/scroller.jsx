const Scroller = ({
  items,
  direction = "left",
  speed = "fast",
  className = "",
}) => {
  return (
    <div
      data-direction={direction}
      data-speed={speed}
      className={`scroller ${className}`}
    >
      <ul className="list-none m-0 px-0 scroller__inner">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 bg-highlight rounded-full text-sm shadow-sm shadow-black transition-opacity duration-1000 opacity-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scroller;
