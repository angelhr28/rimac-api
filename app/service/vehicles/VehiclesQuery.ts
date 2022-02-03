import { connect } from '../../../data_base/connection';
import { VehiculoDTO } from '../../model/dto/VehiculoDTO';

export class VehiclesQuery {
    /**
     * Crear Especies
     * @param obj
     */
    async create( obj: VehiculoDTO ): Promise<number> {
        const conn = await connect();
    
        const isExist = await this.isExist( obj.nombre );
    
        if ( isExist && isExist.length > 0 ) return isExist[0].id;
    
        const vehicle: any = await conn.query( `insert into vehiculos
                                                set ? `, [ obj ] );
        return vehicle[0].insertId;
    }
    
    async isExist( name: string ): Promise<any> {
        const conn = await connect();
        const res = await conn.query( 'select *  from vehiculos WHERE nombre = ?', [ name ] );
        return res[0];
    }
    
}