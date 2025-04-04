import React, { useEffect, useState } from "react";

const PAGE_NO = 10;

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=500");
    const jsonData = await res.json();

    setProducts(jsonData.products);
    setLoading(false);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_NO);
  const start = currentPage * PAGE_NO;
  const end = start + PAGE_NO;

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.slice(start, end).map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>

      <div className="page-number">
        {[...Array(noOfPages).keys()].map((n) => (
          <button key={n} onClick={() => setCurrentPage(n)}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
