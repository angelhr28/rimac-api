import { connect } from '../../../data_base/connection';
import { EspecieDTO } from '../../model/dto/EspecieDTO';

export class SpeciesQuery {
    /**
     * Crear Especies
     * @param obj
     */
    async create( obj: EspecieDTO ) {
        const conn = await connect();
        
        const isExist = await this.isExist( obj.nombre );
        if ( isExist && isExist.length > 0 ) return null;
        
        return await conn.query( `insert into especies
                                  set ? `, [ obj ] );
    }
    
    async isExist( name: string ): Promise<any> {
        const conn = await connect();
        const res = await conn.query( 'select *  from especies WHERE nombre = ?', [ name ] );
        return res[0];
    }
    
}