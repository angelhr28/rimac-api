import { connect } from '../../../data_base/connection';
import { EspecieDTO } from '../../model/dto/EspecieDTO';

export class SpeciesQuery {
    /**
     * Crear Especies
     * @param obj
     */
    async create( obj: EspecieDTO ): Promise<number> {
        const conn = await connect();
    
        const isExist = await this.isExist( obj.nombre );
    
        console.log( `SPECIE :::: ${ obj.nombre }  ${ JSON.stringify( isExist ) }` );
    
        if ( isExist && isExist.length > 0 ) return isExist.id;
    
        const specie: any = await conn.query( `insert into especies
                                               set ? `, [ obj ] );
    
        return specie[0].insertId;
    }
    
    async isExist( name: string ): Promise<any> {
        const conn = await connect();
        const res = await conn.query( 'select *  from especies WHERE nombre = ?', [ name ] );
        return res[0];
    }
    
}