import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, TransactionTypeButton, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');

    onRequestClose()
  }

  return (
    <Modal 
       isOpen={isOpen} 
       onRequestClose={onRequestClose}
       overlayClassName="react-modal-overlay"
       className="react-modal-content"
     >
       <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
       >
         <img src={closeImg} alt="Fechar modal" />
       </button>

       <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input 
          type="text" 
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input 
          type="number" 
          placeholder="Valor"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <TransactionTypeButton
           type="button"
           isActive={type === 'deposit'}
           activeColor="#33CC95"
           onClick={() => setType('deposit')}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </TransactionTypeButton>

          <TransactionTypeButton
           type="button"
           isActive={type === 'withdraw'}
           activeColor="#E52E4D"
           onClick={() => setType('withdraw')}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </TransactionTypeButton>
        </TransactionTypeContainer>

        <input 
          placeholder="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
       </Container>
     </Modal>
  )
}
