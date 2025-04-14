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
      <section className='header'>
        <a href='/'>MINI SISTEMA DE TAREFAS (ToDo)</a>
        <div>
          {usuarioLogado ? (
            <>
              <p>Olá, {usuarioLogado.nome}</p>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <>
              <a href='/LogIn'>Logar</a> |{' '}
              <a href='/SignUp'>Cadastrar</a>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Header
