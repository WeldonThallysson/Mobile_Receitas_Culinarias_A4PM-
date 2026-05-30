# Culinary Recipe - Aplicativo de Receitas

Um aplicativo React Native para compartilhar e gerenciar receitas culinárias. Permite que usuários façam login, criem receitas, visualizem suas receitas e gerenciem seu perfil.

## 📱 Telas da Aplicação

### Autenticação
- **Login**: Tela de entrada com e-mail e senha
- **Register**: Cadastro de novo usuário
- **Recover Password**: Recuperação de senha via e-mail
- **Reset Password**: Redefinição de senha com token

### Aplicativo (após login)
- **Home (Receitas)**: Lista de receitas com opções para criar, editar e visualizar receitas
  - Criar receita com categoria, tempo de preparo, porções, ingredientes e modo de preparo
  - Editar receitas existentes
  - Deletar receitas
- **Profile (Perfil)**: Visualizar e editar informações do perfil do usuário
  - Nome, e-mail, telefone e outros dados
  - Botão de logout

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js >= 22.11.0
- npm ou yarn
- Android Studio (para rodar no Android)
- Xcode (para rodar no iOS - macOS apenas)
- JDK 17+ (para build Android)

### 1️⃣ Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 2️⃣ Iniciar Metro (em um terminal)

```bash
npm start
# ou
yarn start
```

### 3️⃣ Rodar o App Localmente

#### Android
```bash
npm run android
# ou
yarn android
```

#### iOS (macOS)
```bash
# Instalar CocoaPods (primeira vez apenas)
bundle install

# Instalar pods a cada atualização de dependências nativas
bundle exec pod install

# Rodar no simulador
npm run ios
# ou
yarn ios
```

## 📦 Gerar APK para Release (Android)

### Build Release APK
```bash
cd android
./gradlew assembleRelease
```

A APK gerada estará em:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Build e Deploy (Bundle para Play Store)
```bash
cd android
./gradlew bundleRelease
```

O bundle gerado estará em:
```
android/app/build/outputs/bundle/release/app-release.aab
```

## 🔧 Tecnologias Utilizadas

- **React Native** 0.85.3
- **React Navigation** - Navegação entre telas
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Zustand** - Gerenciamento de estado
- **React Native Paper** - Componentes UI
- **Axios** - Requisições HTTP
- **AsyncStorage** - Persistência local
- **TypeScript** - Tipagem estática

## 📁 Estrutura do Projeto

```
src/
├── api/           # Configuração de requisições HTTP
├── components/    # Componentes reutilizáveis (formulários, etc)
├── constants/     # Constantes da aplicação
├── errors/        # Tratamento de erros
├── global/        # Temas e configurações globais
├── hooks/         # Custom hooks (useAuth, useRecipes, etc)
├── interfaces/    # Interfaces TypeScript
├── routes/        # Navegação e rotas
├── schemas/       # Validação com Zod
├── screens/       # Telas da aplicação
├── services/      # Serviços de API
├── storage/       # Armazenamento local
├── store/         # Estado global (Zustand)
├── types/         # Tipos TypeScript
└── utils/         # Utilitários e formatadores
```

## 🧪 Testes

Executar testes unitários:
```bash
npm run test
# ou
yarn test
```

## ⚙️ Configuração de Ambiente

Certifique-se de que as variáveis de ambiente estão configuradas no arquivo `.env` ou no `react-native-config`:

```env
API_URL=http://seu-backend-url
```

## 🔄 Recarregar a Aplicação

Durante desenvolvimento com Fast Refresh:
- **Android**: Pressione <kbd>R</kbd> duas vezes ou acesse o Dev Menu com <kbd>Ctrl</kbd> + <kbd>M</kbd>
- **iOS**: Pressione <kbd>R</kbd> no simulador

Para recarregar completo, abanar o dispositivo e selecione "Reload".

## 📝 Notas Importantes

- Token de autenticação é armazenado localmente via AsyncStorage
- O logout limpa o token e retorna para as telas de autenticação
- Formatador de tempo: ao digitar minutos no formulário, é exibido como "7min" mas o valor armazenado é apenas "7"

## 🐛 Troubleshooting

**Problema**: Metro não inicia
- Solução: Kill todos os processos node e tente novamente

**Problema**: Erro ao instalar pods (iOS)
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

**Problema**: Build Android falhando
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

## 📚 Recursos Adicionais

- [React Native Documentation](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
