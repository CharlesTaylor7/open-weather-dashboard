import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import { renderToString } from 'react-dom/server'

const server = Fastify()

await server.register(FastifyVite, { 
  root: import.meta.url, 
  createRenderFunction ({ createApp }) {
    return () => {
      return {
        element: renderToString(createApp())
      }
    }
  }
})

await server.vite.ready()
await server.listen({ port: 3000 })
