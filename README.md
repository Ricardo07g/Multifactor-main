# Multifactor

Este projeto é um trabalho de conclusão de curso e tem por objetivo a construção de uma aplicação mobile de código aberto e gratuita para autenticação multifator com o intuito de possibilitar  que usuários possam adicionar um camada extra de proteção ao ratificar seu acesso em qualquer serviço que ofereça suporte a esta tecnologia de forma prática. Caso deseje aprender um pouco mais sobrea framework Ionic basta acessar [este link](https://ionicframework.com/docs/).

### Requisitos do projeto
* Requisitos do projeto
* Ionic 6 CLI
* Android Studio ou Xcode instalado

## Executar Projeto

###  Baixando este projeto
 Para Baixar este projeto basta digitar o seguinte comando no terminal:

    https://github.com/Ricardo07g/Multifactor-main.git
  
  ###  Instalando dependências 
 Para as dependências basta se dirigir ao diretório raiz do mesmo e digitar o seguinte comando no terminal:

    npm install

###  Compilação deste projeto para IOS
Caso deseje desenvolver este projeto para o sistema operacional IOS é recomendado seguir a documentação da própria Framework pois podem haver peculiaridades na configuração do ambimente de compilação do mesmo, sugiro acessar [este link](https://ionicframework.com/docs/developing/ios).

Por fim para executar o Projeto basta se dirigir ao diretório raiz do mesmo e digitar o seguinte comando no terminal :

    $ ionic cordova run ios -l --external
    
###  Compilação deste projeto para Android
Caso deseje desenvolver este projeto para o sistema operacional Android é recomendado seguir a documentação da própria Framework pois podem haver peculiaridades na configuração do ambimente de compilação do mesmo, sugiro acessar [este link](https://ionicframework.com/docs/developing/android).

Por fim para executar o Projeto basta se dirigir ao diretório raiz do mesmo e digitar o seguinte comando no terminal:

    $ ionic cordova run android -l
    
## Criando projeto do zero
Neste capitulo ensinarei como criar estruturalmente este projeto, o código fonte para funcionamento do mesmo não será inserido na documentação pois o mesmo ainda passa por manutenções para otimização e refinamento de código, contudo por se tratar de um projeto de código aberto, basta fazer download do código atualizado.

###  Instalando Ionic
 Para instalar o Ionic e suas dependências basta colar o seguinte comando no terminal:

    npm install -g @ionic/cli native-run cordova-res

###  Criando projeto Ionic
 Após esta etapa, no mesmo diretório digite o seguinte comando para criar um novo projeto Ionic Angular em branco com o nome de sua preferência:	

    ionic start "nomeDoProjeto" blank --type=angular

  ## Instalando dependências do projeto

###  SQLite
Esta dependência permite que a aplicação crie e acesse o bancos de dados SQLite do mesmo no dispositivo em que estiver instalado.É fundamental para armazenarmos os segredos no próprio dispositivo de forma persistente, uma vez que utilizar o **localStorage** ou **sessionStorage** do **In App Browser** da propria framework Ionic está fora de questão para maior segurança e persistência das informações a serem armazenadas, uma vez que qualquer limpeza de cache poderia apagar as credenciais armazenadas.

    npm install cordova-sqlite-storage
    npm install @awesome-cordova-plugins/sqlite
    ionic capacitor sync

### Clipboard
Este plugin que permite o gerenciamento de área de transferência do dispositivo em que a aplicaçã for instalada.Será utilizado para inserir na areá de transferência algum OTP gerado que o usuário selecionar para se autenticar em alguma plataforma.

    npm install @ionic-native/clipboard
    ionic capacitor sync

### Toast
Este componente permite mostrar um Toast nativo (pequeno pop-up de texto) no dispositivo em que a aplicação estiver instalada. É útil para mostrar uma notificação nativa que seja menos invasiva e direta para o usuário final, por exemplo quando algum OTP for selecionado pelo usuário e movido para a  areá de transferência do dispositivo, informamos que o mesmo foi devidamente copiado.

    npm install --save @ionic-native/toast@4
    ionic capacitor sync

### Jssha
Uma biblhoteca escrita em TypeScript/JavaScript que implementa de forma completa todas as Secure Hash Standard (SHA) (SHA-1, SHA-224/256/384/512, SHA3-224/256/384/512, SHAKE128/256, cSHAKE128/256, e KMAC128/256) com HMAC.

    npm install jssha@1.6.2 --save
    ionic capacitor sync
    
## Criando serviços 
Para este projeto iremos à raiz do projeto, se dirigir a pasta \textbf{./src/app/ }e no mesmo criar uma nova pasta com o nome **services**. Futuramente esta pasta pode ser utilizada pode ser utilizada para inserir novos serviços na aplicação, como um componente para comunicação com serviços via API, entre outros.

 Serviço pode ser entendido como uma classe que atua como uma unidade da regra de negócios, poderíamos dizer algo onde é possível armazenar, centralizar de forma organizada. Em um projeto Ionic os serviços não possuem visualização, apenas códigos reutilizável, o principal motivo pelo qual precisamos dos mesmos neste aplicação, pois podem ser importados em páginas, componentes, diretivas e até mesmo em outros serviços. 


### Serviço database
O serviço  database  contém toda a regra de negócio que necessária para utilizar o  banco de dados da aplicação, desde a criação do mesmo, assim como métodos para leitura,  inserção e deleção de dados.

    ionic generate service database
    ionic capacitor sync

### Serviço password 
O serviço password  contém toda a regra de negócio que utilizaremos para   calcular e gerar de forma correta os segredos descartáveis.

    ionic generate service password
    ionic capacitor sync
    
  No fim desta etapa o projeto estará com a seguinte configuração:
```
./src/app/services
├── database
|   ├── database.service.spec.ts
|   └── database.service.ts
├── password
|   ├── password.service.spec.ts
|   └── password.service.ts
```
## Referências
Para construção desta aplicação foram utilizadas as seguintes referências:

1 - Basit, A., Zafar, M., Liu, X. et al. A comprehensive survey of AI-enabled  
phishing attacks detection techniques. Telecommun Syst 76, 139–154 (2021). https://doi.org/10.1007/s11235-020-00733-2  

2 - Lamport, Leslie (1981). Password authentication with insecure communication.  
Communications of the ACM, 24(11), 770–772. doi:10.1145/358790.358797  

3 - DBIR. 2020 Data Breach Investigations Report. Verizon. 2020. Acessado em  22 de ago de 2021. 
Disponível em: https://enterprise.verizon.com/resources/reports/2021-data-breach-investigations-report.pdf

4 - Relatório de tendências do Apwg. 2020. Acessado em 28 de ago de 2021. 
Disponível em:  https://docs.apwg.org//reports/apwg_trends_report_q2_2020.pdf  

5 - Multi Factor Authentication Using Mobile Phones. Acessado em 28 de ago de 2021. 
Disponível em:  https://www.researchgate.net/profile/Fadi-Aloul/publication/228972704_Multi_Factor

6 - Criando um gerenciador de senhas de uso único baseado em tempo com o Ionic 2. Acessado em 28 de ago de 2021. 
Disponível em: https://www.thepolyglotdeveloper.com/2016/08/build-time-based-one-time-password-manager-ionic-2/

7 - Gerando senhas de uso único baseadas em tempo com JavaScript.2021. Acessado em 28 de ago de 2021. 
Disponível em: https://www.thepolyglotdeveloper.com/2014/10/generate-time-based-one-time-passwords-javascript/

8 - Google Authenticator One-time Password Algorithm in Javascript.2021. Acessado em 28 de ago de 2021. 
Disponível em: http://blog.tinisles.com/2011/10/google-authenticator-one-time-password-algorithm-in-javascript/
