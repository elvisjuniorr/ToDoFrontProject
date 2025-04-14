import { useState, useEffect} from 'react'
import { Task } from './Task'
import { HiOutlineXCircle } from "react-icons/hi2";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiGearLight } from "react-icons/pi";
import api from '../api/axios'
import { CategoryType } from '../types/CategoryType'

import './ToDo.css'
import { UserType } from '../types/UserType'

function ToDo() {

  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');

  const [filtroConclusao, setFiltroConclusao] = useState<string>('todas');

  const [ordemData, setOrdemData] = useState<'asc' | 'desc'>('desc');

  const [palavraChave, setPalavraChave] = useState<string>('');
  
  const [usuario, setUsuario] = useState<UserType | null>(null);
  
  const [novaCategoria, setNovaCategoria] = useState('');

  const [categorias, setCategorias] = useState<CategoryType[]>([]);

  const fetchCategorias = async () => {

    if (usuario) {
      try {
        const response = await api.get(`/categoria/${usuario.id}`);
        console.log(response.data);
        setCategorias(response.data);
      }catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }
  };

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  useEffect(() => {
    fetchCategorias();
  }, [usuario]);

  const [addTaskForm, setAddTaskForm] = useState({
    titulo: '',
    descricao: '',
    categoriaId: '',
  });

  const completeTask = async (idTarefa: string) => {
    try {
      await api.put(`/tasks/concluir/${idTarefa}`);
      fetchCategorias();
      alert('Tarefa concluída com sucesso!');
    } catch (error) {
      console.error('Erro ao concluir tarefa:', error);
      alert('Erro ao concluir tarefa.');
    }
  };

  const deleteTask = async (idTarefa: string) => {

    const confirmar = window.confirm('Tem certeza de que deseja excluir esta tarefa?');

    if (!confirmar) return;

    try {
      await api.delete(`/tasks/${idTarefa}`);
      fetchCategorias();
      alert('Tarefa deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      alert('Erro ao deletar tarefa.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddTaskForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitTaskForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario) return;
  
    const novaTarefa = {
      titulo_tarefa: addTaskForm.titulo,
      descricao: addTaskForm.descricao,
      id_categoria: addTaskForm.categoriaId
    };
  
    try {
      await api.post('/tasks', novaTarefa);
      fetchCategorias();
      setAddTaskForm({
        titulo: '',
        descricao: '',
        categoriaId: ''
      });
      alert("Tarefa adicionada com sucesso!");      
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      alert("Erro ao adicionar tarefa.");
    }
  };

  const handleSubmitCategoryForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario) return;
  
    const newCategory = {
      titulo_categoria: novaCategoria,
      id_usuario: usuario.id
    };
  
    try {
      await api.post('/categoria', newCategory);
      setNovaCategoria('');
      fetchCategorias();
      alert('Categoria criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      alert('Erro ao criar categoria.');
    }
  };

  const handleDeleterCategory = async (idCategoria: string) => {
    const confirmar = window.confirm('Tem certeza de que deseja deletar esta categoria?');

    if (!confirmar) return;

    try {
      await api.delete(`/categoria/${idCategoria}`);
      fetchCategorias();
      alert('Categoria deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      alert('Erro ao deletar categoria.');
    }
  };

  return (
    <>
      <section className='toDo'>
        <section className='showTaskSection'>
          <h5><HiOutlineClipboardList /> Tarefas</h5>
          <section className='taskFilterSection'>
            <input
              type="text"
              placeholder="Buscar por palavras-chave..."
              value={palavraChave}
              onChange={(e) => setPalavraChave(e.target.value)}
            />
            <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
              <option value='todas'>Todas as categorias</option>
              {categorias.map(cat => (
                <option key={cat.titulo_categoria} value={cat.titulo_categoria}>{cat.titulo_categoria}</option>
              ))}
            </select>
            <select value={filtroConclusao} onChange={(e) => setFiltroConclusao(e.target.value)}>
              <option value='todas'>Todas</option>
              <option value='concluidas'>Concluídas</option>
              <option value='pendentes'>Pendentes</option>
            </select>
            <select value={ordemData} onChange={(e) => setOrdemData(e.target.value as 'asc' | 'desc')}>
              <option value='asc'>Mais antigas primeiro</option>
              <option value='desc'>Mais recentes primeiro</option>
            </select>
          </section>
          <section className='taskList'>
            {categorias
            .filter(categoria => filtroCategoria === 'todas' || categoria.titulo_categoria === filtroCategoria)
            .flatMap(categoria =>
              categoria.tarefas
                .filter(tarefa => {
                  if (filtroConclusao === 'concluidas' && !tarefa.conclusao) return false;
                  if (filtroConclusao === 'pendentes' && tarefa.conclusao) return false;
                  if (palavraChave && !(
                      tarefa.titulo_tarefa.toLowerCase().includes(palavraChave.toLowerCase()) ||
                      tarefa.descricao.toLowerCase().includes(palavraChave.toLowerCase())
                    )) return false;
                  return true;
                })
                .sort((a, b) => {
                  const dateA = new Date(a.data_criacao).getTime();
                  const dateB = new Date(b.data_criacao).getTime();
                  return ordemData === 'asc' ? dateA - dateB : dateB - dateA;
                })
                .map(tarefa => (
                  <Task
                    key={tarefa.id}
                    tarefa={tarefa}
                    removerTarefa={() => deleteTask(tarefa.id)}
                    concluirTarefa={() => completeTask(tarefa.id)}
                    titulo_categoria={categoria.titulo_categoria}
                  />
                ))
            )}
          </section>
        </section>
        <div>
          <section className='addTaskSection' onSubmit={handleSubmitTaskForm}>
            <h5><IoIosAddCircleOutline /> Adicionar Tarefa</h5>
            <form className='addTaskForm'>
              <label>Título</label>
              <input name="titulo" value={addTaskForm.titulo} onChange={handleInputChange}/>
              <label>Descrição</label>
              <textarea name="descricao" value={addTaskForm.descricao} onChange={handleInputChange}/>
              <label>Categoria</label>
              <select name="categoriaId" value={addTaskForm.categoriaId} onChange={handleInputChange}>
                <option value="" disabled>Selecione uma categoria:</option>
                {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.titulo_categoria}
                </option>
                ))}
              </select>
              <button type="submit">ADICIONAR</button>
            </form>
          </section>
          <section className='manageCategorySection'>
            <h5><PiGearLight /> Gerenciar Categorias</h5>
            <div>
              <section className='addCategorySection'>
                <h4>Criar Categoria:</h4>
                <form className='addCategoryForm' onSubmit={handleSubmitCategoryForm}>
                  <label>Nome</label>
                  <input value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)}/>
                  <button type="submit">CRIAR</button>
                </form>
              </section>
              <section className='deleteCategorySection'>
                <h4>Deletar Categoria:</h4>
                <div>
                  {categorias.map((categoria) => (
                    <button key={categoria.id}  onClick={() => handleDeleterCategory(categoria.id)}>
                      <HiOutlineXCircle style={{fontSize: "1rem"}}/>{categoria.titulo_categoria} 
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default ToDo
