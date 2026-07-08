# Especificação - Document Management System

## 1. Objetivo

Implementar um sistema simples de gestão de documentos que permita upload, listagem e download de arquivos, com armazenamento local e arquitetura em camadas.

## 2. Escopo

### Dentro do escopo

- Upload de documentos
- Listagem de documentos
- Download de documentos
- Gestão simples por usuário

### Fora do escopo

- Armazenamento externo ou em nuvem
- Versionamento de documentos

## 3. Requisitos funcionais

| ID    | Requisito |
| ----- | --------- |
| RF-01 | O usuário pode enviar um documento |
| RF-02 | O usuário pode listar os documentos enviados |
| RF-03 | O usuário pode baixar um documento pelo identificador |

## 4. Requisitos não funcionais

| ID     | Requisito |
| ------ | --------- |
| RNF-01 | Arquivos gravados no filesystem local via multer |
| RNF-02 | Metadados mantidos em memória nesta fase |
| RNF-03 | Configuração via variáveis de ambiente (12-Factor) |

## 5. Modelo de dados (metadados do documento)

| Campo        | Tipo   | Descrição |
| ------------ | ------ | --------- |
| id           | string | Identificador único do documento |
| originalName | string | Nome original do arquivo enviado |
| size         | number | Tamanho em bytes |
| uploadedAt   | string | Data/hora do upload (ISO 8601) |
| owner        | string | Identificador do usuário dono |
| mimeType     | string | Tipo MIME do arquivo |
| storagePath  | string | Caminho local do arquivo salvo |

## 6. Contratos de API

### POST /upload

- Entrada: arquivo (multipart/form-data)
- Saída: metadados do documento criado

### GET /documents

- Saída: lista de metadados de documentos

### GET /documents/:id/download

- Saída: conteúdo binário do arquivo

## 7. Decisões arquiteturais

- Backend em Clean Architecture simples (routes, controllers, services, repositories)
- Frontend baseado em componentes (React)
- Armazenamento local apenas

## 8. Plano de execução

1. Configurar o backend com rotas, controllers, services e repositories para upload, listagem e download.
2. Implementar persistência local de arquivos via multer com armazenamento em disco.
3. Expor os endpoints da API e validar o fluxo completo com testes automatizados.
4. Preparar a interface web para consumir os endpoints do backend.
