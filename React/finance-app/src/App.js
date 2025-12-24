import React,{useState,useEffect}  from 'react';
import api from "./api";

const App=() =>{
    const[transactions, setTransactions] = useState([]);
    const [formData,setFormData] = useState({
        amount: '',
        category:'',
        description:'',
        is_income: false,
        date:'',
    });
    const fetchTransactions=async()=>{
        const response=await api.get('/transactions/');
        setTransactions(response.data)
    }
    useEffect(()=>{
        fetchTransactions();

},[]);
    const handleInputChange=(event)=>{
        const value=event.target.type==='checkbox'? event.target.checked :event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        await api.post('/transactions/', formData);
        fetchTransactions();
        setFormData({
            amount:'',
            category:'',
            description:'',
            is_income:false,
            date:'',
        });
    };
    return(
        <div>
            <nav className='navbar navbar-dark bg-primary'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='#'>Finance App</a>

                </div>
            </nav>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3 mt-3'>
                        <label htmlFor='amount' className='form-label'>Amount</label>
                        <input
                            type='number'
                            className='form-control'
                            id='amount'
                            name='amount'
                            value={formData.amount}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor='category' className='form-label'>Category</label>
                        <input
                            type='text'
                            className='form-control'
                            id='category'
                            name='category'
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            className='form-control'
                            id='description'
                            name='description'
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor='is_income'>Is Income?</label>
                        <input
                            type='checkbox'
                            className='form-check-input'
                            id='is_income'
                            name='is_income'
                            checked={formData.is_income}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mb-3 mt-3'>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            className='form-control'
                            id='date'
                            name='date'
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
                <table className='table table-striped table-borderd tabel-hover'>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Is Income?</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key ={transaction.id}>
                                <td>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default App;
