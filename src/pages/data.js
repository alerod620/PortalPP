export const DefaultDxGridConfiguration = {
  visible: true,
  showRowLines: true,
  showColumnLines: true,
  showBorders: true,
  'load-panel': {enabled: false},
  selection: {mode: 'single'},
  searchPanel: {visible: true},
  focusedRowEnabled: false,
  rowAlternationEnabled: true,  
  columnHidingEnabled: true,
  hoverStateEnabled: true,
  width: '100%',
  height:'calc(100vh - 310px)',
  columnAutoWidth: true,
  allowColumnReordering: true,
  allowColumnResizing: true,
  columnResizingMode:'widget',
  headerFilter:{
    visible:true,
    allowSearch:true
  },
  wordWrapEnabled: true,
  paging:{ enabled:true, pageSize:10 },
  scrolling: {
    showScrollbar: 'always',
    useNative: false,
  },
    
}

export function validarTelefonoFijo(e) {
  const telefono = e.value;

  // Validar formato del número fijo
  const telefonoRegExp = /^[2,6,7][0-9]{7}$/;
  return telefonoRegExp.test(telefono);
}

export function validarTelefonoCelular(e) {
  const telefono = e.value;

  // Validar formato del número celular
  const telefonoRegExp = /^[3,4,5][0-9]{7}$/;
  return telefonoRegExp.test(telefono);
}

export function validarDPI(e) {
  const cui = e.value;

  // Validación de CUI
  const cuiRegExp = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/;
  if (!cuiRegExp.test(cui)) {
      return false;
  }

  const cleanedCUI = cui.replace(/\s/g, '');
  const depto = parseInt(cleanedCUI.substring(9, 11), 10);
  const muni = parseInt(cleanedCUI.substring(11, 13));
  const numero = cleanedCUI.substring(0, 8);
  const verificador = parseInt(cleanedCUI.substring(8, 9));

  // Listado de municipios por departamento
  const munisPorDepto = [
      17, 8, 16, 16, 13, 14, 19, 8, 24, 21, 9, 30, 32, 21, 8, 17, 14, 5, 11, 11, 7, 17
  ];

  // Validar departamento y municipio
  if (depto === 0 || muni === 0 || depto > munisPorDepto.length || muni > munisPorDepto[depto - 1]) {
      return false;
  }

  // Validación de complemento 11
  let total = 0;
  for (let i = 0; i < numero.length; i++) {
      total += parseInt(numero[i], 10) * (i + 2);
  }

  const modulo = total % 11;
  return modulo === verificador;
}

