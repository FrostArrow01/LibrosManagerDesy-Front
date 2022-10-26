import { Categoria } from "./categoria"
import { Autor } from "./autor";


export interface Libro {
    id: number;
    titulo: string;
    edicion: number;
    fecha_lanzamiento: string;
    autor: Autor;
    categoria: Categoria;
}