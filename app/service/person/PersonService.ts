import { PersonaDTO } from '../../model/dto/PersonaDTO';
import { PersonQuery } from './PersonQuery';

export class PersonService {
    
    private person: PersonQuery;
    
    constructor() {
        this.person = new PersonQuery();
    }
    
    /**
     * Crear Persona
     * @param params
     */
    protected async createPerson( params: PersonaDTO ): Promise<object> {
        try {
            return await this.person.create( params );
        } catch (err) {
            console.error( err );
            throw err;
        }
    }
    
    /**
     * Editar a Persona por id
     * @param id
     * @param data
     */
    protected async updatePerson( id: number, data: any ) {
        try {
            const person = await this.person.findOne( id );
            
            console.log( person );
            const res = await this.person.update( data, id );
            
            console.log( res );
            return res[0];
        } catch (err) {
            console.error( err );
            throw err;
        }
    }
    
    /**
     * Listar Personas
     */
    protected async findPerson() {
        try {
            const res = await this.person.find();
            console.log( res );
            return res[0];
        } catch (err) {
            console.error( err );
            throw err;
        }
    }
    
    /**
     * Buscar Persona por id
     * @param id
     */
    protected async findOnePersonById( id: number ) {
        try {
            const res = await this.person.findOne( id );
            console.log( res );
            return res[0];
        } catch (err) {
            console.error( err );
            throw err;
        }
    }
    
    /**
     * Elimar Persona por id
     * @param id
     */
    protected async deleteOnePersonById( id: number ) {
        try {
            const res = await this.person.deleteOne( id );
            console.log( res );
            return res[0];
        } catch (err) {
            console.error( err );
            throw err;
        }
    }
    
}
