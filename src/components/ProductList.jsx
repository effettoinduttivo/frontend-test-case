import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
} from '../store/productSlice';
import { addToCart } from '../store/cartSlice';

export function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) {
    return <div className='loading'>Загрузка товаров...</div>;
  }

  return (
    <div className='product-list'>
      <div className='filters'>
        <div className='search'>
          <input
            type='text'
            placeholder='Поиск товаров...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className='filter-controls'>
          {showFilters && <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value='all'>Все категории</option>
            <option value='phones'>Телефоны</option>
            <option value='laptops'>Ноутбуки</option>
            <option value='tablets'>Планшеты</option>
          </select>}

          {showFilters && <select value={sortBy} onChange={handleSortChange}>
            <option value='name'>По названию</option>
            <option value='price'>По цене</option>
          </select>}

          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
        </div>
      </div>

      <div className='products'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-card'>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className='price'>${product.price}</div>
            <button onClick={() => dispatch(addToCart(product))}>
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
