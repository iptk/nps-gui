import debounce from 'lodash/debounce'
import flowRight from 'lodash/flowRight'
import property from 'lodash/property'

const debounceWrapper = (...args) => {
    return flowRight(
      debounce(...args),
      property('target')
    )
}

export {debounceWrapper}
export default debounceWrapper
