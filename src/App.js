import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import './App.css';


function App() {
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        fetchTechnologies();
    }, []);

    async function fetchTechnologies() {
        // Эмуляция ответа API
        const response = {
            json: () =>
                Promise.resolve({
                    technologies: [
                        {
                            id: 1,
                            name: 'AI-Driven Development',
                            description: 'Разработка программного обеспечения с использованием искусственного интеллекта.',
                            status: 'Active',
                        },
                        {
                            id: 2,
                            name: 'Quantum Computing',
                            description: 'Использование квантовых вычислений для решения сложных задач.',
                            status: 'Active',
                        },
                        {
                            id: 4,
                            name: 'Smart Spaces',
                            description: 'Создание умных пространств, которые используют IoT-технологии для автоматизации и оптимизации работы.',
                            status: 'Active',
                        },
                        {
                            id: 5,
                            name: 'Distributed Cloud',
                            description: 'Распределенные облачные вычисления, которые позволяют работать с данными и приложениями более эффективно и безопасно.',
                            status: 'Active',
                        },
                    ],
                }),
        };

        try {
            const data = await response.json();
            setTechnologies(data.technologies);
        } catch (error) {
            console.error('Ошибка получения данных:', error);
        }
    }

    const transitions = useTransition(technologies, {
        keys: (technology) => technology.id,
        from: { opacity: 0, transform: 'translateY(-20px)' },
        enter: { opacity: 1, transform: 'translateY(0)' },
        config: { tension: 300, friction: 20 },
    });

    return (
        <div className="container">
            <h1 className="title">Современные технологии по Gartner Hype Circle</h1>
            <ul className="technology-list">
                {transitions((props, item) => (
                    <animated.li style={props} key={item.id} className="technology-item">
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Status: {item.status}</p>
                    </animated.li>
                ))}
            </ul>
        </div>
    );
}

export default App;
