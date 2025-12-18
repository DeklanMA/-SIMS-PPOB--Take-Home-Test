import TransactionItem from './TransactionItem';

interface TransactionListProps {
  records: any[];
}

export default function TransactionList({records}: TransactionListProps) {
  return (
    <div className="space-y-3">
      {records.map((trx) => (
        <TransactionItem
          key={trx.invoice_number}
          type={trx.transaction_type}
          description={trx.description}
          amount={trx.total_amount}
          date={trx.created_on}
        />
      ))}
    </div>
  );
}
