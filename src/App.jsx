import { useEffect, useState } from 'react';
import ingredientsToAdd from './constants/ingredientsToAdd';
import './index.css'

const HamburgerApp = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currency, setCurrency] = useState('tl');
  const [total, setTotal] = useState(0)
  const addIngredient = (ingredient) => {
    const isAdded = selectedIngredients.find(
      (item) => item.id === ingredient.id
    );

    if (isAdded) {
      setSelectedIngredients(
        selectedIngredients.map((item) => {
          if (item.id === ingredient.id) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        })
      );
    } else {
      setSelectedIngredients([
        ...selectedIngredients,
        {
          ...ingredient,
          count: 1,
          //   count:
          //     ingredient.name === 'Köfte'
          //       ? 2
          //       : ingredient.name === 'Domates'
          //       ? 4
          //       : 1,
          // nested ternary ler kullanimi kolay ama okumasi zordur
        },
      ]);
    }
  };
  const removeIngredient = (ingredient) => {
    const addedIngredient = selectedIngredients.find(
      (item) => item.id === ingredient.id
    );
    if (addedIngredient.count > 1) {
      setSelectedIngredients(
        selectedIngredients.map((item) => {
          if (item.id === ingredient.id) {
            return {
              ...item,
              count: item.count - 1,
            };
          }
          return item;
        })
      );
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item.id !== ingredient.id)
      );
    }
  };

  const convertPrice = () => {
    switch (currency) {
      case "usd":
        return (total * 28)
      case "euro":
        return (total * 30)
      default:
        return total;
    }
  }

  useEffect(() => {
    const totalPrice = selectedIngredients.
      reduce((total, item) => total +
        (item.count * item.price), 0)
    setTotal(totalPrice)
  }, [selectedIngredients])

  return (
    <div className='container' >
      <h1 className='title' >Hamburger App 🍔</h1>
      <div className='main'>
        <h2>Malzemeler</h2>
        <ul >
          {selectedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.Symbol}  {ingredient.name}  {ingredient.count} x  {ingredient.price}
            </li>
          ))}
        </ul>
        <ul>
          {ingredientsToAdd.map((ingredient) => (
            <li className='flex' key={ingredient.id}>
              <p>
                {ingredient.name} <b />
                <button
                  onClick={() => addIngredient(ingredient)}
                  className="add-ingredient"
                >
                  Ekle
                </button>
                {selectedIngredients.find(
                  (item) => item.id === ingredient.id
                ) && (
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="remove-ingredient"
                    >
                      Cikar
                    </button>
                  )}
                {/* eger butonu css ile disabled olarak gostermek istiyorsaniz asagidaki kod parcacini calistirabilirsiniz */}
                {/* <button
                  onClick={() => removeIngredient(ingredient)}
                  className={
                    selectedIngredients.find(
                      (item) => item.id === ingredient.id
                    )
                      ? 'remove-ingredient'
                      : 'remove-ingredient disabled'
                  }
                >
                  Cikar
                </button> */}
              </p>
            </li>
          ))}
        </ul>
        <div>
          <div className="">
            <select onChange={(e) => setCurrency(e.target.value)} name="" id="">
              <option value="tl">TL</option>
              <option value="usd">$</option>
              <option value="euro">£</option>
            </select>
            <h2 className='ml-10' >total price: <strong>{convertPrice()}</strong></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerApp;