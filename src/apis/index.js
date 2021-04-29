import getTokenPrices from '../utils/getTokenPrices';
import * as ethereumApis from './ethereum/index';

//eslint-disable-next-line import/no-anonymous-default-export
export default {
  getTokenPrices,
  ...ethereumApis
}