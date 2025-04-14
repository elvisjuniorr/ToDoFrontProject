import './SignUp.css'
import React, { useState } from 'react';
import { FeedbackMessage } from './FeedbackMessagr';
import api from '../api/axios';

export function SignUp (){

    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        input_nome: '',
        input_sobrenome: '',
        input_email: '',
        input_confirmar_email: '',
        input_senha: '',
        input_confirmar_senha: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };

    const validateForm = () => {
        const {
            input_nome,
            input_email,
            input_confirmar_email,
            input_senha,
            input_confirmar_senha,
        } = formData;

        if (input_nome.length < 2) {
            setMessage('Nome deve ter entre 2 e 50 caracteres.');
            return false;
        }

        if (input_email !== input_confirmar_email) {
            setMessage('Os e-mails não coincidem.');
            return false;
        }

        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        

        if (!strongPasswordRegex.test(input_senha)) {
            setMessage('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.');
            return false;
        }

        if (input_senha !== input_confirmar_senha) {
            setMessage('As senhas não correspondem.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!validateForm()) return;
      
        try {
          const payload = {
            nome: formData.input_nome,
            sobrenome: formData.input_sobrenome,
            email: formData.input_email,
            senha: formData.input_senha
          };
      
          const response = await api.post('/usuario', payload);
      
          setMessage('Usuário cadastrado com sucesso!');
          console.log(response.data);
        } catch (error: any) {
          console.error(error);
          setMessage('Erro ao cadastrar usuário.');
        }
    };

    const closeMessage = () => {
        setMessage(''); 
    };

    return (
        <div className='signUpPage'>
            {message && (
            <FeedbackMessage message={message} closeMessage={closeMessage} />
            )}    
            <div className='signUp'>
                <h4>Cadastre-se</h4>
                <form onSubmit={handleSubmit} className='signUpForm'>
                    <label>Nome</label>
                    <input className='input_nome' id='input_nome' value={formData.input_nome} 
                    onChange={handleInputChange}></input>
                    <label>Sobrenome</label>
                    <input className='input_sobrenome' id='input_sobrenome' value={formData.input_sobrenome}
                    onChange={handleInputChange}></input>
                    <label>E-mail</label>
                    <input className='input_email' id='input_email' value={formData.input_email}
                    onChange={handleInputChange}></input>
                    <label>Confirmar E-mail</label>
                    <input className='input_confirmar_email' id='input_confirmar_email' value={formData.input_confirmar_email}
                    onChange={handleInputChange}></input>
                    <label >Senha</label>
                    <input className='input_senha' id='input_senha' type="password"
                    value={formData.input_senha} onChange={handleInputChange}></input>
                    <label>Confirmar Senha</label>
                    <input className='input_confirmar_senha' id='input_confirmar_senha' type="password"
                    value={formData.input_confirmar_senha} onChange={handleInputChange}></input>
                    <div>
                        <input type="checkbox"></input>
                        <p>Eu concordo com os<a href='http://localhost:5173/'> Termos de Uso</a></p>
                    </div>
                    <div>
                        <button type="submit" id='submit_form'>CADASTRAR</button>
                    </div>
                </form>
                <p>Já tem uma conta? <a href='http://localhost:5173/LogIn'>Entrar</a></p>
            </div>
        </div>
    )
}

