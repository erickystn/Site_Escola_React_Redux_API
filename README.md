# 🎓 Escola App — Front-End em React, Redux Saga & Bootstrap

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux_Toolkit-Saga-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-CSS--in--JS-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-REST_Client-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)
![Licença](https://img.shields.io/badge/Licença-MIT-yellow?style=for-the-badge)

---

## 🔗 Acesso e Rotas da Aplicação

* **Ambiente Local de Desenvolvimento:** `http://localhost:3000`
* **Rotas Principais:**
  * `/`: Listagem Geral de Alunos Cadastrados
  * `/login`: Autenticação de Usuário / Administrador
  * `/cadastro`: Cadastro de Novo Usuário e Edição de Perfil
  * `/aluno/:id/edit`: Formulário de Edição de Aluno
  * `/aluno`: Formulário de Cadastro de Novo Aluno
  * `/fotos/:id`: Upload e Gestão de Foto de Perfil do Aluno

---

## 📖 Visão Geral

O **Escola App** é uma Single Page Application (SPA) desenvolvida em **React 18**, projetada para a administração acadêmica de alunos e usuários de uma instituição de ensino.

A aplicação adota um padrão de arquitetura robusto para gerenciamento de fluxos assíncronos e estados globais através do **Redux Toolkit** combinado com **Redux Saga** e **Redux Persist**, garantindo que a sessão e o token **JWT** permaneçam ativos entre recarregamentos de página. O sistema consome uma API RESTful externa via **Axios**, implementa rotas privadas protegidas contra acessos não autenticados, feedback visual com **React Toastify** e modais acessíveis com **React-Bootstrap**.

---

## ✨ Funcionalidades

* 🔐 **Autenticação & Sessão Persistente:**
  * Login com e-mail e senha consumindo o endpoint `/tokens`.
  * Middleware Redux Saga interceptando o fluxo de login e despachando `authSuccess` / `authFailed`.
  * Injeção automática do cabeçalho `Authorization: Bearer <TOKEN>` no Axios e reidratação com `redux-persist`.
  * Logout seguro (`FaPowerOff`) com limpeza de estado global e headers da sessão.
* 👨‍🎓 **Gestão Completa de Alunos (CRUD):**
  * Listagem geral com exibição de avatar, nome, e-mail e atalhos rápidos de ação.
  * Cadastro e edição de alunos com validação de campos (nome, sobrenome, e-mail, idade, peso e altura).
  * Exclusão com confirmação em modal seguro (`MeuModal` com backdrop estático via Bootstrap).
* 📸 **Upload de Fotos de Alunos:**
  * Rota dedicada para envio de arquivo de imagem (`multipart/form-data`) para o endpoint `/fotos`.
  * Pré-visualização instantânea da foto selecionada antes da confirmação.
* 🛡️ **Rotas Protegidas (`MyRoute`):**
  * Bloqueio automático de rotas restritas para visitantes não autenticados, redirecionando para a tela de login e preservando a rota de origem (`prevPath`).

---

## 🎯 Diferenciais e Destaques Técnicos

1. **Arquitetura Assíncrona com Redux Saga:** Uso de generators (`function*`) e efeitos do redux-saga (`call`, `put`, `all`, `takeLatest`) para isolar efeitos colaterais de requisições HTTP da árvore de componentes.
2. **Reidratação de Sessão com Redux Persist:** Sincronização automática do token de autenticação via evento `persist/REHYDRATE`, mantendo os cabeçalhos padrão do Axios atualizados mesmo após refresh do navegador.
3. **Estilização Híbrida Inteligente:** Combinação de **Styled Components** para temas, cores globais e micro-interações CSS com **Bootstrap 5** para componentes estruturais como modais de confirmação.
4. **Tratamento Global de Erros:** Captura centralizada de falhas HTTP 401 e erros de validação na camada de Sagas, disparando notificações toast em tempo real com `react-toastify`.

---

## 🏗️ Estrutura do Repositório

```text
src/
├── components/                 # Componentes compartilhados
│   ├── Header/                 # Barra de navegação com status de login e logout
│   ├── Loading/                # Overlay de spinner durante chamadas assíncronas
│   └── MeuModal/               # Modal Bootstrap estático para confirmação de exclusão
├── config/
│   └── colors.js               # Paleta de cores centralizada (primaryColor, infoColor, etc.)
├── pages/                      # Telas da aplicação
│   ├── Aluno/                  # Cadastro e edição de aluno
│   ├── Alunos/                 # Tabela / feed de alunos com ações
│   ├── Cadastro/               # Cadastro e edição de usuário operador
│   ├── Foto/                   # Upload de avatar de aluno
│   ├── Login/                  # Autenticação
│   └── Page404/                # Rota de fallback para páginas inexistentes
├── routes/
│   ├── MyRoute.js              # Wrapper de rota privada com verificação de login
│   └── index.js                # Mapeamento central de rotas do react-router-dom
├── services/
│   ├── axios.js                # Instância pré-configurada do Axios
│   └── history.js              # Objeto history customizado para navegação programática
├── storage/                    # Configuração de estado Redux
│   ├── auth/
│   │   ├── authSlice.js        # Reducers e actions do slice de autenticação
│   │   └── sagas.js            # Efeitos assíncronos (login, cadastro, reidratação)
│   ├── index.js                # Configuração da store Redux com rootReducer e sagaMiddleware
│   └── rootSaga.js             # Agregador de sagas
├── styles/
│   └── GlobalStyles.js         # Estilos globais injetados via styled-components
├── App.js                      # Componente raiz com Provider Redux e PersistGate
└── index.js                    # Ponto de entrada do DOM React
```

---

## 🎨 Fluxo de Autenticação e Rotas

```text
                  +-------------------------+
                  |  Visitante Acessa App   |
                  +-------------------------+
                               |
                   [ Rota Protegida? ]
                   /                 \
             (Sim) v                  v (Não)
       [ Está Logado? ]         [ Exibe Página Pública ]
       /              \
 (Sim) v               v (Não)
[ Exibe Conteúdo ]  [ Redireciona /login ]
```

---

## ⚙️ Requisitos e Instalação

### Pré-requisitos
* **Node.js:** Versão 18 ou superior.
* **Gerenciador de Pacotes:** `npm`.
* **API Back-End:** Uma instância ativa da API de Alunos rodando (porta padrão esperada: `3001` ou conforme configurado em `src/services/axios.js`).

### 1. Clonar o Repositório
```bash
git clone https://github.com/erickystn/Site_Escola_React_Redux_API.git
cd Site_Escola_React_Redux_API
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar a URL da API
Verifique o arquivo `src/services/axios.js` para garantir que a `baseURL` corresponda ao endereço do servidor back-end:
```javascript
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001',
});
```

---

## 🚀 Como Executar

```bash
# Executar a aplicação em modo de desenvolvimento:
npm start

