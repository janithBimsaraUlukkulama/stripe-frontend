import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";
import { useState } from 'react';
function App() {
  console.log(process.env.REACT_APP_KEY);

  const [product, setProduct] = useState({
    name: "ProductName",
    price: 10,
    productBy: "productMarketer"
  });

  const makePayment = token => {
    const body = { token, product };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:6969/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(res => {
      console.log(res);
      const { status } = res;
    }).catch(
      err => console.log(err)
    )
}

return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
      </a>

      <StripeCheckout
        stripeKey="pk_test_51K8NugJywlKEoracfzQxPzu6pKMOV5tuVLbzqGoNmvnFS39ZzpiHIocNWbdlqwnLvBaaWxawNdc8KCBwFmWNUE0E00rB6hPc8U"
        token={makePayment}
        name='Buy product'
        amount={product.price * 100}
      >
        <button className='btn-large pink'>Buy now</button>
      </StripeCheckout>

    </header>
  </div>
);
}

export default App;
