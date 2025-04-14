import { useState , useEffect} from 'react'

import './Header.css'

function Header() {

  const [usuarioLogado, setUsuarioLogado] = useState<{ nome: string } | null>(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    } 
  }, []);

  const handleLogout = () => {
    const confirmar = window.confirm('Tem certeza de que deseja sair da sua conta?');

    if (!confirmar) return;

    localStorage.removeItem('usuario');

    window.location.href = '/';
  };
  
  return (
    <>
      <div className='headerPag'>
        <section className='header'>
          <h2>MINI SISTEMA DE TAREFAS (ToDo)</h2>
          <div>
            {usuarioLogado ? (
              <>
                <p>Olá, {usuarioLogado.nome}</p>
                <button onClick={handleLogout}>Sair</button>
              </>
            ) : (
              <>
                <a href='http://localhost:5173/LogIn'>Logar</a> |{' '}
                <a href='http://localhost:5173/SignUp'>Cadastrar</a>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Header
