import React from 'react';
import Payment from '../Payment';
import StripeConnect from './StripeConnect';
import { Card } from 'antd';

const AdvisorPayment = () => {
  return(
    <div className="payments">
      <Card title="Basic Payment">
        <Payment/>
      </Card>
      <Card title="Advisor Payment">
        <StripeConnect/>
      </Card>
    </div>
  );
}

export default AdvisorPayment;
