import { connect } from '../../../data_base/connection';
import { PersonaVehiculoDTO } from '../../model/dto/PersonaVehiculoDTO';

export class PersonVehiclesQuery {
    /**
     * Crear Especies
     * @param obj
     */
    async create( obj: PersonaVehiculoDTO ) {
        const conn = await connect();
        
        const isExist = await this.isExist( obj.vehiculo_id, obj.persona_id );
        if ( isExist && isExist.length > 0 ) return null;
        
        return await conn.query( `insert into persona_vehiculos
                                  set ? `, [ obj ] );
    }
    
    async isExist( vehiculo_id: number, persona_id: number ): Promise<any> {
        const conn = await connect();
        const res = await conn.query( `select *
                                       from persona_vehiculos
                                       WHERE vehiculo_id = ?
                                         and persona_id = ?`, [ vehiculo_id, persona_id ] );
        return res[0];
    }
}
