# CAHD WebApp

Front-end do sistema **Centro Automotivo HD**, em Angular 11, para gestão de uma oficina/centro automotivo:
clientes, veículos, cores, empresas, serviços, complementos (tipos de serviço), serviços executados e compras.
A interface é em português; o código (variáveis, models, métodos) é em inglês.

O projeto parte do template [SB Admin Angular](https://startbootstrap.com/template/sb-admin-angular) (Bootstrap 4),
do qual foram mantidos apenas o layout, a navegação, a tela de login e as páginas de erro.

## Requisitos

- **Node 14** (ex.: `nvm use 14`). Em Node mais novo (16+) o `ng serve` falha com o Angular 11
  (`No such module: http_parser`).
- Backend da API rodando em `http://localhost:8080/cahd` (ver [Backend](#backend)).

## Início rápido

```bash
npm install
npm start
```

`npm start` roda o `pug-watch` e o `ng serve`, e abre <http://localhost:4200>. Para mudar a porta:

```bash
export PORT=4205 && npm start
```

Se faltar memória, ajuste `max_old_space_size` no script `ng` do `package.json`.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm start` | Servidor de desenvolvimento (pug-watch + `ng serve`) |
| `npm run build` | Build de desenvolvimento (`build:pug` + `ng build`) em `dist/cahd-web` |
| `npm run build:pug` | Renderiza todos os `.pug` para `.html` |
| `npm test` | Testes unitários (Karma/Jasmine) |
| `npm run lint` / `npm run lint:fix` | TSLint |
| `npm run generate:component -- --path src/app/features/<feature>/components --name Foo` | Gera componente (também `generate:module`, `generate:directive`, `generate:service`) |

Sempre use `npm run ng -- <comando>` em vez de `ng` direto, para aplicar o limite de memória.

## Estrutura

```
src/
├── app/
│   ├── core/              # Infra singleton: constants (URL da API), utils (CahdUtils, ApiMapper),
│   │                      #   interceptors (ApiMapperInterceptor)
│   ├── shared/            # Reutilizável entre features: components, modals, icons, models
│   │                      #   (Pagination), enums, guards/services comuns (SharedModule)
│   ├── layout/            # Layouts, menu lateral, top-nav, breadcrumbs (LayoutModule)
│   └── features/          # Uma pasta por funcionalidade (módulo lazy-loaded)
│       ├── auth/ error/
│       └── client/ vehicle/ color/ company/ service/ service-type/ service-performed/ purchase/
├── styles/                # SCSS globais
└── testing/               # Mocks e stubs de testes
```

Aliases (`tsconfig.json`): `@core/*`, `@shared/*`, `@layout/*`, `@features/*`, `@app/*`, `@testing/*`.
Regra de dependência: `features` → `shared`/`layout`/`core`; `shared` e `core` nunca importam de `features`.


Cada tela de negócio tem um módulo próprio com `*-search` (listagem) e `*-create` (cadastro/edição).
Containers organizam componentes (padrão MVCC do template); cada pasta tem um `index.ts` que exporta a lista
usada em `declarations`/`providers`.

## Integração com a API

- URL base: `CahdConstants.API` em `src/app/core/constants/cahd.constants.ts` (hoje fixa em `http://localhost:8080/cahd`).
- Autenticação: o login grava o token no `localStorage` e os services o enviam no header `Authorization`.
- **Nomes em inglês no front, JSON em português no backend.** `src/app/core/utils/api-mapper.ts` traduz as chaves
  (`nome` ↔ `name`, `telefone` ↔ `phone`...) nas requisições (`CahdUtils.jsonString`) e nas respostas (`ApiMapperInterceptor`).
  Ao incluir um campo cujo nome no backend seja diferente, adicione-o ao dicionário.

## Templates Pug

Os templates do layout (`navigation`) podem ser escritos em `.pug`; o `.html` é gerado ao lado
(`scripts/render-pug.js`). Edite o `.pug` e mantenha o `npm start` (ou `npm run build:pug`) rodando.
As telas em `features/` usam apenas `.html`.

## Backend

A API (Spring) fica no repositório/pasta `backend-develop`, ao lado deste projeto. O `docker-compose.yaml` da pasta
pai sobe o PostgreSQL usado por ela.

## Licença

MIT — ver [LICENSE](LICENSE). Template base: SB Admin Angular, Start Bootstrap.
