import {FieldValue} from 'firebase/firestore'

export type Photo = {
    id?:string
    nombreOriginal: string
    nombreNuevo: string
    filePath: string
    ancho: string
    alto: string
    orientacion: 'horizontal'|'vertical'
    pesoNuevo: number
    fechaSubida: FieldValue
    borrada: boolean
    urlPublica: string
}