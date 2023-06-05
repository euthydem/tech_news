import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ChatBot from 'react-simple-chatbot';
import './App.css';

function App() {
    const [technologies, setTechnologies] = useState([]);
    const [activeTechnology, setActiveTechnology] = useState(null);

    useEffect(() => {
        fetchTechnologies();
    }, []);

    async function fetchTechnologies() {
        // Emulating API response
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
                        {
                            id: 6,
                            name: 'Blockchain',
                            description: 'Распределенная база данных, которая записывает информацию в виде блоков и связывает их в цепочку.',
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

    const chatBotSteps = [
        {
            id: '1',
            message: 'Привет! Я чат-бот. Чем могу помочь?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '3',
        },
        {
            id: '3',
            message: 'Спасибо за ваше сообщение!',
            end: true,
        },
    ];

    return (
        <div className="container">
            <h1 className="title">Современные технологии по Gartner Hype Circle</h1>
            <TransitionGroup component="ul" className="technology-list">
                {technologies.map((item) => (
                    <CSSTransition key={item.id} timeout={300} classNames="fade">
                        <div
                            className={`technology-item ${activeTechnology === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTechnology(item.id)}
                        >
                            <h2>{item.name}</h2>
                            {activeTechnology === item.id && (
                                <div className="description">
                                    <p>{item.description}</p>
                                    <p>Status: {item.status}</p>
                                </div>
                            )}
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <div className="chatbot-container">
                <ChatBot
                    steps={chatBotSteps}
                    floating={true}
                    floatingStyle={{
                        bottom: '20px',
                        right: '20px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                        backgroundColor: '#7fc955',
                        color: '#333',
                    }}
                />
            </div>
        </div>
    );
}

export default App;
