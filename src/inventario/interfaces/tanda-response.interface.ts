
export interface TandaResponse {
    id: string;
    bodega: string;
    producto: string;
    ubicacion: string;
    cantidadIngresada: number;
    cantidadActual: number;
    fechaLlegada: Date;
    fechaVencimiento: Date;
}