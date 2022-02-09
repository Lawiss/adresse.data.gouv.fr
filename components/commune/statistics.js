import PropTypes from 'prop-types'
import {Doughnut} from 'react-chartjs-2'

import theme from '@/styles/theme'

function toCounterData(percent, total) {
  return {
    labels: [],
    datasets: [
      {
        data: [percent, total],
        backgroundColor: [
          '#0054B3',
          '#FCB955'
        ],
        borderColor: [
          '#FFFFFF',
        ],
        borderWidth: 3,
      },
    ]
  }
}

const options = {
  height: 50,
  width: 50,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false
    }
  }
}

function Statistics({nbNumeros, nbNumerosCertifies}) {
  const certifiedPercent = (nbNumerosCertifies / nbNumeros) * 100
  const doughnutData = toCounterData(Math.round(certifiedPercent), 100 - Math.round(certifiedPercent))
  return (
    <div className='bal-state-wrapper'>
      <div className='statistiques-container'>
        <div className='bal-states-container'>
          <div className='doughnut'>
            <Doughnut data={doughnutData} options={options} />
          </div>
          <div className='numbers'>
            <div className='addresses-number'>
              <div className='certified-number'>{nbNumerosCertifies}</div>
              adresses certifiées.
            </div>
            <div className='addresses-number'>
              <div className='uncertified-number'>{nbNumeros - nbNumerosCertifies}</div>
              adresses non certifiées (ou en attente).
            </div>
          </div>
        </div>
        <p className='percent'>Aujourd’hui, <b>{certifiedPercent.toFixed(2)}%</b> des adresses de la commune sont certifiées.</p>
      </div>

      <style jsx>{`
      .bal-state-wrapper {
          margin: 3em 0;
        }

        .statistiques-container, .numbers, .addresses-number {
          display: flex;
          flex-direction: column;
        }

        .statistiques-container {
          text-align: center;
          background: ${theme.colors.white};
          color: ${theme.darkText};
          border-radius: 8px;
          padding: 2em;
          gap: 1em;
        }

        .bal-states-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          gap: 2em;
        }

        .doughnut {
          max-width: 250px;
        }

        .numbers {
          min-width: 250px;
          gap: 2em;
          font-weight: bold;
          font-size: x-large;
        }

        .addresses-number {
          gap: 1em;
        }

        .certified-number, .uncertified-number {
          font-size: xxx-large;
        }

        .certified-number {
          color: ${theme.primary};
        }

        .uncertified-number {
          color: #FCB955;
        }

        .percent {
          font-size: x-large;
          margin: 0;
          padding-top: 1em;
          border-top: solid 3px ${theme.border};
        }

        .percent b {
          color: ${theme.primary};
        }
      `}</style>
    </div>
  )
}

Statistics.propTypes = {
  nbNumeros: PropTypes.number.isRequired,
  nbNumerosCertifies: PropTypes.number.isRequired
}

export default Statistics