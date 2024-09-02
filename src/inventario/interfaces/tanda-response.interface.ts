
export interface TandaResponse {
    id: string;

    //relaciones
    bodega: string;
    producto: string;
    ubicacion: string;
    categoria: string;
    //propiedades
    cantidadIngresada: number;
    cantidadActual: number;
    fechaLlegada: Date;
    fechaVencimiento: Date;
}