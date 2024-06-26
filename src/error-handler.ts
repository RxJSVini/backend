import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { BadRequest } from './routes/_errors/bad-request';
import { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error: FastifyError, _: FastifyRequest, reply: FastifyReply) =>{
    
    if(error instanceof ZodError){
        return reply.status(400).send({
            message: `Error during validation`,
            errors: error.flatten().fieldErrors,
        });
    }
    
    
    
    if(error instanceof BadRequest){
        return reply.status(400).send({ message: error.message });
    }
    
    return reply.status(500).send({
        message: 'An error occurred'
    });
};