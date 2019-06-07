import React from 'react'
import PropTypes from 'prop-types'

import Button from '../button'

import {getNumeroPositions} from '../../lib/bal/item'

import VoieMenu from './voie-menu'

class EditionMenu extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    numero: PropTypes.shape({
      positions: PropTypes.array.isRequired
    }),
    actions: PropTypes.shape({
      deleteItem: PropTypes.func.isRequired
    }).isRequired,
    selectItem: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  }

  static defaultProps = {
    numero: null
  }

  deleteItem = async () => {
    const {type, item, numero, actions, close} = this.props

    if (type === 'numero') {
      await actions.deleteItem(item)
    } else {
      const positions = [...getNumeroPositions(numero)]
      positions.forEach((position, idx) => {
        if (position._id === item._id) {
          positions.splice(idx, 1)
        }
      })

      await actions.updateNumero(numero, {positions})
    }

    close()
  }

  selectItem = () => {
    const {selectItem, close} = this.props
    selectItem()
    close()
  }

  render() {
    const {type, item, close, actions} = this.props

    return (
      <div className='edition-menu'>
        {type === 'voie' ? (
          <VoieMenu
            voie={item}
            actions={actions}
            close={close}
          />
        ) : (
          <Button
            color='warning'
            onClick={this.deleteItem}
          >
          Supprimer
          </Button>
        )}

        {type !== 'position' && (
          <Button onClick={this.selectItem}>Consulter</Button>
        )}

        <style jsx>{`
          .edition-menu {
            display: grid;
            grid-template-columns: minmax(200px, 250px);
            grid-row-gap: 1em;
          }
          `}</style>
      </div>
    )
  }
}

export default EditionMenu
