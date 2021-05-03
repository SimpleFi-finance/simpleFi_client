import { useLocation } from 'react-router-dom'

const QueryParams = () => {
  return new URLSearchParams(useLocation().search)
}

export default QueryParams;
