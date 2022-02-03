import { PersonaDTO } from '../../model/dto/PersonaDTO';
import { connect } from '../../../data_base/connection';
import { Status } from '../../model/response/Status';

export class PersonQuery {
    /**
     * Crear Persona
     * @param obj
     */
    async create( obj: PersonaDTO ) {
        const conn = await connect();
        
        const isExist = await this.isExist( obj.nombre );
        if ( isExist && isExist.length > 0 ) return null;
        
        const row = await conn.query( `insert into personas
                                       set ? `, [ obj ] );
        return row;
    }
    
    /**
     * Modificar Persona por id
     * @param obj
     * @param id
     */
    async update( obj: PersonaDTO, id: number ) {
        
        const conn = await connect();
        const row = await conn.query( `update personas
                                       set ?
                                       where id = ?`, [ obj, id ] );
        return row;
    }
    
    /**
     * Listar Personas
     */
    async find() {
        const conn = await connect();
        return await conn.query( `select p.id,
                                         p.nombre,
                                         p.altura,
                                         p.peso,
                                         p.color_cabello,
                                         p.color_piel,
                                         p.color_ojos,
                                         p.anio_nacimiento,
                                         p.genero,
                                         e.nombre          as e_nombre,
                                         e.clasificacion   as e_clasificacion,
                                         e.cargo           as e_cargo,
                                         e.promedio_vida   as e_promedio_vida,
                                         e.idioma          as e_idioma,
                                         v.nombre          as v_nombre,
                                         v.combustible     as v_combustible,
                                         v.capacidad_carga as v_capacidad_carga
                                  from personas as p
                                           left join persona_especies pe on p.id = pe.persona_id
                                           left join especies e on pe.especie_id = e.id
                                           left join persona_vehiculos pv on p.id = pv.persona_id
                                           left join vehiculos v on pv.vehiculo_id = v.id
                                  where p.estado = '${ Status.ACTIVE }';
        ` );
    }
    
    /**
     * Buscar Persona por id
     * @param id
     */
    async findOne( id: number ) {
        const conn = await connect();
        return await conn.query( `select p.id,
                                         p.nombre,
                                         p.altura,
                                         p.peso,
                                         p.color_cabello,
                                         p.color_piel,
                                         p.color_ojos,
                                         p.anio_nacimiento,
                                         p.genero,
                                         e.nombre          as e_nombre,
                                         e.clasificacion   as e_clasificacion,
                                         e.cargo           as e_cargo,
                                         e.promedio_vida   as e_promedio_vida,
                                         e.idioma          as e_idioma,
                                         v.nombre          as v_nombre,
                                         v.combustible     as v_combustible,
                                         v.capacidad_carga as v_capacidad_carga
                                  from personas as p
                                           left join persona_especies pe on p.id = pe.persona_id
                                           left join especies e on pe.especie_id = e.id
                                           left join persona_vehiculos pv on p.id = pv.persona_id
                                           left join vehiculos v on pv.vehiculo_id = v.id
                                  where p.id = ?
                                    and p.estado = '${ Status.ACTIVE }'
        `, [ id ] );
    }
    
    /**
     * Eliminar Persona por id
     * @param id
     */
    async deleteOne( id: number ) {
        const conn = await connect();
    
        return await conn.query( `delete
                                  from personas
                                  where id = ?`, [ id ] );
    }
    
    async isExist( name: string ): Promise<any> {
        const conn = await connect();
        const res = await conn.query( `select *
                                       from personas
                                       WHERE nombre = ?
                                         and estado = '${ Status.ACTIVE }'`, [ name ] );
        return res[0];
    }
    
}
