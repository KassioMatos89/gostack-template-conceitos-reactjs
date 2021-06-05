import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const repositoriesTitles = ["NodeJS", "React", "React Native", "C#", "C++", "PHP", "JavaScript"];

  useEffect(() => {
      api.get('repositories').then(response => {
          setRepositories(response.data);
      })
  }, []);

  async function handleAddRepository() {
    const repo = repositoriesTitles[Math.floor(Math.random() * repositoriesTitles.length)];
    
    const response = await api.post('repositories', {
        title: `Novo Repositorio GitHub: ${repo}`,
        url: "https://github.com/KassioMatos89/conceitos-nodejs",
        techs: [
            "NodeJS", "ReactJS", "React Native"
        ]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)
    const repositoriesReload = repositories.filter(repository => repository.id !== id);

    setRepositories(repositoriesReload);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
        </li>)}
            
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
