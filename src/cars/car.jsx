import {useState} from 'react'

const Car = () => {

    const [cars, setCars] = useState([{ id: 1, x: 0, y: 0 }]);

    return (
    <div>
        {cars.map(car => (
        <div
            key={car.id}
            style={{
            width: "3rem",
            backgroundColor: 'red',
            position: 'absolute',
            left: `${car.x + 2.3}rem`,
            top: `${car.y + 3}rem`,
            border: '1px solid black',
            transition: 'left 0.3s ease, top 0.3s ease'
            }}
            onClick={()=>{
                setCars(prevCars =>
                    prevCars.map(c =>
                    c.id === car.id ? { ...c, x: c.x + 1 } : c
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