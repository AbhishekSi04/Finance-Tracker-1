import { NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In a real app, this would be replaced with MongoDB
let transactions = [
  {
    _id: '1',
    amount: 150.00,
    description: 'Grocery shopping',
    date: '2024-01-15',
    type: 'expense',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    _id: '2',
    amount: 2500.00,
    description: 'Salary',
    date: '2024-01-01',
    type: 'income',
    createdAt: new Date('2024-01-01').toISOString()
  },
  {
    _id: '3',
    amount: 80.00,
    description: 'Dinner with friends',
    date: '2024-01-10',
    type: 'expense',
    createdAt: new Date('2024-01-10').toISOString()
  }
];

let nextId = 4;

export async function GET() {
  try {
    // Sort by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    return NextResponse.json(sortedTransactions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, description, date, type } = body;

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (!description || description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    if (!['income', 'expense'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either income or expense' },
        { status: 400 }
      );
    }

    const newTransaction = {
      _id: nextId.toString(),
      amount: parseFloat(amount),
      description: description.trim(),
      date,
      type,
      createdAt: new Date().toISOString()
    };

    transactions.push(newTransaction);
    nextId++;

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, amount, description, date, type } = body;

    // Validation
    if (!_id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    if (!description || description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    if (!['income', 'expense'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either income or expense' },
        { status: 400 }
      );
    }

    const transactionIndex = transactions.findIndex(t => t._id === _id);
    
    if (transactionIndex === -1) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Update the transaction
    transactions[transactionIndex] = {
      ...transactions[transactionIndex],
      amount: parseFloat(amount),
      description: description.trim(),
      date,
      type
    };

    return NextResponse.json(transactions[transactionIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { _id } = body;
    
    if (!_id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }
    
    const transactionIndex = transactions.findIndex(t => t._id === _id);
    
    if (transactionIndex === -1) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Remove the transaction
    const deletedTransaction = transactions.splice(transactionIndex, 1)[0];

    return NextResponse.json(
      { message: 'Transaction deleted successfully', transaction: deletedTransaction }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
} 