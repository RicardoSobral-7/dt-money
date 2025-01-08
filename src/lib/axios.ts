// como axios é uma lib externa vamos isolala em um arquivo separado para caso no futuro queramos trocar a lib de requisições http não precisaremos alterar em vários lugares

import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  
})