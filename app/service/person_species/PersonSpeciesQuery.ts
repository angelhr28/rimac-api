import { connect } from '../../../data_base/connection';
import { PersonaEspeciesDTO } from '../../model/dto/PersonaEspeciesDTO';

export class PersonSpeciesQuery {
    /**
     * Crear Especies
     * @param obj
     */
    async create( obj: PersonaEspeciesDTO ) {
        const conn = await connect();
    
        const isExist = await this.isExist( obj.especie_id, obj.persona_id );
        if ( isExist && isExist.length > 0 ) return null;
    
        return await conn.query( `insert into persona_especies
                                  set ? `, [ obj ] );
    }
    
    async deleteOne( id: number ) {
        const conn = await connect();
        return await conn.query( `delete
                                  from persona_especies
                                  where persona_id = ?`, [ id ] );
    }
    
    async isExist( especie_id: number, persona_id: number ): Promise<any> {
        const conn = await connect();
        const res = await conn.query( `select *
                                       from persona_especies
                                       WHERE especie_id = ?
                                         and persona_id = ?`, [ especie_id, persona_id ] );
        return res[0];
    }
    
}