# Gerar o build otimizado para produção:
npm run build

# Executar os testes automatizados:
npm test
```

O navegador abrirá automaticamente em `http://localhost:3000`.

---

## 💻 Exemplos de Código em Destaque

### 1. Saga de Autenticação com Reidratação Automática
```javascript
function* fazerRequisicaoLogin({ payload }) {
  try {
    const { data } = yield call(axios.post, '/tokens', payload);
    yield put(authSuccess(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    history.push(history?.location?.state?.prevPath || '/');
  } catch (error) {
    yield put(authFailed({ errors: error?.response?.data?.errors }));
  }
}
```

### 2. Rota Protegida Customizada (`MyRoute`)
```javascript
export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  return <Route {...rest} component={Component} />;
}
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
| :--- | :--- | :--- |
| **React** | 18.3 | Biblioteca declarativa de interfaces SPA |
| **Redux Toolkit** | 2.x | Gerenciamento de estado previsível e slices |
| **Redux Saga** | 1.3 | Orquestração e efeitos assíncronos via generators |
| **Redux Persist** | 6.0 | Persistência do estado do usuário no localStorage |
| **Bootstrap / React-Bootstrap** | 5.3 / 2.10 | Framework visual e modais de confirmação |
| **Styled Components** | 6.x | Estilização componentizada CSS-in-JS |
| **Axios** | 1.7 | Cliente HTTP com suporte a interceptores |
| **React Toastify** | 10.x | Alertas dinâmicos e notificações de status |
| **React Icons** | 5.2 | Pacote completo de ícones (FontAwesome) |

---

## 👤 Autor & 📄 Licença

Desenvolvido por **[Ericky Sant'ana](https://github.com/erickystn)** para gestão acadêmica escolar.

Distribuído sob a licença **MIT**.
