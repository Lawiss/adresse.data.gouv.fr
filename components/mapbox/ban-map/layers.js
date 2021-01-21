import theme from '@/styles/theme'

export const sources = {
  bal: {name: 'Base Adresse Locale (Commune)', color: '#4dac26'},
  cadastre: {name: 'Cadastre (DGFiP)', color: '#2c7bb6'},
  ftth: {name: 'IPE (Arcep / Opérateurs)', color: '#118571'},
  'insee-ril': {name: 'RIL(INSEE)', color: '#7b3294'},
  'ign-api-gestion-ign': {name: 'BD TOPO (IGN)', color: '#fdae61'},
  'ign-api-gestion-laposte': {name: 'La Poste', color: '#feffbf'},
  'ign-api-gestion-sdis': {name: 'SDIS (Pompiers)', color: '#d7191c'},
  'ign-api-gestion-municipal_administration': {name: 'Guichet Adresse (Commune)', color: '#a6611a'}
}

const NUMEROS_POINT_MIN = 12
const NUMEROS_MIN = 17
const VOIE_COLOR = '#4a4a4a'
const VOIE_MIN = 11
const VOIE_MAX = NUMEROS_MIN
const TOPONYME_MIN = 10
const TOPONYME_MAX = NUMEROS_MIN + 2
const TOPONYME_COLOR = '#7c5050'

export const adresseCircleLayer = {
  id: 'adresse',
  source: 'base-adresse-nationale',
  'source-layer': 'adresses',
  type: 'circle',
  minzoom: NUMEROS_POINT_MIN,
  paint: {
    'circle-color': [
      'case',
      ['==', ['get', 'sourcePosition'], 'bal'],
      theme.successBorder,
      theme.warningBorder
    ],
    'circle-stroke-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      theme.primary,
      '#fff'
    ],
    'circle-stroke-width': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      2,
      0
    ],
    'circle-radius': {
      stops: [
        [12, 0.8],
        [17, 6]
      ]
    }
  }
}

export const adresseLabelLayer = {
  id: 'adresse-label',
  source: 'base-adresse-nationale',
  'source-layer': 'adresses',
  type: 'symbol',
  minzoom: NUMEROS_MIN,
  paint: {
    'text-color': [
      'case',
      ['==', ['get', 'sourcePosition'], 'bal'],
      theme.successBorder,
      theme.warningBorder
    ],
    'text-halo-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      theme.primary,
      '#fff'
    ],
    'text-halo-width': 1
  },
  layout: {
    'text-font': ['Noto Sans Bold'],
    'text-size': {
      stops: [
        [NUMEROS_MIN, 13],
        [19, 16]
      ]
    },
    'text-field': [
      'case',
      ['has', 'suffixe'],
      [
        'format',
        ['get', 'numero'],
        {},
        ' ',
        {},
        ['get', 'suffixe'],
        {}
      ],
      ['get', 'numero']
    ],
    'text-ignore-placement': false,
    'text-variable-anchor': ['bottom'],
    'text-radial-offset': 1
  }
}

export const adresseCompletLabelLayer = {
  id: 'adresse-complet-label',
  source: 'base-adresse-nationale',
  'source-layer': 'adresses',
  type: 'symbol',
  minzoom: NUMEROS_MIN,
  filter: ['==', ['get', 'id'], ''],
  paint: {
    'text-color': [
      'case',
      ['==', ['get', 'sourcePosition'], 'bal'],
      theme.successBorder,
      theme.warningBorder
    ],
    'text-halo-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      theme.primary,
      '#fff'
    ],
    'text-halo-width': 1
  },
  layout: {
    'text-font': ['Noto Sans Bold'],
    'text-size': {
      stops: [
        [NUMEROS_MIN, 13],
        [19, 16]
      ]
    },
    'text-field': [
      'case',
      ['has', 'suffixe'],
      [
        'format',
        ['get', 'numero'],
        {},
        ' ',
        {},
        ['get', 'suffixe'],
        {},
        ' ',
        {},
        ['get', 'nomVoie']
      ],
      [
        'format',
        ['get', 'numero'],
        {},
        ' ',
        {},
        ['get', 'nomVoie']
      ]
    ],
    'text-ignore-placement': false,
    'text-variable-anchor': ['bottom'],
    'text-radial-offset': 1
  }
}

export const voieLayer = {
  id: 'voie',
  source: 'base-adresse-nationale',
  'source-layer': 'toponymes',
  type: 'symbol',
  filter: ['==', ['get', 'type'], 'voie'],
  minzoom: VOIE_MIN,
  maxzoom: VOIE_MAX,
  paint: {
    'text-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#fff',
      VOIE_COLOR
    ],
    'text-halo-width': 2,
    'text-halo-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      theme.primary,
      '#fff'
    ]
  },
  layout: {
    'text-font': ['Noto Sans Bold'],
    'text-size': [
      'step',
      ['get', 'nbNumeros'],
      8,
      20,
      10,
      50,
      14,
      100,
      16
    ],
    'text-field': ['get', 'nomVoie']
  }
}

export const toponymeLayer = {
  id: 'toponyme',
  source: 'base-adresse-nationale',
  'source-layer': 'toponymes',
  type: 'symbol',
  filter: ['==', ['get', 'type'], 'lieu-dit'],
  minzoom: TOPONYME_MIN,
  maxzoom: TOPONYME_MAX,
  paint: {
    'text-color': TOPONYME_COLOR,
    'text-halo-color': '#ffffff',
    'text-halo-width': 2,
    'text-opacity': {
      stops: [
        [11, 0],
        [13, 1]
      ]
    }
  },
  layout: {
    'text-font': ['Noto Sans Bold'],
    'text-size': {
      stops: [
        [0, 3],
        [10, 15],
        [17, 8]
      ]
    },
    'text-field': ['get', 'nomVoie'],
    'text-ignore-placement': false,
    'text-variable-anchor': ['bottom', 'top', 'right', 'left'],
    'text-radial-offset': 0.1
  }
}
