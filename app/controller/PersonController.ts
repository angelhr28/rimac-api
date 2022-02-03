import { Context } from 'aws-lambda';
import { PersonService } from '../service/person/PersonService';
import { MessageUtil } from '../../utils/message';
import { PersonaDTO } from '../model/dto/PersonaDTO';
import { RequestExternal } from '../external_api/RequestExternal';

export class PersonController extends PersonService {
    
    /**
     * Crear Persona
     * @param {*} event
     */
    async loadData( event: any ) {
        const params = JSON.parse( event.body );
        try {
            const externalData = new RequestExternal( params.page );
            const loadData = await externalData.loadData();
            
            return MessageUtil.success( 'Se cargo la data con exito.', loadData );
        } catch (err) {
            console.error( err );
            return MessageUtil.error( err.message );
        }
    }
    
    
    /**
     * Crear Persona
     * @param {*} event
     * @param context
     */
    async create( event: any, context?: Context ) {
        console.log( 'Nombre de la funcion', context.functionName );
        const params: PersonaDTO = JSON.parse( event.body );
        try {
            const response = await this.createPerson( params );
            
            if ( !response ) return MessageUtil.controlledError( 'El usuario ya existe.' );
            
            return MessageUtil.success( 'Se creo el usuario.', response );
        } catch (err) {
            console.error( err );
            return MessageUtil.error( err.message );
        }
    }
    
    /**
     * Modificar Persona por id
     * @param event
     */
    async update( event: any ) {
        const id: number = Number( event.pathParameters.id );
        const body: any = JSON.parse( event.body );
        
        try {
            const respones = await this.updatePerson( id, body );
            
            return MessageUtil.success( 'Se modifico el usuario.', respones );
        } catch (err) {
            console.error( err );
            return MessageUtil.error( err.message );
        }
    }
    
    /**
     * Listar Personas
     */
    async find() {
        try {
            const rows = await this.findPerson();
            console.log( rows );
            return MessageUtil.success( 'Se encontro los usuarios.', rows );
        } catch (err) {
            console.error( err );
            return MessageUtil.error( err.message );
        }
    }
    
    /**
     * Buscar Persona por id
     * @param event
     * @param context
     */
    async findOne( event: any, context: Context ) {
        // The amount of memory allocated for the function
        console.log( 'memoryLimitInMB: ', context.memoryLimitInMB );
        
        const id: number = Number( event.pathParameters.id );
        
        try {
            const rows = await this.findOnePersonById( id );
            
            return MessageUtil.success( 'Se encontro el usuario.', rows );
        } catch (err) {
            console.error( err );
            
            return MessageUtil.error( err.message );
        }
    }
    
    /**
     * Eliminar Persona por id
     * @param event
     */
    async deleteOne( event: any ) {
        const id: number = event.pathParameters.id;
        
        try {
            const result = await this.deleteOnePersonById( id );
            
            // if ( result.deletedCount === 0 ) {
            //     return MessageUtil.controlledError( 'No se encontro el elemento a eliminar' );
            // }
            
            return MessageUtil.success( 'Se elimino el usuario.', result );
        } catch (err) {
            console.error( err );
            
            return MessageUtil.error( err.message );
        }
    }
}
