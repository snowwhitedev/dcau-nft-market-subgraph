/* eslint-disable prefer-const */
import { BigInt } from '@graphprotocol/graph-ts';
import { TokenOnSale, TokenRemovedFromSale, TokenSold } from '../types/DCAUNFTMarket/DCAUNFTMarket'

// import { ClaimPaid, LeftPool, PremiumDeposited, RiskPoolCreated, StakedInPool } from '../types/Cohort/Cohort'
// import { Claim, Premium, PremiumPosition, RiskPool, Stake, StakePosition, Transaction, User, Withdraw } from '../types/schema'
import { MarketStock } from '../types/schema'
import {convertTokenToDecimal, BI_18, ADDRESS_ZERO, ZERO_BD } from './helpers'

export function handleTokenOnSale(event: TokenOnSale): void {
  let saleIndex = event.params.saleIndex;
  let marketStock = new MarketStock(saleIndex.toString()) as MarketStock
  marketStock.seller = event.params.seller.toHexString()
  marketStock.nftContract = event.params.nftContract.toHexString()
  marketStock.nftId = event.params.nftId
  marketStock.price = convertTokenToDecimal(event.params.price, BI_18)
  marketStock.category = event.params.category
  marketStock.buyer = ADDRESS_ZERO
  marketStock.isOnSale = true

  marketStock.save()
}

export function handleTokenRemovedFromSale(event: TokenRemovedFromSale): void {
  let saleIndex = event.params.saleIndex;
  let marketStock = MarketStock.load(saleIndex.toString())
  if (marketStock === null) {
    return
  }
  marketStock.isOnSale = false
  marketStock.save()
}

export function handleTokenSold(event: TokenSold): void {
  let saleIndex = event.params.saleIndex;
  let marketStock = MarketStock.load(saleIndex.toString())
  if (marketStock === null) {
    return
  }

  marketStock.buyer = event.params.buyer.toHexString()
  marketStock.isOnSale = false

  marketStock.save()
}
