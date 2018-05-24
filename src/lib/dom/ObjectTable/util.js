import debounce from 'lodash/debounce'

const castValue = (value, type) => {
  if(value === null || value === undefined){
    value = ''
  }
  var curType = typeof value
  var primitive = curType != 'object'
  if(Array.isArray(value)){
    curType = 'array'
  }

  switch(type){
    case 'string': {
      if(!primitive){
        return ''
      }
      return value.toString()
    }

    case 'number': {
      if(curType == 'number'){
        return value
      }
      else if(curType == 'boolean'){
        return value ?1 :0
      }
      else if(curType == 'string'){
        var f = Number.parseFloat(value)
        var i = Number.parseInt(value)
        var num = f == i ?i :f
        return Number.isNaN(num) ?0 :num
      }
      return 0
    }

    case 'array': {
      if(primitive){
        return [value]
      }
      if(curType == 'array'){
        return value
      }
      // object
      return Object.values(value)
    }

    case 'boolean': {
      return value ?true :false
    }

    case 'object': {
      if(curType == 'object'){
        return value
      }
      else if(curType == 'array'){
        return value.reduce((acc, cur, i) => {
          acc[i.toString()] = cur
          return acc
        })
      }
      return {val: value}
    }
  }
}

export {castValue}
