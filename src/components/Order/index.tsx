import React, { useCallback, useState } from 'react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Card, Statistic } from 'antd';
import { BuyModal } from '../BuyModal';
import { LiqImage } from '../LiqImage';
import { Order as OrderSchema } from 'solana-candy-shop-schema/dist';
import { CandyShop } from '../../core/CandyShop';

export interface OrderProps {
  order: OrderSchema;
  walletPublicKey: PublicKey | undefined;
  candyShop: CandyShop;
  walletConnectComponent: React.ReactElement;
}

export const Order: React.FC<OrderProps> = ({
  order,
  walletPublicKey,
  candyShop,
  walletConnectComponent,
}) => {
  const [selection, setSelection] = useState<OrderSchema | null>(null);

  const onClose = useCallback(() => {
    setSelection(null);
  }, []);

  const onClick = useCallback(() => {
    setSelection(order);
  }, [order]);

  return (
    <>
      <Card className="vault-list-item" onClick={onClick}>
        <LiqImage alt={order?.name} src={order?.nftImageLink!} />
        <div className="vault-list-item-body">
          <div className="vault-list-item-header">
            <div
              className="vault-name"
              style={{
                verticalAlign: 'middle',
                fontWeight: 'bold',
                marginBottom: '2px',
                width: '60%',
              }}
            >
              {order?.name}
              <div className="subtitle">{order?.ticker}</div>
            </div>
            <div className="mint-price">
              <span className="vault-statistic-title-caps">Price</span>
              <Statistic
                suffix="SOL"
                value={(order?.price as any) / LAMPORTS_PER_SOL}
                precision={2}
                valueStyle={{ fontSize: 14, fontWeight: 'bold' }}
              />
            </div>
          </div>
        </div>
      </Card>
      {selection && (
        <BuyModal
          order={selection}
          onClose={onClose}
          walletPublicKey={walletPublicKey}
          candyShop={candyShop}
          walletConnectComponent={walletConnectComponent}
        />
      )}
    </>
  );
};