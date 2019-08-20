import React from 'react';
import { Card } from 'antd';
import Payment from '../Payment';

const BasicPayment = () => {
  return(
    <div className="payments">
      <div className="basic-payment">
        <Card title="Basic Payment">
          <Payment/>
        </Card>
      </div>
    </div>
  );
}

export default BasicPayment;
