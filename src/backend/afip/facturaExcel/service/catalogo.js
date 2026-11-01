// facturaExcel/service/catalogo.js
// Lo que se puede escribir en cada columna del Excel y su código de AFIP.
// Mismos valores que el formulario de Factura Tipificada (el motor que emite es el mismo).

// Comprobantes por tipo de emisor (B = Responsable Inscripto, C = Monotributo).
// Sin notas de crédito/débito: necesitan la factura asociada (ese flujo vive en Tipificada).
// Sin recibos: su pantalla en AFIP es distinta y el motor todavía no la completa.
const COMPROBANTES = {
    B: [
        { codigo: '19', texto: 'Factura B' },
        { codigo: '10', texto: 'Factura A' },
        { codigo: '111', texto: 'Factura T' },
        { codigo: '114', texto: 'Factura de Crédito Electrónica MiPyMEs (FCE) A' },
        { codigo: '117', texto: 'Factura de Crédito Electrónica MiPyMEs (FCE) B' },
    ],
    C: [
        { codigo: '2', texto: 'Factura C' },
        { codigo: '120', texto: 'Factura de Crédito Electrónica MiPyMEs (FCE) C' },
    ],
};

// Los "A" exigen receptor identificado con CUIT y que no sea Consumidor Final.
const esLetraA = (texto) => /\bA$/.test(texto);
const esLetraB = (texto) => /\bB$/.test(texto);

const ACTIVIDADES = ['Servicio', 'Producto'];

const CONDICIONES_IVA = [
    { codigo: 5, texto: 'Consumidor Final' },
    { codigo: 1, texto: 'IVA Responsable Inscripto' },
    { codigo: 4, texto: 'IVA Sujeto Exento' },
    { codigo: 6, texto: 'Responsable Monotributo' },
    { codigo: 7, texto: 'Sujeto No Categorizado' },
    { codigo: 8, texto: 'Proveedor del Exterior' },
    { codigo: 9, texto: 'Cliente del Exterior' },
    { codigo: 10, texto: 'IVA Liberado - Ley Nº 19.640' },
    { codigo: 13, texto: 'Monotributista Social' },
    { codigo: 15, texto: 'IVA No Alcanzado' },
];
const CONSUMIDOR_FINAL = 5;
// Las únicas que AFIP acepta en los "B" (a un Responsable Inscripto o Monotributo se le hace A).
const CONDICIONES_IVA_PARA_B = [4, 5, 7, 8, 9, 10, 15];

// Texto que el paso 2 busca en las etiquetas de la pantalla de AFIP.
// Las tarjetas quedan afuera: AFIP pide tipo y número de tarjeta y el Excel no los trae.
const CONDICIONES_VENTA = [
    'Contado', 'Cuenta Corriente', 'Cheque', 'Transferencia Bancaria', 'Otra',
    'Otros medios de pago electrónico',
];
const CONDICIONES_VENTA_CON_TARJETA = ['Tarjeta de Débito', 'Tarjeta de Crédito'];
const CONDICION_VENTA_DEFECTO = 'Cuenta Corriente';

// Texto tal cual las opciones de AFIP (el paso 3 las busca por texto).
const UNIDADES = [
    'unidades', 'kilogramos', 'metros', 'metros cuadrados', 'metros cúbicos', 'litros',
    '1000 kWh', 'pares', 'docenas', 'quilates', 'millares', 'gramos', 'milimetros',
    'mm cúbicos', 'kilómetros', 'hectolitros', 'centímetros', 'jgo. pqt. mazo naipes',
    'cm cúbicos', 'toneladas', 'dam cúbicos', 'hm cúbicos', 'km cúbicos', 'microgramos',
    'nanogramos', 'picogramos', 'miligramos', 'mililitros', 'curie', 'milicurie',
    'microcurie', 'uiacthor', 'muiacthor', 'kg base', 'gruesa', 'kg bruto', 'uiactant',
    'muiactant', 'uiactig', 'muiactig', 'kg activo', 'gramo activo', 'gramo base',
    'packs', 'otras unidades',
];

// Solo para emisor B. Código = value del select de AFIP.
const ALICUOTAS = [
    { codigo: 5, texto: '21%' },
    { codigo: 4, texto: '10,5%' },
    { codigo: 6, texto: '27%' },
    { codigo: 9, texto: '5%' },
    { codigo: 8, texto: '2,5%' },
    { codigo: 3, texto: '0%' },
];
const ALICUOTA_DEFECTO = 5;

module.exports = {
    COMPROBANTES, esLetraA, esLetraB, ACTIVIDADES, CONDICIONES_IVA, CONSUMIDOR_FINAL, CONDICIONES_IVA_PARA_B,
    CONDICIONES_VENTA, CONDICIONES_VENTA_CON_TARJETA, CONDICION_VENTA_DEFECTO, UNIDADES, ALICUOTAS, ALICUOTA_DEFECTO,
};
