import fetch from 'node-fetch';
import { PersonQuery } from '../service/person/PersonQuery';
import { PersonaDTO } from '../model/dto/PersonaDTO';
import { PersonSpeciesQuery } from '../service/person_species/PersonSpeciesQuery';
import { SpeciesQuery } from '../service/Species/SpeciesQuery';
import { EspecieDTO } from '../model/dto/EspecieDTO';
import { PersonaEspeciesDTO } from '../model/dto/PersonaEspeciesDTO';
import { PersonaVehiculoDTO } from '../model/dto/PersonaVehiculoDTO';
import { PersonVehiclesQuery } from '../service/person_vehicles/PersonVehiclesQuery';
import { VehiclesQuery } from '../service/vehicles/VehiclesQuery';
import { VehiculoDTO } from '../model/dto/VehiculoDTO';

export class RequestExternal {
    
    private readonly page?: string;
    private data: any;
    
    constructor( page: string = '1' ) {
        this.page = page;
    }
    
    private static validateValue( value: any ) {
        return value && value != 'unknown';
    }
    
    async loadData() {
        this.data = await this.getInfoExternal( `https://swapi.py4e.com/api/people?page=${ this.page }` );
        await this.insertData();
        return this.data;
    }
    
    async getInfoExternal( url: string ) {
        const response = await fetch( url );
        return await response.json();
    }
    
    private async insertData() {
        const peopleQuery = new PersonQuery();
        let personId: number | null;
        for (const value of this.data.results) {
            const pDto: PersonaDTO = {
                nombre: value.name,
                altura: RequestExternal.validateValue( value.height ) ? value.height : 0,
                peso: RequestExternal.validateValue( value.mass ) ? value.mass : 0,
                color_cabello: value.hair_color,
                color_piel: value.skin_color,
                color_ojos: value.eye_color,
                anio_nacimiento: value.birth_year,
                genero: value.gender,
            };
            
            const person: any = await peopleQuery.create( pDto );
            personId = person != null ? person[0].insertId : null;
            await this.insertVehicle( personId, value );
            await this.insertEspecies( personId, value );
        }
        
    }
    
    private async insertVehicle( personId: number, obj: any ) {
        const vehicleQuery = new VehiclesQuery();
        let vehicleId: number | null;
        
        for (const value of obj.vehicles) {
            const vehicleData = await this.getInfoExternal( value );
            
            const vDto: VehiculoDTO = {
                nombre: vehicleData.name,
                altura: RequestExternal.validateValue( vehicleData.cargo_capacity ) ? vehicleData.cargo_capacity : 0,
                modelo: vehicleData.model,
                fabricante: vehicleData.manufacturer,
                precio: RequestExternal.validateValue( vehicleData.cost_in_credits ) ? vehicleData.cost_in_credits : 0,
                longitud: RequestExternal.validateValue( vehicleData.length ) ? vehicleData.length : 0,
                velocidad_max: RequestExternal.validateValue( vehicleData.max_atmosphering_speed ) ? vehicleData.max_atmosphering_speed : 0,
                tripulacion: RequestExternal.validateValue( vehicleData.crew ) ? vehicleData.crew : 0,
                pasajeros: RequestExternal.validateValue( vehicleData.passengers ) ? vehicleData.passengers : 0,
                capacidad_carga: RequestExternal.validateValue( vehicleData.cargo_capacity ) ? vehicleData.cargo_capacity : 0,
                combustible: vehicleData.consumables,
                tipo: vehicleData.vehicle_class,
            };
    
            vehicleId = await vehicleQuery.create( vDto );
    
            if ( vehicleId && personId ) {
                await RequestExternal.insertPersonVehicle( personId, vehicleId );
            }
        }
    }
    
    private async insertEspecies( personId: number, obj: any ) {
        const specieQuery = new SpeciesQuery();
        let specieId: number | null;
        
        for (const value of obj.species) {
            const specieData = await this.getInfoExternal( value );
            
            const sDto: EspecieDTO = {
                nombre: specieData.name,
                clasificacion: specieData.classification,
                cargo: specieData.designation,
                altura_prom: RequestExternal.validateValue( specieData.average_height ) ? specieData.average_height : 0,
                color_cabello: specieData.hair_colors,
                color_piel: specieData.skin_colors,
                color_ojos: specieData.eye_colors,
                promedio_vida: RequestExternal.validateValue( specieData.average_lifespan ) ? specieData.average_lifespan : 0,
                idioma: specieData.language,
            };
    
            specieId = await specieQuery.create( sDto );
            
            if ( specieId && personId ) {
                await RequestExternal.insertPersonEspecies( personId, specieId );
            }
        }
    }
    
    private static async insertPersonEspecies( personId: number, speciesId: number ) {
        const personSpecieQuery = new PersonSpeciesQuery();
        
        const psDto: PersonaEspeciesDTO = {
            especie_id: speciesId,
            persona_id: personId,
        };
        
        await personSpecieQuery.create( psDto );
    }
    
    private static async insertPersonVehicle( personId: number, vehicleId: number ) {
        const personVehicleQuery = new PersonVehiclesQuery();
        
        const pvDto: PersonaVehiculoDTO = {
            vehiculo_id: vehicleId,
            persona_id: personId,
        };
        
        await personVehicleQuery.create( pvDto );
    }
}