export const Departamentos = [
  {
    "title": "Alta Verapaz",
    "mun": [
      "Chahal",
      "Chisec",
      "Cobán",
      "Fray Bartolomé de las Casas",
      "Lanquín",
      "Panzós",
      "Raxruha",
      "San Cristóbal Verapaz",
      "San Juan Chamelco",
      "San Pedro Carchá",
      "Santa Cruz Verapaz",
      "Senahú",
      "Tactic",
      "Tamahú",
      "Tucurú",
      "Santa María Cahabón",
      "Santa Catarina La Tinta"
    ]
  },
  {
    "title": "Baja Verapaz",
    "mun": [
      "Cubulco",
      "Granados",
      "Purulhá",
      "Rabinal",
      "Salamá",
      "San Jerónimo",
      "San Miguel Chicaj",
      "Santa Cruz El Chol"
    ]
  },
  {
    "title": "Chimaltenango",
    "mun": [
      "Acatenango",
      "Chimaltenango",
      "El Tejar",
      "Parramos",
      "Patzicía",
      "Patzún",
      "Pochuta",
      "San Andrés Itzapa",
      "San José Poaquil",
      "San Juan Comalapa",
      "San Martín Jilotepeque",
      "Santa Apolonia",
      "Santa Cruz Balanyá",
      "Tecpán Guatemala",
      "Yepocapa",
      "Zaragoza"
    ]
  },
  {
    "title": "Chiquimula",
    "mun": [
      "Camotán",
      "Chiquimula",
      "Concepción Las Minas",
      "Esquipulas",
      "Ipala",
      "Jocotán",
      "Olopa",
      "Quezaltepeque",
      "San Jacinto",
      "San José La Arada",
      "San Juan Ermita"
    ]
  },
  {
    "title": "El Progreso",
    "mun": [
      "El Jícaro",
      "Guastatoya",
      "Morazán",
      "San Agustín Acasaguastlán",
      "San Antonio La Paz",
      "San Cristóbal Acasaguastlán",
      "Sanarate"
    ]
  },
  {
    "title": "Escuintla",
    "mun": [
      "Escuintla",
      "Guanagazapa",
      "Iztapa",
      "La Democracia",
      "La Gomera",
      "Masagua",
      "Nueva Concepción",
      "Palín",
      "San José",
      "San Vicente Pacaya",
      "Santa Lucía Cotzumalguapa",
      "Siquinalá",
      "Tiquisate"
    ]
  },
  {
    "title": "Guatemala",
    "mun": [
      "Amatitlán",
      "Chinautla",
      "Chuarrancho",
      "Fraijanes",
      "Guatemala",
      "Mixco",
      "Palencia",
      "Petapa",
      "San José del Golfo",
      "San José Pinula",
      "San Juan Sacatepéquez",
      "San Pedro Ayampuc",
      "San Pedro Sacatepéquez",
      "San Raymundo",
      "Santa Catarina Pinula",
      "Villa Canales"
    ]
  },
  {
    "title": "Huehuetenango",
    "mun": [
      "Aguacatán",
      "Chiantla",
      "Colotenango",
      "Concepción Huista",
      "Cuilco",
      "Huehuetenango",
      "Ixtahuacán",
      "Jacaltenango",
      "La Democracia",
      "La Libertad",
      "Malacatancito",
      "Nentón",
      "San Antonio Huista",
      "San Gaspar Ixchil",
      "San Juan Atitán",
      "San Juan Ixcoy",
      "San Mateo Ixtatán",
      "San Miguel Acatán",
      "San Pedro Necta",
      "San Rafael La Independencia",
      "San Rafael Petzal",
      "San Sebastián Coatán",
      "San Sebastián Huehuetenango",
      "Santa Ana Huista",
      "Santa Bárbara",
      "Santa Cruz Barillas",
      "Santa Eulalia",
      "Santiago Chimaltenango",
      "Soloma",
      "Tectitán",
      "Todos Santos Cuchumatan"
    ]
  },
  {
    "title": "Izabal",
    "mun": [
      "El Estor",
      "Livingston",
      "Los Amates",
      "Morales",
      "Puerto Barrios"
    ]
  },
  {
    "title": "Jalapa",
    "mun": [
      "Jalapa",
      "Mataquescuintla",
      "Monjas",
      "San Carlos Alzatate",
      "San Luis Jilotepeque",
      "San Manuel Chaparrón",
      "San Pedro Pinula"
    ]
  },
  {
    "title": "Jutiapa",
    "mun": [
      "Agua Blanca",
      "Asunción Mita",
      "Atescatempa",
      "Comapa",
      "Conguaco",
      "El Adelanto",
      "El Progreso",
      "Jalpatagua",
      "Jerez",
      "Jutiapa",
      "Moyuta",
      "Pasaco",
      "Quezada",
      "San José Acatempa",
      "Santa Catarina Mita",
      "Yupiltepeque",
      "Zapotitlán"
    ]
  },
  {
    "title": "Petén",
    "mun": [
      "Dolores",
      "Flores",
      "La Libertad",
      "Melchor de Mencos",
      "Poptún",
      "San Andrés",
      "San Benito",
      "San Francisco",
      "San José",
      "San Luis",
      "Santa Ana",
      "Sayaxché",
      "Las Cruces"
    ]
  },
  {
    "title": "Quetzaltenango",
    "mun": [
      "Almolonga",
      "Cabricán",
      "Cajolá",
      "Cantel",
      "Coatepeque",
      "Colomba",
      "Concepción Chiquirichapa",
      "El Palmar",
      "Flores Costa Cuca",
      "Génova",
      "Huitán",
      "La Esperanza",
      "Olintepeque",
      "Ostuncalco",
      "Palestina de Los Altos",
      "Quetzaltenango",
      "Salcajá",
      "San Carlos Sija",
      "San Francisco La Unión",
      "San Martín Sacatepéquez",
      "San Mateo",
      "San Miguel Sigüilá",
      "Sibilia",
      "Zunil"
    ]
  },
  {
    "title": "Quiché",
    "mun": [
      "Canillá",
      "Chajul",
      "Chicamán",
      "Chiché",
      "Chichicastenango",
      "Chinique",
      "Cunén",
      "Ixcán",
      "Joyabaj",
      "Nebaj",
      "Pachalum",
      "Patzité",
      "Sacapulas",
      "San Andrés Sajcabajá",
      "San Antonio Ilotenango",
      "San Bartolomé Jocotenango",
      "San Juan Cotzal",
      "San Pedro Jocopilas",
      "Santa Cruz del Quiché",
      "Uspantán",
      "Zacualpa"
    ]
  },
  {
    "title": "Retalhuleu",
    "mun": [
      "Champerico",
      "El Asintal",
      "Nuevo San Carlos",
      "Retalhuleu",
      "San Andrés Villa Seca",
      "San Felipe",
      "San Martín Zapotitlán",
      "San Sebastián",
      "Santa Cruz Muluá"
    ]
  },
  {
    "title": "Sacatepéquez",
    "mun": [
      "Alotenango",
      "Antigua",
      "Ciudad Vieja",
      "Jocotenango",
      "Magdalena Milpas Altas",
      "Pastores",
      "San Antonio Aguas Calientes",
      "San Bartolomé Milpas Altas",
      "San Lucas Sacatepéquez",
      "San Miguel Dueñas",
      "Santa Catarina Barahona",
      "Santa Lucía Milpas Altas",
      "Santa María de Jesús",
      "Santiago Sacatepéquez",
      "Santo Domingo Xenacoj",
      "Sumpango"
    ]
  },
  {
    "title": "San Marcos",
    "mun": [
      "Ayutla",
      "Catarina",
      "Comitancillo",
      "Concepción Tutuapa",
      "El Quetzal",
      "El Rodeo",
      "El Tumbador",
      "Esquipulas Palo Gordo",
      "Ixchiguan",
      "La Reforma",
      "Malacatán",
      "Nuevo Progreso",
      "Ocos",
      "Pajapita",
      "Río Blanco",
      "San Antonio Sacatepéquez",
      "San Cristóbal Cucho",
      "San José Ojetenam",
      "San Lorenzo",
      "San Marcos",
      "San Miguel Ixtahuacán",
      "San Pablo",
      "San Pedro Sacatepéquez",
      "San Rafael Pie de La Cuesta",
      "San Sibinal",
      "Sipacapa",
      "Tacaná",
      "Tajumulco",
      "Tejutla"
    ]
  },
  {
    "title": "Santa Rosa",
    "mun": [
      "Barberena",
      "Casillas",
      "Chiquimulilla",
      "Cuilapa",
      "Guazacapán",
      "Nueva Santa Rosa",
      "Oratorio",
      "Pueblo Nuevo Viñas",
      "San Juan Tecuaco",
      "San Rafael Las Flores",
      "Santa Cruz Naranjo",
      "Santa María Ixhuatán",
      "Santa Rosa de Lima",
      "Taxisco"
    ]
  },
  {
    "title": "Sololá",
    "mun": [
      "Concepción",
      "Nahualá",
      "Panajachel",
      "San Andrés Semetabaj",
      "San Antonio Palopó",
      "San José Chacaya",
      "San Juan La Laguna",
      "San Lucas Tolimán",
      "San Marcos La Laguna",
      "San Pablo La Laguna",
      "San Pedro La Laguna",
      "Santa Catarina Ixtahuacan",
      "Santa Catarina Palopó",
      "Santa Clara La Laguna",
      "Santa Cruz La Laguna",
      "Santa Lucía Utatlán",
      "Santa María Visitación",
      "Santiago Atitlán",
      "Sololá"
    ]
  },
  {
    "title": "Suchitepéquez",
    "mun": [
      "Chicacao",
      "Cuyotenango",
      "Mazatenango",
      "Patulul",
      "Pueblo Nuevo",
      "Río Bravo",
      "Samayac",
      "San Antonio Suchitepéquez",
      "San Bernardino",
      "San Francisco Zapotitlán",
      "San Gabriel",
      "San José El Idolo",
      "San Juan Bautista",
      "San Lorenzo",
      "San Miguel Panán",
      "San Pablo Jocopilas",
      "Santa Bárbara",
      "Santo Domingo Suchitepequez",
      "Santo Tomas La Unión",
      "Zunilito"
    ]
  },
  {
    "title": "Totonicapán",
    "mun": [
      "Momostenango",
      "San Andrés Xecul",
      "San Bartolo",
      "San Cristóbal Totonicapán",
      "San Francisco El Alto",
      "Santa Lucía La Reforma",
      "Santa María Chiquimula",
      "Totonicapán"
    ]
  },
  {
    "title": "Zacapa",
    "mun": [
      "Cabañas",
      "Estanzuela",
      "Gualán",
      "Huité",
      "La Unión",
      "Río Hondo",
      "San Diego",
      "Teculután",
      "Usumatlán",
      "Zacapa"
    ]
  }
]