import './LogIn.css'
import { useState } from 'react';
import api from '../api/axios';

export function LogIn () {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/usuario/login', {email,senha});
            const usuario = response.data;
            localStorage.setItem('usuario', JSON.stringify(usuario));
            window.location.href = '/';
        } catch (error) {
            setMensagem('E-mail ou senha incorretos!');
        }
    };

    return (
        <div className='logInPage'>
            <div className='logIn'>
                <h4>Entrar</h4>
                {mensagem && <p>{mensagem}</p>}
                <form className='logInForm' onSubmit={handleSubmit}>
                    <input placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    <div>
                        <button type='submit'>Entrar</button>
                    </div>
                </form>
                <a href='/LogIn'>Esqueceu a senha?</a>
                <p>Não tem uma conta? <a href='/SignUp'>Cadastre-se</a></p>
            </div>
        </div>
    );
}

