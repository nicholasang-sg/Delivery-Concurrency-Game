// car.jsx
const Car = ({cars, setCars}) => {

    return (
    <div>
        {cars.map(car => (
        <div
            key={car.id}
            style={{
            width: "3rem",
            backgroundColor: 'red',
            boxSizing: 'border-box',
            position: 'absolute',
            left: `${car.x + 0.25}rem`,
            top: `${car.y + 1}rem`,
            border: '1px solid black',
            transition: 'left 0.3s linear, top 0.3s linear',
            zIndex: '10'
            }}
            onClick={()=>{
                setCars((prevCars) =>
                    prevCars.map(c =>
                    c.id === car.id ? { ...c, x: c.x + 3.5, y: c.y + 3.5 } : c
                    )
                );
            }}
        >
            Car {car.id}
        </div>
        ))}
    </div>
    );
}

export default Car;