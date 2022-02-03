export interface PersonaRegisterDTO {
    nombre?: string | null;
    altura?: number | null;
    peso?: number | null;
    color_cabello?: string | null;
    color_piel?: string | null;
    color_ojos?: string | null;
    anio_nacimiento?: string | null;
    genero?: string | null;
    especie_id?: number;
    vehiculo_id?: number;
}
