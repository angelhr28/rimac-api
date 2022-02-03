import { PersonaDTO } from '../../model/dto/PersonaDTO';
import { PersonQuery } from './PersonQuery';
import { PersonVehiclesQuery } from '../person_vehicles/PersonVehiclesQuery';
import { PersonSpeciesQuery } from '../person_species/PersonSpeciesQuery';

export class PersonService {
    
    private person: PersonQuery;
    private personSpecies: PersonSpeciesQuery;
    private personVehicle: PersonVehiclesQuery;
    
    constructor() {
        this.person = new PersonQuery();
        this.personSpecies = new PersonSpeciesQuery();
        this.personVehicle = new PersonVehiclesQuery();
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
            const person: any = await this.person.findOne( id );
    
            if ( person[0].length == 0 ) return null;
    
            console.log( person );
            const res: any = await this.person.update( data, id );
    
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
            const res: any = await this.person.find();
            if ( res[0].length == 0 ) return null;
    
            return await this.buildResponse( res[0] );
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
            const res: any = await this.person.findOne( id );
            if ( res[0].length == 0 ) return null;
    
            return ( await this.buildResponse( res[0] ) )[0];
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
    
            const person: any = await this.person.findOne( id );
    
            if ( person[0].length == 0 ) return null;
    
            await this.personSpecies.deleteOne( id );
            await this.personVehicle.deleteOne( id );
    
            const res: any = await this.person.deleteOne( id );
            return res[0];
        } catch (err) {
            console.error( err );
            throw err;
        }
    }
    
    async buildResponse( rows: any[] | any ) {
        const filter = rows.filter( ( obj, index, self ) =>
            index === self.findIndex( ( t ) => ( t.id === obj.id ) ),
        );
        
        return filter.map( value => ( {
            id: value.id,
            nombre: value.nombre,
            altura: value.altura,
            peso: value.peso,
            color_cabello: value.color_cabello,
            color_piel: value.color_piel,
            color_ojos: value.color_ojos,
            anio_nacimiento: value.anio_nacimiento,
            genero: value.genero,
            especies: this.buildSpecies( value.id, rows ),
            vehiculos: this.buildVehicles( value.id, rows ),
        } ) );
        
    }
    
    private buildSpecies( id: number, rows: any ) {
        return rows.filter( row => ( row.id == id ) )
            .map( row => ( {
                    nombre: row.e_nombre,
                    clasificacion: row.e_clasificacion,
                    cargo: row.e_cargo,
                    promedio_vida: row.e_promedio_vida,
                    idioma: row.e_idioma,
                } ),
            ).filter( ( obj, index, self ) =>
                index === self.findIndex( ( t ) => ( t.nombre === obj.nombre ) ),
            );
    }
    
    private buildVehicles( id: number, rows: any ) {
        return rows.filter( row => ( row.id == id ) )
            .map( row => ( {
                    nombre: row.v_nombre,
                    combustible: row.v_combustible,
                    capacidad_carga: row.v_capacidad_carga,
                } ),
            ).filter( ( obj, index, self ) =>
                index === self.findIndex( ( t ) => ( t.nombre === obj.nombre ) ),
            );
    }
}
