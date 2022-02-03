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
     */
    async create( event: any ) {
        const params: PersonaDTO = JSON.parse( event.body );
        try {
            const response = await this.createPerson( params );
        
            if ( !response ) return MessageUtil.controlledError( 'La persona ya existe.' );
        
            return MessageUtil.success( 'Se creo a la persona.', response );
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
            const result = await this.updatePerson( id, body );
    
            if ( !result ) {
                return MessageUtil.controlledError( 'No se encontro la persona que desea editar' );
            }
            return MessageUtil.success( 'Se modifico a la persona.', result );
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
            if ( !rows ) {
                return MessageUtil.controlledError( 'No esta registrado ninguna persona' );
            }
            return MessageUtil.success( 'Se encontro a las persona.', rows );
        } catch (err) {
            console.error( err );
            return MessageUtil.error( err.message );
        }
    }
    
    /**
     * Buscar Persona por id
     * @param event
     */
    async findOne( event: any ) {
        // The amount of memory allocated for the function
        
        const id: number = Number( event.pathParameters.id );
        
        try {
            const rows = await this.findOnePersonById( id );
            
            if ( !rows ) {
                return MessageUtil.controlledError( 'No se encontro a la persona' );
            }
    
            return MessageUtil.success( 'Se encontro a la persona.', rows );
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
    
            if ( !result ) {
                return MessageUtil.controlledError( 'No se encontro la persona que desea eliminar' );
            }
    
            return MessageUtil.success( 'Se elimino a la persona.', result );
        } catch (err) {
            console.error( err );
            
            return MessageUtil.error( err.message );
        }
    }
}
