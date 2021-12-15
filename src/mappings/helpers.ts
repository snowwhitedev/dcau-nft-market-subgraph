import { BigInt, BigDecimal } from '@graphprotocol/graph-ts'
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const ZEUS_POOL = '0xEcE9f1A3e8bb72b94c4eE072D227b9c9ba4cd750'
export const ATHENA_POOL = '0x0b5C802ecA88161B5daed08e488C83d819a0cD02'
export const ARTEMIS_POOL = '0x2cd32dF1C436f8dE6e09d1A9851945c56bcEd32a'

export const ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export const ZERO_BD = BigDecimal.fromString('0')
export let BI_18 = BigInt.fromI32(18)

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}
