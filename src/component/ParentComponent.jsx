import React, { useState, useEffect } from 'react';
import DropdownComponent from '../component/mainCom';
import axios from 'axios';

const App = () => {
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6eyJ1c2VyX2lkIjo1MiwidXNlcl9uYW1lIjoiVGVzdCBDb25RVCIsIm5hbWUiOiJUZXN0IENvblFUIiwibG9naW5fdHlwZSI6IkFkbWluIiwicm9sZSI6IkFkbWluIiwicm9sZUlkIjozNSwib3JnYW5pemF0aW9uSWQiOjE0fSwiaWF0IjoxNzExNDI0MDkxLCJleHAiOjE3MTQwMTYwOTF9.k3KQBikMJUfsLXo0V7WoOOKbTbIEqk1v6GS0N_5G-NE';

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('https://apis-test.conqt.com/api/v2/SubCategory-GetList-ForDropDown', {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        });
        const { data } = response.data;
        if (data && data.subCategories) {
          setSubCategoryOptions(data.subCategories.map(subCategory => ({
            id: subCategory.subCategoryId,
            name: subCategory.subCategoryName
          })));
        } else {
          console.error('Unexpected API response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching sub-categories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (selectedSubCategories.length > 0) {
          const subcategoriesParam = `[${selectedSubCategories.join(',')}]`;
          console.log('Fetching products with subcategories:', subcategoriesParam);
          const response = await axios.get(`https://apis-test.conqt.com/api/v2/Product-Customer-GetList-ForDropDown-BySubCategory?subcategories=${subcategoriesParam}`, {
            headers: {
              Authorization: `Bearer ${bearerToken}`
            }
          });
          const { data } = response.data;
          console.log('Product API response:', data);
          if (data && Array.isArray(data)) {
            setProductOptions(data.map(product => ({
              id: product.productId,
              name: product.productName
            })));
          } else {
            setProductOptions([]);
          }
        } else {
          setProductOptions([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedSubCategories]);

  const handleSubCategoryChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.id);
    setSelectedSubCategories(selectedIds);
  };

  return (
    <div>
      <DropdownComponent
        subCategoryLabel="Sub Category"
        productLabel="Products"
        subCategoryOptions={subCategoryOptions}
        productOptions={productOptions}
        onSubCategoryChange={handleSubCategoryChange}
      />
    </div>
  );
};

export default App;